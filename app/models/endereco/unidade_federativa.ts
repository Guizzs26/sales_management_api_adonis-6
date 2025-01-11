import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'

export default class UnidadeFederativa extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare siglaUf: string

  @column()
  declare nome: string

  @hasMany(() => Endereco)
  declare enderecos: HasMany<typeof Endereco>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(unidadeFederativa: UnidadeFederativa) {
    unidadeFederativa.id = randomUUID()
  }
}
