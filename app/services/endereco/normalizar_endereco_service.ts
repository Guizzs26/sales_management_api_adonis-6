import ViaCEP from '#clients/via_cep_api_client'
import { EnderecoParcialRequest, EnderecoNormalizadoCompleto } from '#types/cliente/cliente_type'

export default class NormalizarEnderecosService {
  constructor(private viaCEP: ViaCEP) {}

  /**
   * Recebe endereços parciais da request que foram validados pelo Vine e obtém dados adicionais da API ViaCEP com base no CEP.
   */
  public async normalizarEnderecos(
    enderecos: EnderecoParcialRequest[]
  ): Promise<EnderecoNormalizadoCompleto[]> {
    // Retorna o restante das informações de endereço com base no CEP
    const enderecosNormalizados = await this.viaCEP.buscarEnderecos(enderecos)

    // Combina os dados retornados da API com os dados da request e retorna o objeto de endereço completo
    return enderecos.map((endereco, index) => ({
      cep: endereco.cep,
      ...enderecosNormalizados[index],
      numero: endereco.numero,
      complemento: endereco.complemento,
      siglaUf: endereco.siglaUf,
    }))
  }
}
