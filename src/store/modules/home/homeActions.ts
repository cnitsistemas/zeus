import { Dispatch } from "redux";
import { actionTypes } from ".";
import api from "@/services/api";
import { mapFetchCountResponse, mapFetchLastRoutesResponse, mapFetchLastStudentsResponse } from "@/domain/home/homeDTO";

export const fetchDataDashboard = () => async (dispatch: Dispatch) => {
  try {
    const url = `api/dashboard`;
    const response = await api.get(url);
    const responseCount = mapFetchCountResponse(response.data.data);
    const responseLastStudents = mapFetchLastStudentsResponse(response.data.data);
    const responseLastRoutes = mapFetchLastRoutesResponse(response.data.data);

    dispatch({
      type: actionTypes.GET_DATA_DASHBOARD,
      payload: {
        totalStudents: responseCount.totalStudents,
        totalRoutes: responseCount.totalRoutes,
        totalUsers: responseCount.totalUsers,
        lastStudents: responseLastStudents,
        lastRoutes: responseLastRoutes
      }
    })

    return response
  } catch (e) {
    console.log(e)
  }
}