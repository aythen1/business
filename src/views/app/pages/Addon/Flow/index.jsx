import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import ELK from 'elkjs/lib/elk.bundled.js';

import 'reactflow/dist/style.css';

import { useOpenAI } from '../openai'

import ReactFlow, { useReactFlow, MiniMap, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import * as xlsx from 'xlsx';

import styles from './index.module.css'

const GraphContext = createContext();
export const useGraph = () => useContext(GraphContext);

import CustomEdge from "./edge/CustomEdge";
import CustomTemplate from "./node/CustomTemplate"


/*
    Templates 
    Es una parte que permite tener
        - titulo
        - description
        - nodes
        - edges

    (name) => permite tener el nombre del addon 
    para identificar la pagina es 
    (title) => que sea el numero del href

    /addon/href//title/[version]

*/

import {
    parseChartString,
    generatePromptTree
} from './prompt'


import {
    fetchsVector,
    iniVector,

    addVectorData,
    updateVector,
    addVector
} from '@/actions/vector'
import { UnexpectedResponseException } from 'pdfjs-dist';



const edgeTypes = {
    default: CustomEdge
}

const nodeTypes = {
    selectorTemplate: CustomTemplate,
};



export const AddonFlow = ({ }) => {
    const dispatch = useDispatch()



    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [selectedEdge, setSelectedEdge] = useState(false);

    const [dataVector, setDataVector] = useState([])


    // ------------------------------
    const { user } = useSelector((state) => state.iam)
    const {
        vector,
    } = useSelector((state) => state.vector)

    // ------------------------------
    useEffect(() => {
        const fetchItems = async () => {
            let workspace = user.id
            let project = 'addon' //template

            let page = 'home'

            let addon = 'user' //addon
            let title = 'user' // href

            const id = iniVector({
                workspaceId: workspace,
                projectId: project,
            })

            dispatch(fetchsVector({
                id,

                name: addon,
                title
            }))
        }

        if (!vector) {
            console.log('search addon')
            fetchItems()
        } else {
            console.log('existe vector', vector)
            setNodes(JSON.parse(vector.nodes))
            setEdges(JSON.parse(vector.edges))
        }

    }, [vector])


    // ------------------------------




    // ---------------------------------

    const saveNode = async () => {

        let id = iniVector({
            workspaceId: user.id,
            projectId: 'vector',
        })

        const data = {
            id: vector?.id || uuidv4(),
            title: '1111',
            nodes: nodes,
            edges: edges
        }

        for (var i = 0; i < dataVector.length; i++) {
            console.log('data vector', vector, '\n\n', dataVector[i])

            await dispatch(addVectorData({
                id,
                title: dataVector[i].title,
                data: dataVector[i].data,
                vector
            }))
        }

        setDataVector([])

        await dispatch(updateVector({
            id,
            name: 'vectors',
            data
        }))
    }


    // ------------------------------

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes, nodes]
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges, edges]
    );

    const handleConnect = useCallback(
        (connection) => {
            const { source, sourceHandle, target, targetHandle } = connection;
            const sourceNode = nodes.find((node) => node.id === source);
            const targetNode = nodes.find((node) => node.id === target);

            // if (sourceNode.type == 'selector' && targetNode.type == 'selectorVector') {
            //     return false
            // }

            if (sourceNode && targetNode) {
                const { type: sourceType } = sourceNode;
                const { type: targetType } = targetNode;

                if (sourceType == 'selectorTemplate') {

                } else {

                    // // Determinar si el handle es top o bottom
                    // const isTopHandle = sourceHandle.endsWith('_top')

                    // // Obtener el nombre del handle
                    // const handleName = isTopHandle ? 'top_connectedNodeIds' : 'bottom_connectedNodeIds';

                    // // Actualizar connectedNodeIds dependiendo del tipo de nodo
                    // if (sourceType === 'selectorComponent') {
                    //     setNodes((prevNodes) => {
                    //         const updatedNodes = [...prevNodes];
                    //         const sourceNodeIndex = updatedNodes.findIndex((node) => node.id === source);
                    //         if (sourceNodeIndex !== -1) {
                    //             updatedNodes[sourceNodeIndex].data.handles[handleName].push(target);
                    //         }
                    //         return updatedNodes;
                    //     });
                    // } 
                    // // else if (targetType === 'selectorGPT') {
                    // //     setNodes((prevNodes) => {
                    // //         const updatedNodes = [...prevNodes];
                    // //         const targetNodeIndex = updatedNodes.findIndex((node) => node.id === target);
                    // //         if (targetNodeIndex !== -1) {
                    // //             updatedNodes[targetNodeIndex].data.handles[handleName].push(source);
                    // //         }
                    // //         return updatedNodes;
                    // //     });
                    // // }
                }
            }

            setEdges((prevEdges) => addEdge(connection, prevEdges));
        },
        [setNodes, setEdges, nodes])



    // -------------------------------------------------------

    const addTree = async () => {
        const messages = [{
            role: 'user',
            content: generatePromptTree('calders web')
        }];

        console.log('mess', messages);
        let accumulatedText = '';

        try {
            const openai = await useOpenAI();
            const resp = await openai.chat.completions.create({
                model: 'gpt-4',
                messages,
                // stream: true,
            });


            const response = resp.choices[0].message.content
            console.log('response', response)

            const json = parseChartString(response)
            console.log('json', json)

            json.nodes = json.nodes.map(node => ({
                ...node,
                type: 'selectorTemplate'
            }));



            setNodes((prevNodes) => [...prevNodes, ...json.nodes]);
            setEdges((prevEdges) => [...prevEdges, ...json.edges]);
        } catch (err) {
            console.log('err', err);
        }

        console.log('accumulatedText', accumulatedText);
    };



    const value = {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedEdge,
        setSelectedEdge,

    };

    const onDragStart = () => {
        // Desactivar el arrastre en React Flow
        return false;
      };
    

    return (
        <GraphContext.Provider value={value}>
            <div
                style={{ width: '100%', height: 'calc(100vh - 55px)' }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                    fitViewOptions={{
                        maxZoom: 0.1,
                    }}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    onConnect={handleConnect}
                    onDragStart={onDragStart}
                >
                    <div className={styles.buttons} >
                        <button onClick={saveNode} >
                            <ButtonSave />
                        </button>
                        <button >
                            <ButtonAdd nodes={nodes} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                        <button onClick={() => addTree()} >
                            <ButtonTree />
                        </button>
                        <button style={{ marginLeft: 'auto' }}>
                            <PositionComponent position="left" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                        <button>
                            <PositionComponent position="right" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                    </div>
                    <MiniMap />
                </ReactFlow>
            </div>
        </GraphContext.Provider>
    );
}









