import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CriarClienteService } from '../../service/clientes/criar_clientes_service.js'

@inject()
export default class CriarClientesController {
  constructor(private criarClienteService: CriarClienteService) {}

  public async handle({ request, response }: HttpContext) {
    const data = request.body()

    const cliente = await this.criarClienteService.execute(data)

    return response.status(201).send({
      message: 'Cliente criado com sucesso!',
      data: cliente,
    })
  }
}
