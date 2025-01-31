import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { criarVendaValidador } from '#validators/venda/criar_venda_validador'
import CriarVendaService from '#services/venda/criar_venda_service'

@inject()
export default class CriarVendaController {
  constructor(private criarVendaService: CriarVendaService) {}

  async handle({ request, response }: HttpContext) {
    const { id } = request.params()
    const { plano, servicos, descontoAplicado } = await request.validateUsing(criarVendaValidador)

    const venda = await this.criarVendaService.execute({ id, plano, servicos, descontoAplicado })

    response.status(201).send(venda)
  }
}
