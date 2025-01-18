import type { HttpContext } from '@adonisjs/core/http'
import { RespostaPaginada } from '../../../types/cliente/cliente_type.js'
import Servico from '#models/servico/servico'

export default class ServicosController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    let limit = request.input('limit', 10)

    const servicos = await Servico.query().orderBy('created_at', 'asc').paginate(page, limit)

    servicos.namingStrategy = {
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

    response.send(servicos.toJSON() as RespostaPaginada<Servico>)
  }

  async store({ request, response }: HttpContext) {
    const { nome, descricao, precoBase } = request.body()

    const novoServico = await Servico.create({ nome, descricao, precoBase })

    return response.status(201).send({
      data: novoServico,
    })
  }

  async show({ request, response }: HttpContext) {
    const { id } = request.params()

    const servico = await Servico.findOrFail(id)

    response.send(servico)
  }

  async update({ request, response }: HttpContext) {
    const { nome, descricao, precoBase } = request.only(['nome', 'descricao', 'precoBase'])
    const { id } = request.params()

    const servico = await Servico.findOrFail(id)

    if (nome) servico.nome = nome
    if (descricao) servico.descricao = descricao
    if (precoBase) servico.precoBase = precoBase

    await servico.save()

    response.send(servico)
  }

  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()

    const servico = await Servico.findOrFail(id)

    await servico.delete()

    response.status(204)
  }
}
