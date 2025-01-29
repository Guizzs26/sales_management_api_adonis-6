import { RespostaPaginada } from '#types/cliente/cliente_type'
import Cliente from '#models/cliente/cliente'

export default class ListarClientesService {
  async execute(page: number, limit: number): Promise<RespostaPaginada<Cliente>> {
    const clientes = await Cliente.query()
      .preload('enderecos')
      .orderBy('created_at', 'asc')
      .paginate(page, limit)

    return clientes.toJSON() as RespostaPaginada<Cliente>
  }
}
