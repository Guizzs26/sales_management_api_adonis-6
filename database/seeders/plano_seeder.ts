import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Plano from '#models/plano/plano'

export default class PlanoSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    const uniqueKey = 'nomePlano'

    await Plano.updateOrCreateMany(uniqueKey, [
      { nomePlano: 'Plano Básico', descricao: 'Ideal para iniciantes', precoBase: 95.0 },
      { nomePlano: 'Plano Avançado', descricao: 'Recomendado para empresas', precoBase: 150.0 },
      { nomePlano: 'Plano Premium', descricao: 'Completo com suporte 24h', precoBase: 300.0 },
    ])
  }
}
