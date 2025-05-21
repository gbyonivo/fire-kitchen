import { Recipe } from "../recipe";

export interface CacheState {
  ingridientCache: Record<string, Recipe[]>;
  keywordsCache: Record<string, Recipe[]>;
  ingridients: string[];
}
