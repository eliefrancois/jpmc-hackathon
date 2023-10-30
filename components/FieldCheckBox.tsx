import React, { useCallback, useEffect } from 'react';
import { Checkbox } from "./ui/checkbox";
import { documentCategories } from './CategorySelect';
import { useFieldSelectionStore } from '@/hooks/useFieldCheckbox';
import { Category, Field } from 'llmparser';
import toast from 'react-hot-toast';
import useDocumentCategory from '@/hooks/useDocumentCategory';

const FieldCheckbox = ({ category }: { category: Category }) => {
  // Find the selected category
  const toggleSelection = useFieldSelectionStore((state) => state.toggleFieldSelection);
  console.log(category);


  const handleCheckboxChange = useCallback((field: Field) => {
    toggleSelection(field);
    toast.success(`Selected ${field.name}`);
  }, [toggleSelection]);


  return (
    <div className="flex flex-col items-center mt-10">
      {category.fields ? (
        <div>
          <label>Fields to extract</label>
          {category?.fields?.map((field, index) => (
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