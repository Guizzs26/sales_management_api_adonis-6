import vine from '@vinejs/vine'
import { TipoPessoa } from '#types/cliente/cliente_type'
import { regraNumeroTelefone } from '#validators/regras/validador_customizado_telefone'
import { nomeCompletoRule } from '#validators/regras/validator_customizado_nome_completo'

export const atualizarClienteValidator = vine.withMetaData<{ tipo: TipoPessoa }>().compile(
  vine.object({
    nomeCompleto: vine.string().use(nomeCompletoRule()).optional(),

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
      .parse((value) => String(value).replace(/\D/g, ''))
      .optional()
      .use(regraNumeroTelefone()),
  })
)
