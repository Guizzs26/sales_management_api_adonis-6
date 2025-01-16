import { AxiosStatic } from 'axios'

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
}

export type RespostaViaCepNormalizada = {
  localidade: string
  bairro: string
  logradouro: string
}

export type RequestEndereco = {
  cep: string
  numero: string
  complemento?: string | null
  siglaUf: string
}

export default class ViaCEP {
  private readonly baseURL = 'https://viacep.com.br/ws'

  constructor(protected request: AxiosStatic) {}

  public async buscarEnderecos(enderecos: RequestEndereco[]): Promise<RespostaViaCepNormalizada[]> {
    const enderecosNormalizados: RespostaViaCepNormalizada[] = []

    for (const endereco of enderecos) {
      try {
        const response = await this.request.get<RespostaViaCep>(
          `${this.baseURL}/${endereco.cep}/json/`
        )

        enderecosNormalizados.push(this.normalizarResposta(response.data))
      } catch (error) {
        console.error(`Erro ao buscar CEP ${endereco.cep}:`, error)
      }
    }

    return enderecosNormalizados
  }

  private normalizarResposta(endereco: RespostaViaCep): RespostaViaCepNormalizada {
    return {
      localidade: endereco.localidade,
      bairro: endereco.bairro,
      logradouro: endereco.logradouro,
    }
  }
}
