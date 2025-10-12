import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootStore = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
