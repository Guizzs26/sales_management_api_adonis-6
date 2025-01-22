import vine from '@vinejs/vine'

// Definir futuramente limites para o percentual de ajuste.

const criarServicoComAjusteSchema = vine.object({
  nomeServico: vine.string().minLength(2).maxLength(127),
  descricao: vine.string().maxLength(255).optional(),
  precoBase: vine.number().positive(),

  ajustesUf: vine.array(
    vine.object({
      siglaUf: vine.string().trim(),
      percentualAjuste: vine.number(),
    })
  ),
})

export const criarServicoComAjustesValidador = vine.compile(criarServicoComAjusteSchema)
