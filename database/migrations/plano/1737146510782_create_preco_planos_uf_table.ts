import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TabelaPrecoPlanosUf extends BaseSchema {
  protected tableName = 'preco_planos_uf'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('plano_id').references('id').inTable('planos').onDelete('CASCADE').notNullable()

      table
        .string('sigla_uf', 2)
        .references('sigla_uf')
        .inTable('unidades_federativas')
        .onDelete('CASCADE')
        .notNullable()

      table.decimal('percentual_ajuste', 5, 2).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
