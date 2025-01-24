import router from '@adonisjs/core/services/router'

const CriarClienteController = () => import('#controllers/cliente/criar_cliente_controller')
const ListarClientesController = () => import('#controllers/cliente/listar_clientes_controller')
const BuscarClienteController = () => import('#controllers/cliente/buscar_cliente_controller')
const AtualizarClienteController = () => import('#controllers/cliente/atualizar_cliente_controller')
const RemoverClienteController = () => import('#controllers/cliente/remover_cliente_controller')

const PlanosController = () => import('#controllers/plano/planos_controller')
const ServicosController = () => import('#controllers/servico/servicos_controller')
const CriarVendaController = () => import('#controllers/venda/criar_venda_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [CriarClienteController]).as('store')
        router.get('/', [ListarClientesController]).as('index')
        router.get('/:id', [BuscarClienteController]).as('show')
        router.put('/:id', [AtualizarClienteController]).as('update')
        router.delete('/:id', [RemoverClienteController]).as('destroy')
      })
      .prefix('clientes')
      .as('clientes')

    router.resource('planos', PlanosController).apiOnly()
    router.resource('servicos', ServicosController).apiOnly()

    router
      .post('planos/com-ajustes', [PlanosController, 'criarPlanoComAjustes'])
      .as('planos.comAjustes')

    router
      .post('servicos/com-ajustes', [ServicosController, 'criarServicoComAjustes'])
      .as('servicos.comAjustes')

    router
      .group(() => {
        router.post('/:id', [CriarVendaController]).as('store')
      })
      .prefix('vendas')
      .as('vendas')
  })
  .prefix('api/v1')
  .as('api/v1')
