import vine from '@vinejs/vine'

const atualizarServicoValidador = vine.object({
  nome: vine.string().minLength(2).maxLength(127),
  descricao: vine.string().optional(),
  precoBase: vine.number().positive().decimal(2),
})

export const atualizarServicoValidator = vine.compile(atualizarServicoValidador)
