import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class Plano extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'planos'

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
  static assignUuid(plano: Plano) {
    plano.id = randomUUID()
  }
}
