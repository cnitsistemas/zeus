import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import { mapFetchVehiclesPaginationResponse, mapFetchVehiclesResponse, mapFetchVehiclesResponseId } from "@/domain/vehicles/vehiclesDTO";

export const fetchVehicles = (page: number) => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculos?page=${page}`;
    const apiResponse = await api.get(url);
    const response = mapFetchVehiclesResponse(apiResponse.data);
    const responsePagination = mapFetchVehiclesPaginationResponse(apiResponse.data.data);
    console.log(response)
    dispatch({
      type: actionTypes.GET_VEHICLES_PAGINATION,
      payload: responsePagination
    })
    dispatch({
      type: actionTypes.GET_VEHICLES,
      payload: response
    })

    return response;
  } catch (e) {
    console.log(e);
  }
}

export const fetchVehiclesId = (id: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculos/${id}`;
    const apiResponse = await api.get(url);
    const response = mapFetchVehiclesResponseId(apiResponse.data.data);

    if (apiResponse?.data.success) {
      dispatch({
        type: actionTypes.GET_VEHICLES_ID,
        payload: response,
      });

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

export const createVehicles = (data: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculos`;
    const apiResponse = await api.post(url, data);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.CREATE_VEHICLES,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e)
  }
}

export const editVehicle = ({ id, data }: { id: string, data: any }) =>
  async (dispatch: Dispatch) => {
    try {
      const url = `api/veiculos/${id}`;
      const apiResponse = await api.post(url, data);
      const response = apiResponse.data;

      if (response.success) {
        dispatch({
          type: actionTypes.EDIT_VEHICLES,
          payload: response
        })

        return response;
      }
    } catch (e) {
      console.log(e);
    }
  }

export const deleteVehicles = (roleId: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculos/${roleId}`;
    const apiResponse = await api.delete(url);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.DELETE_VEHICLES,
        payload: response
      })


      return response;
    }
  } catch (e) {
    console.log(e);
  }
}