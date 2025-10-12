// src/recipeStore.js
import create from 'zustand';

// مثال بسيط لبيانات وصفة
// { id: '1', title: 'Shakshuka', ingredients: ['eggs','tomato'], prepTime: 20, instructions: '...' }

export const useRecipeStore = create((set, get) => ({
  recipes: [
    { id: '1', title: 'Shakshuka', ingredients: ['eggs', 'tomato', 'onion'], prepTime: 25, instructions: 'Cook tomatoes...' },
    { id: '2', title: 'Pasta Carbonara', ingredients: ['pasta', 'egg', 'cheese', 'bacon'], prepTime: 30, instructions: 'Boil pasta...' },
    { id: '3', title: 'Tomato Soup', ingredients: ['tomato', 'onion', 'garlic'], prepTime: 15, instructions: 'Simmer tomatoes...' }
  ],

  // حالات البحث والفلاتر
  searchTerm: '',
  ingredientFilter: '',
  maxPrepTime: null, // number or null

  // مصفوفة نتائج مفلترة تكون محدثة عند تغيير الفلاتر
  filteredRecipes: [],

  // Setters
  setRecipes: (recipes) => set({ recipes }),
  addRecipe: (recipe) => set(state => ({ recipes: [...state.recipes, recipe] })),
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    // trigger filtering after updating searchTerm
    const state = get();
    const filtered = _computeFiltered(state);
    set({ filteredRecipes: filtered });
  },
  setIngredientFilter: (ing) => {
    set({ ingredientFilter: ing });
    const state = get();
    const filtered = _computeFiltered(state);
    set({ filteredRecipes: filtered });
  },
  setMaxPrepTime: (minutes) => {
    const val = minutes === '' || minutes == null ? null : Number(minutes);
    set({ maxPrepTime: val });
    const state = get();
    const filtered = _computeFiltered(state);
    set({ filteredRecipes: filtered });
  },
  clearFilters: () => {
    set({ searchTerm: '', ingredientFilter: '', maxPrepTime: null });
    const state = get();
    const filtered = _computeFiltered(state);
    set({ filteredRecipes: filtered });
  },

  // دالة عامة لتشغيل الفلترة يدوياً (مفيدة لو تريد تفعلها عبر زر)
  filterRecipes: () => {
    const state = get();
    const filtered = _computeFiltered(state);
    set({ filteredRecipes: filtered });
  },

  // تهيئة: عند التحميل نضع filteredRecipes = recipes (حتى لو لم تقم بفلترة)
  initFiltered: () => {
    const state = get();
    set({ filteredRecipes: state.recipes });
  }
}));

// دالة مساعدة خارجية لحساب الفلترة (لا تعتمد على set/get داخلها مباشرة)
function _computeFiltered(state) {
  const term = (state.searchTerm || '').trim().toLowerCase();
  const ingredient = (state.ingredientFilter || '').trim().toLowerCase();
  const maxTime = state.maxPrepTime;

  return state.recipes.filter(r => {
    const matchesTitle = term === '' || (r.title && r.title.toLowerCase().includes(term));
    const matchesIngredient = ingredient === '' || (r.ingredients && r.ingredients.some(i => i.toLowerCase().includes(ingredient)));
    const matchesTime = maxTime == null || (typeof r.prepTime === 'number' && r.prepTime <= maxTime);
    return matchesTitle && matchesIngredient && matchesTime;
  });
}
