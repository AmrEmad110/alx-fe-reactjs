// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm"; // ✅ المطلوب
import FilterControls from "./components/FilterControls";
import { useRecipeStore } from "./recipeStore";

// صفحة تفاصيل الوصفة
import { useParams } from "react-router-dom";
function RecipeDetail() {
  const { id } = useParams();
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(r => String(r.id) === id);

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Time:</strong> {recipe.time} mins</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients?.join(", ")}</p>
    </div>
  );
}

// الصفحة الرئيسية
function Home() {
  return (
    <div>
      <h1>Recipe Sharing App</h1>
      <FilterControls />
      <RecipeList />
    </div>
  );
}

// صفحة about
function About() {
  return <h2>About this app</h2>;
}

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/add">Add Recipe</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRecipeForm />} /> {/* ✅ المطلوب */}
        <Route path="/about" element={<About />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}
