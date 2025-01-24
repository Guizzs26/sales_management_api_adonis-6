import Cliente from '#models/cliente/cliente'
import Plano from '#models/plano/plano'
import PrecoPlanosUf from '#models/plano/preco_planos_uf'
import PrecoServicosUf from '#models/servico/preco_servicos_uf'
import Servico from '#models/servico/servico'
import Venda from '#models/venda/venda'
import db from '@adonisjs/lucid/services/db'

export type CriarVendaPayload = {
  id: string
  plano: string
  servicos: string[]
  descontoAplicado?: number | null
}

export default class CriarVendaService {
  async execute({ id, plano, servicos, descontoAplicado }: CriarVendaPayload) {
    // 1. Verificar se o cliente existe
    const cliente = await Cliente.findOrFail(id)

    // 2. Verificar limite de vendas ativas (máximo de 10 vendas ativas)

    const quantidadeVendasCliente = await db
      .from('vendas')
      .select('cliente_id')
      .where('cliente_id', id)
      .count('* as total')

    const totalVendas = Number(quantidadeVendasCliente[0].total)

    if (totalVendas >= 10) {
      throw new Error('Limite de vendas atingido! Cada cliente pode ter no máximo 10 vendas.')
    }

    // 3. Verificar se o plano existe
    const planoSelecionado = await db.from('planos').where('nome_plano', plano).firstOrFail()

    // 4. Ajustar preço do plano conforme a UF do cliente
    const precoPlanoUf = await PrecoPlanosUf.query()
      .where('siglaUf', cliente.enderecos[0].siglaUf)
      .where('planoId', planoSelecionado.id)
      .first()

    const precoPlanoFinal = precoPlanoUf
      ? planoSelecionado.precoBase * (1 + precoPlanoUf.percentualAjuste / 100)
      : planoSelecionado.precoBase

    // 5. Verificar e ajustar os serviços
    const servicosSelecionados = await Servico.query().whereIn('nome_servico', servicos)
    const servicosIds = servicosSelecionados.map((servico) => servico.id)

    // Calcular preço total dos serviços em paralelo
    const valoresServicos = await Promise.all(
      servicosSelecionados.map(async (servico) => {
        const precoServicoUf = await PrecoServicosUf.query()
          .where('siglaUf', cliente.enderecos[0].siglaUf)
          .where('servicoId', servico.id)
          .first()

        return precoServicoUf
          ? servico.precoBase * (1 + precoServicoUf.percentualAjuste / 100)
          : servico.precoBase
      })
    )

    const valorTotalServicos = valoresServicos.reduce((total, valor) => total + valor, 0)

    // 6. Calcular o valor total da venda
    const valorTotalVenda = precoPlanoFinal + valorTotalServicos - (descontoAplicado || 0)

    const valorFinalVenda = Math.max(valorTotalVenda, 0)

    // 7. Criar a venda com clienteId
    const venda = await Venda.create({
      clienteId: cliente.id,
      planoId: planoSelecionado.id,
      valorTotalVenda: valorFinalVenda,
      descontoAplicado,
    })

    // 8. Relacionar serviços à venda
    await venda.related('servicos').attach(servicosIds)

    return venda
  }
}
