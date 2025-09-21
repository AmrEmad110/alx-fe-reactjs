import create from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],

  // إضافة وصفة جديدة
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // حذف وصفة حسب id
  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter(r => r.id !== id) })),

  // تحديث وصفة: تمرر id و partial update أو كامل الكائن
  updateRecipe: (id, updatedFields) =>
    set((state) => ({
      recipes: state.recipes.map(r =>
        r.id === id ? { ...r, ...updatedFields } : r
      )
    })),

  // تهيئة كامل قائمة الوصفات (مثلاً جلب من API)
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
