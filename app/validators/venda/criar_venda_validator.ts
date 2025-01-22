import vine from '@vinejs/vine'

const criarVendaSchema = vine.object({
  nomePlano: vine.string().minLength(2).maxLength(127),
  nomeServico: vine.string().minLength(2).maxLength(127),
  descricao: vine.string().maxLength(255).optional(),
  precoBase: vine.number().positive(),
})

export const criarVendaValidador = vine.compile(criarVendaSchema)
