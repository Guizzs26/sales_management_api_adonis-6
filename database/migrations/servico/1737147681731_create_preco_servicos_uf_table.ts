import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TabelaPrecoServicosUf extends BaseSchema {
  protected tableName = 'preco_servicos_uf'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table
        .uuid('servico_id')
        .references('id')
        .inTable('servicos')
        .onDelete('CASCADE')
        .notNullable()

      table
        .string('sigla_uf', 2)
        .references('sigla_uf')
        .inTable('unidades_federativas')
        .onDelete('CASCADE')
        .notNullable()

      table.decimal('percentual_ajuste', 5, 2).notNullable() // Percentual de ajuste sobre o preço base do serviço

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
