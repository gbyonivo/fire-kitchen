import { Recipe } from "../recipe";

export interface SearchState {
  searching: boolean;
  recipes: Recipe[];
  error: string | null;
}
