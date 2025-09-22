// src/components/EditRecipeForm.jsx
import React, { useState, useEffect } from 'react';
import useRecipeStore from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';

const EditRecipeForm = ({ recipe, onClose }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const navigate = useNavigate();

  // حالات محلية متزامنة مع recipe (تتعَدّل لو recipe تغيّر)
  const [title, setTitle] = useState(recipe?.title || '');
  const [description, setDescription] = useState(recipe?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(recipe?.title || '');
    setDescription(recipe?.description || '');
  }, [recipe]);

  // حماية: لو مفيش recipe
  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // مهم — يمنع إعادة تحميل الصفحة
    setError('');

    // تحقق بسيط
    if (!title.trim()) {
      setError('Title cannot be empty.');
      return;
    }

    try {
      // تأكد أن توقيع updateRecipe في ال store يقبل (id, fields)
      updateRecipe(recipe.id, { title: title.trim(), description: description.trim() });

      // لو مرّرت onClose (مثلاً لإغلاق مودال) استعملها، وإلا اعد التوجيه لتفاصيل الوصفة
      if (onClose) {
        onClose();
      } else {
        navigate(`/recipes/${recipe.id}`);
      }
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update recipe.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
