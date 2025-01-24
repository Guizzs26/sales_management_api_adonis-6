import Venda from '#models/venda/venda'
import Servico from '#models/servico/servico'
import Plano from '#models/plano/plano'

type AtualizarVendaPayload = {
  plano?: string
  servicos?: string[]
  descontoAplicado?: number
}

export default class AtualizarVendaService {
  async execute(
    id: string,
    { plano, servicos, descontoAplicado }: AtualizarVendaPayload
  ): Promise<Venda> {
    const venda = await Venda.findOrFail(id)

    if (plano) {
      const planoSelecionado = await Plano.query().where('nome_plano', plano).firstOrFail()
      venda.planoId = planoSelecionado.id
    }

    if (servicos && servicos.length > 0) {
      // Encontrando os serviços pelo nome
      const servicosSelecionados = await Servico.query().whereIn('nome_servico', servicos)

      // Atribuindo os serviços à venda usando o relacionamento ManyToMany
      await venda.related('servicos').sync(servicosSelecionados.map((servico) => servico.id))
    }

    if (descontoAplicado) {
      venda.descontoAplicado = descontoAplicado
    }

    await venda.save()

    return venda
  }
}
