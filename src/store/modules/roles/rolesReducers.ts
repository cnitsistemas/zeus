import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  roles: any;
  allRoles: any;
  editRoles: any;
  pagination: any;
}

const initialState: State = {
  roles: null,
  allRoles: null,
  editRoles: null,
  pagination: null,
};

const RolesReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_ROLES: {
      newState = {
        ...state,
        roles: action.payload,
      };

      break;
    }

    case actionTypes.GET_ALL_ROLES: {
      newState = {
        ...state,
        allRoles: action.payload,
      };

      break;
    }


    case actionTypes.GET_ROLES_ID: {
      newState = {
        ...state,
        editRoles: action.payload,
      };

      break;
    }

    case actionTypes.GET_ROLES_PAGINATION: {
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

export default RolesReducer;
export const RoleState = (state: RootState) => state.roles;
