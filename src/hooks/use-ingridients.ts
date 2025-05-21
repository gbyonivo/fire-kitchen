import {
  setFetchingIngridients,
  setFetchingIngridientsError,
  setIngridients,
} from "@/lib/slices/cache-slice";
import { RootState } from "@/lib/store";
import {
  Ingredient,
  isSampleIngredient,
  SampleIngredient,
} from "@/types/ingredient";
import { convertIngredientList } from "@/utils/ingridient-converter";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useIngridients(): {
  ingridients: Ingredient[];
  fetching: boolean;
  error: AxiosError | string | null;
  fetchIngridients: () => void;
} {
  const { ingridients, fetchingIngridients, fetchingIngridientsError } =
    useSelector((state: RootState) => state.cache);
  const dispatch = useDispatch();

  const fetchIngridients = useCallback(() => {
    console.log("fetching ingridients 1");
    dispatch(setFetchingIngridients());
    const fetch = async () => {
      console.log("fetching ingridients 2");
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = (await response.data) as { meals: unknown[] };

        if (isSampleIngredient(data.meals?.[0])) {
          dispatch(
            setIngridients(
              convertIngredientList(data.meals as unknown as SampleIngredient[])
            )
          );
        } else {
          dispatch(setFetchingIngridientsError("Invalid data"));
        }
      } catch (e) {
        dispatch(setFetchingIngridientsError(e as AxiosError));
      }
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {
    if (ingridients.length > 0 || fetchingIngridients) return;
    console.log("fetching ingridients");
    fetchIngridients();
  }, [fetchIngridients, ingridients, fetchingIngridients]);

  return {
    ingridients,
    fetchIngridients,
    fetching: fetchingIngridients,
    error: fetchingIngridientsError,
  };
}
