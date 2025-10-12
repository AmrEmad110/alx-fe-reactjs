// src/components/RecipeList.jsx
import React from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom'; // ✅ المطلوب

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
            {/* ✅ استخدم Link لعرض تفاصيل الوصفة */}
            <Link to={`/recipes/${recipe.id}`}>
              <strong>{recipe.title}</strong> - {recipe.time} mins
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
