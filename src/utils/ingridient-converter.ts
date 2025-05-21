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
): Ingredient[] => {
  return ingredients.reduce<Ingredient[]>((acc, ingredient) => {
    const converted = convertIngredient(ingredient);
    if (converted) {
      acc.push(converted);
    }
    return acc;
  }, []);
};
