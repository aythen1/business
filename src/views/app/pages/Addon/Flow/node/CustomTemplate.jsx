import React, { memo, useState, useEffect, useRef } from "react";

import ReactFlow, { useReactFlow } from 'reactflow';

// import {
//   findOutputsInPaths,
//   insertOutputsPaths,
//   findInputsPaths,
//   insertInputsPaths,
//   obtainOutputsPaths,
//   obtainInputsPaths
// } from '../handle'

// import { v4 as uuidv4 } from 'uuid';

import { Handle } from "reactflow";

import { useGraph } from '../index';

// import { useOpenAI } from '../openai'

import Template from './Template'
import Vector from './Vector'

import stylesLoader from './loader.module.css'


// import {
//   parseChartString,

//   generateDefault,

//   generatePromptTemplate,
//   generatePromptComponent,
// } from '../prompt';

// import { t } from "i18next";

import styles from './CustomTemplate.module.css'
// import { current } from "@reduxjs/toolkit";



export default memo(({ id, data, isConnectable, }) => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setSelectedEdge,
    addNode,
    setIsEditor,
    setZoomInitial,
    reactFlowWrapper,
    reactFlowInstance
  } = useGraph();


  const { setCenter } = useReactFlow()

  // const { title, error, handles, components } = data;
  // const [isError, setIsError] = useState(data.error);

  const [listComponents, setListComponents] = useState([]);
  const [internalUpdate, setInternalUpdate] = useState(false);
  const [template, setTemplate] = useState({});
  // const [position, setPosition] = useState()




  // console.log('data', data)


  useEffect(() => {
    const currentNode = nodes.find(node => node.id === id);
    if (currentNode) {
      // setPosition(currentNode.position);
      setTemplate({
        id: id || '',
        position: currentNode.position,
        error: data?.error || null,
        version: data?.version || '0',
        title: data?.title || '',
        description: data?.description || '',
        components: data?.components || [],
        updatedAt: data?.updatedAt || new Date(),
        createdAt: data?.createdAt || new Date(),
      })
    }
  }, [])


  useEffect(() => {
    console.log('insert list component', internalUpdate)
    if (internalUpdate) {
      const selectedNodeIndex = nodes.findIndex((node) => node.id === id);

      if (selectedNodeIndex !== -1) {
        const updatedNodes = [...nodes];
        // console.log('list components change', listComponents)
        updatedNodes[selectedNodeIndex].data.components = listComponents;
        setNodes(updatedNodes);
      }
    }

    setInternalUpdate(false);
  }, [listComponents])


  useEffect(() => {
    if (data.components.length > 0) {
      setInternalUpdate(false);
      setListComponents(data.components)
    }
  }, [data.components])








  // useEffect(() => {
  //   setIsError(error)
  // }, [error])

  // const handleGPT = async ({ id, prompt = false, type = 'text' }) => {
  //   console.log('handlegpt type', type)
  //   if (prompt) {
  //     const messages = [{
  //       role: 'user',
  //       content: prompt
  //     }]

  //     try {
  //       const openai = await useOpenAI()
  //       const stream = await openai.chat.completions.create({
  //         model: 'gpt-4',
  //         messages,
  //         stream: true,
  //       });

  //       let accumulatedText = '';
  //       for await (const part of stream) {
  //         const text = part.choices[0]?.delta?.content || ''
  //         accumulatedText += text
  //         if (type !== 'graph') {
  //           setNodes((prevNodes) => {
  //             return prevNodes.map((node) => {
  //               if (node.id === id) {
  //                 return {
  //                   ...node,
  //                   data: {
  //                     ...node.data,
  //                     value: prompt + '\n' + accumulatedText,
  //                     response: accumulatedText,
  //                   },
  //                 };
  //               }
  //               return node;
  //             });
  //           });
  //         }
  //       }

  //     } catch (err) {
  //       console.log('err', err)
  //     }
  //   }

  //   return data
  // }




  // ----------------------------------------------------------
  const addTemplate = async () => {
    const lastNode = nodes[nodes.length - 1];

    addNode(lastNode, 'column')

    let newY = 0
    let newX = 0
    if (lastNode) {
      newY = lastNode.position.y + lastNode.height + 100;
      newX = lastNode.position.x;
    }

    setTimeout(function () {
      window.requestAnimationFrame(() => {
        setCenter(newX + 100, newY, { zoom: 1.6, duration: 500 })
      })
    }, 100)
  }


  // const handleGenerateTree = async () => {
  //   setIsError(false)
  //   const sourceId = id

  //   const allOutputsPaths = await obtainOutputsPaths(sourceId, nodes, edges);
  //   const allInputsPaths = await obtainInputsPaths(sourceId, nodes, edges);


  //   console.log('Todos los allOutputsPaths:', sourceId, allOutputsPaths);
  //   console.log('Todos los allInputsPaths:', sourceId, allInputsPaths);

  //   if (allOutputsPaths.length > 0) {
  //     const outputsParts = insertOutputsPaths(allOutputsPaths);
  //   }

  //   if (allInputsPaths.length > 0) {
  //     const inputsParts = insertInputsPaths(allInputsPaths);
  //     console.log('inputsParts', inputsParts)
  //   }
  // };



  // ------------------------------------------------------------ 
  // const handleDuplicate = () => {
  //   const node = nodes.filter((node) => node.id === id)[0]
  //   const newNode = {
  //     id: uuidv4(),
  //     type: "selectorComponent",
  //     data: {
  //       prompt: "",
  //       value: "",
  //       error: false,
  //       handles: {
  //         top_connectedNodeIds: [],
  //         bottom_connectedNodeIds: [],
  //       }
  //     },
  //     date: new Date(),
  //     position: {
  //       x: node.position.x + node.width + 40,
  //       y: node.position.y
  //     }
  //   }

  //   setNodes((prevNodes) => [...prevNodes, newNode])
  // };

  // const handleDelete = () => {
  //   setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  // };


  //
  const onEditor = (index, offset) => {
    const node = nodes.filter((node) => node.id === id)[0]

    const code = node.data.components.map((component, i) => {
      return `<div class="customSection" tab-section="${i}">${component.code}</div>`
    }).join('\n')


    if (code.trim().length > 0) {
      setCenter(template.position?.x + 100, template.position?.y + 100 + offset, { zoom: 5, duration: 1000 })

      setTimeout(function () {
        setIsEditor({
          id,
          content: code,
          index
        })
        setCenter(template.position?.x + 100, template.position?.y - 50 + offset, { zoom: 2, duration: 1000 })
      }, 800)
    }
  }



  const setTitle = (title) => {
    const selectedNodeIndex = nodes.findIndex((node) => node.id === id);

    if (selectedNodeIndex !== -1) {
      setNodes((prevNodes) => {
        const updatedNodes = [...prevNodes];
        updatedNodes[selectedNodeIndex] = {
          ...updatedNodes[selectedNodeIndex],
          data: {
            ...updatedNodes[selectedNodeIndex].data,
            title
          },
        };
        return updatedNodes;
      });
    }
  }


  // ----------------------------------------------------------
  const [isConnect, setIsConnect] = useState(false);

  const onBottomMouseDown = () => {
    setIsConnect(true);
    console.log('frirf', isConnect);
  };

  const onBottomConnect = (params) => {
    if (params.source) {
      setIsConnect(false);
    }
  };

  const handleMouseUp = (e) => {
    if (isConnect) {
      const lastNode = nodes.find((node) => node.id === id);

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top
      };
      const projectedPosition = reactFlowInstance.project(position);
      addNode(lastNode, {
        x: projectedPosition.x,
        y: projectedPosition.y
      });
      setIsConnect(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isConnect]);




  return (
    <>
      <Handle
        id={`${id}_top`}
        type="target"
        position="top"
        className={styles.handleTop}
        style={{ top: -10 }}
        isConnectable={isConnectable}
      />
      <Handle
        id={`${id}_bottom`}
        type="source"
        position="bottom"
        className={styles.handleBottom}
        style={{ bottom: -8 }}
        isConnectable={isConnectable}
        onMouseDown={onBottomMouseDown}
        onConnect={(params) => {
          onBottomConnect(params);
        }}
      />
      <div className={styles.box}>
        <Vector
          position={template.position}
          setCenter={setCenter}
        />
        <Template
          template={template}
          setTemplate={setTemplate}
          addTemplate={() => addTemplate()}
          listComponents={listComponents}
          setListComponents={setListComponents}
          setInternalUpdate={setInternalUpdate}
          setTitle={setTitle}
          onEditor={onEditor}
          setCenter={setCenter}
        />
        <div style={{ height: 0 }}>
          &nbsp;
        </div>
      </div>
    </>
  );
});











