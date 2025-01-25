import Venda from '#models/venda/venda'

export default class BuscarVendaService {
  async execute(id: string): Promise<Venda> {
    const venda = await Venda.query()
      .where('id', id)
      .preload('cliente')
      .preload('servicos')
      .preload('plano')
      .firstOrFail()

    return venda
  }
}
