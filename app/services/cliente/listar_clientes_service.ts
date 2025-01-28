import Cliente from '#models/cliente/cliente'
import { RespostaPaginada } from '../../types/cliente/cliente_type.js'

const LIMITE_MAXIMO = 50

export default class ListarClientesService {
  async execute(page: number, limit: number): Promise<RespostaPaginada<Cliente>> {
    if (limit > LIMITE_MAXIMO) {
      limit = LIMITE_MAXIMO
    }

    const clientes = await Cliente.query()
      .preload('enderecos')
      .orderBy('created_at', 'asc')
      .paginate(page, limit)

    clientes.namingStrategy = {
      paginationMetaKeys() {
        return {
          total: 'total',
          perPage: 'per_page',
          currentPage: 'current_page',
          lastPage: 'last_page',
          firstPage: 'first_page',
          firstPageUrl: 'first_page_url',
          lastPageUrl: 'last_page_url',
          nextPageUrl: 'next_page_url',
          previousPageUrl: 'previous_page_url',
        }
      },
    }

    return clientes.toJSON() as RespostaPaginada<Cliente>
  }
}
