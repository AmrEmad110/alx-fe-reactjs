// داخل App.jsx
import { useParams } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

function RecipeDetail() {
  const { id } = useParams();
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(r => String(r.id) === id);

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Time:</strong> {recipe.time} mins</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
    </div>
  );
}

// في الـ Routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/recipes/:id" element={<RecipeDetail />} /> {/* ✅ جديد */}
</Routes>
