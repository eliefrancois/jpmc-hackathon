

import { documentCategories } from "@/components/CategorySelect";
import { Category, Field, LLMParser } from "llmparser";



const categories = documentCategories.map((category) => {
  return {
    name: category.name,
    description: category.description,
  };
});

export const chunkText = (text: string, maxLength: number) => {
    const chunks = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        let endIndex = startIndex + maxLength;
        if (endIndex > text.length) {
            endIndex = text.length;
        }
        chunks.push(text.slice(startIndex, endIndex));
        startIndex = endIndex;
    }

    return chunks;
};

export const parseDocument = async (documents: string[],  category: Category, fields?: Field[]) => {
  console.log({"parseDocument": documents}, category, fields);
  
  const parser = new LLMParser({
    apiKey: process.env.OPENAI_API_KEY || " " ,
    categories: [category],
  });

  const promises = documents.map((document) => {
    return parser.parse({ document });
  });

  const results = await Promise.all(promises);
  return results;
};
