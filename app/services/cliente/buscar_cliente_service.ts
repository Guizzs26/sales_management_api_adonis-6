import Cliente from '#models/cliente/cliente'

export default class BuscarClienteService {
  async execute(id: string): Promise<Cliente> {
    const cliente = await Cliente.findOrFail(id)

    await cliente.load('enderecos')

    return cliente
  }
}
