// third-party
import { combineReducers } from 'redux';
import { persistCombineReducers, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// project import
import sliceReducer from "./slicer";


// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
  slice: persistReducer(
    {
      key: 'config',
      storage: storage,
    },
    sliceReducer)

});

export default reducers;
