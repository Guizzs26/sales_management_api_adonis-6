import type { HttpContext } from '@adonisjs/core/http'
import { RespostaPaginada } from '../../types/cliente/cliente_type.js'
import Servico from '#models/servico/servico'
import { criarServicoValidador } from '#validators/servico/criar_servico_validator'
import { atualizarServicoValidator } from '#validators/servico/atualizar_servico'
import db from '@adonisjs/lucid/services/db'
import { criarServicoComAjustesValidador } from '#validators/servico/servico_com_ajustes'

export default class ServicosController {
  async index({ request, response }: HttpContext): Promise<void> {
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

  async store({ request, response }: HttpContext): Promise<void> {
    const { nomeServico, descricao, precoBase } = await request.validateUsing(criarServicoValidador)

    const novoServico = await Servico.create({ nomeServico, descricao, precoBase })

    response.status(201).send({
      data: novoServico,
    })
  }

  async criarServicoComAjustes({ request, response }: HttpContext) {
    const { nomeServico, descricao, precoBase, ajustesUf } = await request.validateUsing(
      criarServicoComAjustesValidador
    )

    const novoServicoComAjustes = await db.transaction(async (trx) => {
      const servico = new Servico()

      servico.merge({ nomeServico, descricao, precoBase })
      servico.useTransaction(trx)

      await servico.save()

      const ajustesFormatados = ajustesUf.map((ajuste) => ({
        siglaUf: ajuste.siglaUf,
        percentualAjuste: ajuste.percentualAjuste,
      }))

      await servico.related('precosUfs').createMany(ajustesFormatados)

      return servico
    })

    // lazy loading fora da transaction p/ evitar possível deadlock
    await novoServicoComAjustes.load('precosUfs')

    response.status(201).send({
      data: novoServicoComAjustes,
    })
  }

  async show({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()

    const servico = await Servico.findOrFail(id)

    response.send(servico)
  }

  async update({ request, response }: HttpContext): Promise<void> {
    const { nomeServico, descricao, precoBase } =
      await request.validateUsing(atualizarServicoValidator)
    const { id } = request.params()

    const servico = await Servico.findOrFail(id)

    if (nomeServico) servico.nomeServico = nomeServico
    if (descricao) servico.descricao = descricao
    if (precoBase) servico.precoBase = precoBase

    await servico.save()

    response.send(servico)
  }

  async destroy({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()

    const servico = await Servico.findOrFail(id)

    await servico.delete()

    response.status(204)
  }
}
