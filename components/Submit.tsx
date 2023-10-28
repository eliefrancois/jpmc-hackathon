"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useDocumentCategory from "@/hooks/useDocumentCategory";
import useFileUpload from "@/hooks/useFileUpload";
import { parsePdf } from "@/app/actions/actions";
import { useFormStatus } from "react-dom";

// const getText = async (data: any) => {
//     const dataBuffer = await pdf(data);
//     // console.log(data.numpages);
//     // // number of rendered pages
//     // console.log(data.numrender);
//     // // PDF info
//     // console.log(data.info);
//     // // PDF metadata
//     // console.log(data.metadata); 
//     // // PDF.js version
//     // // check https://mozilla.github.io/pdf.js/getting_started/
//     // console.log(data.version);
//     // // PDF text
//     // console.log(data.text); 
// }
 

const SubmitButton = () => {
    const [loading, setLoading] = useState(false);
    const { pending } = useFormStatus()

    const categoryName = useDocumentCategory(state => state.catgeory);
    const file = useFileUpload(state => state.file);

    // reader.readAsArrayBuffer(file);
    // reader.onload = (event) => {
    //     const dataBuffer = event.target?.result;
    //     if (dataBuffer) {
    //         parsePdf(dataBuffer).then((data) => {
    //             setLoading(false);
    //             console.log(data);
    //         });
    //     }
    // };


    const handleClick: () => void = () => {
        setLoading(true);
        const reader = new FileReader();
        if (file) {
            const formData = new FormData();
            reader.readAsArrayBuffer(file);
            formData.append("file", file);

            parsePdf(formData).then((data) => {
                toast.success("Document parsed successfully!");
            });
        }
    };
    
    return (
        
        <div className="flex flex-col items-center mt-10">
            {loading ? 
                <Button disabled> 
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Parsing
                </Button> :
                <form action={handleClick}>
                    <Button type="submit" id="upload"> Parse Document</Button> 
                </form>
            }
        </div>
    );
}
 
export default SubmitButton;