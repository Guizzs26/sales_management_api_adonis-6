import Cliente from '#models/cliente/cliente'
import UnidadeFederativa from '#models/endereco/unidade_federativa'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Endereco extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare cep: string

  @column()
  declare localidade: string

  @column()
  declare logradouro: string

  @column()
  declare bairro: string

  @column()
  declare numero: string

  @column()
  declare complemento: string | null

  @column()
  declare uf_id: number

  @column()
  declare clienteId: number

  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => UnidadeFederativa)
  declare unidadeFederativa: BelongsTo<typeof UnidadeFederativa>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(endereco: Endereco) {
    endereco.id = randomUUID()
  }
}
