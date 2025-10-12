// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(s => s.filteredRecipes);
  const recipes = useRecipeStore(s => s.recipes);

  // إذا لم تُجرى فلترة بعد (مثلاً عند البداية) يمكن أن تكون filteredRecipes فارغة.
  // نعرض filteredRecipes إذا كانت مملوءة، وإلا نعرض recipes الكاملة.
  const listToShow = (filteredRecipes && filteredRecipes.length > 0) ? filteredRecipes : recipes;

  if (!listToShow || listToShow.length === 0) {
    return <p>No recipes found. Try adding some or clear filters.</p>;
  }

  return (
    <div className="recipe-list">
      {listToShow.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h3><Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link></h3>
          <p>{recipe.description}</p>
          {Array.isArray(recipe.ingredients) && (
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          )}
          {recipe.prepTime ? <p><strong>Prep:</strong> {recipe.prepTime} min</p> : null}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
