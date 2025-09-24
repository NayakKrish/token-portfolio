import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./slices/portfolioSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
