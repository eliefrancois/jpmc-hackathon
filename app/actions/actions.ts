
"use server";

const pdf = require('pdf-parse');
const fs = require('fs');

export async function parsePdf(file: FormData) {

    const userFile = file.get('file') as File;

    await userFile.arrayBuffer().then(async (data) => {
        const parsed = await pdf(data as Buffer);
        return parsed.text
    });

    // const parsed = await pdf(buffer);
    // console.log(parsed);


    // const reader = new FileReader();
    // reader.readAsArrayBuffer(userFile);
    // reader.onload = async () => {
    //     const arrayBuffer = reader.result;
    //     const dataBuffer = new Uint8Array(arrayBuffer as ArrayBuffer);
    //     const buffer = Buffer.from(dataBuffer);
    //     const parsed = await pdf(buffer);
    //     console.log(parsed);
    // };

        // const dataBuffer = fs.readFileSync(file?.webkitRelativePath);
        // const parsed = await pdf(dataBuffer);
        // // console.log(data.numpages);
        // // number of rendered pages
        // console.log(data.numrender);
        // // PDF info
        // console.log(data.info);
        // // PDF metadata
        // console.log(data.metadata); 
        // // PDF.js version
        // // check https://mozilla.github.io/pdf.js/getting_started/
        // console.log(data.version);
        // // PDF text
        // console.log(data.text); 

    // return parsed;
    
}