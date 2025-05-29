import { useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { usePathname } from "next/navigation";
import { useSearch } from "./use-search";
import { createQueryString } from "@/utils/common";
import { useEffect } from "react";
import { Ingredient } from "@/types/ingredient";
import { useIngredients } from "./use-ingredients";

export const useSearchControl = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ingridientCache } = useIngredients();
  const timeout = useRef(null);
  const { searchRecipe } = useSearch();
  const getIngredients = () => {
    return searchParams
      .get("ingredients")
      ?.split(",")
      .reduce((acc: Ingredient[], ingredient) => {
        if (ingridientCache?.[ingredient]) {
          return [...acc, ingridientCache?.[ingredient]];
        }
        return acc;
      }, []);
  };

  console.log(getIngredients());

  const [usedParams, setUsedParams] = useState<{
    search: string;
    ingredients: Ingredient[];
  }>(() => ({
    search: searchParams.get("search") || "",
    ingredients: getIngredients(),
  }));

  useEffect(() => {
    router.push(
      pathname +
        "?" +
        createQueryString({
          nameValuePairs: [
            { name: "search", value: usedParams.search },
            {
              name: "ingredients",
              value: usedParams.ingredients.map((i) => i.ingredient).join(","),
            },
          ],
          searchParams,
        })
    );
    searchRecipe(usedParams.ingredients, usedParams.search);
  }, [pathname, router, searchParams, searchRecipe, usedParams]);

  return {
    onSetParams: (params: { search: string; ingredients: Ingredient[] }) => {
      setUsedParams(params);
    },
    initialSearchValue: searchParams.get("search") || "",
    initialIngredients: getIngredients(),
  };
};
