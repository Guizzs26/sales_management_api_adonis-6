import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors } from '@adonisjs/core'
import { errors as lucidErrors } from '@adonisjs/lucid'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof errors.E_ROUTE_NOT_FOUND) {
      ctx.response.status(404).send({
        code: 'E_ROUTE_NOT_FOUND',
        message: 'Rota não encontrada. Verifique o caminho ou os parâmetros enviados.',
      })
      return
    }

    if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
      ctx.response.status(404).send({
        code: 'E_ROW_NOT_FOUND',
        message: 'Registro não encontrado. Verifique o ID ou os parâmetros enviados.',
      })
      return
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
