import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export default class Cliente extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare nome_completo: string

  @column()
  declare cpf_cnpj: string

  @column()
  declare email: string

  @column()
  declare telefone: string | null

  @column.date()
  declare data_nascimento_fundacao: DateTime

  @column()
  declare tipo: 'PF' | 'PJ'

  @column()
  declare endereco_id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(cliente: Cliente) {
    cliente.id = randomUUID()
  }
}
