// const fetch = require('node-fetch');
const axios = require('axios');

var token = "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"


// const systemPromptjsx = `You are an expert in creating JSX code for web 
// pages and components. A user will provide you with a low-fidelity 
// wireframe or describe a web page or component, and you will return a 
// single JSX file using React. Use creative license to enhance the structure 
// and details. If an image is needed, use a placeholder. Respond only with the 
// JSX code.`;

// const systemPromptcss = `You are a skilled CSS developer with expertise in 
// writing nested styles. A user will provide you with a description of a web 
// page or component, and you will return a single CSS file with nested styles. 
// Use creative license to enhance the styling. If specific details are missing, 
// make informed design decisions. Respond only with the CSS code.`


const systemPrompt = `You are an expert tailwind developer. A user will provide you with a
 low-fidelity wireframe of an application and you will return a single html file that uses tailwind to create the website. 
 Use creative license to make the application more fleshed out.
If you need to insert an image, use placehold.co to create a placeholder image. Respond only with the html file.
If it does not detect any element to create an html, it returns an element not found html, but it always returns the html`;



const codeGPT = async (code) => {
    const systemPromptTailwind = `
    You are a skilled Tailwind CSS developer. 
    Users will provide you with low-fidelity wireframes of applications, 
    and your task is to return a single HTML file without header tags or the <!DOCTYPE html> or body declaration. 
    Focus on the content within the body and use Tailwind CSS to enhance the website. 
    If the wireframe includes an image, use placehold.co to generate a placeholder image. 
    In case no specific elements are detected, return an "element not found" HTML, 
    but always include the HTML structure. Respond only with the HTML content inside the body.
`;


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


    // Updated textMessage
    // const textMessage = {
    //     type: 'text',
    //     content: 'Your text goes here',
    // };

    const textMessage = code


    const assistantResponses = [];


    const conversation = [
        {
            role: 'user',
            content: systemPromptTailwind + '\n\nMake code that represents:\n' + textMessage
            // content: [textMessage, systemPromptTailwind],
        }
    ];


    try {
        for (const [index, userMessage] of conversation.entries()) {
            const body = {
                // model: "gpt-4-vision-preview",
                // model: "gpt-4-1106-preview",
                model: "gpt-3.5-turbo", // GPT-3.5 model
                temperature: 0.7,
                max_tokens: 2096,
                messages: [userMessage]
            }


            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            
            // const html = result.body.source
            // return res.status(200).send(html)
            if (result && result.choices && result.choices.length > 0) {
                const assistantResponse = result.choices[0].message.content;
                
                // Push the assistant response into the corresponding array
                const html = await extractCodeBlocks(assistantResponse)
                assistantResponses[index] = html[1]

            }
        }
        
        console.log('res======', assistantResponses)
        return assistantResponses


    } catch (e) {
        console.log(e);
    }

    return new Response(JSON.stringify(assistantResponses), {
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    });
}


const visionGPT = async (image) => {
    const assistantResponses = [];

    let json = null;
    //   const { image } = req.body;

    // const image_json = await image.json();


    const imageMessage = {
        type: 'image_url',
        image_url: image,
    };


    // return res.status(200).send(imageMessage)

    const conversation = [
        {
            role: 'user',
            content: [imageMessage, systemPrompt],
        },
        // {
        //   role: 'user',
        //   content: [imageMessage, systemPromptcss],
        // },
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
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).catch(err => {
                console.log('werirfi', err)
            })

            const result = response.data



            if (result && result.choices && result.choices.length > 0) {
                const assistantResponse = result.choices[0].message.content;

                // Push the assistant response into the corresponding array
                assistantResponses[index] = assistantResponse
            }
        }


        return res.status(200).send(
            JSON.stringify(assistantResponses)
        )

    } catch (e) {
        console.log('error', e);
        return res.status(200).send({ error: e })
    }
}


const rpaGPT = async () => {
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

                assistantResponses[index] = assistantResponse
            }
        }


    } catch (e) {
        console.log(e);
    }

    return new Response(JSON.stringify(assistantResponses), {
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    });
}




module.exports = {
    codeGPT: codeGPT,
    visionGPT: visionGPT,
    rpaGPT: rpaGPT
}







// for (let i = 0; i < assistantResponses.length; i++) {
//     const codeBlock = extractCodeBlocks(assistantResponses[i]);
//     console.log('code', codeBlock)
//     if (codeBlock.length === 2) {
//       const filePath = `./app/file/${formatDate()}/file.${codeBlock[0]}`;
//       await createFile(filePath, codeBlock[1]);
//     }
//   }






async function createFile(filePath, fileContent) {
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

async function formatDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}_${hours}-${minutes}`;
}


async function extractCodeBlocks(fullCode) {
    // console.log('extract');
    const regex = /```(\w+)[\s\S]+?```/g;
    const matches = [...fullCode.matchAll(regex)];

    if (matches.length > 0) {
        const codeBlock = matches[0][0];
        const codeType = matches[0][1].toLowerCase();

        // Eliminar las triple comillas invertidas del principio y del final
        const cleanedCodeBlock = codeBlock.replace(/```(\w+)/, '').replace(/```$/, '').trim();

        return [codeType, cleanedCodeBlock];
    }

    // Si no se encuentra ningún bloque de código, puedes manejarlo de acuerdo a tus necesidades
    return ["element not found", "<p>No code block found</p>"];
}





