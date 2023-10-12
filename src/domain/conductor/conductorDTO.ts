interface Response {
  data: Conductor[];
}

interface Conductor {
  id: number;
  nome: string;
  tipo_habilitacao: string;
  categoria_habilitacao: string;
  identificador_documento_habilitacao: string;
  validade_habilitacao: string;
  idade: string;
  cep: string;
  endereco: string;
  cidade: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export const mapFetchConductorsResponse = (response: Response) => {
  console.log(response)
  return response["data"] && response["data"].length > 0 && response["data"].map((item: Conductor) => {
    return {
      id: item['id'],
      name: item['nome'],
      typeLicence: item['tipo_habilitacao'],
      categorieLicence: item['categoria_habilitacao'],
      licenseDocumentIdentifier: item['identificador_documento_habilitacao'],
      validateLicence: item['validade_habilitacao'],
      age: item['idade'],
      cep: item['cep'],
      address: item['endereco'],
      city: item['cidade'],
      active: item['ativo'],
      created_at: item['created_at'],
      updated_at: item['updated_at'],
    }
  }) || []
}


export const mapFetchConductorIdResponse = (conductor: Conductor) => {
  return (
    {
      id: conductor['id'],
      name: conductor['nome'],
      typeLicence: conductor['tipo_habilitacao'],
      categorieLicence: conductor['categoria_habilitacao'],
      licenseDocumentIdentifier: conductor['identificador_documento_habilitacao'],
      validateLicence: conductor['validade_habilitacao'],
      age: conductor['idade'],
      cep: conductor['cep'],
      address: conductor['endereco'],
      city: conductor['cidade'],
      active: conductor['ativo'],
      created_at: conductor['created_at'],
      updated_at: conductor['updated_at'],
    } || []
  );
};

export const mapFetchaConductorsPaginationResponse = (response: any) => {
  return {
    totalPages: response['last_page'],
    page: response['current_page'],
    totalPerPage: response['per_page']
  } || []
}