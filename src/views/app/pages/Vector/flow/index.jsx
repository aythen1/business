import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import 'reactflow/dist/style.css';

import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import * as xlsx from 'xlsx';


import styles from './index.module.css'


const GraphContext = createContext();
export const useGraph = () => useContext(GraphContext);


import CustomEdge from "./edge/CustomEdge";
import CustomVector from "./node/CustomVector";
import CustomGPT from "./node/CustomGPT"


import {
    fetchsVector,
    iniVector,

    addVectorData,
    updateVector,
    addVector
} from '@/actions/vector'



const edgeTypes = {
    default: CustomEdge
}

const nodeTypes = {
    selectorVector: CustomVector,
    selectorGPT: CustomGPT,
};



// const idSelectorVector = uuidv4()
// const idSelectorGPT = uuidv4()
// const initialNodes = [
//     {
//         id: idSelectorVector,
//         type: "selectorVector",
//         data: {
//             header: ['a', 'b'],
//             data: [[0, 1], [0, 2], [1, 3], [1, 5]],
//             connectedNodeIds: [idSelectorGPT]
//         },
//         position: { x: -50, y: -100 }
//     }, {
//         id: idSelectorGPT,
//         type: "selectorGPT",
//         data: {
//             prompt: "",
//             value: "",
//             handles: {
//                 top_connectedNodeIds: [idSelectorVector],
//                 bottom_connectedNodeIds: [],
//             }
//         },

//         position: { x: 100, y: 0 }
//     }
// ];


// const initialEdges = [
//     { id: uuidv4(), source: initialNodes[0].id, target: initialNodes[1].id },
// ];









