import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import UnidadeFederativa from '#models/endereco/unidade_federativa'
import Servico from './servico.js'

export default class PrecoServicosUf extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'preco_servicos_uf'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare servicoId: string

  @column()
  declare siglaUf: string

  @column()
  declare percentualAjuste: number

  @belongsTo(() => Servico, {
    foreignKey: 'servicoId',
  })
  declare servico: BelongsTo<typeof Servico>

  @belongsTo(() => UnidadeFederativa, {
    foreignKey: 'siglaUf',
  })
  declare unidadeFederativa: BelongsTo<typeof UnidadeFederativa>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(precoServicosUf: PrecoServicosUf) {
    precoServicosUf.id = randomUUID()
  }
}
