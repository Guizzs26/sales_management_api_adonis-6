import vine from '@vinejs/vine'

const atualizarPlanoSchema = vine.object({
  nomePlano: vine.string().minLength(2).maxLength(127),
  descricao: vine.string().optional(),
  precoBase: vine.number().positive().decimal(2),
})

export const atualizarPlanoValidator = vine.compile(atualizarPlanoSchema)
