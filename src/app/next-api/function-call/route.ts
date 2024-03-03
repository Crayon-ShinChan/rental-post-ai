// import { buildPropertyFromDescription } from "@/utils/function-call";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { type Post } from "@/lib/atoms";

export const runtime = "edge";

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages } = await req.json();
  const description: string = messages as string;
  const propertyPost: string | undefined =
    await buildPropertyFromDescription(description);
  if (propertyPost === undefined) {
    // return new Response("N.A", { status: 500 });
    return Response.error();
  } else {
    // return new Response(JSON.stringify(propertyPost), { status: 200 });
    return Response.json({ propertyPost });
  }
  // return Response.json({ messages });
}

type Field = {
  name: string;
  type: string;
  description: string;
  enum?: string[];
};

const fields: Field[] = [
  {
    name: "bedrooms",
    type: "integer",
    description: "The number of bedrooms in the house. Keep it positive.",
  },
  {
    name: "bathrooms",
    type: "float",
    description:
      "The number of bathrooms in the house, including half bathrooms. Format as a decimal, where .5 represents a half bathroom.",
  },
  {
    name: "parking",
    type: "number",
    description: "The number of parking spaces available with the property.",
  },
  {
    name: "rental_form",
    type: "string",
    description:
      "The form or type of rental agreement offered. Please choose from the following enum options. Keep this field in English.",
    enum: [
      "month_to_month",
      "fixed_term",
      "short_term",
      "long_term",
      "room_rental",
      "student_housing",
      "shared_living",
      "sublet",
      "other",
    ],
  },
  {
    name: "lease_terms",
    type: "number",
    description: "The length of the lease term in months.",
  },
  {
    name: "pet_allowed",
    type: "boolean",
    description:
      "Indicates whether pets are allowed in the property. True for allowed, false for not allowed.",
  },
  {
    name: "water",
    type: "boolean",
    description:
      "Indicates if the cost of water is included in the rental. True for included, false for not included.",
  },
  {
    name: "hydro",
    type: "boolean",
    description:
      "Indicates if the cost of hydro is included in the rental. True for included, false for not included.",
  },
  {
    name: "heat",
    type: "boolean",
    description:
      "Indicates if the cost of heat is included in the rental. True for included, false for not included.",
  },
  {
    name: "internet",
    type: "boolean",
    description:
      "Indicates if the cost of internet is included in the rental. True for included, false for not included.",
  },
  {
    name: "air_conditioning",
    type: "boolean",
    description:
      "Indicates if the property has air conditioning. True for available, false for not available.",
  },
  {
    name: "gym",
    type: "boolean",
    description:
      "Indicates if the property has a gym. True for available, false for not available.",
  },
  {
    name: "pool",
    type: "boolean",
    description:
      "Indicates if the property has a pool. True for available, false for not available.",
  },
  {
    name: "dishwasher",
    type: "boolean",
    description:
      "Indicates if the property has a dishwasher. True for available, false for not available.",
  },
  {
    name: "EV_charging",
    type: "boolean",
    description:
      "Indicates if the property has an electric vehicle charging station. True for available, false for not available.",
  },
  {
    name: "storage",
    type: "boolean",
    description:
      "Indicates if the property has storage. True for available, false for not available.",
  },
  {
    name: "in_suite_laundry",
    type: "boolean",
    description:
      "Indicates if the property has in-suite laundry. True for available, false for not available.",
  },
  {
    name: "property_type",
    type: "string",
    description:
      "The type of property being listed, such as house, apartment, or condo.",
    enum: [
      "apartment",
      "house",
      "townhouse",
      "condo",
      "basement",
      "studio",
      "loft",
      "laneway",
      "duplex",
      "triplex",
      "penthouse",
      "room",
      "sublet",
      "other",
    ],
  },
  {
    name: "title",
    type: "string",
    description:
      "Summarize the description of the house and come up with a concise, informative and descriptive title. Make it less than 100 characters.",
  },
  {
    name: "address",
    type: "string",
    description: "The full address of the property being listed.",
  },
  {
    name: "price",
    type: "integer",
    description:
      "The price of the property being listed. If not mentioned, leave it 0.",
  },
];

