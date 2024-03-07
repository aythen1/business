export const parseChartString = (chartString) => {
    try {
        let jsonContent;

        if (chartString.includes('```')) {
            const match = chartString.match(/```(?:json)?\s*([\s\S]+?)```/);
            if (match) {
                jsonContent = match[1];
            } else {
                console.error('No se encontró un objeto JSON dentro de los codeblocks.');
                return null;
            }
        } else {
            jsonContent = chartString;
        }

        const chartObject = JSON.parse(jsonContent);
        return chartObject;
    } catch (error) {
        console.error('Error al analizar el string del gráfico:', error);
        return null;
    }
}

export const initialPrompt = (data, prompt, type = 'text') => `
I want you to act like an experienced accountant. You can't go wrong.
That you can calculate data on the csv data that I will provide you. 
Do the following operation:
${prompt}

- These are the data:

${data.join('\n')}

Returns only the result without any explanation, a simple result as if it were a calculator.
`;


export const generateDefault = (data, prompt) => `
${data}

With the steps from before now I want to do the following, focus on the following operation:

${prompt}
`





export const generatePrompt = (prompt) => `
Based on the provided prompt ${prompt}, you are tasked with creating a complex, detailed and comprehensive system design utilizing the react-flow library to construct an intricate flow diagram. 

Your solution should meticulously map out all nodes and edges within the system, taking into account all dependencies and connections, along with identifying any potential bottlenecks or issues. Aim to design a robust and scalable system that considers all possible scenarios, both regular and edge cases.

Here's the expected format of your solution, represented in a clean, well-structured JSON, strictly using double quotes, no unnecessary whitespace, and without the use of single quotes.

{
    "nodes": [
        { "id": "1", "position": { "x": 250, "y": 0 }, "data": { "label": "Node 1 Label" } },
        { "id": "2", "position": { "x": 250, "y": 100 }, "data": { "label": "Node 2 Label" } },
        // Include all necessary nodes, each with a unique ID, position, and label
    ],
    "edges": [
        { "id": "e1-2", "source": "1", "target": "2" },
        { "id": "e2-3", "source": "2", "target": "3" },
    ],
}

Never include any explanations or annotations in your responses, focusing purely on delivering the design in the specified format.
`;




export const generatePromptTree = (prompt) => `
Based on the ${prompt} message provided, you are tasked with creating a complex, detailed and complete system design using the react flow library to build a complex flowchart.

Your solution should meticulously map all nodes and edges within the system, taking into account all dependencies and connections, as well as identifying potential bottlenecks or problems. Try to design a robust and scalable system that considers all possible scenarios, both common and extreme cases.

This is the expected format of your solution, represented in a clean, well-structured JSON, strictly using double quotes, without unnecessary whitespace, and without the use of single quotes.

The objective of the nodes is that each node represents a section of a page, and within the data.components, which is an array that is a list of text that is a descriptive and complete promot from section to section that each section must contain.
{
    "nodes": [
        { "id": "1", "position": { "x": 250, "y": 0 }, "data": { "label": "Node 1 Label", "components": [] } },
        { "id": "2", "position": { "x": 550, "y": 100 }, "data": { "label": "Node 2 Label", "components": [] } },
        // Include all necessary nodes, each with a unique ID, position, and label
    ],
    "edges": [
        { "id": "e1-2", "source": "1", "target": "2" },
        { "id": "e2-3", "source": "2", "target": "3" },
    ],
}

Never include any explanations or annotations in your responses, focusing purely on delivering the design in the specified format.
`;




// Templates es una lista de paginas y components es una lista de prompts bastante 
// descriptivo para que luego pueda crear el diseño que definen cada uno de los 
// componentes devuelveme un ejemplo en json.







export const generatePromptData = (data, prompt) => `
I want you to act like an experienced accountant. You can't go wrong.
That you can calculate data on the csv data that I will provide you. 
Do the following operation:
${prompt}

- These are the data:
${data}

Returns only the result without any explanation, a simple result as if it were a calculator.
`;

