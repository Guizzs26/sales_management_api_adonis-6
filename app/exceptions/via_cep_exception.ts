import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ViaCepException extends Exception {
  static status = 400
  static code = 'E_VIACEP_ERROR'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      code: error.code,
      message: error.message,
    })
  }
}
