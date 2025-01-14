import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import CriarClienteService from '../../service/clientes/criar_clientes_service.js'

@inject()
export default class CriarClientesController {
  constructor(private criarClienteService: CriarClienteService) {}

  public async handle({ request, response }: HttpContext): Promise<void> {
    const { nomeCompleto, cpfCnpj, email, telefone, dataNascimentoFundacao, tipo, endereco } =
      request.body()

    const cliente = await this.criarClienteService.execute({
      nomeCompleto,
      cpfCnpj,
      email,
      telefone,
      dataNascimentoFundacao,
      tipo,
      endereco,
    })

    return response.status(201).send({
      message: 'Cliente criado com sucesso!',
      data: cliente,
    })
  }
}
