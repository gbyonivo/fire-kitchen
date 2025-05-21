"use client";

import { Button } from "./common/button";
import { MultiSelect } from "./common/multi-select";
import { useState } from "react";
import { useIngridients } from "@/hooks/use-ingridients";
import { Ingredient } from "@/types/ingredient";
import { TextInput } from "./common/text-input";

export function SearchContainer() {
  const { ingridients } = useIngridients();
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log(selectedIngredients, search);
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
          label="Search"
        />
        <Button className="self-start mt-6" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
