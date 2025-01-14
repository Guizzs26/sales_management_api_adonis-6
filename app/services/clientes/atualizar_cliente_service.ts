import Cliente from '#models/cliente/cliente'

type AtualizarClienteData = {
  nomeCompleto?: string
  email?: string
  telefone?: string
}

export class AtualizarClienteService {
  async execute(
    id: string,
    { nomeCompleto, email, telefone }: AtualizarClienteData
  ): Promise<Cliente> {
    const cliente = await Cliente.findOrFail(id)

    if (nomeCompleto) cliente.nomeCompleto = nomeCompleto
    if (email) cliente.email = email
    if (telefone) cliente.telefone = telefone

    await cliente.save()

    return cliente
  }
}
