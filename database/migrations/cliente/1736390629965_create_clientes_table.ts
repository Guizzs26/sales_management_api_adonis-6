import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  async up() {
    // Criação da extensão para suporte de uuid no PostgreSQL
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    // Criação do ENUM para a coluna tipo
    this.schema.raw("CREATE TYPE cliente_tipo AS ENUM ('PF', 'PJ')")

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('nome_completo').notNullable()
      table.string('cpf_cnpj', 14).notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('telefone', 20).nullable()
      table.date('data_nascimento_fundacao')
      table.enum('tipo', ['PF', 'PJ'], {
        useNative: true,
        enumName: 'cliente_tipo',
        existingType: true,
      })

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "cliente_tipo"')
    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
