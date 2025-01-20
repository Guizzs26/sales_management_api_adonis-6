import type { HttpContext } from '@adonisjs/core/http'
import { RespostaPaginada } from '../../../types/cliente/cliente_type.js'
import Plano from '#models/plano/plano'
import { criarPlanoValidador } from '#validators/plano/criar_plano_validator'
import { atualizarPlanoValidator } from '#validators/plano/atualizar_plano'

export default class PlanosController {
  async index({ request, response }: HttpContext): Promise<void> {
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

    response.send(planos.toJSON() as RespostaPaginada<Plano>)
  }

  async store({ request, response }: HttpContext): Promise<void> {
    const { nome, descricao, precoBase } = await request.validateUsing(criarPlanoValidador)

    const novoPlano = await Plano.create({ nome, descricao, precoBase })

    return response.status(201).send({
      data: novoPlano,
    })
  }

  async show({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()

    const plano = await Plano.findOrFail(id)

    response.send(plano)
  }

  async update({ request, response }: HttpContext): Promise<void> {
    const { nome, descricao, precoBase } = await request.validateUsing(atualizarPlanoValidator)
    const { id } = request.params()

    const plano = await Plano.findOrFail(id)

    if (nome) plano.nome = nome
    if (descricao) plano.descricao = descricao
    if (precoBase) plano.precoBase = precoBase

    await plano.save()

    response.send(plano)
  }

  async destroy({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()

    const plano = await Plano.findOrFail(id)

    await plano.delete()

    response.status(204)
  }
}
