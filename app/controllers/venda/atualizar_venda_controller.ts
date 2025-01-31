import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { atualizarVendaValidator } from '#validators/venda/atualizar_venda_validador'
import AtualizarVendaService from '#services/venda/atualizar_venda_service'

@inject()
export default class AtualizarVendasController {
  constructor(private atualizarVendaService: AtualizarVendaService) {}

  async handle({ request, response, params }: HttpContext): Promise<void> {
    const { plano, servicos } = await request.validateUsing(atualizarVendaValidator)

    const venda = await this.atualizarVendaService.execute(params.id, {
      plano,
      servicos,
    })

    response.send(venda)
  }
}
