import vine from '@vinejs/vine'

const validarNomeCompletoPorTipo = vine.group([
  // Validação específica para para PF
  vine.group.if((data) => data.tipo === 'PF', {
    nomeCompleto: vine
      .string()
      .minLength(2)
      .maxLength(127)
      .regex(/^[A-Za-zÀ-ÿ\s]+$/)
      .optional(),
  }),

  vine.group.if((data) => data.tipo === 'PJ', {
    // Validação específica para PJ
    nomeCompleto: vine
      .string()
      .minLength(2)
      .maxLength(127)
      .regex(/^[A-Za-zÀ-ÿ0-9\s\-_]+$/)
      .optional(),
  }),
])

const atualizarClienteSchema = vine
  .object({
    email: vine
      .string()
      .email({ allow_underscores: true })
      .normalizeEmail({
        all_lowercase: true,
        gmail_remove_dots: true,
      })
      .unique(async (db, value) => {
        const row = await db.from('clientes').where('email', value).first()
        return row === null
      })
      .optional(),

    telefone: vine
      .string()
      .mobile(() => {
        return {
          locale: ['pt-BR'],
          strictMode: true,
        }
      })
      .optional(),
  })
  .merge(validarNomeCompletoPorTipo)

export const atualizarClienteValidator = vine.compile(atualizarClienteSchema)
