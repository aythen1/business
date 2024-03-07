import React, { memo, useState, useEffect, useRef } from "react";

import ReactFlow, { useReactFlow } from 'reactflow';

import {
  findOutputsInPaths,
  insertOutputsPaths,
  findInputsPaths,
  insertInputsPaths,
  obtainOutputsPaths,
  obtainInputsPaths
} from '../handle'

import { v4 as uuidv4 } from 'uuid';

import { Handle } from "reactflow";

// import * as Graphs from '@/views/graphs/render'
import { useGraph } from '../index';


import { useOpenAI } from '../openai'

import Template from './Template'
import Vector from './Vector'



import {
  parseChartString,

  generateDefault,

  generatePromptTemplate,
  generatePromptComponent,
} from '../prompt';

import styles from './CustomTemplate.module.css'



export default memo(({ id, data, isConnectable, }) => {
  const { nodes, edges, setNodes, setEdges, setSelectedEdge, addNode } = useGraph();


  const { fitView, setCenter } = useReactFlow();

  const { prompt, value, error, handles, components } = data;


  const [isError, setIsError] = useState(error);

  const [inputValue, setInputValue] = useState(prompt)

  const [gptActive, setGptActive] = useState(false);
  const [gptValue, setGptValue] = useState('')


  const [listComponents, setListComponents] = useState([]);
  const [internalUpdate, setInternalUpdate] = useState(false);


  useEffect(() => {
    if (!internalUpdate) {
      // Buscar el nodo con el id específico
      const selectedNodeIndex = nodes.findIndex((node) => node.id === id);

      // Verificar si se encontró el nodo
      if (selectedNodeIndex !== -1) {
        // Clonar el array de nodos para no modificar el original directamente
        const updatedNodes = [...nodes];

        // Modificar la propiedad nodes.data.components del nodo con el id específico
        updatedNodes[selectedNodeIndex].data.components = listComponents;

        // Actualizar nodes con el nuevo array de nodos
        setNodes(updatedNodes);
      }
    }

    setInternalUpdate(false);
  }, [listComponents])


  useEffect(() => {
    if (components.length > 0) {

      console.log('components', components)
      setListComponents(components)

      setInternalUpdate(true);
    }
  }, [components])



  useEffect(() => {
    setInputValue(data.prompt)

    if (data.response) {
      setGptActive(true)
      if (!data.response.type) {
        setGptValue(data.response)
      }
    }
  }, [data])




  useEffect(() => {
    setIsError(error)
  }, [error])




  const handleReturnGPT = () => {
    setGptActive(false)
    setGptValue('')
  }



  function transposeArrays(arrays) {
    // Obtén la longitud máxima de los arrays
    const maxLength = Math.max(...arrays.map(arr => arr.length));

    // Inicializa un array de arrays vacíos
    const result = Array.from({ length: maxLength }, () => []);

    // Transpone los arrays
    for (const array of arrays) {
      array.forEach((value, index) => {
        result[index].push(value);
      });
    }

    return result;
  }






  const handleGPT = async ({ id, prompt = false, type = 'text' }) => {

    console.log('handlegpt type', type)
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
          if (type !== 'graph') {
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

          // setGptValue(accumulatedText)
        }


        if (type == 'graph') {
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




  // ----------------------------------------------------------
  const addTemplate = async () => {
    addNode()
  }


  const handleGenerateTree = async () => {
    setIsError(false)
    const sourceId = id

    const allOutputsPaths = await obtainOutputsPaths(sourceId, nodes, edges);
    const allInputsPaths = await obtainInputsPaths(sourceId, nodes, edges);


    console.log('Todos los allOutputsPaths:', sourceId, allOutputsPaths);
    console.log('Todos los allInputsPaths:', sourceId, allInputsPaths);

    if (allOutputsPaths.length > 0) {
      const outputsParts = insertOutputsPaths(allOutputsPaths);
    }

    if (allInputsPaths.length > 0) {
      const inputsParts = insertInputsPaths(allInputsPaths);
      console.log('inputsParts', inputsParts)
      // await inputsGPT(inputsParts)
    }
  };



  // ------------------------------------------------------------ 
  const handleDuplicate = () => {

    const node = nodes.filter((node) => node.id === id)[0]

    const newNode = {
      id: uuidv4(),
      type: "selectorComponent",
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
      <div className={styles.box}>
        <Vector />
        <Template
          template={data}
          addTemplate={() => addTemplate()}
          listComponents={listComponents}
          setListComponents={setListComponents}
        />
      </div>
    </>
  );
});

