import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CriarClienteService from '../../services/cliente/criar_cliente_service.js'
import { criarClienteValidator } from '#validators/cliente/criar_cliente_validador'

@inject()
export default class CriarClienteController {
  constructor(private criarClienteService: CriarClienteService) {}

  public async handle({ request, response }: HttpContext): Promise<void> {
    const { nomeCompleto, cpfCnpj, email, telefone, dataNascimentoFundacao, tipo, enderecos } =
      await request.validateUsing(criarClienteValidator)

    const novoCliente = await this.criarClienteService.execute({
      nomeCompleto,
      cpfCnpj,
      email,
      telefone,
      dataNascimentoFundacao,
      tipo,
      enderecos,
    })

    return response.status(201).send({
      data: novoCliente,
    })
  }
}
