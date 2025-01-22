import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Vendas extends BaseSchema {
  protected tableName = 'vendas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table
        .uuid('cliente_id')
        .notNullable()
        .references('id')
        .inTable('clientes')
        .onDelete('CASCADE')

      table.uuid('plano_id').notNullable().references('id').inTable('planos').onDelete('CASCADE')

      table.decimal('valor_total_venda', 10, 2).notNullable()
      table.decimal('desconto_aplicado', 10, 2).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
