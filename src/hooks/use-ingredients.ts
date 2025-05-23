import {
  setFetchingIngredients,
  setFetchingIngredientsError,
  setIngredients,
} from "@/lib/slices/cache-slice";
import { RootState } from "@/lib/store";
import {
  Ingredient,
  isSampleIngredient,
  SampleIngredient,
} from "@/types/ingredient";
import { convertIngredientList } from "@/utils/ingridient-converter";
import { KitchenAxios } from "@/utils/kitchen-axios";
import { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useIngredients(): {
  ingredients: Ingredient[];
  fetching: boolean;
  error: AxiosError | string | null;
  fetchIngredients: () => void;
  ingridientCache: Record<string, Ingredient>;
} {
  const {
    ingredients,
    fetchingIngredients,
    fetchingIngredientsError,
    ingridientCache,
  } = useSelector((state: RootState) => state.cache);
  const dispatch = useDispatch();

  const fetchIngredients = useCallback(() => {
    dispatch(setFetchingIngredients());
    const fetch = async () => {
      try {
        const response = await KitchenAxios.get("list.php?i=list");
        const data = (await response.data) as { meals: unknown[] };

        if (isSampleIngredient(data.meals?.[0])) {
          dispatch(
            setIngredients(
              convertIngredientList(data.meals as unknown as SampleIngredient[])
            )
          );
        } else {
          dispatch(setFetchingIngredientsError("Invalid data"));
        }
      } catch (e) {
        dispatch(setFetchingIngredientsError(e as AxiosError));
      }
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {
    if (ingredients.length > 0 || fetchingIngredients) return;
    fetchIngredients();
  }, [fetchIngredients, ingredients, fetchingIngredients]);

  return {
    ingredients,
    fetchIngredients,
    fetching: fetchingIngredients,
    error: fetchingIngredientsError,
    ingridientCache,
  };
}
