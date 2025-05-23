import { Ingredient, SampleIngredient } from "@/types/ingredient";

export const convertIngredient = (
  ingredient: SampleIngredient
): Ingredient | null => {
  if (!ingredient.idIngredient || !ingredient.strIngredient) {
    return null;
  }

  return {
    id: ingredient.idIngredient,
    ingredient: ingredient.strIngredient,
    description: ingredient.strDescription,
    type: ingredient.strType,
  };
};

export const convertIngredientList = (
  ingredients: SampleIngredient[]
): { list: Ingredient[]; record: Record<string, Ingredient> } => {
  const record: Record<string, Ingredient> = {};
  const list = ingredients.reduce<Ingredient[]>((acc, ingredient) => {
    const converted = convertIngredient(ingredient);
    if (converted) {
      acc.push(converted);
      record[converted.ingredient] = converted;
    }
    return acc;
  }, []);

  return { list, record };
};
