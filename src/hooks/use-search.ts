import { searchSuccess, setSearching } from "@/lib/slices/search-slice";
import { Ingredient } from "@/types/ingredient";
import { KitchenAxios } from "@/utils/kitchen-axios";
import { convertRecipe } from "@/utils/recipe-converter";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useSearch() {
  const dispatch = useDispatch();

  const searchRecipe = useCallback(
    async (ingredients: Ingredient[], search: string) => {
      try {
        dispatch(setSearching());
        const searches = [];
        if (ingredients.length > 0) {
          searches.push(
            KitchenAxios.get("filter.php", {
              params: {
                i: ingredients
                  .map((ingredient) => ingredient.ingredient)
                  .join(","),
              },
            })
          );
        }
        if (search.length > 2) {
          searches.push(
            KitchenAxios.get("/search.php", {
              params: {
                s: search,
              },
            })
          );
        }

        const responses = await Promise.all(searches);
        const recipes = responses.flatMap(
          (response) => response.data.meals || []
        );
        const uniqueRecipes = recipes.reduce((acc, recipe) => {
          if (!recipe?.idMeal) {
            return acc;
          }
          return {
            ...acc,
            [recipe.idMeal]: convertRecipe(recipe),
          };
        }, {});

        console.log(recipes.length, Object.values(uniqueRecipes));

        dispatch(searchSuccess(Object.values(uniqueRecipes)));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  return { searchRecipe };
}
