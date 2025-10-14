import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import searchReducer from "../searchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootStore = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
