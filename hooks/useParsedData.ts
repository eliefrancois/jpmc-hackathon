import {create} from "zustand";

type FieldInfo = {
    value: string | number | Date;
    source: string;
    confidence: number;
    type: string;
  };
  
  type Fields = {
    [key: string]: FieldInfo;
  };
  
  export type ParsedData = {
    type: string;
    confidence: number;
    source: string;
    fields: Fields;
  };
  
  type ParsedDataStore = {
    parsedData: ParsedData[];
    setParsedData: (data: ParsedData[]) => void;
  };
  
  export const useParsedDataStore = create<ParsedDataStore>((set) => ({
    parsedData: [],
    setParsedData: (data) => set({ parsedData: data }),
  }));