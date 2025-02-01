import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Venda from '#models/venda/venda'
import Cliente from '#models/cliente/cliente'
import Plano from '#models/plano/plano'
import Servico from '#models/servico/servico'

export default class VendasSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    // Busca todos os clientes, planos e serviços
    const clientes = await Cliente.query().select('id', 'nome_completo', 'tipo')
    const planos = await Plano.query().select('id', 'nomePlano')
    const servicos = await Servico.query().select('id', 'nomeServico')

    // Mapeia para um objeto { nome: id }
    const clienteMap = clientes.reduce(
      (map, cliente) => {
        map[cliente.nomeCompleto] = cliente.id
        return map
      },
      {} as Record<string, string>
    )

    const planoMap = planos.reduce(
      (map, plano) => {
        map[plano.nomePlano] = plano.id
        return map
      },
      {} as Record<string, string>
    )

    const servicoMap = servicos.reduce(
      (map, servico) => {
        map[servico.nomeServico] = servico.id
        return map
      },
      {} as Record<string, string>
    )
    const vendasData = [
      { cliente: 'João Silva', plano: 'Plano Básico', tipo: 'PF' },
      { cliente: 'Maria Oliveira', plano: 'Plano Avançado', tipo: 'PF' },
      { cliente: 'Carlos Pereira', plano: 'Plano Premium', tipo: 'PF' },
      { cliente: 'Ana Costa', plano: 'Plano Básico', tipo: 'PF' },
      { cliente: 'Pedro Souza', plano: 'Plano Avançado', tipo: 'PF' },
      { cliente: 'Empresa XYZ Ltda.', plano: 'Plano Básico', tipo: 'PJ' },
      { cliente: 'Tech Solutions S.A.', plano: 'Plano Avançado', tipo: 'PJ' },
      { cliente: 'Inova TI Ltda.', plano: 'Plano Premium', tipo: 'PJ' },
      { cliente: 'Supermercado ABC', plano: 'Plano Básico', tipo: 'PJ' },
      { cliente: 'Construtora Beta', plano: 'Plano Avançado', tipo: 'PJ' },
    ]

    for (const vendaData of vendasData) {
      const clienteId = clienteMap[vendaData.cliente]
      const planoId = planoMap[vendaData.plano]

      // Cria múltiplas vendas para cada cliente
      const numVendas = vendaData.tipo === 'PF' ? 2 : 3 // PF pode ter 2 vendas, PJ pode ter 3
      for (let i = 0; i < numVendas; i++) {
        const venda = await Venda.create({
          clienteId: clienteId,
          planoId: planoId,
          valorTotalVenda: Math.floor(Math.random() * 400) + 100,
        })

        // Seleciona aleatoriamente de 1 a 3 serviços
        const servicosSelecionados = Object.values(servicoMap)
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1)

        await venda.related('servicos').attach(servicosSelecionados)
      }
    }
  }
}
