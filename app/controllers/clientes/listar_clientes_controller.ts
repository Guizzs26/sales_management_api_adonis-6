import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ListarClientesService, {
  RespostaPaginada,
} from '../../services/clientes/listar_clientes_service.js'
import Cliente from '#models/cliente/cliente'

@inject()
export default class ListarClientesController {
  constructor(private listarClientesService: ListarClientesService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    const page = request.input('page', 1)
    let limit = request.input('limit', 10)

    const clientesPaginados: RespostaPaginada<Cliente> = await this.listarClientesService.execute(
      page,
      limit
    )

    return response.send(clientesPaginados)
  }
}
