import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TabelaUnidadesFederativas extends BaseSchema {
  protected tableName = 'unidades_federativas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('sigla_uf', 2).primary()
      table.string('nome').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
