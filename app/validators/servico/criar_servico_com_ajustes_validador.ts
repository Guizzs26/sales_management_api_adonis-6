import vine from '@vinejs/vine'

const criarServicoComAjusteSchema = vine.object({
  nomeServico: vine
    .string()
    .minLength(2)
    .maxLength(127)
    .unique(async (db, value) => {
      const row = await db.from('servicos').where('nomeServicos', value).first()
      return row === null
    }),

  descricao: vine.string().maxLength(255).optional(),
  precoBase: vine.number().positive().range([80, 1000]),

  ajustesUf: vine.array(
    vine.object({
      siglaUf: vine.string().fixedLength(2).trim(),
      percentualAjuste: vine.number().range([0, 1]),
    })
  ),
})

export const criarServicoComAjustesValidator = vine.compile(criarServicoComAjusteSchema)
