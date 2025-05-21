import { AxiosError } from "axios";
import { Ingredient } from "../ingredient";
import { Recipe } from "../recipe";

export interface CacheState {
  ingridientCache: Record<string, Recipe[]>;
  keywordsCache: Record<string, Recipe[]>;
  ingridients: Ingredient[];
  fetchingIngridients: boolean;
  fetchingIngridientsError: AxiosError | string | null;
}
