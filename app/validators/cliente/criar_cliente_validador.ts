import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { TipoPessoa } from '#types/cliente/cliente_type'
import { regraCpf } from '#regras/validar_cpf'
import { regraCnpj } from '#regras/validar_cnpj'
import { regraNumeroTelefone } from '#regras/validar_telefone'

const validarPessoa = vine.group([
  // Validação específica para para PF
  vine.group.if((data) => data.tipo === 'PF', {
    cpfCnpj: vine
      .string()
      .parse((value: unknown) => {
        if (typeof value === 'string') {
          return value.replace(/\D/g, '')
        }
        return value
      })
      .fixedLength(11)
      .use(regraCpf()),

    nomeCompleto: vine
      .string()
      .minLength(2)
      .maxLength(127)
      .regex(/^[A-Za-zÀ-ÿ\s]+$/),

    dataNascimentoFundacao: vine
      .date({
        formats: ['DD/MM/YYYY'],
      })
      .beforeOrEqual('today')
      .afterOrEqual('1900-01-01') // Não pode ser mais de 120 anos atrás
      .transform((value) => {
        const date = new Date(value)
        return DateTime.fromJSDate(date)
      }),
  }),

  vine.group.if((data) => data.tipo === 'PJ', {
    cpfCnpj: vine
      .string()
      .parse((value: unknown) => {
        if (typeof value === 'string') {
          return value.replace(/\D/g, '')
        }
        return value
      })
      .fixedLength(14)
      .use(regraCnpj()),

    // Validação específica para PJ
    nomeCompleto: vine
      .string()
      .minLength(2)
      .maxLength(127)
      .regex(/^[A-Za-zÀ-ÿ0-9\s\-_]+$/),

    dataNascimentoFundacao: vine
      .date({
        formats: ['DD/MM/YYYY'],
      })
      .beforeOrEqual('today')
      .transform((value) => {
        const date = new Date(value)
        return DateTime.fromJSDate(date)
      }),
  }),
])

export const criarClienteSchema = vine
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
      }),

    tipo: vine.enum(TipoPessoa),

    // +- pronto, tem como melhorar, principalmente a validação customizada do telefone fixo.
    telefone: vine
      .string()
      .parse((value: unknown) => {
        return String(value).replace(/[\s()+-]/g, '')
      })
      .nullable()
      .optional()
      .use(regraNumeroTelefone()),

    enderecos: vine.array(
      vine.object({
        cep: vine
          .string()
          .regex(/^\d{5}-\d{3}|\d{8}$/)
          .parse((value: unknown) => {
            if (typeof value === 'string') {
              // Remover qualquer caractere não numérico (incluindo hífen)
              return value.replace(/\D/g, '')
            }
            return value
          })
          .fixedLength(8),

        numero: vine.string().minLength(1).maxLength(20).trim(),
        complemento: vine.string().minLength(1).maxLength(127).nullable().optional(),
        siglaUf: vine.string().trim(),
      })
    ),
  })
  .merge(validarPessoa)

export const criarClienteValidator = vine.compile(criarClienteSchema)
