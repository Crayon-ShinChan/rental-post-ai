import { AWSBedrockAnthropicStream, StreamingTextResponse } from "ai";
import { experimental_buildAnthropicPrompt } from "ai/prompts";
import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages, fields } = await req.json();

  const systemMessages = `You are an assistant helping a user to write a post for a rental property. The user has provided the following information:
  ${JSON.stringify(fields, null, 2)}
  `;

  // If user ask you to polish or improve their description field in the above post, you need to improve the description with the following guide:
  // \`\`\`
  // please summarize or paraphrase description field into polished, organized paragraphs. No more than 4 paragraphs.
  // Please retain all the information in the description, but feel free to reorganize the information in a more logical order.
  // Prioritize the information by importance, placing the most critical criteria at the beginning and less important details towards the end.
  // Include only the polished summary in your response. Here's the property description: \n\n{property_description}.
  // \`\`\`

  const fullMessages = [
    {
      role: "user",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      content: `${systemMessages}. Here is my question: ${messages[0].content}`,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ...messages.slice(1),
  ];

  // Ask Claude for a streaming chat completion given the prompt
  const bedrockResponse = await bedrockClient.send(
    new InvokeModelWithResponseStreamCommand({
      modelId: "anthropic.claude-v2:1",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        prompt: experimental_buildAnthropicPrompt(fullMessages),
        max_tokens_to_sample: 3000,
      }),
    }),
  );

  // Convert the response into a friendly text-stream
  const stream = AWSBedrockAnthropicStream(bedrockResponse);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
