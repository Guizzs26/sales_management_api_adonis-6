import vine from '@vinejs/vine'

const atualizarVendaSchema = vine.object({
  plano: vine
    .string()
    .exists(async (db, value) => {
      const row = await db.from('planos').where('nomePlano', value).first()
      return !!row
    })
    .optional(),

  servicos: vine
    .array(
      vine.string().exists(async (db, value) => {
        const row = await db.from('servicos').where('nomeServico', value).first()
        return !!row
      })
    )
    .minLength(1)
    .maxLength(8)
    .distinct()
    .optional(),
})

export const atualizarVendaValidator = vine.compile(atualizarVendaSchema)