const ButtonAdd = ({ setNodes, nodes, setEdges }) => {
    const { fitView, setCenter } = useReactFlow();

    const addNode = () => {
        console.log('nodes', nodes)
        const lastNode = nodes[nodes.length - 1];

        // Verificar si hay nodos existentes
        let newX = 0
        let newY = 0

        let handles = {}

        if (lastNode) {
            // console.error('No hay nodos existentes para conectar.');
            newY = lastNode.position.y;
            newX = lastNode.position.x + lastNode.width + 400

            handles = {
                top_connectedNodeIds: [lastNode.id],
                bottom_connectedNodeIds: [],
            }
        }
        console.log('lastNode', lastNode)
        // const lastNode = document.querySelector(lastNodeSelector);

        const newNode = {
            id: uuidv4(),
            type: 'selectorTemplate',
            dragHandle: '.custom-drag-handle',
            data: {
                prompt: 'An input node',
                value: '',
                error: '',
                handles,
                components: []
            },
            date: new Date(),
            position: { x: newX, y: newY },
            sourcePosition: 'right',
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);

        // Crear una nueva conexión (edge) entre el último nodo y el nuevo nodo
        if (lastNode) {
            const newEdge = {
                id: uuidv4(),
                source: lastNode.id,
                target: newNode.id,
            };

            setEdges((prevEdges) => [...prevEdges, newEdge]);
        }

        setTimeout(function(){
            window.requestAnimationFrame(() => {
                setCenter(newX + 100, newY + 100, { zoom: 1.8, duration: 500 })
            })
        }, 0)
        // if (setCenter) {
        //     console.log('setcenter', setCenter)
        // }

        // window.requestAnimationFrame(() => {
        // })
    };



    return (
        <div
            className={styles.button}
            onClick={() => addNode()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 4 3 3H5v3m3 10-3-3h14v-3m-9-2.5 2-1.5v4" />
            </svg>
            <span>
                ADD
            </span>
        </div>
    )
}




const ButtonTree = ({ save = false }) => {
    const handleClickTree = () => {

    }

    return (
        <div
            className={styles.button}
            onClick={() => handleClickTree()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.4 3c.3 0 .6.1.7.3l2.6 2.6c.4.3.4 1 0 1.4l-2.5 2.5-4-4 2.5-2.5c.2-.2.5-.3.7-.3Zm-4.6 4.2-9.5 9.5a1 1 0 0 0 0 1.4l2.6 2.6c.3.4 1 .4 1.4 0l9.5-9.5-4-4ZM6 6c.6 0 1 .4 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7c0-.6.4-1 1-1Zm9 9c.6 0 1 .4 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1c0-.6.4-1 1-1Z" />
                <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z" />
            </svg>
            <span>
                Tree
            </span>
        </div>
    )
}







const ButtonSave = ({ save = true }) => {
    return (
        <div>
            {save ? (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V9a3 3 0 0 0-3-3h-3m1.5-2-2 2 2 2" />
                    </svg>
                    <span>
                        SAVE
                    </span>
                </div>
            ) : (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.9c0-.2 0-.5.2-.6l.6-.3h8.4c.2 0 .4 0 .6.3l.2.6V21Z" />
                    </svg>
                    <span>
                        SAVED
                    </span>
                </div>
            )}
        </div>
    )
}




// --------------------------------------------------------




const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '240',
};

const getLayoutedElements = (nodes, edges, options = {}) => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            width: 150,
            height: 50,
        })),
        edges: edges,
    };

    return elk
        .layout(graph)
        .then((layoutedGraph) => ({
            nodes: layoutedGraph.children.map((node) => ({
                ...node,
                position: { x: node.x, y: node.y },
            })),

            edges: layoutedGraph.edges,
        }))
        .catch(console.error);
};






const PositionComponent = ({ position, nodes, edges, setNodes, setEdges }) => {
    const { fitView, setCenter } = useReactFlow();


    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const onLayout = useCallback(
        ({ direction, useInitialNodes = false }) => {
            const opts = { 'elk.direction': direction, ...elkOptions };
            const ns = useInitialNodes ? initialNodes : nodes;
            const es = useInitialNodes ? initialEdges : edges;

            getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
                setNodes(layoutedNodes);
                setEdges(layoutedEdges);

                window.requestAnimationFrame(() => {
                    setCenter(0, 0, { zoom: 0.4, duration: 2000 })
                });
            });
        },
        [nodes, edges]
    );

    const onClick = () => {
        if (position == 'left') {
            onLayout({ direction: 'DOWN' })
        } else {
            onLayout({ direction: 'RIGHT' })
        }
    }



    return (
        <div
            onClick={onClick}
        >
            {position == 'left' ? (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v14M9 5v14M4 5h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>
                        Table
                    </span>
                </div>

            ) : (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.1 4H5c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm-10 10H5c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Z" />
                    </svg>
                    <span>
                        Vector
                    </span>
                </div>
            )}
        </div>
    )
}