function extractJsonStrFromString(input: string): string | null {
  const regex = /\{[\s\S]*?\}/;
  const match = input.match(regex);
  return match ? match[0] : null;
}

function convertFieldsToPrompt(fields: Field[]) {
  return fields
    .map((field) => {
      return `${field.name}: ${field.description}.
      ${field.enum ? `The enums are: ${field.enum.join(", ")}.` : ""} \n
      The data type should be fotmatted as ${field.type}.`;
    })
    .join("\n");
}

function createPrompt(houseDescription: string) {
  const prompt_template = `\n\nHuman:
You are a very helpful Real Estate agent. I will provide you with some housing data. Your task is help the user achieve the goal.
Your task is to meticulously analyze the housing data and distill the information into specific attributes.
You will be provided with a description of a house. Your task is to analyze the description and return the information in a structured JSON object format, and only the json object, no other things. The JSON object should have the following fields:
\`\`\`
  ${convertFieldsToPrompt(fields)}
\`\`\`
  Please ensure that all fields are accurately filled based on the provided description. If a specific piece of information is not mentioned in the description, leave the corresponding field empty or as null. Here's the description:
  
  ${houseDescription}
  
  Based on the above description, please return a structured JSON object with the specified fields. Please just return one json object back with the specified fields.
  \n\nAssistant:
`;
  return prompt_template;
}

const model = new BedrockRuntimeClient({
  // model: "ai21.j2-ultra-v1",
  // model: "meta.llama2-13b-chat-v1",
  // model: "amazon.titan-text-express-v1",
  region: process.env.AWS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
  // temperature: 0.2,
  // maxTokens: 1000,
});

// function convertJsonToPropertyType(jsonStr: string): Post {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   try {
//     const post: Post = JSON.parse(jsonStr) as Post;
//     // Here you could add runtime checks to validate the structure and types if needed.
//     return post;
//   } catch (error) {
//     throw new Error("Invalid JSON string");
//   }
// }

async function modelInvokeWithRetry(
  prompt: string,
  maxRetry: number,
): Promise<string | undefined> {
  let retries = 0;
  // const full_message =
  // while (retries < maxRetry) {
  try {
    // prompt
    const res = await model.send(
      new InvokeModelCommand({
        modelId: "anthropic.claude-v2:1",
        // modelId: "ai21.j2-ultra-v1",
        // modelId: "amazon.titan-text-express-v1",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          prompt: prompt,
          max_tokens_to_sample: 3000,
          // temperature: 0.2,
        }),
      }),
    );
    const jsonString: string = new TextDecoder().decode(res.body);
    return jsonString;
    // let jsonStr: string | null = extractJsonStrFromString(jsonString);
    // console.log("jsonStr", jsonStr);
    // if (jsonStr === null) {
    //   throw new Error("No JSON string found.");
    // }
    // jsonStr = jsonStr.replace(
    //   /{"completion":" Here is the JSON object with the requested fields based on the description:\n\n```json\n/g,
    //   "",
    // );
    // JSON.parse(jsonStr); // Attempt to parse to ensure it's valid JSON
    // console.log("REAL JSON", jsonStr);
    // const test: Post = convertJsonToPropertyType(jsonStr);
    // return test; // If parsing is successful, return the response
  } catch (error) {
    // If there's an error, increment the retry counter
    retries++;
    if (retries >= maxRetry) {
      // If the maximum number of retries has been reached, return "N.A"
      return undefined;
    }
    // }
  }
  return undefined;
}

export async function buildPropertyFromDescription(
  userDescription: string,
): Promise<string | undefined> {
  const maxRetry = 5;
  const prompt = createPrompt(userDescription);
  return modelInvokeWithRetry(prompt, maxRetry);
}
