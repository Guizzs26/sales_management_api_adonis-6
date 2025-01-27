import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  // async vendas({ request, response }: HttpContext) {}

  async clientes({ request, response }: HttpContext) {
    const tipo = request.input('tipo', null)
    const minVendas = request.input('min_vendas', 0)
    const maxVendas = request.input('max_vendas', Number.MAX_SAFE_INTEGER)
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    // Contagem de clientes por tipo (PF e PJ)
    const totalClientesPorTipo = await db
      .from('clientes')
      .select('tipo')
      .count('* as totalClientes')
      .if(tipo, (query) => query.where('tipo', tipo))
      .groupBy('tipo')

    // Contagem total de clientes cadastrados
    const totalClientesCadastrados = await db
      .from('clientes')
      .count('*', 'totalClientesCadastrados')
    const totalClientesCadastradosValor = totalClientesCadastrados[0]?.totalClientesCadastrados || 0

    // Vendas por cliente (volume de compras)
    const vendasPorCliente = await db
      .from((subquery) => {
        subquery
          .from('clientes')
          .select('clientes.id', 'clientes.nome_completo', 'clientes.tipo')
          .count('vendas.id as vendas_count')
          .leftJoin('vendas', 'clientes.id', '=', 'vendas.cliente_id')
          .groupBy('clientes.id', 'clientes.nome_completo', 'clientes.tipo')
          .as('vendas_dados')
      })
      .where('vendas_count', '>=', minVendas)
      .andWhere('vendas_count', '<=', maxVendas)
      .if(tipo, (query) => query.where('tipo', tipo))
      .orderBy('vendas_count', 'desc')
      .limit(limit)
      .offset((page - 1) * limit)

    response.send({
      totalClientesPorTipo,
      totalClientesCadastrados: totalClientesCadastradosValor,
      vendasPorCliente,
    })
  }
}
