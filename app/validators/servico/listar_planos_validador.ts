import vine from '@vinejs/vine'

export const listarServicosSchema = vine.object({
  page: vine.number().positive().min(1),
  limit: vine.number().positive().min(1).max(250),
})

export const listarServicosValidator = vine.compile(listarServicosSchema)
