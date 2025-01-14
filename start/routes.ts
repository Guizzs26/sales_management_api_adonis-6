const ListarClientesController = () => import('#controllers/clientes/listar_clientes_controller')
import router from '@adonisjs/core/services/router'

const CriarClientesController = () => import('#controllers/clientes/criar_clientes_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [CriarClientesController]).as('store')
        router.get('/', [ListarClientesController]).as('index')
      })
      .prefix('clientes')
      .as('clientes')
  })
  .prefix('api/v1')
  .as('api/v1')
