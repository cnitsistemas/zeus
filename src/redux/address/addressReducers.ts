import { actionTypes } from ".";
import { RootState } from "./../store";

interface State {
  address: any;
  cep: any;
  addressByCEP: any;
  userAddress: any;
}

const initialState: State = {
  address: null,
  cep: null,
  addressByCEP: null,
  userAddress: null,
};

const AddressReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.SET_CEP: {
      newState = {
        ...state,
        cep: action.payload,
      };

      break;
    }

    case actionTypes.SET_ADDRESS_BY_CEP: {
      newState = {
        ...state,
        addressByCEP: action.payload,
      };

      break;
    }

    case actionTypes.SET_ADDRESS: {
      newState = {
        ...state,
        address: action.payload,
      };
      break;
    }

    case actionTypes.SET_USER_ADDRESS: {
      newState = {
        ...state,
        userAddress: action.payload,
      };
      break;
    }

    case actionTypes.SET_GEOLOCATION: {
      newState = {
        ...state,
        ...action.payload,
      };
      break;
    }

    default: {
      newState = state;

      break;
    }
  }

  return newState;
};

export default AddressReducer;
export const AddressState = (state: RootState) => state.address;
