import { AxiosError } from "axios";
import { Ingredient } from "../ingredient";
import { Recipe } from "../recipe";

export interface CacheState {
  ingridientCache: Record<string, Ingredient>;
  recipeCache: Record<string, Recipe>;
  ingredients: Ingredient[];
  fetchingIngredients: boolean;
  fetchingIngredientsError: AxiosError | string | null;
}
