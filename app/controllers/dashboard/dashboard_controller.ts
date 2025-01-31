import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import {
  dashBoardClientesValidator,
  dashBoardVendasValidator,
} from '#validators/cliente/dashboard_validador'

export default class DashboardController {
  async vendas({ request, response }: HttpContext) {
    const clienteNome = request.input('cliente_nome', null)
    const planoNome = request.input('plano_nome', null)
    const servicoNome = request.input('servico_nome', null)
    const uf = request.input('uf', null)
    const inicioPeriodo = request.input('start_date', null)
    const fimPeriodo = request.input('end_date', null)

    const payload = await request.validateUsing(dashBoardVendasValidator, {
      data: { clienteNome, planoNome, servicoNome, uf, inicioPeriodo, fimPeriodo },
    })

    // Query para obter as vendas filtradas
    const vendasQuery = db
      .from('vendas')
      .select(
        'clientes.nome_completo',
        'clientes.tipo',
        'planos.nomePlano',
        'unidades_federativas.sigla_uf',
        'servicos.nomeServico',
        db.raw('SUM(vendas.valor_total_venda) as total_vendas'),
        db.raw('COUNT(vendas.id) as quantidade_vendas')
      )
      .leftJoin('clientes', 'vendas.cliente_id', '=', 'clientes.id')
      .leftJoin('planos', 'vendas.plano_id', '=', 'planos.id')
      .leftJoin('servico_venda', 'vendas.id', '=', 'servico_venda.venda_id')
      .leftJoin('servicos', 'servico_venda.servico_id', '=', 'servicos.id')
      .leftJoin('enderecos', 'clientes.id', '=', 'enderecos.cliente_id')
      .leftJoin('unidades_federativas', 'enderecos.sigla_uf', '=', 'unidades_federativas.sigla_uf')

    // Aplicar filtros
    if (clienteNome) {
      vendasQuery.where('clientes.nome_completo', 'like', `%${payload.clienteNome}%`)
    }

    if (planoNome) {
      vendasQuery.where('planos.nomePlano', 'like', `%${payload.planoNome}%`)
    }

    if (servicoNome) {
      vendasQuery.where('servicos.nomeServico', 'like', `%${payload.servicoNome}%`)
    }

    if (payload.uf) {
      vendasQuery.where('unidades_federativas.sigla_uf', payload.uf)
    }

    if (payload.inicioPeriodo) {
      vendasQuery.where('vendas.created_at', '>=', payload.inicioPeriodo)
    }

    if (payload.fimPeriodo) {
      vendasQuery.where('vendas.created_at', '<=', payload.fimPeriodo)
    }

    // Agrupar os dados por cliente, plano, UF e serviço
    vendasQuery.groupBy(
      'clientes.nome_completo',
      'clientes.tipo',
      'planos.nomePlano',
      'unidades_federativas.sigla_uf',
      'servicos.nomeServico'
    )

    const vendas = await vendasQuery

    // Retornar a resposta
    response.send({
      vendas,
    })
  }

  async clientes({ request, response }: HttpContext) {
    // Gambiarra pq não sei o que fazer aqui
    const tipo = request.input('tipo', null)

    const payload = await request.validateUsing(dashBoardClientesValidator, {
      data: {
        minVendas: request.input('min_vendas', 0),
        maxVendas: request.input('max_vendas', Number.MAX_SAFE_INTEGER),
        page: request.input('page', 1),
        limit: request.input('limit', 20),
      },
    })

    const minVendas = payload.min_vendas ?? 0
    const maxVendas = payload.max_vendas ?? Number.MAX_SAFE_INTEGER
    const page = payload.page ?? 1
    const limit = payload.limit ?? 20

    // Contagem de clientes por tipo (PF e PJ)
    const totalClientesPorTipo = await db
      .from('clientes')
      .select('tipo')
      .if(tipo, (query) => query.where('tipo', tipo))
      .count('* as totalClientes')
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
          .countDistinct('vendas.id as vendas_count')
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
