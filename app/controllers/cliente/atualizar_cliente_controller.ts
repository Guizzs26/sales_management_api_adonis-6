import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AtualizarClienteService from '#services/cliente/atualizar_cliente_service'

@inject()
export default class AtualizarClienteController {
  constructor(private atualizarClienteService: AtualizarClienteService) {}

  async handle({ request, response, params }: HttpContext): Promise<void> {
    const { nomeCompleto, email, telefone } = request.only(['nomeCompleto', 'email', 'telefone'])
    const { id } = params

    const cliente = await this.atualizarClienteService.execute(id, {
      nomeCompleto,
      email,
      telefone,
    })

    return response.send(cliente)
  }
}
