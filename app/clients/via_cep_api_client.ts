import axios, { AxiosStatic } from 'axios'
import ViaCepException from '#exceptions/via_cep_exception'

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
    const resposta = await Promise.all(
      enderecos.map(async (endereco) => this.buscarCep(endereco.cep))
    )

    return resposta.map(this.normalizarResposta)
  }

  private async buscarCep(cep: string): Promise<RespostaViaCep> {
    try {
      const { data } = await this.request.get<RespostaViaCep>(`${this.baseURL}/${cep}/json/`)

      if (data.erro) {
        throw new ViaCepException(`CEP inválido ou não encontrado: ${cep}`)
      }

      return data
    } catch (error) {
      throw new ViaCepException(`Erro ao buscar CEP: ${cep}`)
    }
  }

  private normalizarResposta(endereco: RespostaViaCep): RespostaViaCepNormalizada {
    return {
      localidade: endereco.localidade || '',
      bairro: endereco.bairro || '',
      logradouro: endereco.logradouro || '',
    }
  }
}
