import { TipoPessoa } from '#types/cliente/cliente_type'
import vine from '@vinejs/vine'

const dashBoardVendasSchema = vine.object({
  clienteNome: vine.string().optional(),
  planoNome: vine.string().optional(),
  servicoNome: vine.string().optional(),
  uf: vine.string().maxLength(2).optional(),

  inicioPeriodo: vine
    .date({
      formats: ['iso8601'],
    })
    .beforeOrSameAs('fimPeriodo', { compare: 'day' })
    .optional(),

  fimPeriodo: vine
    .date({
      formats: ['iso8601'],
    })
    .optional(),
})

const dashBoardClientesSchema = vine.object({
  tipo: vine.enum(TipoPessoa).optional(),
  min_vendas: vine.number().min(0).optional(),
  max_vendas: vine.number().min(0).optional(),
  page: vine.number().positive().min(1),
  limit: vine.number().positive().min(1).max(250),
})

export const dashBoardVendasValidator = vine.compile(dashBoardVendasSchema)
export const dashBoardClientesValidator = vine.compile(dashBoardClientesSchema)
