import React, { memo, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Handle } from "reactflow";

import * as Graphs from '@/views/graphs/render'
import { useGraph } from '../index';


import { useOpenAI } from '../openai'

import {
  initialPrompt,
  generateDefault,

  generatePromptGraph
} from '../prompt';

import styles from './CustomGPT.module.css'



function convertToCSV(data) {
  const csvRows = [];

  const header = Object.keys(data.data[0]);
  csvRows.push(header.join(','));

  data.data.forEach(row => {
    const values = header.map(key => row[key]);
    const csvRow = values.join(',');
    csvRows.push(csvRow);
  });

  const csvContent = csvRows.join('\n');

  return csvContent;
}



export default memo(({ id, data, isConnectable, }) => {
  const { nodes, edges, setNodes, setEdges, setSelectedEdge } = useGraph();

  const { prompt, value, error, handles } = data;

  const textareaRef = useRef();

  const [isError, setIsError] = useState(error);

  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState(prompt)

  const [gptActive, setGptActive] = useState(false);
  const [gptValue, setGptValue] = useState('')

  const [typeGraph, setTypeGraph] = useState(false);
  const [dataGraph, setDataGraph] = useState({ /* tus datos aquí */ });

  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);


  useEffect(() => {
    setInputValue(data.prompt)
    
    if (data.response) {
      setGptActive(true)
      console.log('data data', data.response)
      if(!data.response.type){
        setGptValue(data.response)
      }else{
        setTypeGraph(data.response.type)
        setDataGraph(data.response.data)
      }
    }
  }, [data])




  useEffect(() => {
    setIsError(error)
  }, [error])





  useEffect(() => {
    const closeContextMenu = () => {
      setIsContextMenuOpen(false);
    };

    document.body.addEventListener("click", closeContextMenu);

    return () => {
      document.body.removeEventListener("click", closeContextMenu);
    };
  }, []);





  const handleReturnGPT = () => {
    setGptActive(false)
    setGptValue('')
  }



  const InitialGraph = ({ type, data }) => {
    const Component = Graphs[type]


    if (Component) {
      return (
        <div style={{width: 300, height: 300, display: 'flex', alignItems: 'center'}}>
          <Component value={data} />
        </div>
      )
    } else {
      return (
        <div>
          {/* hello world */}
        </div>
      )
    }
  }



  function parseChartString(chartString) {
    try {
      const match = chartString.match(/\{(.+?)\}/)

      const chartObject = JSON.parse(`${chartString}`);
      const chartType = Object.keys(chartObject)[0];
      const chartData = chartObject[chartType];

      return { type: chartType, data: chartData };
    } catch (error) {
      console.error('Error al analizar el string del gráfico:', error);
      return null;
    }
  }



  




  const handlers = {
    'selectorGPT': function (nodeId) {
      console.log(`Ejecutando selectorGPT para el nodo ${nodeId}`);
    },
    'selectorVector': function (nodeId) {
      console.log(`Ejecutando selectorVector para el nodo ${nodeId}`);
    }
  };



  function transposeArrays(arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));

    const result = Array.from({ length: maxLength }, () => []);

    for (const array of arrays) {
      array.forEach((value, index) => {
        result[index].push(value);
      });
    }

    return result;
  }






  const handleGPT = async ({ id, prompt = false, type = 'text' }) => {
    if (prompt) {
      const messages = [{
        role: 'user',
        content: prompt
      }]

      try {
        const openai = await useOpenAI()
        const stream = await openai.chat.completions.create({
          model: 'gpt-4',
          messages,
          stream: true,
        });

        let accumulatedText = '';
        for await (const part of stream) {
          const text = part.choices[0]?.delta?.content || ''
          accumulatedText += text
          if(type !== 'graph'){
            setNodes((prevNodes) => {
              return prevNodes.map((node) => {
                if (node.id === id) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      value: prompt + '\n' + accumulatedText,
                      response: accumulatedText,
                    },
                  };
                }
                return node;
              });
            });
          }
        }


        if(type == 'graph'){
          let accumulatedGraph = parseChartString(accumulatedText)
          setNodes((prevNodes) => {
            return prevNodes.map((node) => {
              if (node.id === id) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    value: prompt + '\n' + accumulatedText,
                    response: accumulatedGraph,
                  },
                };
              }
              return node;
            });
          });
        }
      } catch (err) {
        console.log('err', err)
      }
    }

    return data
  }







  const inputsGPT = async (inputs) => {
    const _data = inputs.sortedPaths.map(input => input[0]);
    const dataVectors = [...new Set(_data)];

    for await (const vector of dataVectors) {
      const currentNode = nodes.find((node) => node.id === vector);
      if (currentNode) {
        const graphResponse = `\n${convertToCSV(currentNode.data)}\n`
        // data[currentNode.id] = graphResponse

        setNodes((prevNodes) => {
          return prevNodes.map((node) => {
            if (node.id === currentNode.id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  value: graphResponse
                },
              };
            }
            return node;
          });
        });
      }
    }


    const values = {}

    // Bucle inputs detection nodeModule
    const inputsTransposed = transposeArrays(inputs.sortedPaths);

    const inputsExecute = []

    for (let col = 1; col < inputsTransposed.length; col++) {
      const currentColumn = inputsTransposed[col];
      const previousColumn = inputsTransposed[col - 1];

      for (let i = 0; i < currentColumn.length; i++) {
        const input = currentColumn[i];
        const inputBack = previousColumn ? previousColumn[i] : null;

        const currentNode = nodes.find((node) => node.id === input);
        let prompt = currentNode.data.prompt

        if (inputsExecute.includes(input)) continue;
        inputsExecute.push(input)


        if (inputs.nodeUnion[input]) {
          const selectorVectorNodes = nodes.filter(node => node.type === 'selectorVector');

          const selectorVectorInUnion = inputs.nodeUnion[input]
            .map(union => selectorVectorNodes.find(node => node.id === union))
            .filter(Boolean);

          if (selectorVectorInUnion.length >= 2) {
            const dataObj = []
            for await (const currentNode of selectorVectorInUnion) {
              dataObj.push(currentNode.data.value)
            }
            
            
            prompt = generatePromptGraph(dataObj, prompt)      
            const gptResponse = await handleGPT({
              id: input,
              prompt: prompt,
              type: 'graph'
            });
            
            continue;
          } else {
            console.log('No hay suficientes nodos de tipo selectorVector');
          }
        }




        if (i == 1) {
          const inputBackNodes = [inputBack].map((id) => nodes.find((node) => node.id === input));
          const dataObj = inputBackNodes.map((node) => node.data.value || "");

          prompt = initialPrompt(dataObj, prompt)
          const gptResponse = await handleGPT({
            id: input,
            prompt: prompt
          });

        } else {
          const prevNode = nodes.find((node) => node.id === inputBack);
          prompt = generateDefault(prevNode.data.value, prompt)

          const gptResponse = await handleGPT({
            id: input,
            prompt: prompt
          });
        }
      }
    }

  }






  function findOutputsInPaths(targetId, paths, i) {
    let sortedPaths = [];

    paths.forEach((path, index) => {
      const targetIndex = path.indexOf(targetId);
      if (targetIndex !== -1 && index !== i) {
        const newNodeId = path[targetIndex - 1]
        sortedPaths.push(newNodeId);
      }
    });

    return sortedPaths;
  }




  function insertOutputsPaths(paths) {
    let nodeUnion = {};

    let sortedPaths = paths.sort((a, b) => b.length - a.length);

    for (const [i, path] of sortedPaths.entries()) {
      // Obtener el subconjunto de elementos intermedios del path
      const pathWithoutFirstAndLast = path.slice(1, -1);

      for (const [n, nodeId] of pathWithoutFirstAndLast.entries()) {
        const currentNode = nodes.find(node => node.id === nodeId);
        if (currentNode.type == 'selectorVector') {
          continue;
        }

        const positionPaths = findOutputsInPaths(nodeId, sortedPaths, i);
        if (positionPaths.length > 0) {
          if (!nodeUnion[nodeId]) {
            nodeUnion[nodeId] = []
          }
          for (const position of positionPaths) {
            if (!nodeUnion[nodeId].includes(position)) {
              nodeUnion[nodeId].push(position)
            }
          }

        }

      }
    }
    return { sortedPaths, nodeUnion }
  }




  function findInputsPaths(targetId, paths, i) {
    let sortedPaths = [];

    paths.forEach((path, index) => {
      const targetIndex = path.indexOf(targetId);
      if (targetIndex !== -1 && index !== i) {
        const newNodeId = path[targetIndex - 1]
        sortedPaths.push(newNodeId);
      }
    });

    return sortedPaths;
  }



  function insertInputsPaths(paths) {
    let nodeUnion = {};

    let sortedPaths = paths.sort((a, b) => b.length - a.length);

    for (const [i, path] of sortedPaths.entries()) {
      // Obtener el subconjunto de elementos intermedios del path
      const pathWithoutFirstAndLast = path.slice(1, -1);

      for (const [n, nodeId] of pathWithoutFirstAndLast.entries()) {
        const positionPaths = findInputsPaths(nodeId, sortedPaths, i);
        if (positionPaths.length > 0) {
          if (!nodeUnion[nodeId]) {
            nodeUnion[nodeId] = []
          }
          for (const position of positionPaths) {
            if (!nodeUnion[nodeId].includes(position)) {
              nodeUnion[nodeId].push(position)
            }
          }

        }

      }
    }
    return { sortedPaths, nodeUnion }
  }




  // --------------------------------------------------------------------------
  const obtainOutputsPaths = async (startNodeId) => {
    const pathsReverse = [];
    const visited = new Set();

    const stack = [];
    stack.push([startNodeId]); 

    while (stack.length > 0) {
      const currentPath = stack.pop();
      const currentNodeId = currentPath[currentPath.length - 1];

      if (visited.has(currentNodeId)) continue;

      visited.add(currentNodeId);

      const incomingEdges = edges.filter((edge) => edge.target === currentNodeId);
      const originNodeIds = incomingEdges.map((edge) => edge.source);

      if (originNodeIds.length === 0) {
        const reversedPath = currentPath.slice().reverse();

        if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
          pathsReverse.push(reversedPath);
        }
      }

      for (const originNodeId of originNodeIds) {
        if (!visited.has(originNodeId)) {
          const newPath = [...currentPath, originNodeId];

          const currentNodeType = nodes.find((node) => node.id === originNodeId)?.type;

          if (currentNodeType === 'selectorVector') {
            const reversedPath = newPath.slice().reverse();

            if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
              pathsReverse.push(reversedPath);
            }
          } else {
            stack.push(newPath);
          }
        }
      }
    }

    return pathsReverse;
  };



  const obtainInputsPaths = async (startNodeId) => {
    const pathsReverse = [];
    const visited = new Set();

    const stack = [];
    stack.push([startNodeId]); 

    while (stack.length > 0) {
      const currentPath = stack.pop();
      const currentNodeId = currentPath[currentPath.length - 1];

      if (visited.has(currentNodeId)) continue;

      visited.add(currentNodeId);

      const incomingEdges = edges.filter((edge) => edge.source === currentNodeId);
      const originNodeIds = incomingEdges.map((edge) => edge.target);

      if (originNodeIds.length === 0) {
        const reversedPath = currentPath.slice().reverse();

        if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
          pathsReverse.push(reversedPath);
        }
      }

      for (const originNodeId of originNodeIds) {
        if (!visited.has(originNodeId)) {
          const newPath = [...currentPath, originNodeId];
          const currentNode = nodes.find((node) => node.id === originNodeId);

          if (currentNode.type === 'selectorGPT' && (!currentNode.data.prompt || currentNode.data.prompt.length < 10)) {
            const errorMessage = currentNode.data.prompt ? 'Prompt too short' : 'Prompt not found';
            setNodes((prevNodes) => {
              return prevNodes.map((node) => {
                if (node.id === currentNode.id) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      error: errorMessage,
                    },
                  };
                }
                return node;
              });
            });
            return []; 
          }

          const reversedPath = newPath.slice().reverse();
          if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
            pathsReverse.push(reversedPath);
          } else {
            stack.push(newPath);
          }
        }
      }
    }

    return pathsReverse;
  };










  const handleGenerateGPT = async () => {
    setIsError(false)
    const sourceId = id

    const allOutputsPaths = await obtainOutputsPaths(sourceId);
    const allInputsPaths = await obtainInputsPaths(sourceId);

    console.log('Todos los allOutputsPaths:', sourceId, allOutputsPaths);
    console.log('Todos los allInputsPaths:', sourceId, allInputsPaths);

    //No paths available
    // if (!allOutputsPaths.length && !allInputsPaths.length) {
    //   setIsError('Error no paths available')
    //   return false;
    // }

    if (allOutputsPaths.length > 0) {
      const outputsParts = insertOutputsPaths(allOutputsPaths);
    }

    if (allInputsPaths.length > 0) {
      const inputsParts = insertInputsPaths(allInputsPaths);
      console.log('inputsParts', inputsParts)
      await inputsGPT(inputsParts)
    }
  };




  // ------------------------------------------------------------ 
  const handleDuplicate = () => {
    setIsContextMenuOpen(false)

    const node = nodes.filter((node) => node.id === id)[0]

    const newNode = {
      id: uuidv4(),
      type: "selectorGPT",
      data: {
        prompt: "",
        value: "",
        error: false,
        handles: {
          top_connectedNodeIds: [],
          bottom_connectedNodeIds: [],
        }
      },
      date: new Date(),
      position: {
        x: node.position.x + node.width + 40,
        y: node.position.y
      }
    }

    setNodes((prevNodes) => [...prevNodes, newNode])
  };

  const handleDelete = () => {
    setIsContextMenuOpen(false)

    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };






  return (
    <>
      {/* {id} */}
      <Handle
        id={`${id}_top`}
        type="target"
        position="top"
        style={{ top: -10, background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        id={`${id}_bottom`}
        type="source"
        position="bottom"
        style={{ bottom: -10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
      {isContextMenuOpen && (
        <ContextMenu
          x={contextMenuPosition.x}
          y={contextMenuPosition.y}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onClose={() => setIsContextMenuOpen(false)}
        />
      )}
      |{JSON.stringify(isError)}|
      {!gptActive ? (
        <div
          className={`${styles.desactiveGPT} ${isError && styles.error}`}
          onClick={() => setSelectedEdge(null)}
          onContextMenu={(e) => {
            e.preventDefault();

            const boundingBox = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - boundingBox.left;
            const y = e.clientY - boundingBox.top;

            setContextMenuPosition({ x, y });
            setIsContextMenuOpen(true);
          }}
        >
          <textarea
            spellCheck="false"
            ref={textareaRef}
            style={{ width: '100%', boxSizing: 'border-box', resize: 'none', overflowY: 'hidden' }}
            placeholder={`¿Qué necesitas saber?`}
            value={inputValue}
            onChange={(e) => {
              const textarea = textareaRef.current;
              textarea.style.height = 'auto';
              textarea.style.height = `${textarea.scrollHeight}px`;

              setIsError(false);

              const trimmedContent = textarea.value.trim();
              if (trimmedContent.length > 10) {
                setIsActive(true);
              } else {
                setIsActive(false);
              }

              // Actualizar el estado de nodes con el nuevo valor de prompt
              setNodes((prevNodes) => {
                return prevNodes.map((node) => {
                  if (node.id === id) {
                    return {
                      ...node,
                      data: {
                        ...node.data,
                        prompt: e.target.value,
                        response: ''
                      },
                    };
                  }
                  return node;
                });
              });

              // setInputValue(e.target.value);
            }}
          />
          <div >
            {isActive ? (
              <div className={styles.button}>
                <button onClick={handleGenerateGPT}>
                  {!isError ? 'Generate GPT' : 'Error GPT'}
                </button>
              </div>
            ) : (
              <div className={styles.info}>
                <p>- Puedes hacer una pregunta fácil a GPT</p>
                <p>- Puedes conectar un dato y preguntarle sobre esos datos</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={styles.activeGPT}
          onContextMenu={(e) => {
            e.preventDefault();

            const boundingBox = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - boundingBox.left;
            const y = e.clientY - boundingBox.top;

            setContextMenuPosition({ x, y });
            setIsContextMenuOpen(true);
          }}
        >
          <div
            className={styles.request}
            onDoubleClick={() => handleReturnGPT()}
          >
            {inputValue}
          </div>
          <div className={styles.response}>
            {gptValue}
          </div>
          {(typeGraph && dataGraph) && (
            <div >
              {<InitialGraph type={typeGraph} data={dataGraph} />}
            </div>
          )}
        </div>
      )}
    </>
  );
});


const ContextMenu = ({ x, y, onDuplicate, onDelete, onClose }) => {
  return (
    <div className={styles.contextMenu} style={{ top: y, left: x }}>
      <ul>
        <li onClick={onDuplicate}>Duplicar</li>
        <li onClick={onDelete}>Eliminar</li>
      </ul>
      <div className={styles.overlay} onClick={onClose}></div>
    </div>
  );
};