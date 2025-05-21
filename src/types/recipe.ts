export interface RecipeIngredient {
  name: string;
  measure: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  tags: string[];
  youtube: string;
  ingredients: RecipeIngredient[];
}
