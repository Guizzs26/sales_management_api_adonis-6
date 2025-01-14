import Cliente from '#models/cliente/cliente'

export type RespostaPaginada<T> = {
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | null
    previousPageUrl: string | null
  }
  data: T[]
}

const LIMITE_MAXIMO = 100

export default class ListarClientesService {
  async execute(page: number, limit: number): Promise<RespostaPaginada<Cliente>> {
    if (limit > LIMITE_MAXIMO) {
      limit = LIMITE_MAXIMO
    }

    const clientes = await Cliente.query().orderBy('nomeCompleto', 'asc').paginate(page, limit)

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
