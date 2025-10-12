// src/components/RecipeList.jsx
import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

export default function RecipeList() {
  const filteredRecipes = useRecipeStore(s => s.filteredRecipes);
  const recipes = useRecipeStore(s => s.recipes);
  const initFiltered = useRecipeStore(s => s.initFiltered);
  const toggleFavorite = useRecipeStore(s => s.toggleFavorite);
  const favorites = useRecipeStore(s => s.favorites);

  useEffect(() => {
    initFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const display = (filteredRecipes && filteredRecipes.length > 0) ? filteredRecipes : recipes;

  if (!display || display.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div style={{ marginTop: 12 }}>
      {display.map(r => {
        const isFav = favorites.includes(String(r.id));
        return (
          <div key={r.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6, marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/recipes/${r.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ margin: 0 }}>{r.title}</h3>
                <p style={{ margin: 0 }}>{r.prepTime} min</p>
              </Link>

              <button
                onClick={() => toggleFavorite(String(r.id))}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                style={{
                  padding: '6px 8px',
                  cursor: 'pointer',
                  background: isFav ? '#ffd1d1' : '#eee',
                  border: '1px solid #ccc',
                  borderRadius: 6
                }}
              >
                {isFav ? '★' : '☆'}
              </button>
            </div>

            <p style={{ marginTop: 8 }}><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
            <details>
              <summary>Instructions</summary>
              <p>{r.instructions}</p>
            </details>
          </div>
        );
      })}
    </div>
  );
}
