import { Field } from "llmparser";
import create from "zustand";

type FieldSelectionStore = {
    selectedFields: Field[];
    toggleFieldSelection: (field: Field) => void;
};

export const useFieldSelectionStore = create<FieldSelectionStore>((set) => ({
    selectedFields: [],
    toggleFieldSelection: (field) => {
        set((state) => {
            const isSelected = state.selectedFields.some(
                (currentfields) => currentfields.name === field.name
            );
            const selectedFields = isSelected
                ? state.selectedFields.filter((currentfields) => currentfields.name !== field.name)
                : [
                        ...state.selectedFields,
                        field
                ];
            return { selectedFields };
        });
    },
}));