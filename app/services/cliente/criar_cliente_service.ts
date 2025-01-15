import db from '@adonisjs/lucid/services/db'
import Cliente from '../../models/cliente/cliente.js'
import { CriarClientePayload } from '../../../types/cliente/cliente_type.js'

export default class CriarClienteService {
  public async execute({
    nomeCompleto,
    cpfCnpj,
    email,
    telefone,
    dataNascimentoFundacao,
    tipo,
    enderecos,
  }: CriarClientePayload): Promise<Cliente> {
    const novoCliente = await db.transaction(async (trx) => {
      const cliente = new Cliente()

      cliente.merge({ nomeCompleto, cpfCnpj, email, telefone, dataNascimentoFundacao, tipo })
      cliente.useTransaction(trx)

      await cliente.save()

      await cliente.related('enderecos').createMany(enderecos)

      return cliente
    })

    // lazy loading fora da transaction p/ evitar possível deadlock
    await novoCliente.load('enderecos')

    return novoCliente
  }
}
