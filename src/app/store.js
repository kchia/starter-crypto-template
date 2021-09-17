import { configureStore } from "@reduxjs/toolkit";
import { coinsReducer } from "../features/coins/coins.slice";
import { coinReducer } from "../features/coins/coin.slice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    coin: coinReducer,
  },
});
