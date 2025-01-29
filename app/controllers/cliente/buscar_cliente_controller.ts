import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import BuscarClienteService from '#services/cliente/buscar_cliente_service'

@inject()
export default class BuscarClienteController {
  constructor(private buscarClienteService: BuscarClienteService) {}

  async handle({ params, response }: HttpContext): Promise<void> {
    const { id } = params

    const cliente = await this.buscarClienteService.execute(id)

    response.send(cliente)
  }
}
