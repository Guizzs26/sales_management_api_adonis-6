import router from '@adonisjs/core/services/router'

const CriarClienteController = () => import('#controllers/cliente/criar_cliente_controller')
const ListarClientesController = () => import('#controllers/cliente/listar_clientes_controller')
const BuscarClienteController = () => import('#controllers/cliente/buscar_cliente_controller')
const AtualizarClienteController = () => import('#controllers/cliente/atualizar_cliente_controller')
const RemoverClienteController = () => import('#controllers/cliente/remover_cliente_controller')

const PlanosController = () => import('#controllers/plano/planos_controller')
const ServicosController = () => import('#controllers/servico/servicos_controller')

const CriarVendaController = () => import('#controllers/venda/criar_venda_controller')
const ListarVendasController = () => import('#controllers/venda/listar_vendas_controller')
const BuscarVendaController = () => import('#controllers/venda/buscar_venda_controller')
const AtualizarVendasController = () => import('#controllers/venda/atualizar_venda_controller')
const RemoverVendaController = () => import('#controllers/venda/remover_venda_controller')

const DashboardController = () => import('#controllers/dashboard/dashboard_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [CriarClienteController]).as('criar')
        router.get('/', [ListarClientesController]).as('listar')
        router.get('/:id', [BuscarClienteController]).as('buscar')
        router.put('/:id', [AtualizarClienteController]).as('atualizar')
        router.delete('/:id', [RemoverClienteController]).as('remover')
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
        router.get('/', [ListarVendasController]).as('index')
        router.get('/:id', [BuscarVendaController]).as('show')
        router.put('/:id', [AtualizarVendasController]).as('update')
        router.delete('/:id', [RemoverVendaController]).as('destroy')
      })
      .prefix('vendas')
      .as('vendas')

    router
      .group(() => {
        router.get('/vendas', [DashboardController, 'vendas']).as('dashboardVendas')
        router.get('/clientes', [DashboardController, 'clientes']).as('dashboardClientes')
      })
      .prefix('dashboard')
      .as('dashboard')
  })
  .prefix('api/v1')
  .as('api/v1')
