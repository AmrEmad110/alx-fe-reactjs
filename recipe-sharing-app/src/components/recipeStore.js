// src/store/recipeStore.js
import { create } from 'zustand';

/**
 * دالة مساعدة لتطبيق الفلاتر على مصفوفة الوصفات
 * - تبحث في title
 * - تبحث في المكونات ingredients (يفترض أن recipe.ingredients مصفوفة نصوص)
 * - تقارن prepTime (عدد دقائق) مع maxPrepTime إن وُجد
 */
function applyFilters(recipes, searchTerm, ingredientFilter, maxPrepTime) {
  const t = (searchTerm || '').toLowerCase().trim();
  const ing = (ingredientFilter || '').toLowerCase().trim();

  return recipes.filter((r) => {
    // تأكد من الحقول الافتراضية إن لم تكن موجودة
    const title = (r.title || '').toLowerCase();
    const description = (r.description || '').toLowerCase();
    const ingredients = Array.isArray(r.ingredients) ? r.ingredients.map(i => (i || '').toLowerCase()) : [];
    const prepTime = typeof r.prepTime === 'number' ? r.prepTime : (Number(r.prepTime) || 0);

    // شرط البحث في العنوان أو الوصف
    const matchesText = !t || title.includes(t) || description.includes(t);

    // شرط البحث في المكونات
    const matchesIngredient = !ing || ingredients.some(i => i.includes(ing));

    // شرط زمن التحضير
    const matchesTime = !maxPrepTime || (prepTime > 0 && prepTime <= maxPrepTime);

    return matchesText && matchesIngredient && matchesTime;
  });
}

export const useRecipeStore = create((set, get) => ({
  // البيانات الأساسية
  recipes: [],              // جميع الوصفات
  filteredRecipes: [],      // نتائج الفلترة
  searchTerm: '',           // نص البحث
  ingredientFilter: '',     // فلتر للمكون
  maxPrepTime: null,        // فلتر زمن التحضير (عدد دقائق) أو null

  // إضافة وصفة وتحديث نتائج الفلترة تلقائيًا
  addRecipe: (newRecipe) => {
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      const filteredRecipes = applyFilters(recipes, state.searchTerm, state.ingredientFilter, state.maxPrepTime);
      return { recipes, filteredRecipes };
    });
  },

  // حذف وصفة وتحديث النتائج
  deleteRecipe: (id) => {
    set((state) => {
      const recipes = state.recipes.filter(r => r.id !== id);
      const filteredRecipes = applyFilters(recipes, state.searchTerm, state.ingredientFilter, state.maxPrepTime);
      return { recipes, filteredRecipes };
    });
  },

  // تحديث وصفة وتحديث النتائج
  updateRecipe: (updatedRecipe) => {
    set((state) => {
      const recipes = state.recipes.map(r => (r.id === updatedRecipe.id ? { ...r, ...updatedRecipe } : r));
      const filteredRecipes = applyFilters(recipes, state.searchTerm, state.ingredientFilter, state.maxPrepTime);
      return { recipes, filteredRecipes };
    });
  },

  // تعيين قائمة كاملة (مثلاً عند جلبها من API) وتحديث الفلاتر
  setRecipes: (recipes) => {
    set((state) => {
      const filteredRecipes = applyFilters(recipes, state.searchTerm, state.ingredientFilter, state.maxPrepTime);
      return { recipes, filteredRecipes };
    });
  },

  // تعيين نص البحث وتطبيق الفلترة
  setSearchTerm: (term) => {
    set((state) => {
      const searchTerm = term;
      const filteredRecipes = applyFilters(state.recipes, searchTerm, state.ingredientFilter, state.maxPrepTime);
      return { searchTerm, filteredRecipes };
    });
  },

  // تعيين فلتر المكون وتطبيق الفلترة
  setIngredientFilter: (ingredient) => {
    set((state) => {
      const ingredientFilter = ingredient;
      const filteredRecipes = applyFilters(state.recipes, state.searchTerm, ingredientFilter, state.maxPrepTime);
      return { ingredientFilter, filteredRecipes };
    });
  },

  // تعيين فلتر زمن التحضير وتطبيق الفلترة
  setMaxPrepTime: (minutes) => {
    set((state) => {
      // minutes قد يكون نص من input → نحوله لرقم أو null
      const maxPrepTime = minutes ? Number(minutes) || null : null;
      const filteredRecipes = applyFilters(state.recipes, state.searchTerm, state.ingredientFilter, maxPrepTime);
      return { maxPrepTime, filteredRecipes };
    });
  },

  // إجراء صريح لإعادة احتساب الفلاتر إن احتجت تستدعيه يدوياً
  filterRecipes: () => {
    set((state) => {
      const filteredRecipes = applyFilters(state.recipes, state.searchTerm, state.ingredientFilter, state.maxPrepTime);
      return { filteredRecipes };
    });
  },
}));
