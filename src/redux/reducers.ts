import { combineReducers } from "redux";

// Import all reducers
import SingInReducer from "./singIn/singInReducers";
import StudantReducer from "./students/studentsReducers";
const reducers = combineReducers({
  singin: SingInReducer,
  students: StudantReducer,
});

export default reducers;
