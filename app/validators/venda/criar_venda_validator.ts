import vine from '@vinejs/vine'

const criarVendaSchema = vine.object({
  plano: vine.string().minLength(2).maxLength(127),
  servicos: vine.array(vine.string()),
  descontoAplicado: vine.number().optional().nullable(),
})

export const criarVendaValidador = vine.compile(criarVendaSchema)
