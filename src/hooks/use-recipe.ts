import { RootState } from "@/lib/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { KitchenAxios } from "@/utils/kitchen-axios";
import { convertRecipe } from "@/utils/recipe-converter";
import { updateRecipeCache } from "@/lib/slices/cache-slice";

export function useRecipe({ recipeId }: { recipeId: string }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const recipeCache = useSelector(
    (state: RootState) => state.cache.recipeCache
  );
  const recipe = recipeCache?.[recipeId];

  const fetchRecipe = useCallback(() => {
    const getRecipe = async () => {
      if (recipe) return;
      try {
        setLoading(true);
        const response = await KitchenAxios.get(`/lookup.php`, {
          params: {
            i: recipeId,
          },
        });
        const recipe = convertRecipe(response.data.meals[0]);
        if (recipe) {
          dispatch(updateRecipeCache(recipe));
        } else {
          setError(new AxiosError("Recipe not found"));
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error as AxiosError);
      }
    };
    getRecipe();
  }, [dispatch, recipeId, recipe]);

  useEffect(() => {
    if (recipe?.id || loading || error) return;
    fetchRecipe();
  }, [fetchRecipe, recipe?.id, loading, error]);

  return {
    recipe,
    fetchRecipe,
    loading,
    error,
  };
}
