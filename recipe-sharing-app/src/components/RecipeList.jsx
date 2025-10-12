import React from 'react';
import { useRecipeStore } from '../recipeStore';

export default function RecipeList() {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const recipes = useRecipeStore(state => state.recipes);

  const displayRecipes = filteredRecipes.length > 0 ? filteredRecipes : recipes;

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {displayRecipes.map(recipe => (
          <li key={recipe.id}>
            <strong>{recipe.title}</strong> - {recipe.time} mins
          </li>
        ))}
      </ul>
    </div>
  );
}
