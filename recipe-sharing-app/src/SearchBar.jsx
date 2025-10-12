// src/components/SearchBar.jsx
import React from 'react';
import { useRecipeStore } from '../store/recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(s => s.searchTerm);
  const ingredientFilter = useRecipeStore(s => s.ingredientFilter);
  const maxPrepTime = useRecipeStore(s => s.maxPrepTime);

  const setSearchTerm = useRecipeStore(s => s.setSearchTerm);
  const setIngredientFilter = useRecipeStore(s => s.setIngredientFilter);
  const setMaxPrepTime = useRecipeStore(s => s.setMaxPrepTime);

  return (
    <div className="search-bar" style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Search by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <input
        type="text"
        placeholder="Filter by ingredient (e.g., 'chicken')"
        value={ingredientFilter}
        onChange={(e) => setIngredientFilter(e.target.value)}
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="number"
          placeholder="Max prep time (minutes)"
          value={maxPrepTime ?? ''}
          onChange={(e) => setMaxPrepTime(e.target.value)}
          min="0"
          style={{ width: 160 }}
        />
        <button onClick={() => {
          // زر سريع لمسح الفلاتر
          setSearchTerm('');
          setIngredientFilter('');
          setMaxPrepTime(null);
        }}>
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
