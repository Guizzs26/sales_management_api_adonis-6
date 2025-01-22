import type { HttpContext } from '@adonisjs/core/http'
import { RespostaPaginada } from '../../../types/cliente/cliente_type.js'
import Plano from '#models/plano/plano'
import { criarPlanoValidador } from '#validators/plano/criar_plano_validator'
import { atualizarPlanoValidator } from '#validators/plano/atualizar_plano'
import { criarPlanoComAjustesValidador } from '#validators/plano/plano_com_ajuste'
import db from '@adonisjs/lucid/services/db'

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
    const { nomePlano, descricao, precoBase } = await request.validateUsing(criarPlanoValidador)

    const novoPlano = await Plano.create({ nomePlano, descricao, precoBase })

    response.status(201).send({
      data: novoPlano,
    })
  }

  async criarPlanoComAjustes({ request, response }: HttpContext) {
    const { nomePlano, descricao, precoBase, ajustesUf } = await request.validateUsing(
      criarPlanoComAjustesValidador
    )

    const novoPlanoComAjustes = await db.transaction(async (trx) => {
      const plano = new Plano()

      plano.merge({ nomePlano, descricao, precoBase })
      plano.useTransaction(trx)

      await plano.save()

      const ajustesFormatados = ajustesUf.map((ajuste) => ({
        siglaUf: ajuste.siglaUf,
        percentualAjuste: ajuste.percentualAjuste,
      }))

      await plano.related('precosUfs').createMany(ajustesFormatados)

      return plano
    })

    // lazy loading fora da transaction p/ evitar possível deadlock
    await novoPlanoComAjustes.load('precosUfs')

    response.status(201).send({
      data: novoPlanoComAjustes,
    })
  }

  async show({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()

    const plano = await Plano.findOrFail(id)

    response.send(plano)
  }

  async update({ request, response }: HttpContext): Promise<void> {
    const { nomePlano, descricao, precoBase } = await request.validateUsing(atualizarPlanoValidator)
    const { id } = request.params()

    const plano = await Plano.findOrFail(id)

    if (nomePlano) plano.nomePlano = nomePlano
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
