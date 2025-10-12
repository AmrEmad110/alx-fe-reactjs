import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="container">
      <h1>🍲 Recipe Sharing App</h1>
      <AddRecipeForm />
      <hr />
      <RecipeList />
    </div>
  );
}

export default App;
