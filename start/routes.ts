import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

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

// Matcher global para validar o id do parâmetro de rota
router.where('id', router.matchers.uuid())

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router

  .group(() => {
    // Rotas para clientes
    router
      .group(() => {
        router.post('/', [CriarClienteController]).as('criar')
        router.get('/', [ListarClientesController]).as('listar')
        router.get('/:id', [BuscarClienteController]).as('buscar')
        router.put('/:id', [AtualizarClienteController]).as('atualizar')
        router.delete('/:id', [RemoverClienteController]).as('remover')
      })
      .prefix('/clientes')
      .as('clientes')

    // Rotas para planos
    router.resource('/planos', PlanosController).apiOnly()
    router
      .post('/planos/com-ajustes', [PlanosController, 'criarPlanoComAjustes'])
      .as('planoComAjustes')

    // Rotas para servicos
    router.resource('/servicos', ServicosController).apiOnly()
    router
      .post('/servicos/com-ajustes', [ServicosController, 'criarServicoComAjustes'])
      .as('servicoComAjustes')

    // Rotas para vendas
    router
      .group(() => {
        router.post('/:id', [CriarVendaController]).as('criar')
        router.get('/', [ListarVendasController]).as('listar')
        router.get('/:id', [BuscarVendaController]).as('buscar')
        router.put('/:id', [AtualizarVendasController]).as('atualizar')
        router.delete('/:id', [RemoverVendaController]).as('remover')
      })
      .prefix('vendas')
      .as('vendas')

    // Rotas para dashboard
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
