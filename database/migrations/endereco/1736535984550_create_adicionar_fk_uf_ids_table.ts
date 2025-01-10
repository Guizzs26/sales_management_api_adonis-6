import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .uuid('uf_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('unidades_federativas')
        .onDelete('RESTRICT')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('uf_id')
    })
  }
}
