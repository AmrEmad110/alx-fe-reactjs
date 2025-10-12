// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import { useRecipeStore } from './recipeStore';

// صفحة التفاصيل
function RecipeDetail() {
  const { id } = useParams();
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(r => String(r.id) === String(id));

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div style={{ padding: 12 }}>
      <h2>{recipe.title}</h2>
      <p><strong>Prep time:</strong> {recipe.prepTime} min</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p>{recipe.instructions}</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Recipe Sharing App</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 12 }}>
        <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link> | <Link to="/recommendations">Recommendations</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/recommendations" element={<RecommendationsList />} />
        {/* إذا عندك AddRecipeForm: <Route path="/add" element={<AddRecipeForm />} /> */}
      </Routes>
    </Router>
  );
}
