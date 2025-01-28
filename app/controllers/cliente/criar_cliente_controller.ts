import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import NormalizarEnderecosService from '#services/endereco/normalizar_endereco_service'
import CriarClienteService from '#services/cliente/criar_cliente_service'
import { criarClienteValidator } from '#validators/cliente/criar_cliente_validador'

@inject()
export default class CriarClienteController {
  constructor(
    private normalizarEnderecosService: NormalizarEnderecosService,
    private criarClienteService: CriarClienteService
  ) {}

  public async handle({ request, response }: HttpContext): Promise<void> {
    const { nomeCompleto, cpfCnpj, email, telefone, dataNascimentoFundacao, tipo, enderecos } =
      await request.validateUsing(criarClienteValidator)

    const enderecosNormalizados =
      await this.normalizarEnderecosService.normalizarEnderecos(enderecos)

    const novoCliente = await this.criarClienteService.execute({
      nomeCompleto,
      cpfCnpj,
      email,
      telefone,
      dataNascimentoFundacao,
      tipo,
      enderecos: enderecosNormalizados,
    })

    response.status(201).send(novoCliente)
  }
}
