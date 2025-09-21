import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import RecipeDetails from './components/RecipeDetails';
import EditRecipePage from './pages/EditRecipePage'; // اختياري صفحة تحرير منفصلة

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/recipes/:id" element={<RecipeDetails />} />
      <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
    </Routes>
  </BrowserRouter>
);
