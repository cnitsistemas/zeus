import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import withAuthHeader from "@/lib/withAuthHeader";
import { mapFetchRoutersResponse } from "@/domain/route/routeDTO";

export const fetchRoutes = () => async (dispatch: Dispatch) => {
  try {
    const url = `api/rotas`;
    const apiResponse = await api.get(url, {
      ...withAuthHeader(),
    });
    const response = mapFetchRoutersResponse(apiResponse.data);

    dispatch({
      type: actionTypes.SET_ROUTES,
      payload: response,
    });
  } catch (e) {
    console.log(e);
  }
};
