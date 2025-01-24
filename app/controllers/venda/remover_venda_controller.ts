import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { RemoverVendaService } from '#services/venda/remover_venda_service'

@inject()
export default class RemoverVendaController {
  constructor(private removerVendaService: RemoverVendaService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()

    await this.removerVendaService.execute(id)

    response.status(204)
  }
}
