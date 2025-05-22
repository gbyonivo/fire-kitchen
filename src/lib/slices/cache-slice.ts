import { Ingredient } from "@/types/ingredient";
import { Recipe } from "@/types/recipe";
import { CacheState } from "@/types/states/cache-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: CacheState = {
  ingridientCache: {},
  recipeCache: {},
  keywordsCache: {},
  ingridients: [],
  fetchingIngridients: false,
  fetchingIngridientsError: null,
};

export const cacheSlice = createSlice({
  name: "_cache",
  initialState,
  reducers: {
    updateRecipeCache: (state, action: PayloadAction<Recipe>) => {
      return {
        ...state,
        recipeCache: {
          ...state.recipeCache,
          [action.payload.id]: action.payload,
        },
      };
    },
    setFetchingIngridients: (state) => {
      return {
        ...state,
        fetchingIngridients: true,
        fetchingIngridientsError: null,
      };
    },
    setFetchingIngridientsError: (
      state,
      action: PayloadAction<AxiosError | string>
    ) => {
      return {
        ...state,
        fetchingIngridientsError: action.payload,
        fetchingIngridients: false,
      };
    },
    setIngridients: (state, action: PayloadAction<Ingredient[]>) => {
      return {
        ...state,
        ingridients: action.payload,
        fetchingIngridients: false,
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

export const {
  setIngridients,
  updateIngridientCache,
  updateKeywordsCache,
  setFetchingIngridients,
  updateRecipeCache,
  setFetchingIngridientsError,
} = cacheSlice.actions;

export default cacheSlice.reducer;
