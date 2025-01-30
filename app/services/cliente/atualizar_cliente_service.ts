import { AtualizarClientePayload } from '../../types/cliente/cliente_type.js'
import Cliente from '#models/cliente/cliente'

export default class AtualizarClienteService {
  async execute(
    id: string,
    { nomeCompleto, email, telefone }: AtualizarClientePayload
  ): Promise<Cliente> {
    const cliente = await Cliente.findOrFail(id)

    await cliente.merge({ nomeCompleto, email, telefone }).save()

    return cliente
  }
}
