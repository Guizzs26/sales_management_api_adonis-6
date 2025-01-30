import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function nomeCompletoValidator(value: unknown, _: undefined, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  // Verifica o tamanho do nome
  if (value.length < 2 || value.length > 127) {
    field.report('O campo {{ field }} deve ter entre 2 e 127 caracteres.', 'nomeCompleto', field, {
      min: 2,
      max: 127,
    })
    return
  }

  // Validação de acordo com o tipo de cliente (PF ou PJ)
  if (field.meta.tipo === 'PF' && !/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
    field.report(
      'O campo {{ field }} deve conter apenas letras e espaços para pessoa física.',
      'nomeCompleto',
      field,
      { tipo: 'PF' }
    )
  } else if (field.meta.tipo === 'PJ' && !/^[A-Za-zÀ-ÿ0-9\s\-_]+$/.test(value)) {
    field.report(
      'O campo {{ field }} deve conter apenas letras, números, espaços, hífen ou underline para pessoa jurídica.',
      'nomeCompleto',
      field,
      { tipo: 'PJ' }
    )
  }
}

export const nomeCompletoRule = vine.createRule(nomeCompletoValidator)
