import { create } from 'zustand';

interface DocumentCategoryStore {
    catgeory: string | null;
    updateCategory: (newCategory: string) => void;
    resetCategory: () => void;
}

const useDocumentCategory = create<DocumentCategoryStore>((set) => ({
  catgeory: null,
  updateCategory: (newCategory: string) => set(() => ({ catgeory: newCategory })),
  resetCategory: () => set(() => ({ catgeory: null })),
}));

export default useDocumentCategory;