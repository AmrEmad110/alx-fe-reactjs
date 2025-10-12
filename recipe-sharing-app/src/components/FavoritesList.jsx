// src/components/FavoritesList.jsx
import React from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

export default function FavoritesList() {
  // نستخدم selector يقوم بإرجاع الكائنات الكاملة للمفضلات
  const favorites = useRecipeStore(state => state.getFavoriteRecipes());
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  if (!favorites || favorites.length === 0) {
    return <p>You have no favorite recipes yet.</p>;
  }

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.map(r => (
        <div key={r.id} style={{ border: '1px solid #eee', padding: 10, marginBottom: 8 }}>
          <Link to={`/recipes/${r.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{ margin: 0 }}>{r.title}</h3>
          </Link>
          <p style={{ margin: '6px 0' }}>{r.prepTime} min • {r.ingredients.join(', ')}</p>
          <button onClick={() => removeFavorite(String(r.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
}
