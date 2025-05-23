import { Recipe } from "@/types/recipe";
import Image from "next/image";
interface RecipeCardProps {
  recipe: Recipe;
  id?: string;
}

export function RecipeCard({ recipe, id }: RecipeCardProps) {
  return (
    <div
      className="bg-black rounded-xl border border-white/10 flex cursor-pointer 
    flex-col transition-all duration-300 hover:scale-105"
      data-testid={id}
    >
      <Image
        src={recipe.thumbnail}
        alt={recipe.name}
        width={150}
        height={150}
        className="w-full h-fullobject-cover rounded-t-xl"
      />
      <div className="p-2 h-20 overflow-auto">
        <h2 className="text-white text-sm font-bold">{recipe.name}</h2>
        <p className="text-white/50 text-sm">{recipe.category}</p>
        <p className="text-white/50 text-sm">{recipe.area}</p>
      </div>
    </div>
  );
}
