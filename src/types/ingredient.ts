export interface SampleIngredient {
  idIngredient?: string;
  strIngredient?: string;
  strDescription?: string;
  strType?: string;
}

export function isSampleIngredient(
  ingredient: unknown
): ingredient is SampleIngredient {
  return (
    typeof ingredient === "object" &&
    ingredient !== null &&
    "idIngredient" in ingredient &&
    "strIngredient" in ingredient
  );
}

export interface Ingredient {
  id: string;
  ingredient: string;
  description?: string;
  type?: string;
}
