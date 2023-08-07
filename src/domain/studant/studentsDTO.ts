interface Students {
  id: number;
  name: String;
  serie: String;
  teaching: String;
  shift: String;
  schoolName: String;
  departureTime: String;
  backTime: String;
  cep: String;
  address: String;
  neighborhood: String;
  number: String;
  complement: String;
  city: String;
  state: String;
  rota_id: String;
  created_at: String;
  updated_at: String;
  deleted_at: String;
}

interface Student {
  id: number;
  name: String;
  serie: String;
  teaching: String;
  shift: String;
  schoolName: String;
  departureTime: String;
  backTime: String;
  cep: String;
  address: String;
  neighborhood: String;
  number: String;
  complement: String;
  city: String;
  state: String;
  rota_id: number;
  created_at: String;
  updated_at: String;
  deleted_at: String;
}

export const mapFetchStudentsResponse = (students: any) => {
  console.log(students);
  return (
    (students["data"] &&
      students["data"].length > 0 &&
      students["data"].map((student: any) => {
        return {
          id: student["id"],
          name: student["nome"],
          serie: student["serie"],
          teaching: student["ensino"],
          shift: student["turno"],
          schoolName: student["nome_escola"],
          departureTime: student["hora_ida"],
          backTime: student["hora_volta"],
          cep: student["cep"],
          address: student["endereco"],
          neighborhood: student["bairro"],
          number: student["numero"],
          complement: student["complemento"],
          city: student["cidade"],
          state: student["estado"],
          rota_id: student["rota_id"],
          created_at: student["created_at"],
          updated_at: student["updated_at"],
          deleted_at: student["deleted_at"],
        };
      })) ||
    []
  );
};

export const mapFetchStudentIdResponse = (student: any) => {
  return (
    {
      id: student["id"],
      name: student["nome"],
      serie: student["serie"],
      teaching: student["ensino"],
      shift: student["turno"],
      schoolName: student["nome_escola"],
      departureTime: student["hora_ida"],
      backTime: student["hora_volta"],
      cep: student["cep"],
      address: student["endereco"],
      neighborhood: student["bairro"],
      number: student["numero"],
      complement: student["complemento"],
      city: student["cidade"],
      state: student["estado"],
      rota_id: student["rota_id"],
      created_at: student["created_at"],
      updated_at: student["updated_at"],
      deleted_at: student["deleted_at"],
    } || []
  );
};

export const mapFetchStudentsPaginationResponse = (response: any) => {
  return (
    {
      totalPages: response["last_page"],
      page: response["current_page"],
      totalPerPage: response["per_page"],
      total: response["total"],
    } || []
  );
};
