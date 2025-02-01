import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Servico from '#models/servico/servico'
import PrecoServicosUf from '#models/servico/preco_servicos_uf'

export default class PrecoServicosUfSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    const servicos = await Servico.query().select('id', 'nomeServico')

    const servicoMap = servicos.reduce(
      (map, servico) => {
        map[servico.nomeServico] = servico.id
        return map
      },
      {} as Record<string, string>
    )

    const uniqueKey = 'servicoId'

    // Insere ou atualiza os registros de PrecoServicosUf com os ajustes para cada serviço
    await PrecoServicosUf.updateOrCreateMany(uniqueKey, [
      // Backup Diário
      { servicoId: servicoMap['Backup Diário'], siglaUf: 'MS', percentualAjuste: 0.5 },
      { servicoId: servicoMap['Backup Diário'], siglaUf: 'MT', percentualAjuste: 0.7 },
      { servicoId: servicoMap['Backup Diário'], siglaUf: 'GO', percentualAjuste: 0.6 },
      { servicoId: servicoMap['Backup Diário'], siglaUf: 'PR', percentualAjuste: 0.8 },

      // Suporte Avançado
      { servicoId: servicoMap['Suporte Avançado'], siglaUf: 'MS', percentualAjuste: 0.6 },
      { servicoId: servicoMap['Suporte Avançado'], siglaUf: 'MT', percentualAjuste: 0.5 },
      { servicoId: servicoMap['Suporte Avançado'], siglaUf: 'GO', percentualAjuste: 0.8 },
      { servicoId: servicoMap['Suporte Avançado'], siglaUf: 'PR', percentualAjuste: 0.1 },

      // Monitoramento 24/7
      { servicoId: servicoMap['Monitoramento 24/7'], siglaUf: 'MS', percentualAjuste: 0.4 },
      { servicoId: servicoMap['Monitoramento 24/7'], siglaUf: 'MT', percentualAjuste: 0.5 },
      { servicoId: servicoMap['Monitoramento 24/7'], siglaUf: 'GO', percentualAjuste: 0.6 },
      { servicoId: servicoMap['Monitoramento 24/7'], siglaUf: 'PR', percentualAjuste: 0.7 },

      // Consultoria
      { servicoId: servicoMap['Consultoria'], siglaUf: 'MS', percentualAjuste: 0.8 },
      { servicoId: servicoMap['Consultoria'], siglaUf: 'MT', percentualAjuste: 0.1 },
      { servicoId: servicoMap['Consultoria'], siglaUf: 'GO', percentualAjuste: 0.9 },
      { servicoId: servicoMap['Consultoria'], siglaUf: 'PR', percentualAjuste: 0.12 },

      // Integrações
      { servicoId: servicoMap['Integrações'], siglaUf: 'MS', percentualAjuste: 0.3 },
      { servicoId: servicoMap['Integrações'], siglaUf: 'MT', percentualAjuste: 0.4 },
      { servicoId: servicoMap['Integrações'], siglaUf: 'GO', percentualAjuste: 0.5 },
      { servicoId: servicoMap['Integrações'], siglaUf: 'PR', percentualAjuste: 0.6 },

      // Segurança Avançada
      { servicoId: servicoMap['Segurança Avançada'], siglaUf: 'MS', percentualAjuste: 0.7 },
      { servicoId: servicoMap['Segurança Avançada'], siglaUf: 'MT', percentualAjuste: 0.6 },
      { servicoId: servicoMap['Segurança Avançada'], siglaUf: 'GO', percentualAjuste: 0.4 },
      { servicoId: servicoMap['Segurança Avançada'], siglaUf: 'PR', percentualAjuste: 0.9 },

      // Treinamento
      { servicoId: servicoMap['Treinamento'], siglaUf: 'MS', percentualAjuste: 0.5 },
      { servicoId: servicoMap['Treinamento'], siglaUf: 'MT', percentualAjuste: 0.7 },
      { servicoId: servicoMap['Treinamento'], siglaUf: 'GO', percentualAjuste: 0.3 },
      { servicoId: servicoMap['Treinamento'], siglaUf: 'PR', percentualAjuste: 0.6 },

      // Upgrade de Recursos
      { servicoId: servicoMap['Upgrade de Recursos'], siglaUf: 'MS', percentualAjuste: 0.9 },
      { servicoId: servicoMap['Upgrade de Recursos'], siglaUf: 'MT', percentualAjuste: 0.8 },
      { servicoId: servicoMap['Upgrade de Recursos'], siglaUf: 'GO', percentualAjuste: 0.7 },
      { servicoId: servicoMap['Upgrade de Recursos'], siglaUf: 'PR', percentualAjuste: 0.5 },
    ])
  }
}
