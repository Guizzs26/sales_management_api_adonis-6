import { test } from '@japa/runner'
import Plano from '#models/plano/plano'

test.group('Plano', () => {
  test('deve criar um plano com dados válidos e persistir no banco de dados', async ({
    client,
    assert,
  }) => {
    const planoRequest = {
      nomePlano: 'Plano Ouro',
      descricao: 'Plano premium com benefícios exclusivos',
      precoBase: 199.99,
    }

    const response = await client.post('/api/v1/planos').json(planoRequest)

    response.assertStatus(201)

    response.assertBodyContains({
      data: {
        nomePlano: planoRequest.nomePlano,
        descricao: planoRequest.descricao,
        precoBase: planoRequest.precoBase,
      },
    })

    // Verifica se o plano foi persistido no banco de dados corretamente
    const plano = await Plano.findBy('nomePlano', planoRequest.nomePlano)

    assert.isNotNull(plano)
    assert.strictEqual(plano?.nomePlano, planoRequest.nomePlano)
    assert.strictEqual(plano?.descricao, planoRequest.descricao)
    assert.strictEqual(Number(plano?.precoBase), planoRequest.precoBase)
  })

  test('não deve criar plano sem nome', async ({ client }) => {
    const planoRequest = {
      descricao: 'Plano sem nome',
      precoBase: 49.99,
    }

    const response = await client.post('/api/v1/planos').json(planoRequest)

    response.assertStatus(422)
    response.assertBodyContains({
      code: 'E_VALIDATION_ERROR',
      data: {
        item: [
          {
            message: 'The nomePlano field must be defined',
            rule: 'required',
            field: 'nomePlano',
          },
        ],
      },
    })
  })

  test('não deve criar plano sem preço', async ({ client }) => {
    const planoRequest = {
      nomePlano: 'Plano Sem Preço',
      descricao: 'Plano sem nome',
    }

    const response = await client.post('/api/v1/planos').json(planoRequest)

    response.assertStatus(422)
    response.assertBodyContains({
      code: 'E_VALIDATION_ERROR',
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

  test('não deve criar plano com preço negativo', async ({ client }) => {
    const planoRequest = {
      nomePlano: 'Plano Negativo',
      descricao: 'Plano com preço inválido',
      precoBase: -100.0,
    }

    const response = await client.post('/api/v1/planos').json(planoRequest)

    response.assertStatus(422)
    response.assertBodyContains({
      code: 'E_VALIDATION_ERROR',
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
