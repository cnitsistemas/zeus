import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import { mapReportRouterResponse, mapReportStudentResponse } from "@/domain/reports";

export const fetchReportRoutes = (
  descricao: string | null,
  school: string | null,
  type: string | null,
  morning: string,
  afternoon: string,
  nocturnal: string) => async (dispatch: Dispatch) => {
    try {
      const url = `api/relatorio-rota?descricao=${descricao}&escola=${school}&tipo=${type}&matutino=${morning}&vespertino=${afternoon}&noturno=${nocturnal}`;
      const apiResponse = await api.get(url);
      const response = mapReportRouterResponse(apiResponse.data);

      dispatch(setRouterResponse(response))

      return response;
    } catch (e) {
      console.log(e);
    }
  }

export const setRouterResponse = (reports: any) => ({
  type: actionTypes.GET_ROUTER_REPORTS,
  payload: reports
})


export const fetchReportStudents = (
  name: string | null,
  school: string | null,
  route: string | null,
  shift: string) => async (dispatch: Dispatch) => {
    try {
      const url = `api/relatorio-alunos?nome=${name}&escola=${school}&rota=${route}&turno=${shift}`;
      const apiResponse = await api.get(url);
      const response = mapReportStudentResponse(apiResponse.data);

      dispatch(setStudentResponse(response))

      return response;
    } catch (e) {
      console.log(e);
    }
  }

export const setStudentResponse = (reports: any) => ({
  type: actionTypes.GET_STUDENT_REPORTS,
  payload: reports
})
