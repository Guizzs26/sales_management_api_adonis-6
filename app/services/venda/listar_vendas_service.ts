import { DateTime } from 'luxon'
import Venda from '#models/venda/venda'

type ListarVendasPayload = {
  clienteId?: string
  dataInicio?: Date
  dataFim?: Date
  page?: number
  limit?: number
}

export default class ListarVendasService {
  async execute({ clienteId, dataInicio, dataFim, page = 1, limit = 10 }: ListarVendasPayload) {
    const query = Venda.query().preload('plano').preload('servicos')

    // Filtro por cliente
    if (clienteId) {
      query.where('clienteId', clienteId)
    }

    // Filtro por data
    if (dataInicio && dataFim) {
      const inicio = DateTime.fromJSDate(dataInicio).startOf('day').toISO() ?? undefined
      const fim = DateTime.fromJSDate(dataFim).endOf('day').toISO() ?? undefined
      if (inicio && fim) {
        query.whereBetween('created_at', [inicio, fim])
      }
    } else if (dataInicio) {
      const inicio = DateTime.fromJSDate(dataInicio).startOf('day').toISO() ?? undefined
      if (inicio) {
        query.where('created_at', '>=', inicio)
      }
    } else if (dataFim) {
      const fim = DateTime.fromJSDate(dataFim).endOf('day').toISO() ?? undefined
      if (fim) {
        query.where('created_at', '<=', fim)
      }
    }

    // Paginação
    const vendas = await query.paginate(page, limit)

    return vendas
  }
}
