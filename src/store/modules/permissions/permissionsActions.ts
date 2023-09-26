import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import { mapFetchAllPermissionsResponse } from "@/domain/permission";

export const fetchAllPermissions = () => async (dispatch: Dispatch) => {
  try {
    const url = `api/permissions-all`;
    const apiResponse = await api.get(url);
    const response = mapFetchAllPermissionsResponse(apiResponse.data);

    dispatch({
      type: actionTypes.GET_ALL_PERMISSIONS,
      payload: response
    })

    return response;
  } catch (e) {
    console.log(e);
  }
}