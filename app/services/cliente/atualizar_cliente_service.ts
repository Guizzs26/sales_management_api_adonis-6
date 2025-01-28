import Cliente from '#models/cliente/cliente'
import { AtualizarClientePayload } from '../../types/cliente/cliente_type.js'

export default class AtualizarClienteService {
  async execute(
    id: string,
    { nomeCompleto, email, telefone }: AtualizarClientePayload
  ): Promise<Cliente> {
    const cliente = await Cliente.findOrFail(id)

    if (nomeCompleto) cliente.nomeCompleto = nomeCompleto
    if (email) cliente.email = email
    if (telefone) cliente.telefone = telefone

    await cliente.save()

    return cliente
  }
}
