import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  permissions: any;
  allPermissions: any;
  editPermission: any;
  pagination: any;
}

const initialState: State = {
  permissions: null,
  allPermissions: null,
  editPermission: null,
  pagination: null,
};

const PermissionsReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_PERMISSIONS: {
      newState = {
        ...state,
        permissions: action.payload,
      };

      break;
    }

    case actionTypes.GET_ALL_PERMISSIONS: {
      newState = {
        ...state,
        allPermissions: action.payload,
      };

      break;
    }


    case actionTypes.GET_PERMISSIONS_ID: {
      newState = {
        ...state,
        editPermission: action.payload,
      };

      break;
    }

    case actionTypes.GET_PERMISSIONS_PAGINATION: {
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

export default PermissionsReducer;
export const PermissionState = (state: RootState) => state.permissions;
