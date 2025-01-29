import type { ApplicationService } from '@adonisjs/core/types'
import { SimplePaginator } from '@adonisjs/lucid/database'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  async ready() {
    SimplePaginator.namingStrategy = {
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
  }
}
