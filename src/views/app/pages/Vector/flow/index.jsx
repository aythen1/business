import { createContext, useContext, useCallback, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import ELK from 'elkjs/lib/elk.bundled.js';

import 'reactflow/dist/style.css';

import ReactFlow, { useReactFlow, MiniMap, Background, BackgroundVariant, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
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
} from '@/actions/vector'



const edgeTypes = {
    default: CustomEdge
}

const nodeTypes = {
    selectorVector: CustomVector,
    selectorGPT: CustomGPT,
};





export default function App({ }) {
    const dispatch = useDispatch()

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
        if (!lastNode) {
            console.error('No hay nodos existentes para conectar.');
            return;
        }

        const newY = lastNode.position.y + lastNode.height + 50;
        const newX = lastNode.position.x
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

        const newEdge = {
            id: uuidv4(),
            source: lastNode.id,
            target: newNode.id,
        };

        setEdges((prevEdges) => [...prevEdges, newEdge]);
    };





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
            if (lastNode) {
                newX = lastNode.position.x;
                newY = lastNode.position.y + lastNode.height + 20;
            }

            const newNode = {
                id: uuidv4(),
                type: 'selectorVector',
                data: table,
                position: { x: newX, y: newY }
            };

            setNodes((prevElements) => [...prevElements, newNode]);
        };

        reader.readAsArrayBuffer(file);
    };


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

            if (sourceNode.type == 'selectorVector' && targetNode.type == 'selectorVector') {
                return false
            }


            if (sourceNode && targetNode) {
                const { type: sourceType } = sourceNode;
                const { type: targetType } = targetNode;

                if (sourceType == 'selectorVector') {

                } else {
                    const isTopHandle = sourceHandle.endsWith('_top')
                    const handleName = isTopHandle ? 'top_connectedNodeIds' : 'bottom_connectedNodeIds';

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

            setEdges((prevEdges) => addEdge(connection, prevEdges));
        },
        [setNodes, setEdges, nodes])





    useEffect(() => {
        if (dimension) {

            const nodeIndex = nodes.findIndex((node) => node.id === dimension.id);
            if (nodeIndex !== -1) {
                const updatedNodes = nodes.map((node) => {

                    let status = undefined
                    if (node.id === dimension.id) {
                        status = 'info';
                    }

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            status
                        },
                    }

                });


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
                        <button>
                            <PositionComponent position="left" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                        <button>
                            <PositionComponent position="right" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                    </div>
                    <MiniMap />
                    {/* lines,dots,cross */}
                </ReactFlow>
            </div>
        </GraphContext.Provider>
    );
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
            {position}
        </div>
    )
}