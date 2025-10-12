// src/components/SearchBar.jsx
import React from "react";
import { useRecipeStore } from "../recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
      style={{ marginBottom: "20px", padding: "5px" }}
    />
  );
};

export default SearchBar;
