import { useParams } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h3>Edit this recipe</h3>
      <EditRecipeForm recipe={recipe} />

      <h3>Danger zone</h3>
      <DeleteRecipeButton id={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
