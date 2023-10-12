import { combineReducers } from "redux";
import SingInReducer from "./modules/singIn/singInReducers";
import StudantReducer from "./modules/students/studentsReducers";
import RouteReducer from "./modules/routes/routesReducers";
import AddressReducer from "./modules/address/addressReducers";
import UserReducer from "./modules/users/usersReducers";
import RolesReducer from "./modules/roles/rolesReducers";
import PermissionsReducer from "./modules/permissions/permissionsReducers";
import HomeReducer from "./modules/home/homeReducers";
import VehiclesReducer from "./modules/vehicles/vehiclesReducers";
import ConductorsReducer from "./modules/conductors/conductorsReducers";

const reducers = combineReducers({
  singin: SingInReducer,
  students: StudantReducer,
  routes: RouteReducer,
  address: AddressReducer,
  users: UserReducer,
  roles: RolesReducer,
  permissions: PermissionsReducer,
  home: HomeReducer,
  vehicles: VehiclesReducer,
  conductors: ConductorsReducer
});

export default reducers;
