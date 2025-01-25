import Venda from '#models/venda/venda'
import Plano from '#models/plano/plano'
import Servico from '#models/servico/servico'

type AtualizarVendaPayload = {
  plano?: string
  servicos?: string[]
}

export default class AtualizarVendaService {
  async execute(id: string, { plano, servicos }: AtualizarVendaPayload): Promise<Venda> {
    const venda = await Venda.findOrFail(id)

    if (plano) {
      const planoSelecionado = await Plano.query().where('nomePlano', plano).firstOrFail()
      venda.planoId = planoSelecionado.id
    }

    if (servicos && servicos.length > 0) {
      const servicosSelecionados = await Servico.query().whereIn('nomeServico', servicos)

      // Atribuindo os serviços à venda usando o relacionamento ManyToMany
      await venda.related('servicos').sync(servicosSelecionados.map((servico) => servico.id))
    }

    await venda.save()

    await venda.load('plano')
    await venda.load('servicos')

    return venda
  }
}
