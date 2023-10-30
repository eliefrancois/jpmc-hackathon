import { Field } from "llmparser";
import {create} from "zustand";

type FieldSelectionStore = {
    selectedFields: Field[] | null ;
    toggleFieldSelection: (field: Field) => void;
    resetFieldSelection: () => void;
};

export const useFieldSelectionStore = create<FieldSelectionStore>((set) => ({
    selectedFields: [] as Field[],
    toggleFieldSelection: (field: Field) => {
        set((state) => {
            const isSelected = (state?.selectedFields ?? []).some(
                (currentfields) => currentfields.name === field.name
            );
            const selectedFields = isSelected
                ? state?.selectedFields?.filter((currentfields) => currentfields.name !== field.name)
                : [
                        ...(state?.selectedFields ?? []),
                        field
                ];
            return { selectedFields };
        });
    },
    resetFieldSelection: () => set(() => ({ selectedFields: [] as Field[] })),
}));