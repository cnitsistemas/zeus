import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import { mapFetchRouteIdResponse, mapFetchRoutersAllResponse, mapFetchRoutersResponse, mapFetchRoutesPaginationResponse } from "@/domain/route/routeDTO";


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

export const fetchRoutes = (page: number) => async (dispatch: Dispatch) => {
  try {
    const url = `api/rotas?page=${page}`;
    const apiResponse = await api.get(url);
    const response = mapFetchRoutersAllResponse(apiResponse.data.data);
    const responsePagination = mapFetchRoutesPaginationResponse(
      apiResponse.data.data
    );

    dispatch({
      type: actionTypes.SET_ROUTE_PAGINATION,
      payload: responsePagination,
    });
    dispatch({
      type: actionTypes.SET_ROUTES,
      payload: response,
    });

    return {
      ...apiResponse.data,
      data: response,
    };
  } catch (e) {
    console.log(e);
  }
};

export const fetchRoutesId = (id: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/rotas/${id}`;
    const apiResponse = await api.get(url);
    const response = mapFetchRouteIdResponse(apiResponse.data.data);

    dispatch({
      type: actionTypes.SET_ROUTE_ID,
      payload: response,
    });
    return {
      ...apiResponse.data,
      data: response,
    };
  } catch (e) {
    console.log(e);
  }
};

export const createRoutes = (data: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/rotas`;
    const apiResponse = await api.post(url, data);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.CREATE_ROUTE,
        payload: response,
      });

      return {
        success: response.success,
        data: response?.data,
      };
    } else {
      return {
        success: response.success,
        data: [],
      };
    }
  } catch (e) {
    console.log(e)
  }
};

export const editRoute =
  ({ id, data }: { id: string, data: any }) =>
    async (dispatch: Dispatch) => {
      try {
        const url = `api/rotas/${id}`;
        const apiResponse = await api.post(url, data);
        const response = apiResponse.data;

        if (response.success) {
          dispatch({
            type: actionTypes.EDIT_ROUTE,
            payload: response,
          });

          return {
            success: response.success,
            data: response?.data,
          };
        } else {
          return {
            success: response.success,
            data: [],
          };
        }
      } catch (e) {
        console.log(e)
      }
    };

export const deleteRoute = (routeId: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/rotas/${routeId}`;
    const apiResponse = await api.delete(url);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.DELETE_ROUTE,
        payload: response,
      });

      return {
        success: response.success,
        data: response?.data,
      };
    } else {
      return {
        success: response.success,
        data: [],
      };
    }
  } catch (e) {
    console.log(e);
  }
};