import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import RemoverVendaService from '#services/venda/remover_venda_service'

@inject()
export default class RemoverVendaController {
  constructor(private removerVendaService: RemoverVendaService) {}

  async handle({ params, response }: HttpContext): Promise<void> {
    await this.removerVendaService.execute(params.id)

    response.status(204)
  }
}
