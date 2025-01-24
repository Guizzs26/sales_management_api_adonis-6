import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AtualizarVendaService from '#services/venda/atualizar_venda_service'

@inject()
export default class AtualizarVendasController {
  constructor(private atualizarVendaService: AtualizarVendaService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    const { id } = request.params()
    const { plano, servicos, descontoAplicado } = request.only([
      'plano',
      'servicos',
      'descontoAplicado',
    ])

    const venda = await this.atualizarVendaService.execute(id, {
      plano,
      servicos,
      descontoAplicado,
    })

    response.send(venda)
  }
}
