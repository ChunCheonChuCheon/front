import { combineReducers } from 'redux';
import baseUrlReducer from './baseUrlReducer';
import authReducer from './authReducer';
import redirectReducer from './redirectReducer';

const rootReducer = combineReducers({
  baseURL: baseUrlReducer,
  auth: authReducer,
  redirect: redirectReducer,
});

export default rootReducer;