import { combineReducers } from "redux";
import SingInReducer from "./modules/singIn/singInReducers";
import StudantReducer from "./modules/students/studentsReducers";
import RouteReducer from "./modules/routes/routesReducers";
import AddressReducer from "./modules/address/addressReducers";
import UserReducer from "./modules/users/usersReducers";
import RolesReducer from "./modules/roles/rolesReducers";

const reducers = combineReducers({
  singin: SingInReducer,
  students: StudantReducer,
  routes: RouteReducer,
  address: AddressReducer,
  users: UserReducer,
  roles: RolesReducer
});

export default reducers;
