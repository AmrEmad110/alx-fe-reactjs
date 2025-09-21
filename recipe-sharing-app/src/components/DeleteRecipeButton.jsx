// src/components/DeleteRecipeButton.jsx
import useRecipeStore from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!confirm('هل أنت متأكد أنك تريد حذف هذه الوصفة؟')) return;
    deleteRecipe(id);
    // بعد الحذف ارجع للقائمة الرئيسية
    navigate('/');
  };

  return <button onClick={handleDelete} className="text-red-600">Delete</button>;
};

export default DeleteRecipeButton;
