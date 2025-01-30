import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'
import { RespostaPaginada } from '../../types/cliente/cliente_type.js'
import { criarPlanoValidator } from '#validators/plano/criar_plano_validator'
import { criarPlanoComAjustesValidator } from '#validators/plano/criar_plano_com_ajuste_validador'
import { listarPlanosValidator } from '#validators/plano/listar_planos_validador'
import { atualizarPlanoValidator } from '#validators/plano/atualizar_plano_validador'
import Plano from '#models/plano/plano'

export default class PlanosController {
  async index({ request, response }: HttpContext): Promise<void> {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const payload = await request.validateUsing(listarPlanosValidator, { data: { page, limit } })

    const planos = await Plano.query()
      .orderBy('created_at', 'asc')
      .paginate(payload.page, payload.limit)

    response.send(planos.toJSON() as RespostaPaginada<Plano>)
  }

  async store({ request, response }: HttpContext): Promise<void> {
    const { nomePlano, descricao, precoBase } = await request.validateUsing(criarPlanoValidator)

    const novoPlano = await Plano.create({ nomePlano, descricao, precoBase })

    response.status(201).send({
      data: novoPlano,
    })
  }

  async criarPlanoComAjustes({ request, response }: HttpContext) {
    const { nomePlano, descricao, precoBase, ajustesUf } = await request.validateUsing(
      criarPlanoComAjustesValidator
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

  async show({ params, response }: HttpContext): Promise<void> {
    const plano = await Plano.findOrFail(params.id)

    response.send(plano)
  }

  async update({ request, response, params }: HttpContext): Promise<void> {
    const { nomePlano, descricao, precoBase } = await request.validateUsing(atualizarPlanoValidator)

    const plano = await Plano.findOrFail(params.id)

    await plano.merge({ nomePlano, descricao, precoBase }).save()
    await plano.refresh()

    response.send(plano)
  }

  async destroy({ params, response }: HttpContext): Promise<void> {
    const plano = await Plano.findOrFail(params.id)

    await plano.delete()

    response.status(204)
  }
}
