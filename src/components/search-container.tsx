"use client";

import { Button } from "./common/button";
import { MultiSelect } from "./common/multi-select";
import { useEffect, useState } from "react";
import { useIngridients } from "@/hooks/use-ingridients";
import { Ingredient } from "@/types/ingredient";
import { TextInput } from "./common/text-input";
import { useSearch } from "@/hooks/use-search";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { RecipeCard } from "./common/recipe-card";
import { Spinner } from "./common/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/common";

export function SearchContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { recipes, searching } = useSelector(
    (state: RootState) => state.search
  );
  const { searchRecipe } = useSearch();
  const { ingridients, ingridientCache } = useIngridients();
  const getIngridients = () => {
    return (
      searchParams
        .get("ingredients")
        ?.split(",")
        .map((ingredient) => ingridientCache?.[ingredient]) || []
    );
  };
  const [selectedIngredients, setSelectedIngredients] =
    useState<Ingredient[]>(getIngridients);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [usedParams, setUsedParams] = useState<{
    search: string;
    ingridients: Ingredient[];
  }>(() => ({
    search: searchParams.get("search") || "",
    ingridients: getIngridients(),
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
              value: usedParams.ingridients.map((i) => i.ingredient).join(","),
            },
          ],
          searchParams,
        })
    );
    searchRecipe(usedParams.ingridients, usedParams.search);
  }, [pathname, router, searchParams, searchRecipe, usedParams]);

  return (
    <div className="flex flex-col">
      <div className="pt-8 flex flex-col lg:flex-row gap-2 justify-center">
        <MultiSelect<Ingredient>
          options={ingridients}
          selectedOptions={selectedIngredients}
          onChange={(ingredients) => setSelectedIngredients(ingredients)}
          getLabel={(ingredient) => ingredient.ingredient}
          getSearchKey={(ingredient) => ingredient.ingredient}
          getKey={(ingredient) => ingredient.ingredient}
          containerClassName="lg:w-96"
          label="Ingredients"
        />
        <TextInput
          value={search}
          onChange={(value) => setSearch(value)}
          containerClassName="lg:w-64"
          label="Keyword"
          disabled={searching}
        />
        <Button
          className="self-start mt-2 lg:mt-6"
          onClick={() =>
            setUsedParams({ search, ingridients: selectedIngredients })
          }
          disabled={searching}
        >
          Search
        </Button>
      </div>
      <div className="flex justify-center items-center h-16">
        {searching && <Spinner size="large" />}
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2 md:gap-16 md:grid-cols-4 lg:grid-cols-6 py-8">
        {recipes.map((recipe) => {
          return (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
