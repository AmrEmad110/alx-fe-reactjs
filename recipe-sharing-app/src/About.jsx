// src/App.jsx
import SearchBar from './components/SearchBar';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="container">
      <h1>🍲 Recipe Sharing App</h1>

      <AddRecipeForm />

      <hr />

      <SearchBar />

      <RecipeList />
    </div>
  );
}

export default App;
