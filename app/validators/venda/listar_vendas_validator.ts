import vine from '@vinejs/vine'

export const listarVendasSchema = vine.object({
  clienteId: vine.string().uuid().optional(),

  dataInicio: vine
    .date({
      formats: ['iso8601'],
    })
    .beforeOrSameAs('dataFim', { compare: 'day' })
    .optional(),

  dataFim: vine
    .date({
      formats: ['iso8601'],
    })
    .optional(),

  page: vine.number().positive().min(1),
  limit: vine.number().positive().min(1).max(250),
})

export const listarVendasValidator = vine.compile(listarVendasSchema)
