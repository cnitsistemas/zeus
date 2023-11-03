import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import { mapFetchAllVehiclesResponse, mapFetchVehiclesPaginationResponse, mapFetchVehiclesResponse, mapFetchVehiclesResponseId } from "@/domain/vehicles/vehiclesDTO";

export const fetchVehicles = (page: number) => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculos?page=${page}`;
    const apiResponse = await api.get(url);
    const response = mapFetchVehiclesResponse(apiResponse.data);
    const responsePagination = mapFetchVehiclesPaginationResponse(apiResponse.data.data);
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

export const fetchAllVehicles = () => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculos-all`;
    const apiResponse = await api.get(url);
    const response = mapFetchAllVehiclesResponse(apiResponse.data);

    dispatch({
      type: actionTypes.GET_ALL_ROUTES,
      payload: response,
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};

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

export const getVehiclesRoutes = (id: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculo-rotas?id=${id}`;
    const apiResponse = await api.get(url);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.GET_VEHICLES_ROUTES,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e)
  }
}

export const relationVehiclesRoutes = (data: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculo-rotas`;
    const apiResponse = await api.post(url, data);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.CREATE_VEHICLES_ROUTES,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e)
  }
}

export const deleteVehiclesRoutes = (id: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/veiculo-rotas/${id}`;
    const apiResponse = await api.delete(url);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.DELETE_VEHICLES_ROUTES,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e)
  }
}