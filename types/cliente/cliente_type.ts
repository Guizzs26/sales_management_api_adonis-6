import { DateTime } from 'luxon'

export enum TipoPessoa {
  PF = 'PF',
  PJ = 'PJ',
}

export type CriarClientePayload = {
  nomeCompleto: string
  cpfCnpj: string
  email: string
  telefone: string | null
  dataNascimentoFundacao: DateTime
  tipo: TipoPessoa
  enderecos: EnderecoPayload[]
}

export type EnderecoPayload = {
  cep: string
  localidade: string
  logradouro: string
  bairro: string
  numero: string
  complemento: string | null
  ufId: string
}

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
