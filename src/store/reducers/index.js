// third-party
import { combineReducers } from 'redux';
import { persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import configReducer from "./config";

// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
  config: configReducer,
  

});

export default reducers;
