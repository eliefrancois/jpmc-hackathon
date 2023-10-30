"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useDocumentCategory from "@/hooks/useDocumentCategory";
import useFileUpload from "@/hooks/useFileUpload";
import { pdfjs } from 'react-pdf';
import { chunkText, parseDocument } from "@/app/parser/documentParser";
import { ParsedData, useParsedDataStore } from "@/hooks/useParsedData";
import { useFieldSelectionStore } from "@/hooks/useFieldCheckbox";

// Set up the worker (required by pdfjsLib)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();



 
const SubmitButton = () => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    const category = useDocumentCategory(state => state.catgeory);
    const file = useFileUpload(state => state.file);
    const updateParsedData = useParsedDataStore(state => state.setParsedData);
    const selectedFields = useFieldSelectionStore((state) => state.selectedFields);
    const resetSelectedFields = useFieldSelectionStore((state) => state.resetFieldSelection);
    const resetFile = useFileUpload(state => state.resetFile);
    const resetCategory = useDocumentCategory(state => state.resetCategory);


    const extractText = async (fileUrl: string) => {
        const pdf = await pdfjs.getDocument(fileUrl).promise;
        let textContentString = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            for (const item of textContent.items) {
                if ('str' in item) {
                    textContentString += item.str;
                }
            }
        }
        const textChunks = chunkText(textContentString,2000); //Need to find out what the max chunk size should be
        console.log(selectedFields);
        const parsedData = await parseDocument(textChunks,category, selectedFields ?? []);
        console.log(parsedData);
        
        updateParsedData(parsedData as ParsedData[]);
        // toast(JSON.stringify(parsedData),{position: "bottom-right"});
        toast.success("Document parsed successfully!");
        setLoading(false);
        resetCategory();
        resetFile();
        resetSelectedFields();
        
          


        setText(textContentString);
      };



    const handleClick: () => void = () => {
        // if (pending) {
        //     toast.error("Please wait for the previous document to finish parsing")
        //     return;
        // }
        if (!category.name) {
            toast.error("Please select a category")
            return;
        }
        if (!selectedFields || selectedFields.length === 0) {  
            toast.error("Please select at least one field")
            return;
        }
        if (!file) {
            toast.error("Please upload a document")
            return;
        }
        setLoading(true);
        const fileUrl = URL.createObjectURL(file);
        extractText(fileUrl).then((data) => {
            setLoading(false);
        }).catch((err) => { 
            toast.error(`Error while parsing document, please try again`);
            toast.error(err.message);
        }); 
    };
    
    return (
        
        <div className="flex flex-col items-center mt-10">
            {loading ? 
                <Button disabled> 
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Parsing
                </Button> :
                <Button onClick={handleClick}> Parse Document</Button> 
}
        </div>
    );
}
 
export default SubmitButton;