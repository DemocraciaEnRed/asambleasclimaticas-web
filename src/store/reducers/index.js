// third-party
import { combineReducers } from 'redux';
import { persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'

// project import
import configReducer from "./config";
import languageReducer from './language';
import authReducer from './auth'
import alertReducer from './alert'

// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
  config: persistReducer(
    {
      key: 'config',
      storage,
    },
    configReducer),
  language: persistReducer(
    {
      key: 'Language',
      storage,
    },
    languageReducer),
  auth: persistReducer(
    {
      key: "token",
    storage,
  },
  authReducer
),
alert: alertReducer

});

export default reducers;
