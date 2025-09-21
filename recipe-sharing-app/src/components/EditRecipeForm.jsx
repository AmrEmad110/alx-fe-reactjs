// src/components/EditRecipeForm.jsx
import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';

const EditRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe?.title || '');
  const [description, setDescription] = useState(recipe?.description || '');
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(recipe.id, { title, description });
    // بعد الحفظ ارجع لصفحة التفاصيل أو القائمة
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
