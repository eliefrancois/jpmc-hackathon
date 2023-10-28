"use client"

import CategorySelect from "@/components/CategorySelect";
import DataTable from "@/components/DataTable";
import FileUpload from "@/components/FileUpload";
import SubmitButton from "@/components/Submit";
import { Separator } from "@radix-ui/react-separator";


export default function Home() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
        <CategorySelect/>
        <Separator orientation="horizontal" className="my-10"/>
        <FileUpload/>
        <SubmitButton/>
        <Separator orientation="horizontal" className="my-10"/>
        <DataTable/>

    </div>
  )
}
