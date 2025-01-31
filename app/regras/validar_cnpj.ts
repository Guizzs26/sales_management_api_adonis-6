import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function validaCnpj(value: unknown, _: undefined, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const cnpjInvalido = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
  ]

  if (value.length !== 14 || cnpjInvalido.includes(value)) {
    field.report('O CNPJ {{ field }} é inválido', 'cnpj', field)
    return
  }

  // Cálculo do primeiro dígito verificador
  let soma = 0
  for (let i = 0, peso = 5; i < 12; i++, peso--) {
    if (peso < 2) peso = 9
    soma += Number.parseInt(value.charAt(i)) * peso
  }

  let resto = soma % 11
  const primeiroDigito = resto < 2 ? 0 : 11 - resto

  if (primeiroDigito !== Number.parseInt(value.charAt(12))) {
    field.report('O CNPJ informado é inválido', 'cnpj', field)
    return
  }

  // Cálculo do segundo dígito verificador
  soma = 0
  for (let i = 0, peso = 6; i < 13; i++, peso--) {
    if (peso < 2) peso = 9
    soma += Number.parseInt(value.charAt(i)) * peso
  }
  resto = soma % 11
  const segundoDigito = resto < 2 ? 0 : 11 - resto

  if (segundoDigito !== Number.parseInt(value.charAt(13))) {
    field.report('O CNPJ informado é inválido', 'cnpj', field)
  }
}

export const regraCnpj = vine.createRule(validaCnpj)
