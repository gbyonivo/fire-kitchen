import { Recipe } from "@/types/recipe";
import { SearchState } from "@/types/states/search-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchState = {
  searching: false,
  recipes: [],
  error: null,
};

// TODO: Might leave this in component, think about it

export const searchSlice = createSlice({
  name: "_search",
  initialState,
  reducers: {
    setSearching: (state) => {
      return {
        ...state,
        searching: true,
        error: null,
      };
    },
    searchSuccess: (state, action: PayloadAction<Recipe[]>) => {
      return {
        ...state,
        searching: false,
        recipes: action.payload,
      };
    },
    searchError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searching: false,
        error: action.payload,
      };
    },
  },
});

export const { setSearching, searchSuccess, searchError } = searchSlice.actions;

export default searchSlice.reducer;
