import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import { mapFetchConductorIdResponse, mapFetchConductorsResponse, mapFetchaConductorsPaginationResponse } from "@/domain/conductor";

export const fetchConductors = (page: number) => async (dispatch: Dispatch) => {
  try {
    const url = `api/condutores?page=${page}`;
    const apiResponse = await api.get(url);
    const response = mapFetchConductorsResponse(apiResponse.data);
    const responsePagination = mapFetchaConductorsPaginationResponse(apiResponse.data.data);

    dispatch({
      type: actionTypes.GET_CONDUCTORS_PAGINATION,
      payload: responsePagination
    })
    dispatch({
      type: actionTypes.GET_CONDUCTORS,
      payload: response
    })

    return response;
  } catch (e) {
    console.log(e);
  }
}

export const fetchConductorId = (id: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/condutores/${id}`;
    const apiResponse = await api.get(url);
    const response = mapFetchConductorIdResponse(apiResponse.data.data);

    if (apiResponse?.data.success) {
      dispatch({
        type: actionTypes.GET_CONDUCTORS_ID,
        payload: response
      })
      return {
        ...apiResponse.data,
        data: response,
      };
    } else {
      return {
        ...apiResponse.data,
        data: response,
      };
    }

  } catch (e) {
    console.log(e);
  }
}

export const createConductors = (data: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/condutores`;
    const apiResponse = await api.post(url, data);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.CREATE_CONDUCTORS,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e)
  }
}

export const editConductor = ({ id, data }: { id: string, data: any }) =>
  async (dispatch: Dispatch) => {
    try {
      const url = `api/condutores/${id}`;
      const apiResponse = await api.post(url, data);
      const response = apiResponse.data;

      if (response.success) {
        dispatch({
          type: actionTypes.EDIT_CONDUCTORS,
          payload: response
        })

        return response;
      }
    } catch (e) {
      console.log(e);
    }
  }

export const deleteConductors = (roleId: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/condutores/${roleId}`;
    const apiResponse = await api.delete(url);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.DELETE_CONDUCTORS,
        payload: response
      })


      return response;
    }
  } catch (e) {
    console.log(e);
  }
}