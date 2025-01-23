import CriarVendaService from '#services/venda/criar_venda_service'
import { criarVendaValidador } from '#validators/venda/criar_venda_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CriarVendaController {
  constructor(private criarVendaService: CriarVendaService) {}

  async handle({ request, response }: HttpContext) {
    const { plano, servicos, descontoAplicado } = await request.validateUsing(criarVendaValidador)
    const { id } = request.params()

    const venda = await this.criarVendaService.execute(id, plano, servicos, descontoAplicado)

    response.status(201).send(venda)
  }
}
