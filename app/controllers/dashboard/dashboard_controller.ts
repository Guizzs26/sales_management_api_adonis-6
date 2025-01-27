import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async vendas({ request, response }: HttpContext) {
    const clienteNome = request.input('cliente_nome', null)
    const planoNome = request.input('plano_nome', null)
    const servicoNome = request.input('servico_nome', null)
    const uf = request.input('uf', null)
    const inicioPeriodo = request.input('start_date', null)
    const fimPeriodo = request.input('end_date', null)
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    if (planoNome && planoNome.length < 4) {
      return response.status(400).send({
        message: 'O nome do plano deve ser mais específico (mínimo 4 caracteres).',
      })
    }

    // Filtro de vendas
    const vendas = await db
      .from('vendas')
      .select(
        'vendas.id',
        'clientes.nome_completo',
        'clientes.tipo',
        'planos.nomePlano',
        'vendas.valor_total_venda',
        'vendas.created_at'
      )
      .leftJoin('clientes', 'vendas.cliente_id', '=', 'clientes.id')
      .leftJoin('planos', 'vendas.plano_id', '=', 'planos.id')
      .leftJoin('servico_venda', 'vendas.id', '=', 'servico_venda.venda_id')
      .leftJoin('servicos', 'servico_venda.servico_id', '=', 'servicos.id')
      .leftJoin('enderecos', 'clientes.id', '=', 'enderecos.cliente_id')
      .leftJoin('unidades_federativas', 'enderecos.sigla_uf', '=', 'unidades_federativas.sigla_uf')

      // Filtros
      .if(clienteNome, (query) => query.where('clientes.nome_completo', 'like', `%${clienteNome}%`))
      .if(planoNome, (query) => query.where('planos.nomePlano', '=', `%${planoNome}%`))
      .if(servicoNome, (query) => query.where('servicos.nomeServico', 'like', `%${servicoNome}%`))
      .if(uf, (query) => query.where('unidades_federativas.sigla_uf', uf))

      // Filtro de período (data de venda)
      .if(inicioPeriodo, (query) => query.where('vendas.created_at', '>=', inicioPeriodo))
      .if(fimPeriodo, (query) => query.where('vendas.created_at', '<=', fimPeriodo))

      .orderBy('vendas.created_at', 'desc')
      .limit(limit)
      .offset((page - 1) * limit)

    // Contagem de vendas
    const totalVendas = await db
      .from('vendas')
      .count('* as totalVendas')
      .leftJoin('clientes', 'vendas.cliente_id', '=', 'clientes.id')
      .leftJoin('planos', 'vendas.plano_id', '=', 'planos.id')
      .leftJoin('servico_venda', 'vendas.id', '=', 'servico_venda.venda_id')
      .leftJoin('servicos', 'servico_venda.servico_id', '=', 'servicos.id')
      .leftJoin('enderecos', 'clientes.id', '=', 'enderecos.cliente_id')
      .leftJoin('unidades_federativas', 'enderecos.sigla_uf', '=', 'unidades_federativas.sigla_uf')

      // Filtros
      .if(clienteNome, (query) => query.where('clientes.nome_completo', 'like', `%${clienteNome}%`))
      .if(planoNome, (query) => query.where('planos.nomePlano', '=', planoNome))
      .if(servicoNome, (query) => query.where('servicos.nomeServico', 'like', `%${servicoNome}%`))
      .if(uf, (query) => query.where('unidades_federativas.sigla_uf', uf))

      // Filtro de período (data de venda)
      .if(inicioPeriodo, (query) => query.where('vendas.created_at', '>=', inicioPeriodo))
      .if(fimPeriodo, (query) => query.where('vendas.created_at', '<=', fimPeriodo))

    const totalVendasValor = totalVendas[0]?.totalVendas || 0

    response.send({
      vendas,
      totalVendas: totalVendasValor,
    })
  }

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
