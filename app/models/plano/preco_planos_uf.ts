import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import UnidadeFederativa from '#models/endereco/unidade_federativa'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Plano from './plano.js'

export default class PrecoPlanosUf extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'preco_planos_uf'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare planoId: string

  @column()
  declare siglaUf: string

  @column()
  declare percentualAjuste: number

  @belongsTo(() => Plano, {
    foreignKey: 'planoId',
  })
  declare plano: BelongsTo<typeof Plano>

  @belongsTo(() => UnidadeFederativa, {
    foreignKey: 'siglaUf',
  })
  declare unidadeFederativa: BelongsTo<typeof UnidadeFederativa>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(precoPlanosUf: PrecoPlanosUf) {
    precoPlanosUf.id = randomUUID()
  }
}
