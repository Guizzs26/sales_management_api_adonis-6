import { AtualizarClientePayload } from '../../types/cliente/cliente_type.js'
import Cliente from '#models/cliente/cliente'

export default class AtualizarClienteService {
  async execute(
    cliente: Cliente,
    { nomeCompleto, email, telefone }: AtualizarClientePayload
  ): Promise<Cliente> {
    await cliente.merge({ nomeCompleto, email, telefone }).save()
    await cliente.refresh()

    return cliente
  }
}
