import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  routes: any;
  allRoutes: any;
  pagination: any;
}

const initialState: State = {
  routes: null,
  allRoutes: null,
  pagination: null
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

    case actionTypes.SET_ALL_ROUTES: {
      newState = {
        ...state,
        allRoutes: action.payload,
      };

      break;
    }
    case actionTypes.SET_ROUTE_PAGINATION: {
      newState = {
        ...state,
        pagination: action.payload,
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
export const RouteState = (state: RootState) => state.routes;
