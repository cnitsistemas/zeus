interface Response {
  data: Route[]
}

interface Route {
  id: number;
  nome: string;
  hora_ida_inicio: string;
  hora_ida_termino: string;
  turno_matutino: number;
  turno_vespertino: number;
  turno_noturno: number;
  hora_volta_inicio: string;
  hora_volta_termino: string;
  latitude_inicio: string;
  longitude_inicio: string;
  latitude_termino: string;
  longitude_termino: string;
  tempo: string;
  tipo: string;
  escolas: string;
  quantidade_alunos: string;
  quantidade_dia_mes: string;
  quantidade_km: string;
}

export const mapReportRouterResponse = (response: Response) => {
  return (
    response["data"].map((item: Route) => {
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
        quantidadeDiasMes: item["quantidade_dia_mes"],
        quantidadeKm: item["quantidade_km"],
      };
    }) || []
  );
};

export const mapReportStudentResponse = (response: any) => {
  return (
    response["data"].map((item: any) => {
      return {
        id: item["id"],
        nome: item["nome"],
        serie: item["serie"],
        ensino: item["ensino"],
        turno: item["turno"],
        route: item["route"]["nome"],
      };
    }) || []
  );
};