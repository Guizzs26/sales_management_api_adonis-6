import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AtualizarVendaService from '#services/venda/atualizar_venda_service'
import { atualizarVendaValidator } from '#validators/venda/atualizar_venda_validator'

@inject()
export default class AtualizarVendasController {
  constructor(private atualizarVendaService: AtualizarVendaService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()
    const { plano, servicos } = await request.validateUsing(atualizarVendaValidator)

    const venda = await this.atualizarVendaService.execute(id, {
      plano,
      servicos,
    })

    response.send(venda)
  }
}
