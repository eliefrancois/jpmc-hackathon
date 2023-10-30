import { Category } from 'llmparser';
import { create } from 'zustand';

interface DocumentCategoryStore {
    catgeory: Category;
    updateCategory: (newCategory: Category) => void;
    resetCategory: () => void;
}

const useDocumentCategory = create<DocumentCategoryStore>((set) => ({
  catgeory: {} as Category,
  updateCategory: (newCategory: Category) => set(() => ({ catgeory: newCategory })),
  resetCategory: () => set(() => ({ catgeory: {} as Category })),
}));

export default useDocumentCategory;