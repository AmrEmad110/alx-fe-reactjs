// src/components/RecipeDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import EditRecipeForm from './EditRecipeForm';

const RecipeDetails = () => {
  const { id } = useParams(); // يقرأ :id من رابط الصفحة
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => String(r.id) === String(id))
  );

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {/* زر يذهب لنموذج التعديل (لو استخدمت صفحة منفصلة) */}
      <button onClick={() => navigate(`/recipes/${id}/edit`)}>Edit</button>

      {/* زر الحذف (مكوّن منفصل) */}
      <DeleteRecipeButton id={recipe.id} />

      {/* أو تضمين نموذج التعديل مباشرة هنا */}
      {/* <EditRecipeForm recipe={recipe} /> */}
    </div>
  );
};

export default RecipeDetails;
