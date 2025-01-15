import vine from '@vinejs/vine'
import { TipoPessoa } from '../../../types/cliente/cliente_type.js'
import { DateTime } from 'luxon'

export const criarClienteSchema = vine
  .object({
    telefone: vine.string(), // Não vai ficar assim, apenas para teste
    cpfCnpj: vine.string(), // Não vai ficar assim, apenas para teste

    // Não vai ficar assim também, vou fazer uma especie de validacao condicional com base se for PJ ou PF
    nomeCompleto: vine
      .string()
      .alpha({
        allowSpaces: true,
        allowUnderscores: false,
        allowDashes: false,
      })
      .minLength(2)
      .maxLength(127),

    email: vine
      .string()
      .email()
      .normalizeEmail({
        all_lowercase: true,
        gmail_remove_dots: true,
      })
      .unique(async (db, value) => {
        const row = await db.from('clientes').where('email', value).first()
        return row === null
      }),

    dataNascimentoFundacao: vine
      .date({
        formats: ['DD/MM/YYYY'],
      })
      .beforeOrEqual('today')
      .transform((value) => {
        return DateTime.fromJSDate(value)
      }),

    tipo: vine.enum(TipoPessoa),

    // Enderecos tambem não vai ficar assim, apenas para teste
    enderecos: vine.array(
      vine.object({
        cep: vine.string(),
        logradouro: vine.string(),
        bairro: vine.string(),
        localidade: vine.string(),
        ufId: vine.string(),
        numero: vine.string(),
        complemento: vine.string().nullable(),
      })
    ),
  })
  .toCamelCase()

export const criarClienteValidator = vine.compile(criarClienteSchema)
