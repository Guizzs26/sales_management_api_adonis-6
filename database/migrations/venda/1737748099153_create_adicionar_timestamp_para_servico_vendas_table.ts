import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ServicoVenda extends BaseSchema {
  protected tableName = 'servico_venda'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
    })
  }
}