export default function App({ }) {

    // const params = useParams()
    const dispatch = useDispatch()

    // const { vectorId } = params
    // console.log('vectorId', vectorId)

    // const [prompt, setPrompt] = useState('')
    // const [apiKey, setApiKey] = useState('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')
    // const [loading, setLoading] = useState(false)
    // const [nodes, setNodes] = useState(initialNodes)
    // const [edges, setEdges] = useState(initialEdges)


    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [selectedEdge, setSelectedEdge] = useState(false);


    const [dataVector, setDataVector] = useState([])


    // ------------------------------
    const { user } = useSelector((state) => state.iam)
    const {
        dimension,
        vector,
    } = useSelector((state) => state.vector)

    // ------------------------------
    useEffect(() => {
        const fetchItems = async () => {
            const id = iniVector({
                workspaceId: '1111',
                projectId: '1111',
            })

            dispatch(fetchsVector({
                id,
                name: 'vectors',
                title: '1111'
            }))
        }

        if (!vector) {
            fetchItems()
        } else {
            console.log('existe vector', vector)
            setNodes(JSON.parse(vector.nodes))
            setEdges(JSON.parse(vector.edges))
        }

    }, [vector])






    // ------------------------------


    const addNode = () => {
        const lastNode = nodes[nodes.length - 1];
        // Verificar si hay nodos existentes
        if (!lastNode) {
            console.error('No hay nodos existentes para conectar.');
            return;
        }

        const newY = lastNode.position.y + lastNode.height + 50;
        const newX = lastNode.position.x

        console.log('lastNode', lastNode)
        // const lastNode = document.querySelector(lastNodeSelector);

        const newNode = {
            id: uuidv4(),
            type: 'selectorGPT',
            data: {
                prompt: 'An input node',
                value: '',
                error: '',
                handles: {
                    top_connectedNodeIds: [lastNode.id],
                    bottom_connectedNodeIds: [],
                },
            },
            date: new Date(),
            position: { x: newX, y: newY },
            sourcePosition: 'right',
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);

        // Crear una nueva conexión (edge) entre el último nodo y el nuevo nodo
        const newEdge = {
            id: uuidv4(),
            source: lastNode.id, // El último nodo como origen
            target: newNode.id, // El nuevo nodo como destino
        };

        // Actualizar el estado de las conexiones añadiendo la nueva conexión
        setEdges((prevEdges) => [...prevEdges, newEdge]);
    };


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

    const handleDrop = (e) => {
        e.preventDefault()
        if (e.target.getAttribute('refs') == 'schema') {
            e.stopPropagation()
            return false
        }


        const file = e.dataTransfer.files[0];
        const reader = new FileReader();


        const fileSizeInBytes = file.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024;
        const fileSizeInMegabytes = fileSizeInKilobytes / 1024;

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const workbook = xlsx.read(new Uint8Array(arrayBuffer), { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const title = `${file.name.replace(/\.[^/.]+$/, '')}_name`;
            const header = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0];
            const data = xlsx.utils.sheet_to_json(worksheet).map(row => {
                const rowData = {};
                header.forEach(column => {
                    rowData[column] = row[column];
                });
                return rowData;
            });

            const table = {
                title,
                header,
                data,
                size: fileSizeInMegabytes,
                error: false,
                date: new Date(),
            };

            setDataVector((prevData) => [...prevData, table]);

            const lastNode = nodes[nodes.length - 1];

            let newY = 0;
            let newX = 0;
            // Verificar si hay nodos existentes
            if (lastNode) {
                newX = lastNode.position.x;
                newY = lastNode.position.y + lastNode.height + 20;
            }

            // Crear un nuevo nodo
            const newNode = {
                id: uuidv4(),
                type: 'selectorVector',
                data: table,
                position: { x: newX, y: newY }
            };

            // Actualizar el estado de los elementos para incluir el nuevo nodo
            setNodes((prevElements) => [...prevElements, newNode]);
        };

        reader.readAsArrayBuffer(file);
    };

    // const [state, setState] = useState({
    //     id: vector?.id || '',
    //     version: vector?.version || '0',
    //     title: vector?.title || '',
    //     description: vector?.description || initialDescription,
    //     code: vector?.code || '',
    //     updatedAt: vector?.updatedAt || new Date(),
    //     createdAt: vector?.createdAt || new Date(),
    // });



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

            // console.log('sourceNode', sourceNode)
            // console.log('targetNode', targetNode)

            if (sourceNode.type == 'selectorVector' && targetNode.type == 'selectorVector') {
                return false
            }



            if (sourceNode && targetNode) {
                const { type: sourceType } = sourceNode;
                const { type: targetType } = targetNode;

                if (sourceType == 'selectorVector') {

                } else {

                    // Determinar si el handle es top o bottom
                    const isTopHandle = sourceHandle.endsWith('_top')

                    // Obtener el nombre del handle
                    const handleName = isTopHandle ? 'top_connectedNodeIds' : 'bottom_connectedNodeIds';

                    // Actualizar connectedNodeIds dependiendo del tipo de nodo
                    if (sourceType === 'selectorGPT') {
                        setNodes((prevNodes) => {
                            const updatedNodes = [...prevNodes];
                            const sourceNodeIndex = updatedNodes.findIndex((node) => node.id === source);
                            if (sourceNodeIndex !== -1) {
                                updatedNodes[sourceNodeIndex].data.handles[handleName].push(target);
                            }
                            return updatedNodes;
                        });
                    } else if (targetType === 'selectorGPT') {
                        setNodes((prevNodes) => {
                            const updatedNodes = [...prevNodes];
                            const targetNodeIndex = updatedNodes.findIndex((node) => node.id === target);
                            if (targetNodeIndex !== -1) {
                                updatedNodes[targetNodeIndex].data.handles[handleName].push(source);
                            }
                            return updatedNodes;
                        });
                    }
                }
            }

            // console.log('connection', connection)

            setEdges((prevEdges) => addEdge(connection, prevEdges));
        },
        [setNodes, setEdges, nodes])





    useEffect(() => {
        console.log('dimen', dimension)
        if (dimension) {
            // Encuentra el índice del nodo que coincide con el id
            const nodeIndex = nodes.findIndex((node) => node.id === dimension.id);
            console.log('1111', nodeIndex)
            // Verifica si se encontró el nodo
            if (nodeIndex !== -1) {
                // Copia los nodos actuales
                const updatedNodes = [...nodes];

                // Actualiza el estado del nodo encontrando el nodo y modificando data.status
                updatedNodes[nodeIndex] = {
                    ...updatedNodes[nodeIndex],
                    data: {
                        ...updatedNodes[nodeIndex].data,
                        status: 'info', // Reemplaza 'tu_nuevo_estado_aqui' con el nuevo estado
                    },
                };
                console.log('updatedNodes[nodeIndex]', updatedNodes[nodeIndex])
                // Establece el nuevo estado de los nodos
                setNodes(updatedNodes);
            }
        }
    }, [dimension])








    const value = {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedEdge,
        setSelectedEdge,
    };


    return (
        <GraphContext.Provider value={value}>
            <div
                style={{ width: '100%', height: '100%' }}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                    fitViewOptions={{
                        maxZoom: 0.8,
                    }}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    onConnect={handleConnect}
                >
                    <div
                        className={styles.buttons}
                    >
                        <button
                            onClick={saveNode}
                        >
                            Save node
                        </button>
                        <button
                            onClick={addNode}
                        >
                            Create node
                        </button>

                    </div>
                </ReactFlow>
            </div>
        </GraphContext.Provider>
    );
}


