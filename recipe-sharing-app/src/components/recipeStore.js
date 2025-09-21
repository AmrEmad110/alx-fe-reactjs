// src/store/recipeStore.js

import create from 'zustand';              // نستورد create عشان نعمل ال store

// ننشئ ال store ونسميه useRecipeStore
const useRecipeStore = create((set) => ({
  recipes: [],                            // الحالة الابتدائية: مصفوفة وصفات فارغة

  // دالة لإضافة وصفة جديدة
  addRecipe: (newRecipe) => 
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // دالة لتهيئة أو تعيين قائمة الوصفات من مصدر خارجي
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;             // نصدر ال hook عشان نستخدمه في المكونات
export { useRecipeStore };                 // نصدره أيضًا كـ named export لتجنب أخطاء الاستيراد
