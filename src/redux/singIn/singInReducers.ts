import { actionTypes } from ".";

let singIn = JSON.parse(sessionStorage.getItem("auth") || "{}");

const initialState = {
  auth: null,
  signUp: {},
  requiredAuth: false,
  methodAccess: null,
  permissions: [],
};

const SingInReducer = (state = singIn || initialState, action: any) => {
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
    case actionTypes.SET_METHOD_LOGIN: {
      newState = {
        ...state,
        methodAccess: action.payload,
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
  if (newState) {
    sessionStorage.setItem("auth", JSON.stringify(newState));
  } else {
    sessionStorage.removeItem("auth");
  }
  return newState;
};

export default SingInReducer;
