import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  type FieldInfo = {
    value: string;
    source: string;
    confidence: number;
    type: string; // You might want to replace 'string' with a more specific type if possible, e.g., 'string' | 'number' | 'date'.
  };
  
  type Fields = {
    [key: string]: FieldInfo;
  };
  
  type parsedData = {
    type: string;
    confidence: number;
    source: string;
    fields: Fields;
  };
  
  // Usage:
  const data: parsedData[] = [
    {
      type: "Head of Community",
      confidence: 0.9,
      source:
        "Head of Community, lead our efforts to build an engaged and passionate community of Notion users and customers.",
      fields: {
        "Job Title": {
          value: "Head of Community",
          source: "Head of Community",
          confidence: 1,
          type: "string",
        },
        "Company Name": {
          value: "Notion",
          source: "Notion",
          confidence: 1,
          type: "string",
        },
      },
    },
  ];
  
  
  export function TableDemo() {
    return (
      <Table>
        <TableCaption>A list of your recent Parsed Documents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Category</TableHead>
            <TableHead>Category Type Confidence</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Job Title Confidence</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Company Name Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.type}>
              <TableCell className="font-medium">{data.type}</TableCell>
              <TableCell>{data.confidence}</TableCell>
              <TableCell>{data.fields['Job Title'].value}</TableCell>
              <TableCell>{data.fields['Job Title'].confidence}</TableCell>
              <TableCell>{data.fields['Company Name'].value}</TableCell>
              <TableCell>{data.fields['Company Name'].confidence}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  