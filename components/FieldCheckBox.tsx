import React, { useCallback, useEffect } from 'react';
import { Checkbox } from "./ui/checkbox";
import { documentCategories } from './CategorySelect';
import { useFieldSelectionStore } from '@/hooks/useFieldCheckbox';
import { Field } from 'llmparser';
import toast from 'react-hot-toast';

const FieldCheckbox = ({ category }: { category: string }) => {
  // Find the selected category
  const selectedCategory = documentCategories.find(cat => cat.value === category);
  const toggleSelection = useFieldSelectionStore((state) => state.toggleFieldSelection);


  const handleCheckboxChange = useCallback((field: Field) => {
    toast.success(`Selected ${field.name}`);
    toggleSelection(field);
  }, [toggleSelection]);


  return (
    <div className="flex flex-col items-center mt-10">
      {selectedCategory ? (
        <div>
          <label>Fields to extract</label>
          {selectedCategory.fields.map((field, index) => (
            // console.log(field),
            <div key={index} className="mb-2">
              <Checkbox id={field.name}
              onClick={() => handleCheckboxChange(field as Field)}
                />
              <label
                htmlFor={field.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
              >
                {field.name}
              </label>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FieldCheckbox;