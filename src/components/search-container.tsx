"use client";

import { Button } from "./common/button";
import { MultiSelect } from "./common/multi-select";
import { useState } from "react";
import { useIngredients } from "@/hooks/use-ingredients";
import { Ingredient } from "@/types/ingredient";
import { TextInput } from "./common/text-input";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { RecipeCard } from "./common/recipe-card";
import { Spinner } from "./common/spinner";
import Link from "next/link";
import { useSearchControl } from "@/hooks/use-search-control";

export function SearchContainer() {
  const { ingredients } = useIngredients();
  const { onSetParams, initialIngredients, initialSearchValue } =
    useSearchControl();
  const { recipes, searching } = useSelector(
    (state: RootState) => state.search
  );
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    () => initialIngredients
  );
  const [search, setSearch] = useState(() => initialSearchValue);

  return (
    <div className="flex flex-col">
      <div className="pt-8 flex flex-col lg:flex-row gap-2 justify-center">
        <MultiSelect<Ingredient>
          options={ingredients}
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
          label="Keyword (at least 2 characters)"
          disabled={searching}
        />
        <Button
          className="self-start mt-2 lg:mt-6"
          onClick={() =>
            onSetParams({ search, ingredients: selectedIngredients })
          }
          disabled={
            searching || (search.length < 2 && !selectedIngredients.length)
          }
          id="search-button"
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
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              id={`recipe-link-${recipe.id}`}
            >
              <RecipeCard recipe={recipe} id={`recipe-card-${recipe.id}`} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
