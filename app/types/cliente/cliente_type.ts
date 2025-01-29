import { DateTime } from 'luxon'

export enum TipoPessoa {
  PF = 'PF',
  PJ = 'PJ',
}

// Criação de cliente

export type CriarClientePayload = {
  nomeCompleto: string
  cpfCnpj: string
  email: string
  telefone?: string | null
  dataNascimentoFundacao: DateTime
  tipo: TipoPessoa
  enderecos: EnderecoNormalizadoCompleto[]
}

export type EnderecoNormalizadoCompleto = {
  cep: string
  localidade: string
  bairro: string
  logradouro: string
  numero: string
  complemento?: string | null
  siglaUf: string
}

export type EnderecoParcialRequest = {
  cep: string
  numero: string
  complemento?: string | null
  siglaUf: string
}

// Listagem de cliente e paginação

export type PaginationMetadata = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

export type RespostaPaginada<T> = {
  meta: PaginationMetadata
  data: T[]
}

// Atualização de cliente

export type AtualizarClientePayload = {
  nomeCompleto?: string
  email?: string
  telefone?: string
}
