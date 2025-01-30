import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { atualizarClienteValidator } from '#validators/cliente/atualizar_cliente_validador'
import AtualizarClienteService from '#services/cliente/atualizar_cliente_service'
import Cliente from '#models/cliente/cliente'

@inject()
export default class AtualizarClienteController {
  constructor(private atualizarClienteService: AtualizarClienteService) {}

  async handle({ request, response, params }: HttpContext): Promise<void> {
    const cliente = await Cliente.findOrFail(params.id)

    const payload = await request.validateUsing(atualizarClienteValidator, {
      meta: {
        tipo: cliente.tipo,
      },
    })

    const clienteAtualizado = await this.atualizarClienteService.execute(cliente, payload)

    response.send(clienteAtualizado)
  }
}
