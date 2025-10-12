// src/recipeStore.js
import create from 'zustand';

// نموذج وصفة:
// {
//   id: '1',
//   title: 'Shakshuka',
//   ingredients: ['eggs','tomato','onion'],
//   prepTime: 20,
//   instructions: '...'
// }

export const useRecipeStore = create((set, get) => ({
  // بيانات الوصفات الأساسية
  recipes: [
    { id: '1', title: 'Shakshuka', ingredients: ['eggs', 'tomato', 'onion'], prepTime: 25, instructions: 'Cook tomatoes...' },
    { id: '2', title: 'Pasta Carbonara', ingredients: ['pasta', 'egg', 'cheese', 'bacon'], prepTime: 30, instructions: 'Boil pasta...' },
    { id: '3', title: 'Tomato Soup', ingredients: ['tomato', 'onion', 'garlic'], prepTime: 15, instructions: 'Simmer tomatoes...' },
    { id: '4', title: 'Egg Fried Rice', ingredients: ['rice','egg','soy sauce'], prepTime: 20, instructions: 'Fry rice...' }
  ],

  // بحث وفلاتر (منطق سابق)
  searchTerm: '',
  ingredientFilter: '',
  maxPrepTime: null,
  filteredRecipes: [],

  // مفضلات المستخدم (تخزين ids)
  favorites: [],

  // توصيات محسوبة
  recommendations: [],

  // ---------- setters / actions ----------
  setRecipes: (recipes) => set({ recipes }),

  // Favorites actions
  addFavorite: (recipeId) => {
    set(state => {
      if (state.favorites.includes(recipeId)) return {}; // موجود بالفعل
      const next = [...state.favorites, recipeId];
      return { favorites: next };
    });
    // بعد تعديل المفضلات يمكن إعادة توليد التوصيات تلقائيًا
    get().generateRecommendations();
  },

  removeFavorite: (recipeId) => {
    set(state => ({ favorites: state.favorites.filter(id => id !== recipeId) }));
    get().generateRecommendations();
  },

  toggleFavorite: (recipeId) => {
    const state = get();
    if (state.favorites.includes(recipeId)) {
      get().removeFavorite(recipeId);
    } else {
      get().addFavorite(recipeId);
    }
  },

  // Get favorites as full recipe objects (selector مفيد للمكوّنات)
  getFavoriteRecipes: () => {
    const { recipes, favorites } = get();
    return favorites.map(id => recipes.find(r => String(r.id) === String(id))).filter(Boolean);
  },

  // ---------- filtering logic (كما قبل) ----------
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    const filtered = _computeFiltered(get());
    set({ filteredRecipes: filtered });
  },

  setIngredientFilter: (ing) => {
    set({ ingredientFilter: ing });
    const filtered = _computeFiltered(get());
    set({ filteredRecipes: filtered });
  },

  setMaxPrepTime: (minutes) => {
    const val = minutes === '' || minutes == null ? null : Number(minutes);
    set({ maxPrepTime: val });
    const filtered = _computeFiltered(get());
    set({ filteredRecipes: filtered });
  },

  clearFilters: () => {
    set({ searchTerm: '', ingredientFilter: '', maxPrepTime: null });
    set({ filteredRecipes: get().recipes });
  },

  filterRecipes: () => {
    const filtered = _computeFiltered(get());
    set({ filteredRecipes: filtered });
  },

  initFiltered: () => {
    set({ filteredRecipes: get().recipes });
  },

  // ---------- Recommendations logic ----------
  // بسيط: نحسب تشابه حسب عدد المكونات المشتركة بين وصفة غير مفضلة ومجموعة المفضلات
  generateRecommendations: () => {
    const state = get();
    const favorites = state.favorites;
    if (!favorites || favorites.length === 0) {
      set({ recommendations: [] });
      return;
    }

    // نجمع كل مكونات المفضلات
    const favRecipes = favorites
      .map(id => state.recipes.find(r => String(r.id) === String(id)))
      .filter(Boolean);

    const favIngredients = new Set(favRecipes.flatMap(r => r.ingredients.map(i => i.toLowerCase())));

    // حساب درجة التشابه لكل وصفة غير موجودة في المفضلات
    const scored = state.recipes
      .filter(r => !favorites.includes(String(r.id))) // استبعاد المفضلات نفسها
      .map(r => {
        const common = r.ingredients.reduce((acc, ing) =>
          acc + (favIngredients.has(ing.toLowerCase()) ? 1 : 0), 0);
        return { recipe: r, score: common };
      })
      .filter(x => x.score > 0) // نريد تشابهًا فعليًا
      .sort((a, b) => b.score - a.score || a.recipe.title.localeCompare(b.recipe.title))
      .map(x => x.recipe);

    // خذ أعلى N توصيات (مثلا 5)
    set({ recommendations: scored.slice(0, 5) });
  },

  // عرض التوصيات كـ selector مفيد
  getRecommendations: () => {
    return get().recommendations;
  }
}));

// دالة فلترة مساعدة
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
