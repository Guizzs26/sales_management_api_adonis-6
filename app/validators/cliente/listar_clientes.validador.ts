import vine from '@vinejs/vine'

export const listarClientesSchema = vine.object({
  page: vine.number().positive().min(1),
  limit: vine.number().positive().min(1).max(250),
})

export const listarClientesValidator = vine.compile(listarClientesSchema)
