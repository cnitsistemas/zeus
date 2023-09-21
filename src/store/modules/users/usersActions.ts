import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import withAuthHeader from "@/utils/withAuthHeader";
import { mapFetchUserResponseId, mapFetchUsersPaginationResponse, mapFetchUsersResponse } from "@/domain/users/usersDTO";

export const fetchUsers = (page: number) => async (dispatch: Dispatch) => {

  try {
    const url = `api/users?page=${page}`;
    const apiResponse = await api.get(url);
    const response = mapFetchUsersResponse(apiResponse.data.data);
    const responsePagination = mapFetchUsersPaginationResponse(apiResponse.data.data);

    dispatch({
      type: actionTypes.GET_USERS_PAGINATION,
      payload: responsePagination
    })
    dispatch({
      type: actionTypes.GET_USERS,
      payload: response
    })

    return response;
  } catch (e) {
    console.log(e);
  }

}

export const fetchUserId = (id: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/users/${id}`;
    const apiResponse = await api.get(url);
    const response = mapFetchUserResponseId(apiResponse.data.data);

    if (apiResponse?.data.success) {
      dispatch({
        type: actionTypes.GET_USERS_ID,
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

export const createUsers = (data: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/users`;
    const apiResponse = await api.post(url, data);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.CREATE_USERS,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e);
  }
}

export const editUser = ({ id, data }: { id: string, data: any }) => async (dispatch: Dispatch) => {
  try {
    const url = `api/users/${id}`;
    const apiResponse = await api.post(url, data);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.EDIT_USERS,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e)
  }
}

export const deleteUsers = (roleId: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/users/${roleId}`;
    const apiResponse = await api.delete(url);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.DELETE_USERS,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e);
  }
}

export const applyRoleToUser = ({ id, data }: { id: string, data: any }) => async (dispatch: Dispatch) => {
  try {
    const url = `api/user-role/${id}`;
    const apiResponse = await api.post(url, data);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.APPLY_ROLE_TO_USER,
        payload: response
      })

      return response;
    }
  } catch (e) {
    console.log(e)
  }
}