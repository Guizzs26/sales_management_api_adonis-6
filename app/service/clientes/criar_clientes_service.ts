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
  public async execute(data: ClienteData): Promise<Cliente> {
    const { nomeCompleto, cpfCnpj, email, telefone, dataNascimentoFundacao, tipo, endereco } = data

    const cliente = await Cliente.create({
      nomeCompleto,
      cpfCnpj,
      email,
      telefone,
      dataNascimentoFundacao,
      tipo,
    })

    await cliente.related('enderecos').createMany(endereco)
    await cliente.load('enderecos')

    return cliente
  }
}
