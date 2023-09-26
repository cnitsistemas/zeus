import { OptionBase } from "chakra-react-select";

export interface RouteOption extends OptionBase {
  label: string;
  value: string;
}

export const mapFetchRoutersResponse = (response: any) => {
  return (
    response["data"].map((item: any) => {
      return {
        id: item["id"],
        name: item["nome"],
      };
    }) || []
  );
};


export const mapFetchRoutersAllResponse = (response: any) => {
  return (
    response["data"].map((item: any) => {
      return {
        id: item["id"],
        nome: item["nome"],
        horaIdaInicio: item["hora_ida_inicio"],
        horaIdaTermino: item["hora_ida_termino"],
        horaVoltaInicio: item["hora_volta_inicio"],
        horaVoltaTermino: item["hora_volta_termino"],
        turnoMatutino: item["turno_matutino"],
        turnoVespertino: item["turno_vespertino"],
        turnoNoturno: item["turno_noturno"],
        tipo: item["tipo"],
        escolas: item["escolas"],
        quantidadeAlunos: item["quantidade_alunos"],
        quantidadeDiasMes: item["quantidade_dias_mes"],
        quantidadeKm: item["quantidade_km"],
      };
    }) || []
  );
};

export const mapFetchRouteIdResponse = (response: any) => {
  return (
    {
      id: response["id"],
      name: response["nome"],
      departureTimeInit: response["hora_ida_inicio"],
      departureTimeFinish: response["hora_ida_termino"],
      backTimeInit: response["hora_volta_inicio"],
      backTimeFinish: response["hora_volta_termino"],
      checkedMatutino: response["turno_matutino"],
      checkedVespertino: response["turno_vespertino"],
      checkedNoturno: response["turno_noturno"],
      type: response["tipo"],
      schoolName: response["escolas"],
      quantityStudents: response["quantidade_alunos"],
      quantityDayMonth: response["quantidade_dias_mes"],
      quantityKm: response["quantidade_km"],
      created_at: response["created_at"],
      updated_at: response["updated_at"],
      deleted_at: response["deleted_at"],
    } || []
  );
};

export const mapFetchRoutesPaginationResponse = (response: any) => {
  return (
    {
      totalPages: response["last_page"],
      page: response["current_page"],
      totalPerPage: response["per_page"],
    } || []
  );
};
