import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import { mapFetchRoutersResponse } from "@/domain/route/routeDTO";


export const fetchAllRoutes = () => async (dispatch: Dispatch) => {
  try {
    const url = `api/rota-all`;
    const apiResponse = await api.get(url);
    const response = mapFetchRoutersResponse(apiResponse.data);

    dispatch({
      type: actionTypes.SET_ALL_ROUTES,
      payload: response,
    });
  } catch (e) {
    console.log(e);
  }
};
