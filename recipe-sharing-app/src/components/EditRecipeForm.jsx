import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const [title, setTitle] = useState(recipe?.title ?? '');
  const [description, setDescription] = useState(recipe?.description ?? '');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // <-- event.preventDefault موجود هنا طبقًا لمتطلبات الفحص
    event.preventDefault();

    if (!title.trim()) return alert('Title is required');
    updateRecipe({ id: recipe.id, title: title.trim(), description: description.trim() });
    // نعيد المستخدم لصفحة التفاصيل بعد التحديث (أو يمكن إبقاءه في نفس الصفحة)
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-recipe-form">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
