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

  const calcularDigito = (cpf: string, peso: number[]): number => {
    let soma = 0
    for (let i = 0; i < 9; i++) {
      soma += Number.parseInt(cpf.charAt(i)) * peso[i]
    }
    const resto = (soma * 10) % 11
    return resto === 10 || resto === 11 ? 0 : resto
  }

  // Verificar o primeiro dígito
  const peso1 = [10, 9, 8, 7, 6, 5, 4, 3, 2]
  const primeiroDigito = calcularDigito(value, peso1)
  if (primeiroDigito !== Number.parseInt(value.charAt(9))) {
    field.report('O CPF {{ field }} é inválido', 'cpf', field)
    return
  }

  // Verificar o segundo dígito
  const peso2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  const segundoDigito = calcularDigito(value, peso2)
  if (segundoDigito !== Number.parseInt(value.charAt(10))) {
    field.report('O CPF {{ field }} é inválido', 'cpf', field)
    return
  }

  return true // CPF válido
}

/**
 * Regra personalizada para CPF
 */
export const regraCpf = vine.createRule(validaCpf)
