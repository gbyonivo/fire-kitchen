import { Ingredient } from "@/types/ingredient";
import { Recipe } from "@/types/recipe";
import { CacheState } from "@/types/states/cache-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: CacheState = {
  ingridientCache: {},
  recipeCache: {},
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
    setIngridients: (
      state,
      action: PayloadAction<{
        list: Ingredient[];
        record: Record<string, Ingredient>;
      }>
    ) => {
      return {
        ...state,
        ingridients: action.payload.list,
        ingridientCache: action.payload.record,
        fetchingIngridients: false,
      };
    },
    updateIngridientCache: (state, action: PayloadAction<Ingredient>) => {
      return {
        ...state,
        ingridientCache: {
          ...state.ingridientCache,
          [action.payload.id]: action.payload,
        },
      };
    },
  },
});

export const {
  setIngridients,
  updateIngridientCache,
  setFetchingIngridients,
  updateRecipeCache,
  setFetchingIngridientsError,
} = cacheSlice.actions;

export default cacheSlice.reducer;
