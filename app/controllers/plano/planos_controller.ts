import Plano from '#models/plano/plano'
import type { HttpContext } from '@adonisjs/core/http'
import { RespostaPaginada } from '../../../types/cliente/cliente_type.js'

export default class PlanosController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    let limit = request.input('limit', 10)

    const planos = await Plano.query().orderBy('created_at', 'asc').paginate(page, limit)

    planos.namingStrategy = {
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

    return planos.toJSON() as RespostaPaginada<Plano>
  }

  async store({ request }: HttpContext) {}

  async show({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}
