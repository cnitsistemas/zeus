import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  totalStudents: number;
  totalRoutes: number;
  totalFrequency: number;
  totalUsers: number;
  lastStudents: any;
  lastRoutes: any
}

const initialState: State = {
  totalStudents: 0,
  totalRoutes: 0,
  totalFrequency: 0,
  totalUsers: 0,
  lastStudents: null,
  lastRoutes: null,
};

const HomeReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_DATA_DASHBOARD: {
      newState = {
        ...state,
        ...action.payload
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

export default HomeReducer;
export const HomeState = (state: RootState) => state.home;
