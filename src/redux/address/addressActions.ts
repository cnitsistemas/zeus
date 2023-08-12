import axios from "axios";
import { Dispatch } from "redux";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { AddressState } from "./addressReducers";
import { mapAddressByCEP } from "@/domain/address/addressDTO";
import { actionTypes } from ".";

export const setCEP = (cep: String) => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.SET_CEP,
    payload: cep,
  });
};

export const fetchAddressByCEP =
  (callback: any) => async (dispatch: Dispatch, getState: UseSelector) => {
    const callbackErrorFilter =
      callback &&
      callback.filter(
        (filteredItem: any) =>
          filteredItem.name === "address-by-cep" &&
          filteredItem.type === "error"
      );
    const callbackError =
      callbackErrorFilter &&
      callbackErrorFilter[0] &&
      callbackErrorFilter[0].callback;
    const callbackSuccessFilter =
      callback &&
      callback.filter(
        (filteredItem: any) =>
          filteredItem.name === "address-by-cep" &&
          filteredItem.type === "success"
      );
    const callbackSuccess =
      callbackSuccessFilter &&
      callbackSuccessFilter[0] &&
      callbackSuccessFilter[0].callback;

    try {
      const state = getState(AddressState);
      const noMaskCep =
        (state?.address && state?.address?.cep.replace(/\.|-/g, "")) || "";

      const url = `https://viacep.com.br/ws/${noMaskCep}/json/`;
      const result = await axios.get(url);
      const mappedResult = mapAddressByCEP(result.data);
      const response = mappedResult;

      if (!!mappedResult.main) {
        // await dispatch(fetchGeolocation(mappedResult))

        callbackSuccess && callbackSuccess(response);

        return;
      }
    } catch (e) {
      callbackError && callbackError();

      console.log(e);
    }
  };
