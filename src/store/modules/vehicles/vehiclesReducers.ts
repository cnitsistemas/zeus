import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  vehicles: any;
  editVehicles: any;
  pagination: any;
}

const initialState: State = {
  vehicles: null,
  editVehicles: null,
  pagination: null,
};

const VehiclesReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_VEHICLES: {
      newState = {
        ...state,
        vehicles: action.payload,
      };

      break;
    }

    case actionTypes.GET_VEHICLES_ID: {
      newState = {
        ...state,
        editVehicles: action.payload,
      };

      break;
    }

    case actionTypes.GET_VEHICLES_PAGINATION: {
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

export default VehiclesReducer;
export const VehicleState = (state: RootState) => state.vehicles;
