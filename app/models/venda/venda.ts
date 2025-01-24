import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Cliente from '#models/cliente/cliente'
import Servico from '#models/servico/servico'
import Plano from '#models/plano/plano'

export default class Venda extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'vendas'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare clienteId: string

  @column()
  declare planoId: string

  @column()
  declare valorTotalVenda: number

  @column()
  declare descontoAplicado?: number | null

  @belongsTo(() => Cliente, {
    foreignKey: 'clienteId',
  })
  declare cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => Plano, {
    foreignKey: 'planoId',
  })
  declare plano: BelongsTo<typeof Plano>

  @manyToMany(() => Servico, {
    pivotTable: 'servico_venda',
    pivotForeignKey: 'venda_id',
    pivotRelatedForeignKey: 'servico_id',
    pivotTimestamps: true,
  })
  declare servicos: ManyToMany<typeof Servico>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(venda: Venda) {
    venda.id = randomUUID()
  }
}
