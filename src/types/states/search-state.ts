import { Recipe } from "../recipe";

export interface SearchState {
  fetching: boolean;
  recipes: Recipe[];
  error: string | null;
}
