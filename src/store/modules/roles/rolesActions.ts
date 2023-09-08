import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import withAuthHeader from "@/lib/withAuthHeader";
import { mapFetchAllRolesResponse, mapFetchRolesPaginationResponse, mapFetchRolesResponse, mapFetchRolesResponseId } from "@/domain/roles/rolesDTO";

export const fetchAllRoles = () => async (dispatch: Dispatch) => {
  try {
    const url = `api/roles-all`;
    const apiResponse = await api.get(url, {
      ...withAuthHeader()
    });

    const response = mapFetchAllRolesResponse(apiResponse.data);

    dispatch({
      type: actionTypes.GET_ALL_ROLES,
      payload: response
    })

    return response;
  } catch (e) {
    console.log(e);
  }
}

export const fetchRoles = (page: number) => async (dispatch: Dispatch) => {
  try {
    const url = `api/roles?page=${page}`;
    const apiResponse = await api.get(url, {
      ...withAuthHeader()
    });
    const response = mapFetchRolesResponse(apiResponse.data.data);
    const responsePagination = mapFetchRolesPaginationResponse(apiResponse.data.data);
    dispatch({
      type: actionTypes.GET_ROLES_PAGINATION,
      payload: responsePagination
    })
    dispatch({
      type: actionTypes.GET_ROLES,
      payload: response
    })

    return response;
  } catch (e) {
    console.log(e);
  }
}

export const fetchRoleId = (id: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/roles/${id}`;
    const apiResponse = await api.get(url, {
      ...withAuthHeader()
    });
    const response = mapFetchRolesResponseId(apiResponse.data.data);

    dispatch({
      type: actionTypes.GET_ROLES_ID,
      payload: response
    })
    return response
  } catch (e) {
    console.log(e);
  }
}

export const createRoles = (data: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/roles`;
    const apiResponse = await api.post(url, data, {
      ...withAuthHeader()
    });
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.CREATE_ROLES,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e)
  }
}

export const editRole = ({ id, data }: { id: string, data: any }) =>
  async (dispatch: Dispatch) => {
    try {
      const url = `api/roles/${id}`;
      const apiResponse = await api.post(url, data, {
        ...withAuthHeader()
      });
      const response = apiResponse.data;

      if (response.success) {
        dispatch({
          type: actionTypes.EDIT_ROLES,
          payload: response
        })

        return response;
      }
    } catch (e) {
      console.log(e);
    }
  }

export const deleteRoles = (roleId: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/roles/${roleId}`;
    const apiResponse = await api.delete(url, {
      ...withAuthHeader()
    });
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.DELETE_ROLES,
        payload: response
      })


      return response;
    }
  } catch (e) {
    console.log(e);
  }
}