

import { documentCategories } from "@/components/CategorySelect";
import { LLMParser } from "llmparser";


// this needs to run on the server!!!
const categories = documentCategories.map((category) => {
  return {
    name: category.label,
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

export const parseDocument = async (documents: string[]) => {
  const parser = new LLMParser({
    apiKey: process.env.OPENAI_API_KEY || "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" ,
    categories: categories,
  });

  const promises = documents.map((document) => {
    return parser.parse({ document });
  });

  const results = await Promise.all(promises);
  return results;
};
