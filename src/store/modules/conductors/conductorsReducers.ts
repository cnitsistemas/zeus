import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  conductors: any;
  editConductor: any;
  pagination: any;
}

const initialState: State = {
  conductors: null,
  editConductor: null,
  pagination: null,
};

const ConductorsReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_CONDUCTORS: {
      newState = {
        ...state,
        conductors: action.payload,
      };

      break;
    }

    case actionTypes.GET_CONDUCTORS_ID: {
      newState = {
        ...state,
        editConductor: action.payload,
      };

      break;
    }

    case actionTypes.GET_CONDUCTORS_PAGINATION: {
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

export default ConductorsReducer;
export const ConductorState = (state: RootState) => state.conductors;
