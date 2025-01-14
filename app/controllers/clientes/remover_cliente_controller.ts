import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import RemoverClienteService from '#services/clientes/remover_cliente_service'

@inject()
export default class RemoverClienteController {
  constructor(private removerClienteService: RemoverClienteService) {}

  async handle({ params, response }: HttpContext): Promise<void> {
    const { id } = params

    await this.removerClienteService.execute(id)

    return response.status(204).send({ message: 'Cliente removido com sucesso!' })
  }
}
