import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string('sigla_uf')
        .notNullable()
        .references('sigla_uf')
        .inTable('unidades_federativas')
        .onDelete('RESTRICT')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('sigla_uf')
    })
  }
}
