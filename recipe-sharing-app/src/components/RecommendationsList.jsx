// src/components/RecommendationsList.jsx
import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

export default function RecommendationsList() {
  const recommendations = useRecipeStore(s => s.getRecommendations());
  const generateRecommendations = useRecipeStore(s => s.generateRecommendations);

  // نولّد التوصيات عند التحميل أو عندما تتغير المفضلات (يمكن أيضاً استدعاءها من المتجر)
  useEffect(() => {
    generateRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!recommendations || recommendations.length === 0) {
    return <p>No recommendations yet — favorite some recipes to get suggestions.</p>;
  }

  return (
    <div>
      <h2>Recommended for you</h2>
      {recommendations.map(r => (
        <div key={r.id} style={{ border: '1px solid #eee', padding: 10, marginBottom: 8 }}>
          <Link to={`/recipes/${r.id}`} style={{ textDecoration: 'none' }}>
            <h4 style={{ margin: 0 }}>{r.title}</h4>
          </Link>
          <p style={{ margin: '6px 0' }}>{r.prepTime} min • {r.ingredients.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
