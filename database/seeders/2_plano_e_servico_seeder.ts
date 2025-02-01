import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Plano from '#models/plano/plano'
import Servico from '#models/servico/servico'

export default class PlanosEServicosSeeder extends BaseSeeder {
  public async run() {
    // Seeders para Planos
    const planos = [
      { nomePlano: 'Plano Básico', precoBase: 100 },
      { nomePlano: 'Plano Avançado', precoBase: 200 },
      { nomePlano: 'Plano Premium', precoBase: 300 },
    ]

    await Plano.updateOrCreateMany('nomePlano', planos)

    // Seeders para Serviços
    const servicos = [
      {
        nomeServico: 'Backup Diário',
        precoBase: 50,
      },
      {
        nomeServico: 'Suporte Avançado',
        precoBase: 80,
      },
      {
        nomeServico: 'Monitoramento 24/7',
        precoBase: 100,
      },
      {
        nomeServico: 'Consultoria',
        precoBase: 120,
      },
      {
        nomeServico: 'Integrações',
        precoBase: 150,
      },
      {
        nomeServico: 'Segurança Avançada',
        precoBase: 180,
      },
      { nomeServico: 'Treinamento', precoBase: 200 },
      {
        nomeServico: 'Upgrade de Recursos',
        precoBase: 220,
      },
    ]

    await Servico.updateOrCreateMany('nomeServico', servicos)
  }
}
