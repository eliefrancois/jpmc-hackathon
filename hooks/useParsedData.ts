import create from "zustand";

type ParsedDataStore = {
    parsedData: any[];
    setParsedData: (data: any[]) => void;
};

export const useParsedDataStore = create<ParsedDataStore>((set) => ({
    parsedData: [],
    setParsedData: (data) => set({ parsedData: data }),
}));