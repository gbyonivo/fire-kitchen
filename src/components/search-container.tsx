"use client";

import Link from "next/link";
import { Spinner } from "./common/spinner";
import { Button } from "./common/button";
import { MultiSelect } from "./common/multi-select";
import { useState } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./common/recipe-card";

const recipe: Recipe = {
  id: "1",
  name: "Recipe 1",
  category: "Category 1",
  area: "Area 1",
  instructions: "Instructions 1",
  thumbnail:
    "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  tags: ["Tag 1", "Tag 2"],
  youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  ingredients: [
    { name: "Ingredient 1", measure: "1 cup" },
    { name: "Ingredient 2", measure: "2 tablespoons" },
  ],
};

export function SearchContainer() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  return (
    <div>
      <RecipeCard recipe={recipe} />
      <Link href="recipes/ddddd">Search Container</Link>
      <Spinner size="small" />
      <Button>Search</Button>
      <Button loading>Search</Button>
      <Button loading disabled>
        Search
      </Button>
      <div className="w-full mt-8">
        <MultiSelect<string>
          options={[
            "Ingredient 1",
            "Ingredient 2",
            "Ingredient 3",
            "Ingredient 4",
          ]}
          selectedOptions={selectedIngredients}
          onChange={(ingredients) => setSelectedIngredients(ingredients)}
          getLabel={(ingredient) => ingredient}
          getKey={(ingredient) => ingredient}
        />
      </div>
    </div>
  );
}
