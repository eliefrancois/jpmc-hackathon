"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useFileUpload from "@/hooks/useFileUpload"
import React from "react"
import toast from "react-hot-toast"

// Try Making State for File upload type FormData and control changes in state manager?

const FileUpload = () => {

    const updateFile = useFileUpload(state => state.updateFile);
    const resetFile = useFileUpload(state => state.resetFile);
    
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            toast.error("Error while uploading file, please try again")
            return;
        }
        if (file.type !== "application/pdf") {
            toast.error("File must be a PDF")
            resetFile();
            return;
        }
        updateFile(file);
        toast.success("Document uploaded successfully!")
    }
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
            <Label htmlFor="document">Upload Document</Label>
            <Input id="document" type="file"
            onChange={(value)=> {handleFileUpload(value)}}
            />
        </div>
    )
}
 
export default FileUpload;
