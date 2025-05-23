import { Ingredient } from "@/types/ingredient";
import { Recipe } from "@/types/recipe";
import { CacheState } from "@/types/states/cache-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: CacheState = {
  ingridientCache: {},
  recipeCache: {},
  ingredients: [],
  fetchingIngredients: false,
  fetchingIngredientsError: null,
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
    setFetchingIngredients: (state) => {
      return {
        ...state,
        fetchingIngredients: true,
        fetchingIngredientsError: null,
      };
    },
    setFetchingIngredientsError: (
      state,
      action: PayloadAction<AxiosError | string>
    ) => {
      return {
        ...state,
        fetchingIngredientsError: action.payload,
        fetchingIngredients: false,
      };
    },
    setIngredients: (
      state,
      action: PayloadAction<{
        list: Ingredient[];
        record: Record<string, Ingredient>;
      }>
    ) => {
      return {
        ...state,
        ingredients: action.payload.list,
        ingridientCache: action.payload.record,
        fetchingIngredients: false,
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
  setIngredients,
  updateIngridientCache,
  setFetchingIngredients,
  updateRecipeCache,
  setFetchingIngredientsError,
} = cacheSlice.actions;

export default cacheSlice.reducer;
