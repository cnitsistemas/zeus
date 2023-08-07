import { actionTypes } from ".";

interface State {
  routes: any;
}

const initialState: State = {
  routes: null,
};

const RouteReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.SET_ROUTES: {
      newState = {
        ...state,
        routes: action.payload,
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

export default RouteReducer;
