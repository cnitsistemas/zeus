import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  auth: any;
  signUp: any;
  requiredAuth: boolean;
  methodAccess: any;
  permissions: any[];
}

const initialState: State = {
  auth: null,
  signUp: {},
  requiredAuth: false,
  methodAccess: null,
  permissions: [],
};

const SingInReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.SET_ACCESS_USER: {
      newState = {
        ...state,
        auth: action.payload,
      };
      break;
    }
    case actionTypes.SET_REQUIRED: {
      newState = {
        ...state,
        requiredAuth: action.payload,
      };
      break;
    }
    case actionTypes.SET_SIGN_UP: {
      newState = {
        ...state,
        signUp: action.payload,
      };
      break;
    }
    case actionTypes.SET_LOGOUT: {
      newState = {
        ...state,
        auth: action.payload,
      };
      break;
    }
    case actionTypes.SET_ACCESS_PERMISSIONS: {
      newState = {
        ...state,
        permissions: action.payload,
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

export default SingInReducer;
export const SingInState = (state: RootState) => state.singin;
