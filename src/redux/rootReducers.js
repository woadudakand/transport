import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import UsersReducer from './users/reducers';
import placesReducer from './places/reducers';
import branchReducer from './branch/reducers';
import articlesReducer from './articles/reducers';
import employeeReducer from './employee/reducers';
import bankReducer from './banks/reducers';
import bankAccountReducer from './bankAccounts/reducers';
import driversReducer from './driver/reducers';
import customersReducer from './customers/reducers';
import vehiclesReducer from './vehicles/reducers';
import VtypeReducer from './vehicleType/reducers';
import SupplierReducer from './supplier/reducers';

const rootReducers = combineReducers({
  users: UsersReducer,
  auth: authReducer,
  ChangeLayoutMode,
  places: placesReducer,
  branches: branchReducer,
  articles: articlesReducer,
  employees: employeeReducer,
  bank: bankReducer,
  accounts: bankAccountReducer,
  driver: driversReducer,
  customer: customersReducer,
  vehicle: vehiclesReducer,
  vtype: VtypeReducer,
  suppliers: SupplierReducer,
});

export default rootReducers;
