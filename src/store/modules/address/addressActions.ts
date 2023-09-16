import axios from "axios";
import { Dispatch } from "redux";
import { mapAddressByCEP } from "@/domain/address/addressDTO";
import { actionTypes } from ".";

export const fetchAddressByCEP = (cep: any) => async (dispatch: Dispatch) => {
  try {
    const noMaskCep = cep.replace(/\.|-/g, "") || "";

    const url = `https://brasilapi.com.br/api/cep/v2/${noMaskCep}`;
    const result = await axios.get(url);
    const mappedResult = mapAddressByCEP(result.data);
    const response = mappedResult;

    if (!!mappedResult.main) {
      dispatch({
        type: actionTypes.SET_CEP,
        payload: cep,
      })
      return response;
    }
  } catch (e) {
    console.log(e);
  }
}

export const setCEP = (cep: String) => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.SET_CEP,
    payload: cep,
  });
}

export const getAccessTokenConecta = () => async (dispatch: Dispatch) => {
  try {
    const url = `https://h-apigateway.conectagov.estaleiro.serpro.gov.br/oauth2/jwt-token`;
    const result = await axios.get(url);

    console.log(result);
  }
  catch {

  }
}