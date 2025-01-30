import { BaseModel, column, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { TipoPessoa } from '#types/cliente/cliente_type'
import Venda from '#models/venda/venda'
import Endereco from '#models/endereco/endereco'

export default class Cliente extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'clientes'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare nomeCompleto: string

  @column({ serializeAs: null })
  declare cpfCnpj: string

  @column()
  declare email: string

  @column()
  declare telefone?: string | null

  @column.date()
  declare dataNascimentoFundacao: DateTime

  @column()
  declare tipo: TipoPessoa

  @hasMany(() => Endereco, {
    foreignKey: 'clienteId',
  })
  declare enderecos: HasMany<typeof Endereco>

  @hasMany(() => Venda, {
    foreignKey: 'clienteId',
  })
  declare vendas: HasMany<typeof Venda>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(cliente: Cliente) {
    cliente.id = randomUUID()
  }
}
