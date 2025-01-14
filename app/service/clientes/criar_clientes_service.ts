import db from '@adonisjs/lucid/services/db'
import Cliente, { TipoPessoa } from '../../models/cliente/cliente.js'
import { DateTime } from 'luxon'

type ClienteData = {
  nomeCompleto: string
  cpfCnpj: string
  email: string
  telefone: string | null
  dataNascimentoFundacao: DateTime
  tipo: TipoPessoa
  endereco: EnderecoData[]
}

type EnderecoData = {
  cep: string
  localidade: string
  logradouro: string
  bairro: string
  numero: string
  complemento: string | null
  ufId: string
}

export class CriarClienteService {
  public async execute({
    nomeCompleto,
    cpfCnpj,
    email,
    telefone,
    dataNascimentoFundacao,
    tipo,
    endereco,
  }: ClienteData): Promise<Cliente> {
    const cliente = await db.transaction(async (trx) => {
      const novoCliente = new Cliente()

      novoCliente.merge({ nomeCompleto, cpfCnpj, email, telefone, dataNascimentoFundacao, tipo })
      novoCliente.useTransaction(trx)

      await novoCliente.save()

      await novoCliente.related('enderecos').createMany(endereco)

      return novoCliente
    })

    // lazy loading
    await cliente.load('enderecos')

    return cliente
  }
}
