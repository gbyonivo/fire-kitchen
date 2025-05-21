import { Recipe } from "@/types/recipe";
import { SearchState } from "@/types/states/search-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchState = {
  fetching: false,
  recipes: [],
  error: null,
};

// TODO: Might leave this in component, think about it

export const searchSlice = createSlice({
  name: "_search",
  initialState,
  reducers: {
    setFetching: (state) => {
      return {
        ...state,
        fetching: true,
        error: null,
      };
    },
    fetchSuccess: (state, action: PayloadAction<Recipe[]>) => {
      return {
        ...state,
        fetching: false,
        recipes: action.payload,
      };
    },
    fetchError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    },
  },
});

export const { setFetching, fetchSuccess, fetchError } = searchSlice.actions;

export default searchSlice.reducer;
