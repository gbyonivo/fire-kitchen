"use client";

import { useRecipe } from "@/hooks/use-recipe";
import { useParams } from "next/navigation";
import { Spinner } from "./common/spinner";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Ingredients } from "./ingredients";
import Link from "next/link";

export function RecipeContainer() {
  const { id } = useParams();
  const { recipe, loading, error } = useRecipe({ recipeId: id as string });

  return (
    <div
      className="flex w-screen h-screen justify-center py-16"
      data-testid="recipe-container"
    >
      {loading && <Spinner size="large" />}
      {error && (
        <div>
          Error: {error.message},{" "}
          <Link href="/" className="underline cursor-pointer">
            Search for other food
          </Link>
        </div>
      )}
      {recipe && (
        <div className="flex flex-col md:w-2/3 md:overflow-hidden">
          <h1 className="text-2xl font-bold text-center mb-8">{recipe.name}</h1>
          <div className="flex w-full flex-col md:flex-row">
            <div className="w-full md:w-2/6">
              <div className="flex justify-center">
                <Image
                  src={recipe.thumbnail}
                  alt={recipe.name}
                  width={200}
                  height={200}
                  className="self-center rounded-lg"
                />
              </div>
              <div className="flex flex-col my-4 gap-4">
                <p className="text-sm text-center">{recipe.category}</p>
                <p className="text-sm text-center">{recipe.area}</p>
                <p className="text-sm text-center">
                  <a
                    href={recipe.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Watch on Youtube{" "}
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 inline ml-2" />
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full md:w-4/6 md:h-5/6 border-l border-gray-300 px-8 overflow-y-auto">
              <Ingredients recipe={recipe} className="mb-8" />
              <p className="text-sm font-bold text-gray-500">Instructions</p>
              <p className="text-sm text-left pb-24">{recipe.instructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
