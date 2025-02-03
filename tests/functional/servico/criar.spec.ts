import { test } from '@japa/runner'
import Servico from '#models/servico/servico'

test.group('Serviço', () => {
  test('deve criar um serviço com dados válidos e persistir no banco de dados', async ({
    client,
    assert,
  }) => {
    const servicoRequest = {
      nomeServico: 'Serviço X',
      descricao: 'Serviço premium com benefícios exclusivos',
      precoBase: 199.99,
    }

    const response = await client.post('/api/v1/servicos').json(servicoRequest)

    response.assertStatus(201)

    response.assertBodyContains({
      data: {
        nomeServico: servicoRequest.nomeServico,
        descricao: servicoRequest.descricao,
        precoBase: servicoRequest.precoBase,
      },
    })

    // Verifica se o serviço foi persistido no banco de dados corretamente
    const servico = await Servico.findBy('nomeServico', servicoRequest.nomeServico)

    assert.isNotNull(servico)
    assert.strictEqual(servico?.nomeServico, servicoRequest.nomeServico)
    assert.strictEqual(servico?.descricao, servicoRequest.descricao)
    assert.strictEqual(Number(servico?.precoBase), servicoRequest.precoBase)
  })

  test('não deve criar serviço sem nome', async ({ client }) => {
    const servicoRequest = {
      descricao: 'Serviço sem nome',
      precoBase: 49.99,
    }

    const response = await client.post('/api/v1/servicos').json(servicoRequest)

    response.assertStatus(422)
    response.assertBodyContains({
      code: 'E_VALIDATION_ERROR',
      message: 'Ocorreu um erro na validação, verifique os parâmetros e dados enviados.',
      data: {
        item: [
          {
            message: 'The nomeServico field must be defined',
            rule: 'required',
            field: 'nomeServico',
          },
        ],
      },
    })
  })

  test('não deve criar serviço sem preço', async ({ client }) => {
    const servicoRequest = {
      nomeServico: 'Serviço sem preço',
      descricao: 'Serviço sem preço',
    }

    const response = await client.post('/api/v1/servicos').json(servicoRequest)

    response.assertStatus(422)
    response.assertBodyContains({
      code: 'E_VALIDATION_ERROR',
      message: 'Ocorreu um erro na validação, verifique os parâmetros e dados enviados.',
      data: {
        item: [
          {
            message: 'The precoBase field must be defined',
            rule: 'required',
            field: 'precoBase',
          },
        ],
      },
    })
  })

  test('não deve criar serviço com preço negativo', async ({ client }) => {
    const servicoRequest = {
      nomeServico: 'Serviço Negativo',
      descricao: 'Serviço com preço inválido',
      precoBase: -100.0,
    }

    const response = await client.post('/api/v1/servicos').json(servicoRequest)

    response.assertStatus(422)
    response.assertBodyContains({
      code: 'E_VALIDATION_ERROR',
      message: 'Ocorreu um erro na validação, verifique os parâmetros e dados enviados.',
      data: {
        item: [
          {
            message: 'The precoBase field must be positive',
            rule: 'positive',
            field: 'precoBase',
          },
        ],
      },
    })
  })
})
