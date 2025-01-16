import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CriarClienteService from '../../services/cliente/criar_cliente_service.js'
import { criarClienteValidator } from '#validators/cliente/criar_cliente_validador'
import ViaCEP from '../../clients/via_cep.js'
import axios from 'axios'
import { EnderecoCompleto } from '../../../types/cliente/cliente_type.js'

@inject()
export default class CriarClienteController {
  private viaCEP: ViaCEP

  constructor(private criarClienteService: CriarClienteService) {
    this.viaCEP = new ViaCEP(axios)
  }

  public async handle({ request, response }: HttpContext): Promise<void> {
    const { nomeCompleto, cpfCnpj, email, telefone, dataNascimentoFundacao, tipo, enderecos } =
      await request.validateUsing(criarClienteValidator)

    const enderecosNormalizados = await this.viaCEP.buscarEnderecos(enderecos)

    const enderecosCompletos: EnderecoCompleto[] = enderecos.map((endereco, index) => ({
      ...enderecosNormalizados[index],
      cep: endereco.cep,
      numero: endereco.numero,
      complemento: endereco.complemento,
      siglaUf: endereco.siglaUf,
    }))

    const novoCliente = await this.criarClienteService.execute({
      nomeCompleto,
      cpfCnpj,
      email,
      telefone,
      dataNascimentoFundacao,
      tipo,
      enderecos: enderecosCompletos,
    })

    return response.status(201).send({
      data: novoCliente,
    })
  }
}
