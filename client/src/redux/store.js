import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from 'redux-persist'

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: 'root',
  storage,
  version:1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  //we have  to use a middleware to prevent any serializable check in the browser in some cases the browser show serializable error in the console so to avoid that we have to use this middleware in the store
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false,
  }),
})

export const persistor = persistStore(store);