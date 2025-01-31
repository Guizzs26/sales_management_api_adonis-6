import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function validaCpf(value: unknown, _: undefined, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const cpfInvalido = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ]

  if (value.length !== 11 || cpfInvalido.includes(value)) {
    field.report('O CPF {{ field }} é inválido', 'cpf', field)
    return
  }

  // Cálculo do primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += Number.parseInt(value.charAt(i)) * (10 - i)
  }

  let resto = (soma * 10) % 11
  if (resto === 10) resto = 0

  if (resto !== Number.parseInt(value.charAt(9))) {
    field.report('O CPF informado é inválido', 'cpf', field)
    return
  }

  // Cálculo do segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += Number.parseInt(value.charAt(i)) * (11 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10) resto = 0

  if (resto !== Number.parseInt(value.charAt(10))) {
    field.report('O CPF informado é inválido', 'cpf', field)
  }
}

export const regraCpf = vine.createRule(validaCpf)
