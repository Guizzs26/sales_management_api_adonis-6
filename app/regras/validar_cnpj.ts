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

  const calcularDigito = (cnpj: string, peso: number[]): number => {
    let soma = 0
    for (const [i, element] of peso.entries()) {
      soma += Number.parseInt(cnpj.charAt(i)) * element
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  // Verificar o primeiro dígito
  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const primeiroDigito = calcularDigito(value, peso1)
  if (primeiroDigito !== Number.parseInt(value.charAt(12))) {
    field.report('O CNPJ {{ field }} é inválido', 'cnpj', field)
    return
  }

  // Verificar o segundo dígito
  const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const segundoDigito = calcularDigito(value, peso2)
  if (segundoDigito !== Number.parseInt(value.charAt(13))) {
    field.report('O CNPJ {{ field }} é inválido', 'cnpj', field)
    return
  }

  return true // CNPJ válido
}

/**
 * Regra personalizada para CNPJ
 */
export const regraCnpj = vine.createRule(validaCnpj)
