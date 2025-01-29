import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { criarClienteValidator } from '#validators/cliente/criar_cliente_validador'
import NormalizarEnderecosService from '#services/endereco/normalizar_endereco_service'
import CriarClienteService from '#services/cliente/criar_cliente_service'

@inject()
export default class CriarClienteController {
  constructor(
    private normalizarEnderecosService: NormalizarEnderecosService,
    private criarClienteService: CriarClienteService
  ) {}

  public async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(criarClienteValidator)

    const enderecosNormalizados = await this.normalizarEnderecosService.normalizarEnderecos(
      payload.enderecos
    )

    const novoCliente = await this.criarClienteService.execute({
      ...payload,
      enderecos: enderecosNormalizados,
    })

    response.status(201).send(novoCliente)
  }
}
