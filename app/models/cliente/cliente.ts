import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { TipoPessoa } from '../../../types/cliente/cliente_type.js'
import Endereco from '../endereco/endereco.js'

export default class Cliente extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'clientes'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare nomeCompleto: string

  @column()
  declare cpfCnpj: string

  @column()
  declare email: string

  @column()
  declare telefone?: string | null

  @column.date()
  declare dataNascimentoFundacao: DateTime

  @column()
  declare tipo: TipoPessoa

  @hasMany(() => Endereco)
  declare enderecos: HasMany<typeof Endereco>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(cliente: Cliente) {
    cliente.id = randomUUID()
  }
}
