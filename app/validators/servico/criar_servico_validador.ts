import vine from '@vinejs/vine'

const criarServicoSchema = vine.object({
  nomeServico: vine
    .string()
    .minLength(2)
    .maxLength(127)
    .unique(async (db, value) => {
      const row = await db.from('servicos').where('nomeServico', value).first()
      return row === null
    }),

  descricao: vine.string().maxLength(255).optional(),
  precoBase: vine.number().positive().range([80, 1000]),
})

export const criarServicoValidator = vine.compile(criarServicoSchema)
