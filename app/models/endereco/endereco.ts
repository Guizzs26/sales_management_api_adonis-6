import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from '../cliente/cliente.js'
import UnidadeFederativa from './unidade_federativa.js'

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
  declare ufId: number

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
