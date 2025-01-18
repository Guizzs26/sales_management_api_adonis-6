import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PrecoServicosUf from './preco_servicos_uf.js'

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

  @hasMany(() => PrecoServicosUf)
  declare precosUfs: HasMany<typeof PrecoServicosUf>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(servico: Servico) {
    servico.id = randomUUID()
  }
}
