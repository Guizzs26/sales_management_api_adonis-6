import Venda from '#models/venda/venda'
import { DateTime } from 'luxon'

type ListarVendasPayload = {
  clienteId?: string
  dataInicio?: string
  dataFim?: string
  page?: number
  limit?: number
}

export default class ListarVendasService {
  async execute({ clienteId, dataInicio, dataFim, page = 1, limit = 10 }: ListarVendasPayload) {
    const query = Venda.query().preload('plano').preload('servicos')

    if (clienteId) {
      query.where('clienteId', clienteId)
    }

    // Filtro por período de data
    if (dataInicio && dataFim) {
      const inicio = DateTime.fromISO(dataInicio).isValid
        ? DateTime.fromISO(dataInicio).startOf('day').toISO()
        : null

      const fim = DateTime.fromISO(dataFim).isValid
        ? DateTime.fromISO(dataFim).endOf('day').toISO()
        : null

      if (inicio && fim) {
        query.whereBetween('created_at', [inicio, fim])
      }
    } else if (dataInicio) {
      const inicio = DateTime.fromISO(dataInicio).isValid
        ? DateTime.fromISO(dataInicio).startOf('day').toISO()
        : null
      if (inicio) {
        query.where('created_at', '>=', inicio)
      }
    } else if (dataFim) {
      const fim = DateTime.fromISO(dataFim).isValid
        ? DateTime.fromISO(dataFim).endOf('day').toISO()
        : null
      if (fim) {
        query.where('created_at', '<=', fim)
      }
    }

    // Paginação
    const vendas = await query.paginate(page, limit)

    return vendas
  }
}
