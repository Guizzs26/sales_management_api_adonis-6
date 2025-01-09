import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UnidadeFederativa from '#models/endereco/unidade_federativa'

const UNIDADES_FEDERATIVAS = [
  { sigla_uf: 'AC', nome: 'Acre' },
  { sigla_uf: 'AL', nome: 'Alagoas' },
  { sigla_uf: 'AP', nome: 'Amapá' },
  { sigla_uf: 'AM', nome: 'Amazonas' },
  { sigla_uf: 'BA', nome: 'Bahia' },
  { sigla_uf: 'CE', nome: 'Ceará' },
  { sigla_uf: 'DF', nome: 'Distrito Federal' },
  { sigla_uf: 'ES', nome: 'Espírito Santo' },
  { sigla_uf: 'GO', nome: 'Goiás' },
  { sigla_uf: 'MA', nome: 'Maranhão' },
  { sigla_uf: 'MT', nome: 'Mato Grosso' },
  { sigla_uf: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla_uf: 'MG', nome: 'Minas Gerais' },
  { sigla_uf: 'PA', nome: 'Pará' },
  { sigla_uf: 'PB', nome: 'Paraíba' },
  { sigla_uf: 'PR', nome: 'Paraná' },
  { sigla_uf: 'PE', nome: 'Pernambuco' },
  { sigla_uf: 'PI', nome: 'Piauí' },
  { sigla_uf: 'RJ', nome: 'Rio de Janeiro' },
  { sigla_uf: 'RN', nome: 'Rio Grande do Norte' },
  { sigla_uf: 'RS', nome: 'Rio Grande do Sul' },
  { sigla_uf: 'RO', nome: 'Rondônia' },
  { sigla_uf: 'RR', nome: 'Roraima' },
  { sigla_uf: 'SC', nome: 'Santa Catarina' },
  { sigla_uf: 'SP', nome: 'São Paulo' },
  { sigla_uf: 'SE', nome: 'Sergipe' },
  { sigla_uf: 'TO', nome: 'Tocantins' },
]

export default class UnidadeFederativaSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'sigla_uf'

    await UnidadeFederativa.updateOrCreateMany(uniqueKey, UNIDADES_FEDERATIVAS)
  }
}
