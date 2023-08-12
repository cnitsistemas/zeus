import { combineReducers } from "redux";

// Import all reducers
import SingInReducer from "./singIn/singInReducers";
import StudantReducer from "./students/studentsReducers";
import RouteReducer from "./routes/routesReducers";
import AddressReducer from "./address/addressReducers";
const reducers = combineReducers({
  singin: SingInReducer,
  students: StudantReducer,
  routes: RouteReducer,
  address: AddressReducer,
});

export default reducers;
