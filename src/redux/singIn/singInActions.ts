import axios from "axios";
import { actionTypes } from ".";
import { mapLoginCreateData } from "@/domain/singIn";
import { Dispatch } from "redux";

interface Credentials {
  email: string;
  password: string;
}

export const handleSingIn =
  (credentials: Credentials) => async (dispatch: Dispatch) => {
    try {
      const url = `https://cnit-homolog.herokuapp.com/api/login`;
      const response = await axios.post(url, credentials);
      const result = mapLoginCreateData(response.data.result);
      // const mappedPermissions = mapPermissionData(result.data.result);
      if (result.success) {
        dispatch(setAccessUser(result));
        // dispatch(setPermissions(mappedPermissions));
        return result;
      }
      return result;
    } catch (e: unknown) {
      console.log(e);
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
