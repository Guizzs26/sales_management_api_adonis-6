import Venda from '#models/venda/venda'

export default class RemoverVendaService {
  async execute(id: string): Promise<void> {
    const venda = await Venda.findOrFail(id)

    await venda.delete()
  }
}
