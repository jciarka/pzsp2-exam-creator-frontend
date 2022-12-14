import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer, // combined reducers actions
  {}, // default state (empty)
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
