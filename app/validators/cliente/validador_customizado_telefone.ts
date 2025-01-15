import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

// Constantes para comprimentos válidos de telefone para evitar magic numbers
const LANDLINE_LENGTH = 12 // landline -> telefone fixo
const MOBILE_LENGTH = 13 // mobile -> telefone celular

// Lista de DDDs válidos
const VALID_DDD_CODES = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43,
  44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77,
  79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]

// Códigos iniciais válidos para números fixos (vai de 2 até 5)
const LANDLINE_INITIAL_CODES = ['2', '3', '4', '5']

// Função para verificar números com padrões repetidos (ex: 555555555555)
const hasShadyPatterns = (phone: string): boolean => {
  const phoneWithoutCountryAndDDD = phone.substring(4)

  for (let i = 0; i < 10; i++) {
    // Um for de 0 a 9.
    // Estou utilizando o metodo Array(q+1).join(i) onde "q" é a quantidade e i é o
    // caractere a ser repetido
    if (
      phoneWithoutCountryAndDDD === new Array(9).join(i.toString()) ||
      phoneWithoutCountryAndDDD === new Array(10).join(i.toString())
    ) {
      return true // Inválido pois é repetido -> Exemplo 5567999999999
    }
  }

  return false // Número válido
}

async function validarNumeroTelefone(value: unknown, _: undefined, field: FieldContext) {
  if (value === null || value === undefined) {
    return
  }

  // O vine não valida o dado da propriedade value, precisa ser validado manualmente
  if (typeof value !== 'string') {
    field.report('O telefone deve ser uma string válida.', 'phone.invalid', field)
    return
  }

  // O parse na validação do vine já remove espaços, hífens, parênteses e o '+'
  // Agora o telefone estará no formato "55dd9xxxxxxx" ou "55ddxxxxxxx"
  // Portanto, ele terá 12 ou 13 dígitos.
  let phone = value

  // Verifica o tamanho do telefone, pode ter 12 ou 13 números (fixo ou celular)
  // Considerando o código do brasil, ddd e número (sem parênteses, hífen ou espaços)
  if (phone.length !== LANDLINE_LENGTH && phone.length !== MOBILE_LENGTH) {
    field.report(
      `O número de telefone deve ter ${LANDLINE_LENGTH} ou ${MOBILE_LENGTH} dígitos.`,
      'invalid_length',
      field
    )
    return
  }

  // Verifica se o número começa com o código do país "55"
  if (!phone.startsWith('55')) {
    field.report('O código do país deve ser 55.', 'invalid_country_code', field)
    return
  }

  // Verifica se o DDD é válido
  const ddd = Number.parseInt(phone.substring(2, 4))

  if (Number.isNaN(ddd) || !VALID_DDD_CODES.includes(ddd)) {
    field.report('O telefone deve ter um DDD válido.', 'invalid_ddd', field)
    return
  }

  // Verifica se o número contém padrões de repetição (todos os números iguais)
  if (hasShadyPatterns(phone)) {
    field.report(
      'O número de telefone contém padrões incomuns ou repetidos.',
      'invalid_repeated_digits',
      field
    )
    return
  }

  // Se o telefone tem 13 caracteres (celular)
  if (phone.length === MOBILE_LENGTH) {
    // Celulares devem começar com 9 após o DDD (no índice 2 após o código do país "55")
    if (phone.charAt(4) !== '9') {
      field.report('Telefone celular deve começar com 9.', 'invalid_mobile', field)
      return
    }

    // Não pode ter "90" após o "9" (não existe número de celular começando com 90)
    if (phone.charAt(5) === '0') {
      field.report('Telefone celular não pode começar com 90.', 'invalid_mobile', field)
      return
    }
  }

  // Verifica se tem 12 caracteres (fixo) - não pode começar com 9
  if (phone.length === LANDLINE_LENGTH) {
    // Telefones fixos não podem começar com 9
    if (phone.charAt(4) === '9') {
      field.report('Telefone fixo não pode começar com 9.', 'invalid_landline', field)
      return
    }

    // Verifica se o número fixo começa com um dos prefixos válidos
    const prefix = phone.charAt(4)
    if (LANDLINE_INITIAL_CODES.indexOf(prefix) === -1) {
      field.report('Telefone fixo deve começar com 2, 3, 4 ou 5.', 'invalid_landline_prefix', field)
      return
    }
  }

  return phone
}

export const regraNumeroTelefone = vine.createRule(validarNumeroTelefone)
