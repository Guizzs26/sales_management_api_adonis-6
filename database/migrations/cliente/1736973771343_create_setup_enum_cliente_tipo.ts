import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SetupEnumClienteTipo extends BaseSchema {
  async up() {
    this.schema.raw("CREATE TYPE cliente_tipo AS ENUM ('PF', 'PJ')")
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS "cliente_tipo"')
  }
}
