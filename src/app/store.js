import { configureStore } from "@reduxjs/toolkit";
import { coinsReducer } from "../features/coins/coins.slice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});
