import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
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

    const vendas = await this.listarVendasService.execute({
      clienteId,
      dataInicio,
      dataFim,
      page,
      limit,
    })

    response.send(vendas)
  }
}
