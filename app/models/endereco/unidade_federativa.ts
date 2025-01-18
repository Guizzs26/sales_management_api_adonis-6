import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'
import PrecoPlanosUf from '#models/plano/preco_planos_uf'

export default class UnidadeFederativa extends BaseModel {
  static selfAssignPrimaryKey = true
  static table = 'unidades_federativas'

  @column({ isPrimary: true })
  declare siglaUf: string

  @column()
  declare nome: string

  @hasMany(() => Endereco, {
    foreignKey: 'siglaUf',
  })
  declare enderecos: HasMany<typeof Endereco>

  @hasMany(() => PrecoPlanosUf, {
    foreignKey: 'siglaUf',
  })
  declare precosPlanos: HasMany<typeof PrecoPlanosUf>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
