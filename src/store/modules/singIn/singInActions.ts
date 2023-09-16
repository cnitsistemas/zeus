import axios from "axios";
import { actionTypes } from ".";
import { mapLoginCreateData } from "@/domain/singIn";
import { Dispatch } from "redux";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

interface Credentials {
  email: string;
  password: string;
}

export const handleSingIn =
  (credentials: Credentials) => async (dispatch: Dispatch) => {
    try {
      const url = `api/login`;
      const response = await api.post(url, credentials);
      const data = response.data
      const result = mapLoginCreateData(data.result);
      // const mappedPermissions = mapPermissionData(result.data.result);
      if (result.success) {
        dispatch(setAccessUser(result));
        // dispatch(setPermissions(mappedPermissions));
        return result;
      }
      return result;
    } catch (e: any) {
      return e?.response
    }
  };

export const handleSingOut = (token: String) => async (dispatch: Dispatch) => {
  try {
    dispatch(singOut(token));
  } catch (e: unknown) {
    console.log(e);
  }
};

export const singOut = (token: String) => ({
  type: actionTypes.SET_LOGOUT,
  payload: {},
});

export const setAccessUser = (accessUser: any) => ({
  type: actionTypes.SET_ACCESS_USER,
  payload: accessUser,
});
