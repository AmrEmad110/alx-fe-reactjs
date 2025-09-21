// src/components/AddRecipeForm.jsx
import { useState } from 'react';
import useRecipeStore from '../store/recipeStore'; // أو: import { useRecipeStore } from '../store/recipeStore';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');          // حالة محلية لحقل العنوان
  const [description, setDescription] = useState(''); // حالة محلية لحقل الوصف

  const addRecipe = useRecipeStore(state => state.addRecipe); // نجيب دالة addRecipe من ال store

  const handleSubmit = (e) => {
    e.preventDefault();                             // نمنع إعادة تحميل الصفحة
    if (!title.trim()) return;                      // (اختياري) تحقق بسيط: لا تضيف عنوان فاضي
    addRecipe({ id: Date.now(), title, description });
    setTitle(''); setDescription('');               // نفضي الحقول بعد الإضافة
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;
