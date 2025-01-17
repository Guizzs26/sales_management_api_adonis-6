import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class Servico extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'servicos'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare nome: string

  @column()
  declare descricao: string | null

  @column()
  declare precoBase: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(servico: Servico) {
    servico.id = randomUUID()
  }
}
