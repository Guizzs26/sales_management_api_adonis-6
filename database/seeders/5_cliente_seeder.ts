import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TipoPessoa } from '#types/cliente/cliente_type'
import Cliente from '#models/cliente/cliente'
import Endereco from '#models/endereco/endereco'
import UnidadeFederativa from '#models/endereco/unidade_federativa'

const CLIENTES = [
  // 5 Clientes PF
  {
    nomeCompleto: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '55999991234',
    dataNascimentoFundacao: DateTime.fromISO('1990-01-15'),
    cpfCnpj: '12345678900',
    tipo: 'PF' as TipoPessoa,
    enderecos: [
      {
        cep: '79000000',
        localidade: 'Campo Grande',
        bairro: 'Centro',
        logradouro: 'Avenida Afonso Pena',
        numero: '123',
        complemento: 'Apartamento 201',
        siglaUf: 'MS',
      },
    ],
  },
  {
    nomeCompleto: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    telefone: '559988885678',
    dataNascimentoFundacao: DateTime.fromISO('1985-05-20'),
    cpfCnpj: '23456789011',
    tipo: 'PF' as TipoPessoa,
    enderecos: [
      {
        cep: '79010000',
        localidade: 'Goiânia',
        bairro: 'Setor Central',
        logradouro: 'Rua 1º de Maio',
        numero: '456',
        complemento: 'Casa com garagem',
        siglaUf: 'GO',
      },
    ],
  },
  {
    nomeCompleto: 'Carlos Pereira',
    email: 'carlos.pereira@email.com',
    telefone: '559977778910',
    dataNascimentoFundacao: DateTime.fromISO('1982-03-10'),
    cpfCnpj: '34567890122',
    tipo: 'PF' as TipoPessoa,
    enderecos: [
      {
        cep: '79020000',
        localidade: 'Cuiabá',
        bairro: 'Centro',
        logradouro: 'Avenida Historiador Rubens de Mendonça',
        numero: '789',
        complemento: 'Apartamento no 5º andar',
        siglaUf: 'MT',
      },
    ],
  },
  {
    nomeCompleto: 'Ana Costa',
    email: 'ana.costa@email.com',
    telefone: '559966663456',
    dataNascimentoFundacao: DateTime.fromISO('1993-08-12'),
    cpfCnpj: '45678901233',
    tipo: 'PF' as TipoPessoa,
    enderecos: [
      {
        cep: '79030000',
        localidade: 'Curitiba',
        bairro: 'Centro',
        logradouro: 'Rua XV de Novembro',
        numero: '101',
        complemento: 'Prédio comercial',
        siglaUf: 'PR',
      },
    ],
  },
  {
    nomeCompleto: 'Pedro Souza',
    email: 'pedro.souza@email.com',
    telefone: '559955554567',
    dataNascimentoFundacao: DateTime.fromISO('1991-11-23'),
    cpfCnpj: '56789012344',
    tipo: 'PF' as TipoPessoa,
    enderecos: [
      {
        cep: '79040000',
        localidade: 'Anápolis',
        bairro: 'Setor Central',
        logradouro: 'Avenida Brasil',
        numero: '202',
        complemento: 'Casa em condomínio fechado',
        siglaUf: 'GO',
      },
    ],
  },

  // 5 Clientes PJ
  {
    nomeCompleto: 'Empresa XYZ Ltda.',
    email: 'contato@empresa.xyz',
    telefone: '559944445678',
    dataNascimentoFundacao: DateTime.fromISO('2005-10-30'),
    cpfCnpj: '12345678000199',
    tipo: 'PJ' as TipoPessoa,
    enderecos: [
      {
        cep: '79050000',
        localidade: 'Campo Grande',
        bairro: 'Jardim dos Estados',
        logradouro: 'Rua dos Indústrias',
        numero: '303',
        complemento: 'Sala comercial',
        siglaUf: 'MS',
      },
    ],
  },
  {
    nomeCompleto: 'Tech Solutions S.A.',
    email: 'suporte@techsolutions.com.br',
    telefone: '559933337890',
    dataNascimentoFundacao: DateTime.fromISO('2000-07-15'),
    cpfCnpj: '23456789000101',
    tipo: 'PJ' as TipoPessoa,
    enderecos: [
      {
        cep: '79060000',
        localidade: 'Cuiabá',
        bairro: 'Coxipó',
        logradouro: 'Avenida das Torres',
        numero: '404',
        complemento: 'Escritório no centro',
        siglaUf: 'MT',
      },
    ],
  },
  {
    nomeCompleto: 'Inova TI Ltda.',
    email: 'contact@inovati.com',
    telefone: '559922228901',
    dataNascimentoFundacao: DateTime.fromISO('2010-05-05'),
    cpfCnpj: '34567890000122',
    tipo: 'PJ' as TipoPessoa,
    enderecos: [
      {
        cep: '79070000',
        localidade: 'Curitiba',
        bairro: 'Batel',
        logradouro: 'Rua Coronel Dulcídio',
        numero: '505',
        complemento: 'Galpão industrial',
        siglaUf: 'PR',
      },
    ],
  },
  {
    nomeCompleto: 'Supermercado ABC',
    email: 'atendimento@superabc.com.br',
    telefone: '559911113456',
    dataNascimentoFundacao: DateTime.fromISO('1998-01-10'),
    cpfCnpj: '45678901200133',
    tipo: 'PJ' as TipoPessoa,
    enderecos: [
      {
        cep: '79080000',
        localidade: 'Goiânia',
        bairro: 'Setor Bueno',
        logradouro: 'Rua T-37',
        numero: '606',
        complemento: 'Supermercado no bairro central',
        siglaUf: 'GO',
      },
    ],
  },
  {
    nomeCompleto: 'Construtora Beta',
    email: 'contato@construtorabeta.com.br',
    telefone: '559900005678',
    dataNascimentoFundacao: DateTime.fromISO('2015-09-15'),
    cpfCnpj: '56789012000144',
    tipo: 'PJ' as TipoPessoa,
    enderecos: [
      {
        cep: '79090000',
        localidade: 'Várzea Grande',
        bairro: 'Centro',
        logradouro: 'Avenida 15 de Novembro',
        numero: '707',
        complemento: 'Escritório no bairro industrial',
        siglaUf: 'MT',
      },
    ],
  },
]

export default class ClienteSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    for (const cliente of CLIENTES) {
      const clienteCriado = await Cliente.create({
        nomeCompleto: cliente.nomeCompleto,
        email: cliente.email,
        telefone: cliente.telefone,
        dataNascimentoFundacao: cliente.dataNascimentoFundacao,
        cpfCnpj: cliente.cpfCnpj,
        tipo: cliente.tipo,
      })

      // Cria os endereços associados ao cliente
      for (const endereco of cliente.enderecos) {
        const uf = await UnidadeFederativa.findBy('siglaUf', endereco.siglaUf)

        if (uf) {
          await Endereco.create({
            clienteId: clienteCriado.id,
            cep: endereco.cep,
            localidade: endereco.localidade,
            bairro: endereco.bairro,
            logradouro: endereco.logradouro,
            numero: endereco.numero,
            complemento: endereco.complemento ?? null,
            siglaUf: endereco.siglaUf,
          })
        }
      }
    }
  }
}
