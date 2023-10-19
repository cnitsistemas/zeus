import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import { mapReportRouterResponse } from "@/domain/reports";

export const fetchReportRoutes = (descricao: string | null, school: string | null) => async (dispatch: Dispatch) => {
  try {
    const url = `api/relatorio-rota?descricao=${descricao}&escola=${school}`;
    const apiResponse = await api.get(url);
    console.log(apiResponse)
    const response = mapReportRouterResponse(apiResponse.data);

    dispatch({
      type: actionTypes.GET_ROUTER_REPORTS,
      payload: response
    })

    return response;
  } catch (e) {
    console.log(e);
  }
}