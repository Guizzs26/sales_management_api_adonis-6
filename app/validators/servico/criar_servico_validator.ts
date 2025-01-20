import vine from '@vinejs/vine'

const criarServicoSchema = vine.object({
  nome: vine.string().minLength(2).maxLength(127),
  descricao: vine.string().maxLength(255).optional(),
  precoBase: vine.number().positive().decimal(2),
})

export const criarServicoValidador = vine.compile(criarServicoSchema)
