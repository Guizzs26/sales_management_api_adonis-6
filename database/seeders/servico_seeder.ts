import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Servico from '#models/servico/servico'

export default class ServicoSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    const uniqueKey = 'nomeServico'

    await Servico.updateOrCreateMany(uniqueKey, [
      {
        nomeServico: 'Backup Diário',
        descricao: 'Backup automático diário',
        precoBase: 40.0,
      },
      {
        nomeServico: 'Suporte Avançado',
        descricao: 'Suporte técnico especializado',
        precoBase: 50.0,
      },
      {
        nomeServico: 'Monitoramento 24/7',
        descricao: 'Monitoramento contínuo',
        precoBase: 60.0,
      },
      {
        nomeServico: 'Consultoria',
        descricao: 'Consultoria especializada',
        precoBase: 80.0,
      },
      {
        nomeServico: 'Integrações',
        descricao: 'Integrações personalizadas',
        precoBase: 90.0,
      },
      {
        nomeServico: 'Segurança Avançada',
        descricao: 'Proteção adicional para seus dados',
        precoBase: 100.0,
      },
      {
        nomeServico: 'Treinamento',
        descricao: 'Treinamento para sua equipe',
        precoBase: 120.0,
      },
      {
        nomeServico: 'Upgrade de Recursos',
        descricao: 'Aumente a capacidade dos serviços',
        precoBase: 150.0,
      },
    ])
  }
}
