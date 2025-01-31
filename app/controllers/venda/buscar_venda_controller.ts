import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import BuscarVendaService from '#services/venda/buscar_venda_service'

@inject()
export default class BuscarVendaController {
  constructor(private buscarVendaService: BuscarVendaService) {}

  async handle({ params, response }: HttpContext): Promise<void> {
    const venda = await this.buscarVendaService.execute(params.id)

    response.send(venda)
  }
}
