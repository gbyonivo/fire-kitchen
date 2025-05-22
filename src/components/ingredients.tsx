import { Recipe } from "@/types/recipe";
import { SidePanel } from "./common/side-panel";
import { useState } from "react";
import { Ingredient } from "@/types/ingredient";
import { useIngridients } from "@/hooks/use-ingredients";
import clsx from "clsx";

interface IngredientsProps {
  recipe: Recipe;
  className?: string;
}

export function Ingredients({ recipe, className }: IngredientsProps) {
  const { ingridientCache } = useIngridients();
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const handleClose = () => {
    setSelectedIngredient(null);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <p className="text-sm font-bold text-gray-500">Ingredients</p>
      <div className="grid grid-cols-2 gap-2">
        {recipe.ingredients.map((ingredient) => (
          <span
            key={`${ingredient.name}-${ingredient.measure}`}
            className={clsx(
              "text-sm text-left",
              ingridientCache[ingredient.name]
                ? "hover:underline cursor-pointer"
                : "text-gray-100/50"
            )}
            role="button"
            onClick={() => {
              setSelectedIngredient(ingridientCache[ingredient.name]);
            }}
          >
            {ingredient.measure} {ingredient.name}
          </span>
        ))}
      </div>
      <SidePanel
        title={selectedIngredient?.ingredient || ""}
        open={!!selectedIngredient}
        onClose={handleClose}
      >
        {!!selectedIngredient && (
          <>
            {selectedIngredient.description ? (
              <div className="text-sm text-gray-400 leading-8">
                {selectedIngredient.description}
              </div>
            ) : (
              <div className="text-sm">
                No description available but you can more on{" "}
                <a
                  href={`https://www.google.com/search?q=${selectedIngredient.ingredient}`}
                  target="_blank"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Google
                </a>
              </div>
            )}
          </>
        )}
      </SidePanel>
    </div>
  );
}
