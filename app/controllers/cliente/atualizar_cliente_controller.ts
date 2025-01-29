import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AtualizarClienteService from '#services/cliente/atualizar_cliente_service'

@inject()
export default class AtualizarClienteController {
  constructor(private atualizarClienteService: AtualizarClienteService) {}

  async handle({ request, response, params }: HttpContext): Promise<void> {
    const { id } = params

    const { nomeCompleto, email, telefone } = request.only(['nomeCompleto', 'email', 'telefone'])

    const clienteAtualizado = await this.atualizarClienteService.execute(id, {
      nomeCompleto,
      email,
      telefone,
    })
    response.send(clienteAtualizado)
  }
}
