import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { listarVendasValidator } from '#validators/venda/listar_vendas_validator'
import ListarVendasService from '#services/venda/listar_vendas_service'

@inject()
export default class ListarVendasController {
  constructor(private listarVendasService: ListarVendasService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    const clienteId = request.input('clienteId')
    const dataInicio = request.input('dataInicio')
    const dataFim = request.input('dataFim')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const payload = await request.validateUsing(listarVendasValidator, {
      data: { clienteId, dataInicio, dataFim, page, limit },
    })

    const vendas = await this.listarVendasService.execute({
      clienteId: payload.clinteId,
      dataInicio: payload.dataInicio,
      dataFim: payload.dataFim,
      page: payload.page,
      limit: payload.limit,
    })

    response.send(vendas)
  }
}
