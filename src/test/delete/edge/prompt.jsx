



export const initialPrompt = (data, prompt, type = 'text') => `
I want you to act like an experienced accountant. You can't go wrong.
That you can calculate data on the csv data that I will provide you. 
Do the following operation:
${prompt}

- These are the data:

${data.join('\n')}

Returns only the result without any explanation, a simple result as if it were a calculator.
`;




// ${data.join('\n')}
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







export const generatePromptData = (data, prompt) => `
I want you to act like an experienced accountant. You can't go wrong.
That you can calculate data on the csv data that I will provide you. 
Do the following operation:
${prompt}

- These are the data:
${data}

Returns only the result without any explanation, a simple result as if it were a calculator.
`;


export const generatePromptGraph = (data, prompt) => `
With these data

${data.join('\n')}	

Give us a value in the following form applying the following logic, if you can't think of any just say NO DATA

[type]: {
...data
}

The data below is a sample, the objective is to return the type that the user is requesting and calculate some data and series according to the data above.
This is what the user needs: ${prompt}

{
  "SimpleLineChart": {
    "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "series": [
      [12, 9, 7, 8, 5],
      [2, 1, 3.5, 7, 3],
      [1, 3, 4, 5, 6]
    ]
  },
  "SimpleLineStraightChart": {
    "labels": ["Week1", "Week2", "Week3", "Week4", "Week5", "Week6"],
    "series": [
      [5, 4, 3, 7, 5, 10],
      [3, 2, 9, 5, 4, 6],
      [2, 1, -3, -4, -2, 0]
    ]
  },
  "AreaLineChart": {
    "labels": [1, 2, 3, 4, 5, 6, 7, 8],
    "series": [
      [5, 9, 7, 8, 5, 3, 5, 4]
    ]
  },
  "BIPolarLineChart": {
    "labels": ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"],
    "series": [
      [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
    ]
  },
  "SeriesOverRides": {
    "labels": ["1", "2", "3", "4", "5", "6", "7", "8"],
    "series": [
      {
        "name": "series-1",
        "data": [5, 2, -4, 2, 0, -2, 5, -3]
      },
      {
        "name": "series-2",
        "data": [4, 3, 5, 3, 1, 3, 6, 4]
      },
      {
        "name": "series-3",
        "data": [2, 4, 3, 1, 4, 5, 3, 2]
      }
    ]
  },
  "SeriesLine": {
    "series": [
      [
        { "x": 1, "y": 100 },
        { "x": 2, "y": 50 },
        { "x": 3, "y": 25 },
        { "x": 5, "y": 12.5 },
        { "x": 8, "y": 6.25 }
      ]
    ]
  },
  "BIPolarBarChart": {
    "labels": [1, 2, 3, 4, 5, 6, 7, 8],
    "series": [
      [1, 2, 3, 1, -2, 0, 1, 0],
      [-2, -1, -2, -1, -2.5, -1, -2, -1],
      [0, 0, 0, 1, 2, 2.5, 2, 1],
      [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
    ]
  },
  "OverlappingBars": {
    "labels": ["First quarter of the year", "Second quarter of the year", "Third quarter of the year", "Fourth quarter of the year"],
    "series": [
      [60000, 40000, 80000, 70000],
      [40000, 30000, 70000, 65000],
      [8000, 3000, 10000, 6000]
    ]
  },
  "MultiLineLabels": {
    "labels": ["First quarter of the year", "Second quarter of the year", "Third quarter of the year", "Fourth quarter of the year"],
    "series": [
      [60000, 40000, 80000, 70000],
      [40000, 30000, 70000, 65000],
      [8000, 3000, 10000, 6000]
    ]
  },
  "StackedBarChart": {
    "labels": ["Q1", "Q2", "Q3", "Q4"],
    "series": [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  },
  "HorizontalBarChart": {
    "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "series": [
      [5, 4, 3, 7, 5, 10, 3],
      [3, 2, 9, 5, 4, 6, 4]
    ]
  },
  "DistributedSeries": {
    "labels": ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    "series": [20, 60, 120, 200, 180, 20, 10]
  },
  "SimplePieChart": {
    "series": [5, 3, 4]
  },
  "PieChart": {
    "labels": ["Bananas", "Apples", "Grapes"],
    "series": [20, 15, 40]
  },
  "GaugeChart": {
    "series": [20, 10, 30, 40]
  },
  "DonutChart": {
    "series": [20, 10, 30, 40]
  }
}


Returns only the result without any explanation, a simple result as if it were a calculator.
`;




