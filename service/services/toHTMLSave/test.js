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


const test = async (req, res) => {
  
  const assistantResponses = [];
 
  let json = null;
  const { image } = req.body;
  
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
      // const response = await fetch("https://api.openai.com/v1/chat/completions", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(body),
      // });

      const result = response.data


      // console.log('res end', result.choices[0].message.content)

      if (result && result.choices && result.choices.length > 0) {
        const assistantResponse = result.choices[0].message.content;
        // console.log('wedwrf', assistantResponse)

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
    console.log('error', e);
    return res.status(200).send({error: e})
  }


  // console.log('ee', assistantResponses)
  // const fileContentJSX = json.choices[0].message.content
  // const code0 = extractCodeBlocks(assistantResponses[0])
  // const filePath0 = `./app/file/file_${formatDate()}.${code0[0]}`;
  // await createFile(filePath0, code0[1]);
  
  // const filePath1 = `./app/file/file_${formatDate()}.css`;
  // await createFile(filePath1, assistantResponses[1]);
  // console.log('rrr', assistantResponses)
  // for (let i = 0; i < assistantResponses.length; i++) {
  //   const codeBlock = extractCodeBlocks(assistantResponses[i]);
  //   // console.log('code', codeBlock)
  //   if (codeBlock.length === 2) {
  //     const filePath = `./app/file/${formatDate()}/file.${codeBlock[0]}`;
  //     await createFile(filePath, codeBlock[1]);
  //   }
  // }


  return res.status(200).send(
    JSON.stringify(assistantResponses)
  )  
  
  // return new Response(JSON.stringify(assistantResponses), {
  //   headers: {
  //     "content-type": "application/json; charset=UTF-8",
  //   },
  // });
}



module.exports = { test: test }
