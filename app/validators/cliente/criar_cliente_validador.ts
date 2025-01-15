import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { TipoPessoa } from '../../../types/cliente/cliente_type.js'
import { regraNumeroTelefone } from './validador_customizado_telefone.js'

const validarPessoa = vine.group([
  // Validação específica para para PF
  vine.group.if((data) => data.tipo === 'PF', {
    nomeCompleto: vine.string().minLength(2).maxLength(127).alpha({
      allowSpaces: true,
      allowUnderscores: false,
      allowDashes: false,
    }),

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
    // Validação específica para PJ
    nomeCompleto: vine.string().minLength(2).maxLength(127).alphaNumeric({
      allowSpaces: true,
      allowUnderscores: true,
      allowDashes: true,
    }),

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
    cpfCnpj: vine.string(), // Não vai ficar assim, apenas para teste

    // Ok
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

    // +- pronto, tem como melhorar, principalmente a validação customizada do telefone.
    telefone: vine
      .string()
      .parse((value: unknown) => {
        return String(value).replace(/[\s()+-]/g, '')
      })
      .nullable()
      .optional()
      .use(regraNumeroTelefone()),

    // Ok
    tipo: vine.enum(TipoPessoa),

    // Enderecos também não vai ficar assim, apenas para teste
    enderecos: vine.array(
      vine.object({
        cep: vine
          .string()
          .regex(/^\d{5}-\d{3}|\d{8}$/) // Aceitar o formato com ou sem hífen
          .parse((value: unknown) => {
            if (typeof value === 'string') {
              // Remover qualquer caractere não numérico (incluindo hífen)
              return value.replace(/\D/g, '')
            }
            return value
          })
          .fixedLength(8),
        logradouro: vine.string().minLength(1).maxLength(127),
        bairro: vine.string(),
        localidade: vine.string(),
        numero: vine.string().minLength(1).maxLength(20),
        complemento: vine.string().minLength(1).maxLength(127).optional(),
        siglaUf: vine.string(),
      })
    ),
  })
  .merge(validarPessoa)

export const criarClienteValidator = vine.compile(criarClienteSchema)
