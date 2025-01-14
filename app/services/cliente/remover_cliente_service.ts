import Cliente from '#models/cliente/cliente'

export default class RemoverClienteService {
  async execute(id: string): Promise<void> {
    const cliente = await Cliente.findOrFail(id)

    await cliente.delete()
  }
}
