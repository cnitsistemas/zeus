import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  users: any;
  editUsers: any;
  pagination: any;
}

const initialState: State = {
  users: null,
  editUsers: null,
  pagination: null,
};

const UserReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_USERS: {
      newState = {
        ...state,
        users: action.payload,
      };

      break;
    }

    case actionTypes.GET_USERS_ID: {
      newState = {
        ...state,
        editUsers: action.payload,
      };

      break;
    }

    case actionTypes.GET_USERS_PAGINATION: {
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

export default UserReducer;
export const UserState = (state: RootState) => state.users;
