import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PrecoPlanosUf from './preco_planos_uf.js'
import Venda from '#models/venda/venda'

export default class Plano extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'planos'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare nome: string

  @column()
  declare descricao?: string | null

  @column()
  declare precoBase: number

  @hasMany(() => PrecoPlanosUf, {
    foreignKey: 'planoId',
  })
  declare precosUfs: HasMany<typeof PrecoPlanosUf>

  @hasMany(() => Venda, {
    foreignKey: 'planoId',
  })
  declare vendas: HasMany<typeof Venda>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(plano: Plano) {
    plano.id = randomUUID()
  }
}
