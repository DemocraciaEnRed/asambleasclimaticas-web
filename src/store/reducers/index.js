// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import configReducer from "./config";
import languageReducer from './language';

// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
  config: configReducer,
  language: persistReducer(
    {
      key: 'Language',
      storage,
    },
    languageReducer)

});

export default reducers;
