import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PrecoPlanosUf from '#models/plano/preco_planos_uf'

const PRECOS_PLANOS_UF = [
  // Plano Básico
  { planoId: 'fbcc33c1-1072-410d-94f2-09c55d373a90', siglaUf: 'MS', percentualAjuste: 5 }, // 5% de ajuste para MS
  { planoId: 'fbcc33c1-1072-410d-94f2-09c55d373a90', siglaUf: 'MT', percentualAjuste: 3 }, // 3% de ajuste para MT
  { planoId: 'fbcc33c1-1072-410d-94f2-09c55d373a90', siglaUf: 'GO', percentualAjuste: 4 }, // 4% de ajuste para GO
  { planoId: 'fbcc33c1-1072-410d-94f2-09c55d373a90', siglaUf: 'PR', percentualAjuste: 6 }, // 6% de ajuste para PR

  // Plano Avançado
  { planoId: '05dd7b6b-c795-457a-ac54-294b3cdeecdb', siglaUf: 'MS', percentualAjuste: 7 }, // 7% de ajuste para MS
  { planoId: '05dd7b6b-c795-457a-ac54-294b3cdeecdb', siglaUf: 'MT', percentualAjuste: 5 }, // 5% de ajuste para MT
  { planoId: '05dd7b6b-c795-457a-ac54-294b3cdeecdb', siglaUf: 'GO', percentualAjuste: 6 }, // 6% de ajuste para GO
  { planoId: '05dd7b6b-c795-457a-ac54-294b3cdeecdb', siglaUf: 'PR', percentualAjuste: 8 }, // 8% de ajuste para PR

  // Plano Premium
  { planoId: 'edd2cdbe-f601-4e61-ba99-06e36291f501', siglaUf: 'MS', percentualAjuste: 10 }, // 10% de ajuste para MS
  { planoId: 'edd2cdbe-f601-4e61-ba99-06e36291f501', siglaUf: 'MT', percentualAjuste: 9 }, // 9% de ajuste para MT
  { planoId: 'edd2cdbe-f601-4e61-ba99-06e36291f501', siglaUf: 'GO', percentualAjuste: 10 }, // 10% de ajuste para GO
  { planoId: 'edd2cdbe-f601-4e61-ba99-06e36291f501', siglaUf: 'PR', percentualAjuste: 12 }, // 12% de ajuste para PR
]

export default class PrecoPlanosUfSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'planoId'

    await PrecoPlanosUf.updateOrCreateMany(uniqueKey, PRECOS_PLANOS_UF)
  }
}
