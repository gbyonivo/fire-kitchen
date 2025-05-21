"use client";

import { Button } from "./common/button";
import { MultiSelect } from "./common/multi-select";
import { useState } from "react";
import { useIngridients } from "@/hooks/use-ingridients";
import { Ingredient } from "@/types/ingredient";
import { TextInput } from "./common/text-input";
import { useSearch } from "@/hooks/use-search";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { RecipeCard } from "./common/recipe-card";
import { Spinner } from "./common/spinner";
import Link from "next/link";

export function SearchContainer() {
  const { recipes, searching } = useSelector(
    (state: RootState) => state.search
  );
  const { searchRecipe } = useSearch();
  const { ingridients } = useIngridients();
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    searchRecipe(selectedIngredients, search);
  };

  return (
    <div className="flex flex-col">
      <div className="pt-8 flex flex-col lg:flex-row gap-2 justify-center">
        <MultiSelect<Ingredient>
          options={ingridients}
          selectedOptions={selectedIngredients}
          onChange={(ingredients) => setSelectedIngredients(ingredients)}
          getLabel={(ingredient) => ingredient.ingredient}
          getSearchKey={(ingredient) => ingredient.ingredient}
          getKey={(ingredient) => ingredient.id}
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
          onClick={handleSearch}
          disabled={searching}
          loading={searching}
        >
          Search
        </Button>
      </div>
      {searching && (
        <div className="flex justify-center items-center h-full">
          <Spinner size="large" />
        </div>
      )}
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
