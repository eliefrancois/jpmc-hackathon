import { create } from 'zustand';

interface DocumentCategoryStore {
    catgeory: string;
    updateCategory: (newCategory: string) => void;
    resetCategory: () => void;
}

const useDocumentCategory = create<DocumentCategoryStore>((set) => ({
  catgeory: '',
  updateCategory: (newCategory: string) => set(() => ({ catgeory: newCategory })),
  resetCategory: () => set(() => ({ catgeory: '' })),
}));

export default useDocumentCategory;