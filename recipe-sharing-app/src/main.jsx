import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { useRecipeStore } from "./store/recipeStore"; // ✅ استدعاء الـ store

// ✅ بيانات تجريبية (وصفات افتراضية)
const sample = [
  { id: 1, title: "Chicken Pasta", description: "Creamy pasta with chicken", ingredients: ["chicken", "pasta", "cream"], prepTime: 30 },
  { id: 2, title: "Tomato Soup", description: "Simple tomato soup", ingredients: ["tomato", "onion", "garlic"], prepTime: 20 },
  { id: 3, title: "Fried Egg Sandwich", description: "Quick breakfast", ingredients: ["egg", "bread", "butter"], prepTime: 10 }
];

// ✅ قبل عملية render
useRecipeStore.getState().setRecipes(sample);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
