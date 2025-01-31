import db from '@adonisjs/lucid/services/db'
import { LimiteVendasExcedidoException } from '#exceptions/limite_venda_excedido'
import Cliente from '#models/cliente/cliente'
import Servico from '#models/servico/servico'
import Venda from '#models/venda/venda'
import PrecoServicosUf from '#models/servico/preco_servicos_uf'
import PrecoPlanosUf from '#models/plano/preco_planos_uf'

export type CriarVendaPayload = {
  id: string
  plano: string
  servicos: string[]
  descontoAplicado?: number | null
}

export default class CriarVendaService {
  async execute({ id, plano, servicos, descontoAplicado }: CriarVendaPayload) {
    // 1. Verificar se o cliente existe
    const cliente = await Cliente.query().where('id', id).preload('enderecos').firstOrFail()

    console.log(cliente.enderecos)

    // 2. Verificar limite de vendas ativas (máximo de 10 vendas ativas)
    const quantidadeVendasCliente = await db
      .from('vendas')
      .select('cliente_id')
      .where('cliente_id', id)
      .groupBy('cliente_id')
      .count('* as total')

    const totalVendas =
      quantidadeVendasCliente.length > 0 ? Number(quantidadeVendasCliente[0].total) : 0

    if (totalVendas >= 10) {
      throw new LimiteVendasExcedidoException(
        'Limite de vendas atingido! Cada cliente pode ter no máximo 10 vendas.'
      )
    }

    // 3. Verificar se o plano existe
    const planoSelecionado = await db.from('planos').where('nomePlano', plano).firstOrFail()

    const enderecoCliente = cliente.enderecos[0]

    // 4. Ajustar preço do plano conforme a UF do cliente
    const precoPlanoUf = await PrecoPlanosUf.query()
      .where('siglaUf', enderecoCliente.siglaUf)
      .where('planoId', planoSelecionado.id)
      .firstOrFail()

    console.error('planoSelecionado: ', planoSelecionado)
    console.error('precoPlanoUf: ', precoPlanoUf)
    console.error('planoSelecionado.preco_base: ', planoSelecionado.preco_base)
    console.error('precoPlanoUf.percentualAjuste: ', precoPlanoUf?.percentualAjuste)

    const precoPlanoFinal = precoPlanoUf
      ? Number(planoSelecionado.preco_base) * (1 + Number(precoPlanoUf.percentualAjuste))
      : Number(planoSelecionado.preco_base) || 0

    console.error('Preço do plano final: ', precoPlanoFinal)

    // 5. Verificar e ajustar os serviços
    const servicosSelecionados = await Servico.query().whereIn('nomeServico', servicos)
    const servicosIds = servicosSelecionados.map((servico) => servico.id)

    // 6. Calcular preço total dos serviços em paralelo
    const valoresServicos = await Promise.all(
      servicosSelecionados.map(async (servico) => {
        const precoServicoUf = await PrecoServicosUf.query()
          .where('siglaUf', enderecoCliente.siglaUf)
          .where('servicoId', servico.id)
          .firstOrFail()

        console.error('Serviço: ', servico.nomeServico)
        console.error('precoServicoUf: ', precoServicoUf)
        console.error('precoServicoUf.percentualAjuste: ', precoServicoUf?.percentualAjuste)

        const precoServicoFinal = precoServicoUf
          ? Number(servico.precoBase) * (1 + Number(precoServicoUf.percentualAjuste))
          : Number(servico.precoBase) || 0

        return precoServicoFinal
      })
    )

    console.log('Valores dos serviços: ', valoresServicos)

    // Garantir que os valores dos serviços sejam números
    const valorTotalServicos = valoresServicos.reduce((total, valor) => total + Number(valor), 0)

    console.log('Valor total dos serviços: ', valorTotalServicos)

    // 7. Calcular o valor total da venda
    const valorTotalVenda = precoPlanoFinal + valorTotalServicos - (descontoAplicado || 0)
    const valorFinalVenda = Math.max(valorTotalVenda, 0)

    console.log('Valor total da venda: ', valorFinalVenda)

    // 8. Criar a venda com clienteId
    const venda = await Venda.create({
      clienteId: cliente.id,
      planoId: planoSelecionado.id,
      valorTotalVenda: valorFinalVenda,
      descontoAplicado,
    })

    // 9. Relacionar serviços à venda
    await venda.related('servicos').attach(servicosIds)

    return venda
  }
}
