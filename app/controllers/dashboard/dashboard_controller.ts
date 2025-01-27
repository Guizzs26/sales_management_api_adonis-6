import type { HttpContext } from '@adonisjs/core/http'
import Cliente from '#models/cliente/cliente'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async clientes({ request, response }: HttpContext) {
    const minVendas = request.input('min_vendas', 0)
    const maxVendas = request.input('max_vendas', Number.MAX_SAFE_INTEGER)

    // Contagem de clientes por tipo (PF e PJ)
    const totalClientesPorTipo = await Cliente.query()
      .select('tipo')
      .count('* as totalClientes')
      .groupBy('tipo')

    // Contagem total de clientes cadastrados
    const totalClientesCadastrados = await db
      .from('clientes')
      .count('*', 'totalClientesCadastrados')
    const totalClientesCadastradosValor = totalClientesCadastrados[0]?.totalClientesCadastrados || 0

    // Vendas por cliente (volume de compras)
    const vendasPorCliente = await Cliente.query()
      .select('id', 'nomeCompleto', 'tipo')
      .withCount('vendas', (query) => {
        query.as('quantidadeVendas')
      })
      .havingBetween('quantidadeVendas', [minVendas, maxVendas])
      .orderBy('quantidadeVendas', 'desc')

    response.send({
      totalClientesPorTipo,
      totalClientesCadastrados: totalClientesCadastradosValor,
      vendasPorCliente,
    })
  }
}
