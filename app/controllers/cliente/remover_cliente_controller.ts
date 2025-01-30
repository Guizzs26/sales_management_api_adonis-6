import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import RemoverClienteService from '#services/cliente/remover_cliente_service'

@inject()
export default class RemoverClienteController {
  constructor(private removerClienteService: RemoverClienteService) {}

  async handle({ params, response }: HttpContext): Promise<void> {
    await this.removerClienteService.execute(params.id)

    response.status(204)
  }
}
