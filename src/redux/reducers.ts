import { combineReducers } from "redux";

// Import all reducers
import SingInReducer from "./singIn/singInReducers";
import StudantReducer from "./students/studentsReducers";
import RouteReducer from "./routes/routesReducers";
const reducers = combineReducers({
  singin: SingInReducer,
  students: StudantReducer,
  routes: RouteReducer,
});

export default reducers;
