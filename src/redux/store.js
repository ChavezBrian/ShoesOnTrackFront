import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [],
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;
