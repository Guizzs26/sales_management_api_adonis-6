import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Servico from '#models/servico/servico'
import PrecoServicosUf from '#models/servico/preco_servicos_uf'

export default class PrecoServicosUfSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    // Busca todos os serviços e seus IDs
    const servicos = await Servico.query().select('id', 'nome_servico')

    // Mapeia os serviços para um objeto, onde a chave é o nome do serviço e o valor é o id
    const servicoMap = servicos.reduce(
      (map, servico) => {
        map[servico.nomeServico] = servico.id
        return map
      },
      {} as Record<string, string>
    )

    const uniqueKey = 'servicoId'

    await PrecoServicosUf.updateOrCreateMany(uniqueKey, [
      { servicoId: servicoMap['Backup Diário'], siglaUf: 'SP', percentualAjuste: 12 },
      { servicoId: servicoMap['Suporte Avançado'], siglaUf: 'RJ', percentualAjuste: 8 },
      { servicoId: servicoMap['Monitoramento 24/7'], siglaUf: 'MG', percentualAjuste: 5 },
      { servicoId: servicoMap['Consultoria'], siglaUf: 'BA', percentualAjuste: 10 },
    ])
  }
}
