import { promises as fs, mkdirSync } from 'fs';
import path from 'path';

var token = "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"


async function createFile(filePath, fileContent): Promise<void> {
  try {
    const directory = path.dirname(filePath);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }

    // Write the file content
    await fs.writeFile(filePath, fileContent);
    console.log(`Archivo creado: ${filePath}`);
  } catch (err) {
    console.error(`Error al crear el archivo: ${err}`);
  }
}
function formatDate() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const hours = today.getHours().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}_${hours}-${minutes}`;
}


function extractCodeBlocks(fullCode) {
  console.log('extract')
  const regex = /```(\w+)[\s\S]+?```/g;
  const matches = [...fullCode.matchAll(regex)];
  
  const codeBlocks = matches.map(match => [
    match[1].toLowerCase(), // Convert code type to lowercase
    match[0].replace(/```(\w+)/, '').trim(),
  ]);
  
  // console.log('code type',codeBlocks[0])
  return codeBlocks[0];
}

const systemPromptjsx = `You are an expert in creating JSX code for web 
pages and components. A user will provide you with a low-fidelity 
wireframe or describe a web page or component, and you will return a 
single JSX file using React. Use creative license to enhance the structure 
and details. If an image is needed, use a placeholder. Respond only with the 
JSX code.`;

const systemPromptcss = `You are a skilled CSS developer with expertise in 
writing nested styles. A user will provide you with a description of a web 
page or component, and you will return a single CSS file with nested styles. 
Use creative license to enhance the styling. If specific details are missing, 
make informed design decisions. Respond only with the CSS code.`


const assistantResponses = [];

export async function POST(request) {
  let json = null;
  const { image } = await request.json();

  const imageMessage = {
    type: 'image_url',
    image_url: image,
  };

  const conversation = [
    {
      role: 'user',
      content: [imageMessage, systemPromptjsx],
    },
    {
      role: 'user',
      content: [imageMessage, systemPromptcss],
    },
  ];


  try {
    for (const [index, userMessage] of conversation.entries()) {
      const body = {
        model: "gpt-4-vision-preview",
        // model: "gpt-4-1106-preview",
        temperature: 0.7,
        max_tokens: 2096,
        messages: [userMessage]
      }

      // // Include the previous response in the query
      // if (previousResponse !== null) {
      //   body.messages.push({
      //     role: 'assistant',
      //     content: previousResponse,
      //   });
      // }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      console.log('res', result)

      if (result && result.choices && result.choices.length > 0) {
        const assistantResponse = result.choices[0].message.content;


        // Create an array for the type if it doesn't exist
        // if (!assistantResponses[index]) {
        //   assistantResponses[index] = [];
        // }

        // Push the assistant response into the corresponding array
        assistantResponses[index] = assistantResponse

        // Update the previous response
        // previousResponse = assistantResponse[];
      }
    }


  } catch (e) {
    console.log(e);
  }


  // console.log('ee', assistantResponses)
  // const fileContentJSX = json.choices[0].message.content
  // const code0 = extractCodeBlocks(assistantResponses[0])
  // const filePath0 = `./app/file/file_${formatDate()}.${code0[0]}`;
  // await createFile(filePath0, code0[1]);
  
  // const filePath1 = `./app/file/file_${formatDate()}.css`;
  // await createFile(filePath1, assistantResponses[1]);
  console.log('rrr', assistantResponses)
  for (let i = 0; i < assistantResponses.length; i++) {
    const codeBlock = extractCodeBlocks(assistantResponses[i]);
    console.log('code', codeBlock)
    if (codeBlock.length === 2) {
      const filePath = `./app/file/${formatDate()}/file.${codeBlock[0]}`;
      await createFile(filePath, codeBlock[1]);
    }
  }


  return new Response(JSON.stringify(assistantResponses), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}

type MessageContent =
  | string
  | (string | { type: "image_url"; image_url: string })[];

export type GPT4VCompletionRequest = {
  model: "gpt-4-vision-preview" | "gpt-4-1106-preview";
  messages: {
    role: "system" | "user" | "assistant" | "function";
    content: MessageContent;
    // content: string | ImageMessage | CodeMessage;
    name?: string | undefined;
  }[];
  functions?: any[] | undefined;
  function_call?: any | undefined;
  stream?: boolean | undefined;
  temperature?: number | undefined;
  top_p?: number | undefined;
  max_tokens?: number | undefined;
  n?: number | undefined;
  best_of?: number | undefined;
  frequency_penalty?: number | undefined;
  presence_penalty?: number | undefined;
  logit_bias?:
  | {
    [x: string]: number;
  }
  | undefined;
  stop?: (string[] | string) | undefined;
};


