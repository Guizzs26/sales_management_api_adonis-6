import vine from '@vinejs/vine'

const criarVendaSchema = vine.object({
  plano: vine.string().exists(async (db, value) => {
    const row = await db.from('planos').where('nomePlano', value).first()
    return !!row
  }),

  servicos: vine
    .array(
      vine.string().exists(async (db, value) => {
        const row = await db.from('servicos').where('nomeServico', value).first()
        return !!row
      })
    )
    .minLength(1)
    .maxLength(8)
    .distinct(),

  descontoAplicado: vine.number().optional().nullable(),
})

export const criarVendaValidador = vine.compile(criarVendaSchema)
