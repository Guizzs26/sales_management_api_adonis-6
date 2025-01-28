import axios, { AxiosStatic } from 'axios'

export type RespostaViaCep = {
  readonly cep: string
  readonly logradouro: string
  readonly complemento: string
  readonly unidade: string
  readonly bairro: string
  readonly localidade: string
  readonly uf: string
  readonly estado: string
  readonly regiao: string
  readonly ibge: string
  readonly gia: string
  readonly ddd: string
  readonly siafi: string
  readonly erro?: boolean
}

export type RespostaViaCepNormalizada = {
  localidade: string
  bairro: string
  logradouro: string
}

export type EnderecoRequest = {
  cep: string
  numero: string
  complemento?: string | null
  siglaUf: string
}

export default class ViaCEP {
  private readonly baseURL = 'https://viacep.com.br/ws'

  constructor(protected request: AxiosStatic = axios) {}

  public async buscarEnderecos(enderecos: EnderecoRequest[]): Promise<RespostaViaCepNormalizada[]> {
    const respostasNormalizadas = await Promise.all(
      enderecos.map(async (endereco) => {
        try {
          const resposta = await this.request.get<RespostaViaCep>(
            `${this.baseURL}/${endereco.cep}/json/`
          )

          // Verifica se o CEP retornou um erro na resposta (erro = true)
          if (resposta.data.erro) {
            throw new Error(`CEP inválido ou não encontrado: ${endereco.cep}`)
          }

          return this.normalizarResposta(resposta.data)
        } catch (error) {
          const mensagemErro =
            error instanceof Error ? error.message : 'Erro desconhecido ao buscar CEP.'

          throw new Error(`Falha ao buscar o CEP ${endereco.cep}: ${mensagemErro}`)
        }
      })
    )

    return respostasNormalizadas
  }

  private normalizarResposta(endereco: RespostaViaCep): RespostaViaCepNormalizada {
    return {
      localidade: endereco.localidade,
      bairro: endereco.bairro,
      logradouro: endereco.logradouro,
    }
  }
}
