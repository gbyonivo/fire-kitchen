import { RecipeIngredient, Recipe } from "@/types/recipe";
import { isSampleRecipe, SampleRecipe } from "@/types/sample-recipe";

const getIngredients = (response: SampleRecipe): RecipeIngredient[] => {
  const ingredients: RecipeIngredient[] = [];
  for (let i = 1; i <= 20; i++) {
    // @ts-expect-error Dynamic property access on SampleRecipe type
    const ingredient = response[`strIngredient${i}`];
    // @ts-expect-error Dynamic property access on SampleRecipe type
    const measure = response[`strMeasure${i}`] || null;
    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure,
      });
    }
  }
  return ingredients;
};

export const convertRecipe = (response: unknown): Recipe | null => {
  if (!response || typeof response !== "object") {
    return null;
  }

  if (isSampleRecipe(response)) {
    return {
      id: response.idMeal,
      name: response.strMeal,
      category: response.strCategory,
      area: response.strArea,
      instructions: response.strInstructions,
      thumbnail: response.strMealThumb,
      tags: response.strTags?.split(",") || [],
      youtube: response.strYoutube,
      ingredients: getIngredients(response),
    };
  }

  return null;
};

export const convertRecipeList = (responses: unknown[]): Recipe[] => {
  return responses
    .map(convertRecipe)
    .filter((recipe): recipe is Recipe => recipe !== null);
};
