type Vehicles = {
  data: Vehicle[]
}

interface Vehicle {
  id: number;
  descricao: string;
  tipo: string;
  identificacao: string;
  ativo: string;
  created_at: string;
  updated_at: string;
}

interface Pagination {
  last_page: number;
  current_page: number;
  per_page: number;
}

export const mapFetchVehiclesResponse = (data: Vehicles) => {
  return data["data"] &&
    data["data"].length > 0 &&
    data["data"].map((item: Vehicle) => {
      return {
        id: item['id'],
        name: item['descricao'],
        type: item['tipo'],
        identification: item['identificacao'],
        active: item['ativo'],
        created_at: item['created_at'],
        updated_at: item['updated_at'],
      }
    }) || []
}
export const mapFetchVehiclesResponseId = (data: Vehicle) => {
  return {
    id: data["id"],
    descricao: data["descricao"],
    tipo: data["tipo"],
    identificacao: data['identificacao'],
    ativo: data["ativo"],
    created_at: data['created_at'],
    updated_at: data['updated_at'],
  }
}
export const mapFetchVehiclesPaginationResponse = (response: Pagination) => {
  return {
    totalPages: response['last_page'],
    page: response['current_page'],
    totalPerPage: response['per_page']
  } || {}
}