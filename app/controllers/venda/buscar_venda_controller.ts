import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { BuscarVendaService } from '#services/venda/buscar_venda_service'

@inject()
export default class BuscarVendaController {
  constructor(private buscarVendaService: BuscarVendaService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()

    const venda = await this.buscarVendaService.execute(id)

    response.send(venda)
  }
}
