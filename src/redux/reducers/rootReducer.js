import { combineReducers } from 'redux';
import baseUrlReducer from './baseUrlReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  baseURL: baseUrlReducer,
  auth: authReducer,
});

export default rootReducer;