"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import useDocumentCategory from "@/hooks/useDocumentCategory";
import { Category } from "llmparser";
import { useFieldSelectionStore } from "@/hooks/useFieldCheckbox";

export const documentCategories: Category[] = [
  {
    // value: "operating-agreement",
    name: "Signed Operating Agreement",
    description:
      "An Operating Agreement is a legal document outlining the ownership and operating procedures of an LLC. It's signed by all members of the LLC and may cover details like the business' structure, member roles, and financial management. To identify this document, look for headings like 'Operating Agreement', signatures from all members, and sections detailing member duties and capital contributions.",
    fields: [
      {
        name: "Members",
        description: "Names and addresses of all members",
        type: "string",
      },
      {
        name: "Effective Date",
        description: "The effective date of the agreement",
        type: "date",
      },
      {
        name: "Capital Contributions",
        description: "The capital contributions of each member",
        type: "number",
      },
      {
        name: "Distribution of Profits and Losses",
        description: "How profits and losses are distributed among members",
        type: "string",
      },
    ],
  },
  {
    // value: "certificate-of-organization",
    name: "Certificate of Organization",
    description:
      "A Certificate of Organization is a document filed with the Secretary of State to officially form an LLC. It contains essential information such as the name of the LLC, its purpose, and the name and address of the registered agent. The document title 'Certificate of Organization' should appear at the top, and it should have a filing stamp or acknowledgment from the Secretary of State.",
    fields: [
      { name: "LLC Name", description: "The name of the LLC", type: "string" },
      { name: "Purpose", description: "The purpose of the LLC", type: "string" },
      {
        name: "Registered Agent",
        description: "Name and address of the registered agent",
        type: "string",
      },
    ],
  },
  {
    // value: "articles-of-organization",
    name: "Articles of Organization",
    description:
      "Articles of Organization are legal documents filed with the Secretary of State to establish an LLC's existence. They include the business name, purpose, duration, and the name and address of the registered agent. Look for a header mentioning 'Articles of Organization', and check for essential details like the business name and the signature of the organizer or authorized representative.",
    fields: [
      { name: "LLC Name", description: "The name of the LLC", type: "string" },
      { name: "Purpose", description: "The purpose of the LLC", type: "string" },
      {
        name: "Registered Agent",
        description: "Name and address of the registered agent",
        type: "string",
      },
    ],
  },
  {
    // value: "articles-of-incorporation",
    name: "Articles of Incorporation",
    description:
      "Articles of Incorporation are filed with the Secretary of State to legally form a corporation. They include the corporation’s name, number of shares the corporation is authorized to issue, the address of the initial registered office, and the name of the registered agent. The title 'Articles of Incorporation' should appear at the top, along with signatures of incorporators and possibly a state official's acknowledgment.",
    fields: [
      {
        name: "Corporation Name",
        description: "The name of the corporation",
        type: "string",
      },
      {
        name: "Authorized Shares",
        description: "Number of shares the corporation is authorized to issue",
        type: "number",
      },
      {
        name: "Registered Office and Agent",
        description: "Address and name of the registered agent",
        type: "string",
      },
    ],
  },
];

const CategorySelect = () => {
  const [open, setOpen] = React.useState(false);

  const updateCategory = useDocumentCategory((state) => state.updateCategory);
  const categoryName = useDocumentCategory((state) => state.catgeory);
  const resetFields = useFieldSelectionStore((state) => state.resetFieldSelection);

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
        <Label htmlFor="category">Select Document Category</Label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[400px] justify-between"
            >
              {categoryName?.name
                ? documentCategories.find(
                    (allCategories) => allCategories.name === categoryName.name
                  )?.name
                : "Select Document"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Select Document" />
              <CommandEmpty>No Category found.</CommandEmpty>
              <CommandGroup>
                {documentCategories.map((category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      resetFields(); // not resetting fields? 
                      updateCategory(category);
                      toast.success(`Selected ${category?.name}`);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        categoryName.name === category.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CategorySelect;
