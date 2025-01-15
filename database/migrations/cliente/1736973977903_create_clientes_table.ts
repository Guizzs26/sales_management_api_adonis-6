import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TabelaClientes extends BaseSchema {
  protected tableName = 'clientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('nome_completo', 127).notNullable()
      table.string('cpf_cnpj', 14).notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('telefone', 13).nullable()
      table.date('data_nascimento_fundacao').notNullable()
      table
        .enum('tipo', ['PF', 'PJ'], {
          useNative: true,
          enumName: 'cliente_tipo',
          existingType: true,
        })
        .notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
