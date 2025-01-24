import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Plano from '#models/plano/plano'
import PrecoPlanosUf from '#models/plano/preco_planos_uf'

export default class PrecoPlanosUfSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    // Busca todos os planos e seus IDs
    const planos = await Plano.query().select('id', 'nome_plano')

    // Mapeia os planos para um objeto, onde a chave é o nome do plano e o valor é o id
    const planoMap = planos.reduce(
      (map, plano) => {
        map[plano.nomePlano] = plano.id
        return map
      },
      {} as Record<string, string>
    )

    const uniqueKey = 'planoId'

    await PrecoPlanosUf.updateOrCreateMany(uniqueKey, [
      // Plano Básico
      { planoId: planoMap['Plano Básico'], siglaUf: 'MS', percentualAjuste: 0.5 },
      { planoId: planoMap['Plano Básico'], siglaUf: 'MT', percentualAjuste: 0.7 },
      { planoId: planoMap['Plano Básico'], siglaUf: 'GO', percentualAjuste: 0.6 },
      { planoId: planoMap['Plano Básico'], siglaUf: 'PR', percentualAjuste: 0.1 },

      // Plano Avançado
      { planoId: planoMap['Plano Avançado'], siglaUf: 'MS', percentualAjuste: 0.8 },
      { planoId: planoMap['Plano Avançado'], siglaUf: 'MT', percentualAjuste: 0.9 },
      { planoId: planoMap['Plano Avançado'], siglaUf: 'GO', percentualAjuste: 0.1 },
      { planoId: planoMap['Plano Avançado'], siglaUf: 'PR', percentualAjuste: 0.12 },

      // Plano Premium
      { planoId: planoMap['Plano Premium'], siglaUf: 'MS', percentualAjuste: 0.15 },
      { planoId: planoMap['Plano Premium'], siglaUf: 'MT', percentualAjuste: 0.13 },
      { planoId: planoMap['Plano Premium'], siglaUf: 'GO', percentualAjuste: 0.14 },
      { planoId: planoMap['Plano Premium'], siglaUf: 'PR', percentualAjuste: 0.17 },
    ])
  }
}
