import { Recipe } from "@/types/recipe";
import { CacheState } from "@/types/states/cache-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CacheState = {
  ingridientCache: {},
  keywordsCache: {},
  ingridients: [],
};

export const cacheSlice = createSlice({
  name: "_cache",
  initialState,
  reducers: {
    setIngridients: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        ingridients: action.payload,
      };
    },
    updateIngridientCache: (
      state,
      action: PayloadAction<{
        ingredient: string;
        recipes: Recipe[];
      }>
    ) => {
      return {
        ...state,
        ingridientCache: {
          ...state.ingridientCache,
          [action.payload.ingredient]: action.payload.recipes,
        },
      };
    },
    updateKeywordsCache: (
      state,
      action: PayloadAction<{
        keyword: string;
        recipes: Recipe[];
      }>
    ) => {
      return {
        ...state,
        keywordsCache: {
          ...state.keywordsCache,
          [action.payload.keyword]: action.payload.recipes,
        },
      };
    },
  },
});

export const { setIngridients, updateIngridientCache, updateKeywordsCache } =
  cacheSlice.actions;

export default cacheSlice.reducer;
