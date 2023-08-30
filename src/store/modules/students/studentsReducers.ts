import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  students: any;
  editStudent: any;
  pagination: any;
}

const initialState: State = {
  students: null,
  editStudent: null,
  pagination: null,
};

const StudantReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.SET_STUDENTS: {
      newState = {
        ...state,
        students: action.payload,
      };

      break;
    }
    case actionTypes.SET_STUDENTS_ID: {
      newState = {
        ...state,
        editStudent: action.payload,
      };

      break;
    }
    case actionTypes.SET_STUDENTS_PAGINATION: {
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

export default StudantReducer;
export const StudantState = (state: RootState) => state.students;
