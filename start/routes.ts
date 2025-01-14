import router from '@adonisjs/core/services/router'

const CriarClientesController = () => import('#controllers/clientes/criar_clientes_controller')
const ListarClientesController = () => import('#controllers/clientes/listar_clientes_controller')
const BuscarClientesController = () => import('#controllers/clientes/buscar_clientes_controller')
const AtualizarClientesController = () =>
  import('#controllers/clientes/atualizar_clientes_controller')
const RemoverClienteController = () => import('#controllers/clientes/remover_cliente_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [CriarClientesController]).as('store')
        router.get('/', [ListarClientesController]).as('index')
        router.get('/:id', [BuscarClientesController]).as('show')
        router.put('/:id', [AtualizarClientesController]).as('update')
        router.delete('/:id', [RemoverClienteController]).as('remove')
      })
      .prefix('clientes')
      .as('clientes')
  })
  .prefix('api/v1')
  .as('api/v1')
