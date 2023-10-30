import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  routesReports: any;
  studentsReport: any;
  frequencyReports: any;
}

const initialState: State = {
  routesReports: null,
  studentsReport: null,
  frequencyReports: null,
};

const ReportsReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_ROUTER_REPORTS: {
      newState = {
        ...state,
        routesReports: action.payload,
      };

      break;
    }

    case actionTypes.GET_FREQUENCY_REPORTS: {
      newState = {
        ...state,
        frequencyReports: action.payload,
      };

      break;
    }
    case actionTypes.GET_STUDENT_REPORTS: {
      newState = {
        ...state,
        studentsReport: action.payload,
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

export default ReportsReducer;
export const ReportState = (state: RootState) => state.reports;
