import Cliente from '#models/cliente/cliente'
import Plano from '#models/plano/plano'
import PrecoPlanosUf from '#models/plano/preco_planos_uf'
import PrecoServicosUf from '#models/servico/preco_servicos_uf'
import Servico from '#models/servico/servico'
import Venda from '#models/venda/venda'
import db from '@adonisjs/lucid/services/db'

export default class CriarVendaService {
  async execute(id: string, plano: string, servicos: string[], descontoAplicado?: number | null) {
    // 1. Verificar se o cliente existe
    const cliente = await Cliente.findOrFail(id)

    // 2. Verificar limite de vendas ativas (máximo de 10 vendas ativas)
    const vendasAtivas = await db.from('vendas').where('clienteId', id).count('* as total')
    const totalVendas = Number(vendasAtivas[0].total)

    if (totalVendas >= 10) {
      throw new Error('Limite de vendas ativas atingido!')
    }

    // 3. Verificar se o plano existe
    const planoSelecionado = await Plano.query().where('nomePlano', plano).firstOrFail()

    // 4. Ajustar preço do plano conforme a UF do cliente
    const precoPlanoUf = await PrecoPlanosUf.query()
      .where('siglaUf', cliente.enderecos[0].siglaUf)
      .where('planoId', planoSelecionado.id)
      .first()

    const precoPlanoFinal = precoPlanoUf
      ? planoSelecionado.precoBase * (1 + precoPlanoUf.percentualAjuste / 100)
      : planoSelecionado.precoBase

    // 5. Verificar e ajustar os serviços
    const servicosSelecionados = await Servico.query().whereIn('nomeServico', servicos).fetch()
    const servicosIds = servicosSelecionados.map((servico) => servico.id)
    let valorTotalServicos = 0

    for (let servico of servicosSelecionados) {
      const precoServicoUf = await PrecoServicosUf.query()
        .where('siglaUf', cliente.enderecos[0].siglaUf)
        .where('servicoId', servico.id)
        .first()
      valorTotalServicos += precoServicoUf
        ? servico.precoBase * (1 + precoServicoUf.percentualAjuste / 100)
        : servico.precoBase
    }

    // 6. Calcular o valor total da venda
    const valorTotalVenda = precoPlanoFinal + valorTotalServicos - (descontoAplicado || 0)

    // 7. Criar a venda
    const venda = await Venda.create({
      clienteId,
      planoId: planoSelecionado.id,
      valorTotalVenda,
      descontoAplicado,
    })

    // 8. Relacionar serviços à venda
    await venda.related('servicos').attach(servicosIds)

    return venda
  }
}
