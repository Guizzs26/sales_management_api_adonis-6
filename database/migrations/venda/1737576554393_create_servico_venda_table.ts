import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ServicoVenda extends BaseSchema {
  protected tableName = 'servico_venda'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('venda_id').notNullable().references('id').inTable('vendas').onDelete('CASCADE')

      table
        .uuid('servico_id')
        .notNullable()
        .references('id')
        .inTable('servicos')
        .onDelete('CASCADE')

      table.primary(['venda_id', 'servico_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
