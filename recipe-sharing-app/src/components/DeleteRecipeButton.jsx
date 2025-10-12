import { useRecipeStore } from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const ok = window.confirm('Are you sure you want to delete this recipe?');
    if (!ok) return;
    deleteRecipe(id);
    navigate('/'); // ارجع للصفحة الرئيسية بعد الحذف
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};

export default DeleteRecipeButton;
