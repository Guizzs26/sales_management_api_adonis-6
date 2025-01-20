import vine from '@vinejs/vine'

const criarPlanoSchema = vine.object({
  nome: vine
    .string()
    .minLength(2)
    .maxLength(127)
    .unique(async (db, value) => {
      const row = await db.from('planos').where('nome', value).first()
      return row === null
    }),

  descricao: vine.string().maxLength(255).optional(),

  precoBase: vine.number().positive(),
})

export const criarPlanoValidador = vine.compile(criarPlanoSchema)
