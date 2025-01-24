import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TabelaPlanos extends BaseSchema {
  protected tableName = 'planos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('nome_plano', 127).notNullable().unique()
      table.text('descricao').nullable()
      table.decimal('preco_base', 10, 2).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
