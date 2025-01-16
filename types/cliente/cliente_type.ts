import { DateTime } from 'luxon'

export enum TipoPessoa {
  PF = 'PF',
  PJ = 'PJ',
}

// Payload para criar o cliente no Service
export type CriarClientePayload = {
  nomeCompleto: string
  cpfCnpj: string
  email: string
  telefone?: string | null
  dataNascimentoFundacao: DateTime
  tipo: TipoPessoa
  enderecos: EnderecoCompleto[]
}

export type EnderecoCompleto = {
  cep: string
  siglaUf: string
  localidade: string
  bairro: string
  logradouro: string
  numero: string
  complemento?: string | null
}

//

export type PaginationMetadata = {
  meta: {
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
}

export type RespostaPaginada<T> = {
  meta: PaginationMetadata
  data: T[]
}

export type AtualizarClientePayload = {
  nomeCompleto?: string
  email?: string
  telefone?: string
}
