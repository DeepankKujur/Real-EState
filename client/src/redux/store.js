import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice";


export const store = configureStore({
  reducer: {
    user:userReducer
  },
  //we have  to use a middleware to prevent any serializable check in the browser in some cases the browser show serializable error in the console so to avoid that we have to use this middleware in the store
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false,
  }),
})