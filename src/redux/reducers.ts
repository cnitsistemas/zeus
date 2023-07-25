import { combineReducers } from "redux";

// Import all reducers
import SingInReducer from "./singIn/singInReducers";

const reducers = combineReducers({
  singin: SingInReducer,
});

export default reducers;
