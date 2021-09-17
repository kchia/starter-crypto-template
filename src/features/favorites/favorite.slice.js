import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: {},
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoriteSelected: {
      reducer(state, { payload }) {
        state.favorite = payload;
      },
      prepare({ originalAssetId, name, imageUrl, type, assetContractAddress }) {
        return {
          payload: {
            originalAssetId,
            name,
            imageUrl,
            type,
            assetContractAddress,
          },
        };
      },
    },
  },
});

const selectFavorite = ({ favorite: { favorite } }) => favorite;
const { reducer: favoriteReducer } = favoriteSlice;
const { favoriteSelected } = favoriteSlice.actions;

export { favoriteReducer, favoriteSelected, selectFavorite };
