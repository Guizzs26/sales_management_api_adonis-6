import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UnidadeFederativa from '#models/endereco/unidade_federativa'

const UNIDADES_FEDERATIVAS = [
  { siglaUf: 'AC', nome: 'Acre' },
  { siglaUf: 'AL', nome: 'Alagoas' },
  { siglaUf: 'AP', nome: 'Amapá' },
  { siglaUf: 'AM', nome: 'Amazonas' },
  { siglaUf: 'BA', nome: 'Bahia' },
  { siglaUf: 'CE', nome: 'Ceará' },
  { siglaUf: 'DF', nome: 'Distrito Federal' },
  { siglaUf: 'ES', nome: 'Espírito Santo' },
  { siglaUf: 'GO', nome: 'Goiás' },
  { siglaUf: 'MA', nome: 'Maranhão' },
  { siglaUf: 'MT', nome: 'Mato Grosso' },
  { siglaUf: 'MS', nome: 'Mato Grosso do Sul' },
  { siglaUf: 'MG', nome: 'Minas Gerais' },
  { siglaUf: 'PA', nome: 'Pará' },
  { siglaUf: 'PB', nome: 'Paraíba' },
  { siglaUf: 'PR', nome: 'Paraná' },
  { siglaUf: 'PE', nome: 'Pernambuco' },
  { siglaUf: 'PI', nome: 'Piauí' },
  { siglaUf: 'RJ', nome: 'Rio de Janeiro' },
  { siglaUf: 'RN', nome: 'Rio Grande do Norte' },
  { siglaUf: 'RS', nome: 'Rio Grande do Sul' },
  { siglaUf: 'RO', nome: 'Rondônia' },
  { siglaUf: 'RR', nome: 'Roraima' },
  { siglaUf: 'SC', nome: 'Santa Catarina' },
  { siglaUf: 'SP', nome: 'São Paulo' },
  { siglaUf: 'SE', nome: 'Sergipe' },
  { siglaUf: 'TO', nome: 'Tocantins' },
]

export default class UnidadeFederativaSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    const uniqueKey = 'siglaUf'

    await UnidadeFederativa.updateOrCreateMany(uniqueKey, UNIDADES_FEDERATIVAS)
  }
}
