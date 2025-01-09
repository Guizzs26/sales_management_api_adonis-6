import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('cep', 8).notNullable().unique()
      table.string('localidade').notNullable()
      table.string('logradouro').notNullable()
      table.string('bairro').notNullable()
      table.string('numero', 20).notNullable()
      table.string('complemento').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
