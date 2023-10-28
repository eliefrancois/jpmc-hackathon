import { create } from 'zustand';

interface FileUploadStore {
    file: File | null;
    updateFile: (file: File) => void;
    resetFile: () => void;
}

const useFileUpload = create<FileUploadStore>((set) => ({
  file: null,
  updateFile: (file: File) => set(() => ({ file: file })),
  resetFile: () => set(() => ({ file: null })),
}));

export default useFileUpload;