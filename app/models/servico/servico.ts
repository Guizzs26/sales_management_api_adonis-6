import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import PrecoServicosUf from './preco_servicos_uf.js'
import Venda from '#models/venda/venda'

export default class Servico extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'servicos'

  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'nome_servico' })
  declare nomeServico: string

  @column()
  declare descricao?: string | null

  @column()
  declare precoBase: number

  @hasMany(() => PrecoServicosUf)
  declare precosUfs: HasMany<typeof PrecoServicosUf>

  @manyToMany(() => Venda, {
    pivotTable: 'servico_venda',
    pivotForeignKey: 'servico_id',
    pivotRelatedForeignKey: 'venda_id',
    pivotTimestamps: true,
  })
  declare vendas: ManyToMany<typeof Venda>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(servico: Servico) {
    servico.id = randomUUID()
  }
}
