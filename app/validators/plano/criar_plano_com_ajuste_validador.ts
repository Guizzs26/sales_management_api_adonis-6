import vine from '@vinejs/vine'

// Definir futuramente limites para o percentual de ajuste.
const criarPlanoComAjustesSchema = vine.object({
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

  ajustesUf: vine.array(
    vine.object({
      siglaUf: vine.string().fixedLength(2).trim(),
      percentualAjuste: vine.number().range([0, 1]),
    })
  ),
})

export const criarPlanoComAjustesValidator = vine.compile(criarPlanoComAjustesSchema)
