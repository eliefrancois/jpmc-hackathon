"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import toast from "react-hot-toast"
import useDocumentCategory from "@/hooks/useDocumentCategory"

const documentCategories = [
  {
    value: "operating-agreement",
    label: "Signed Operating Agreement",
  },
  {
    value: "certificate-of-organization",
    label: "Certificate of Organization",
  },
  {
    value: "articles-of-organization",
    label: "Articles of Organization",
  },
  {
    value: "articles-of-incorporation",
    label: "Articles of Incorporation",
  },
]

const CategorySelect = () => {
    const [open, setOpen] = React.useState(false);
    
    const updateCategory = useDocumentCategory(state => state.updateCategory);
    const categoryName = useDocumentCategory(state => state.catgeory);


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
                {categoryName
                    ? documentCategories.find((framework) => framework.value === categoryName)?.label
                    : "Select Document"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                <CommandInput placeholder="Select Document" />
                <CommandEmpty>No Category found.</CommandEmpty>
                <CommandGroup>
                    {documentCategories.map((categories) => (
                    <CommandItem
                        key={categories.value}
                        value={categories.value}
                        onSelect={(currentValue) => {
                        updateCategory(currentValue === categoryName ? "" : currentValue)
                        setOpen(false)
                        toast.success(`Selected ${currentValue}`)
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            categoryName === categories.value ? "opacity-100" : "opacity-0"
                        )}
                        />
                        {categories.label}
                    </CommandItem>
                    ))}
                </CommandGroup>
                </Command>
            </PopoverContent>
            </Popover>
        </div>
    </div>
  )
}

export default CategorySelect;