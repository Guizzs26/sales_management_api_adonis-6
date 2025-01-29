import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { listarClientesValidator } from '#validators/cliente/listar_clientes.validador'
import ListarClientesService from '#services/cliente/listar_clientes_service'

@inject()
export default class ListarClientesController {
  constructor(private listarClientesService: ListarClientesService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    // Deixar como padrão 1 e 10 caso não seja enviado na request
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const payload = await request.validateUsing(listarClientesValidator, { data: { page, limit } })

    const clientesPaginados = await this.listarClientesService.execute(payload.page, payload.limit)

    response.send(clientesPaginados)
  }
}
