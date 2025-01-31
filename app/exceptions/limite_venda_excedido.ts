import { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'

export class LimiteVendasExcedidoException extends Exception {
  static status = 400
  static code = 'E_LIMIT_VENDAS_EXCEDIDO'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      code: error.code,
      message: error.message,
    })
  }
}
