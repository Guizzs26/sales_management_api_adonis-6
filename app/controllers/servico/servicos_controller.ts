import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'
import { RespostaPaginada } from '../../types/cliente/cliente_type.js'
import { criarServicoValidator } from '#validators/servico/criar_servico_validador'
import { criarServicoComAjustesValidator } from '#validators/servico/criar_servico_com_ajustes_validador'
import { listarServicosValidator } from '#validators/servico/listar_planos_validador'
import { atualizarServicoValidator } from '#validators/servico/atualizar_servico_validador'
import Servico from '#models/servico/servico'

export default class ServicosController {
  async index({ request, response }: HttpContext): Promise<void> {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const payload = await request.validateUsing(listarServicosValidator, { data: { page, limit } })

    const servicos = await Servico.query()
      .orderBy('created_at', 'asc')
      .paginate(payload.page, payload.limit)

    response.send(servicos.toJSON() as RespostaPaginada<Servico>)
  }

  async store({ request, response }: HttpContext): Promise<void> {
    const { nomeServico, descricao, precoBase } = await request.validateUsing(criarServicoValidator)

    const novoServico = await Servico.create({ nomeServico, descricao, precoBase })

    response.status(201).send({
      data: novoServico,
    })
  }

  async criarServicoComAjustes({ request, response }: HttpContext) {
    const { nomeServico, descricao, precoBase, ajustesUf } = await request.validateUsing(
      criarServicoComAjustesValidator
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

  async show({ params, response }: HttpContext): Promise<void> {
    const servico = await Servico.findOrFail(params.id)

    response.send(servico)
  }

  async update({ request, response, params }: HttpContext): Promise<void> {
    const { nomeServico, descricao, precoBase } =
      await request.validateUsing(atualizarServicoValidator)

    const servico = await Servico.findOrFail(params.id)

    await servico.merge({ nomeServico, descricao, precoBase }).save()
    await servico.refresh()

    await servico.save()

    response.send(servico)
  }

  async destroy({ params, response }: HttpContext): Promise<void> {
    const servico = await Servico.findOrFail(params.id)

    await servico.delete()

    response.status(204)
  }
}
