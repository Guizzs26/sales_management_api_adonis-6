import vine from '@vinejs/vine'

const criarPlanoSchema = vine.object({
  nomePlano: vine
    .string()
    .minLength(2)
    .maxLength(127)
    .unique(async (db, value) => {
      const row = await db.from('planos').where('nomePlano', value).first()
      return row === null
    }),

  descricao: vine.string().maxLength(255).optional(),
  precoBase: vine.number().positive().range([80, 1000]),
})

export const criarPlanoValidator = vine.compile(criarPlanoSchema)
