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
      { planoId: planoMap['Plano Básico'], siglaUf: 'SP', percentualAjuste: 10 },
      { planoId: planoMap['Plano Básico'], siglaUf: 'RJ', percentualAjuste: 5 },
      { planoId: planoMap['Plano Padrão'], siglaUf: 'MG', percentualAjuste: 7 },
      { planoId: planoMap['Plano Premium'], siglaUf: 'BA', percentualAjuste: 15 },
    ])
  }
}
