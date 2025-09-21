// src/components/RecipeList.jsx
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes); // نختار recipes من ال store

  return (
    <div>
      {recipes.length === 0 ? <p>No recipes yet.</p> : null}
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
