import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import ELK from 'elkjs/lib/elk.bundled.js';

import 'reactflow/dist/style.css';

import ReactFlow, { useReactFlow, MiniMap, Background, addEdge, SelectionMode, applyEdgeChanges, applyNodeChanges } from 'reactflow';
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

import {
    setNotification
} from '@/slices/iamSlice'



const panOnDrag = [1, 2];

const typeBackground = {
    cross: [{
        size: 4,
        gap: 50,
        lineWidth: 4,
        variant: 'cross'
    }, {
        size: 10,
        gap: 200,
        lineWidth: 4,
        variant: 'cross'
    }],
    lines: [{
        size: 1,
        gap: 50,
        lineWidth: 1,
        variant: 'lines'
    }, {
        size: 1,
        gap: 100,
        lineWidth: 1,
        variant: 'lines'
    }],
    dots: [{
        size: 2,
        gap: 25,
        lineWidth: 4,
        variant: 'dots'
    }, {
        size: 4,
        gap: 50,
        lineWidth: 4,
        variant: 'dots'
    }]
}






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

    const [miniMapVisible, setMiniMapVisible] = useState(false);
    const [zoomInitial, setZoomInitial] = useState(false);


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
            sourcePosition: "bottom",
            targetPosition: "top",
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
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);

        const newEdge = {
            id: uuidv4(),
            source: lastNode.id,
            target: newNode.id
        };

        setEdges((prevEdges) => [...prevEdges, newEdge]);
    };


    // const defaultEdgeOptions = {
    //     type: "default",
    //     pathOptions: {
    //       borderRadius: 60,
    //       offset: 40
    //     },
    //   };





    // ---------------------------------
    const saveNode = async () => {
        let id = iniVector({
            workspaceId: user?.id,
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
    const handleDrop = async (e) => {
        e.preventDefault()
        if (e.target.getAttribute('refs') == 'schema') {
            e.stopPropagation()
            return false
        }

        dispatch(setNotification(true))


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
                sourcePosition: "right",
                targetPosition: "left",
                data: table,
                position: { x: newX, y: newY }
            };

            setNodes((prevElements) => [...prevElements, newNode]);

            setTimeout(() => {
                dispatch(setNotification(false))
            }, 2000)
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





    // useEffect(() => {
    //     if (dimension) {
    //         const nodeIndex = nodes.findIndex((node) => node.id === dimension.id);
    //         if (nodeIndex !== -1) {
    //             const updatedNodes = nodes.map((node) => {
    //                 let status = undefined
    //                 if (node.id === dimension.id) {
    //                     status = 'info';
    //                 }
    //                 return {
    //                     ...node,
    //                     data: {
    //                         ...node.data,
    //                         status
    //                     },
    //                 }
    //             });
    //             setNodes(updatedNodes);
    //         }
    //     }
    // }, [dimension])








    const value = {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedEdge,
        setSelectedEdge,
        addNode
    };




    const onDragStart = () => {
        // Desactivar el arrastre en React Flow
        return false;
    };



    // ----------------------------

    const reactFlowWrapper = useRef(null);

    useEffect(() => {
        if (reactFlowWrapper.current) {
            setTimeout(function () {
                setZoomInitial(true)
            }, 100)
        }
    }, [reactFlowWrapper]);




    // --------------------------------
    const [backgroundVariant, setBackgroundVariant] = useState(typeBackground.lines)

    const handleTypeBackground = () => {
        const currentVariant = backgroundVariant[0].variant;
        const currentIndex = Object.keys(typeBackground).indexOf(currentVariant);

        const nextIndex = (currentIndex + 1) % Object.keys(typeBackground).length;
        const nextVariant = Object.keys(typeBackground)[nextIndex];

        setBackgroundVariant(typeBackground[nextVariant]);
    };




    const [zoomType, setZoomType] = useState(0)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === '+') {
                event.preventDefault();
                setZoomType(prevZoomType => Math.max(prevZoomType + 1, 0));
            } else if (event.ctrlKey && event.key === '-') {
                event.preventDefault();
                setZoomType(prevZoomType => Math.min(prevZoomType - 1, 0));
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);



    return (
        <GraphContext.Provider value={value}>
            <div
                ref={reactFlowWrapper}
                style={{ width: '100%', height: '100%' }}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}
            >
                <ReactFlow
                    // defaultEdgeOptions={defaultEdgeOptions}
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
                    onDragStart={onDragStart}
                    panOnScroll
                    selectionOnDrag
                    panOnDrag={panOnDrag}
                    selectionMode={SelectionMode.Partial}
                >
                    <Background
                        id="1"
                        gap={backgroundVariant[0].gap}
                        size={backgroundVariant[0].size}
                        lineWidth={backgroundVariant[0].lineWidth}
                        variant={backgroundVariant[0].variant}
                        color="var(--color-primary-4)"
                    />

                    <Background
                        id="2"
                        gap={backgroundVariant[1].gap}
                        size={backgroundVariant[1].size}
                        lineWidth={backgroundVariant[1].lineWidth}
                        variant={backgroundVariant[1].variant}
                        color="var(--color-primary-3)"
                    />
                    <div
                        className={styles.buttons} style={{ top: '18px' }}
                    >
                        <button
                            onClick={saveNode}
                        >
                            <ButtonSave />
                        </button>
                        <button>
                            <ButtonAdd addNode={addNode} nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                        <button style={{ marginLeft: 'auto' }}>
                            <PositionComponent position="left" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                        <button>
                            <PositionComponent position="right" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                        <button>
                            <PositionComponent position="other" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                    </div>
                    <div className={styles.buttons} style={{ bottom: '22px' }}>
                        <button>
                            <ButtonPlus />
                        </button>
                        <button>
                            <ButtonLess />
                        </button>
                        <button>
                            <TypeBackground handleTypeBackground={handleTypeBackground} />
                        </button>
                        <button style={{ marginLeft: 'auto' }}>
                            <ButtonMap setMiniMapVisible={setMiniMapVisible} />
                        </button>
                    </div>
                    {miniMapVisible && (
                        <MiniMap />
                    )}
                    {zoomInitial && (
                        <ZoomInitial nodes={nodes} />
                    )}
                    <ZoomFunction direction={zoomType} />
                </ReactFlow>
            </div>
        </GraphContext.Provider>
    );
}
















// --------------------------------------------------------

const ZoomFunction = ({ direction }) => {
    const { zoomIn, zoomOut } = useReactFlow();

    useEffect(() => {
        if (direction > 0) {
            zoomIn();
        } else if (direction) {
            zoomOut();
        }
    }, [direction])

    return null
};


const ZoomInitial = ({ nodes }) => {
    const { fitView, setCenter } = useReactFlow();

    useEffect(() => {
        const waitForLoad = async () => {
            if (fitView && setCenter) {
                const lastNode = nodes[nodes.length - 1];

                let newX = 0
                let newY = 0

                if (lastNode) {
                    newY = lastNode.position.y;
                    newX = lastNode.position.x + lastNode.width + 1
                }

                setCenter(newX - 200, newY + 270, { zoom: 0.8, duration: 500 });
            }
        };

        waitForLoad();
    }, [fitView, setCenter]);
}


const TypeBackground = ({ handleTypeBackground }) => {
    return (
        <div
            className={styles.button}
            onClick={handleTypeBackground}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 4 3 3H5v3m3 10-3-3h14v-3m-9-2.5 2-1.5v4" />
            </svg>
            <span>
                Styles
            </span>
        </div>
    )
}





const ButtonPlus = () => {
    const { zoomIn } = useReactFlow();

    const handleButtonPlus = () => {
        zoomIn();
    };

    return (
        <div
            className={styles.button}
            onClick={handleButtonPlus}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
            </svg>
            <span>
                plus
            </span>
        </div>
    )
}



const ButtonLess = () => {
    const { zoomOut } = useReactFlow();

    const handleButtonLess = () => {
        zoomOut();
    };

    return (
        <div
            className={styles.button}
            onClick={handleButtonLess}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
            </svg>
            <span>
                less
            </span>
        </div>
    )
}




const ButtonMap = ({ setMiniMapVisible }) => {
    const handleButtonMap = () => {
        setMiniMapVisible((prevVisible) => !prevVisible);
    }

    return (
        <div
            className={styles.button}
            onClick={handleButtonMap}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            <span>
                map
            </span>
        </div>
    )
}




const ButtonAdd = ({ addNode, setNodes, nodes, setEdges, edges }) => {
    const { fitView, setCenter } = useReactFlow();

    const handleAddNode = async () => {
        const lastNode = nodes[nodes.length - 1];
        let newX = 0
        let newY = 0

        await addNode(lastNode)

        if (lastNode) {
            newY = lastNode.position.y + 200
            newX = lastNode.position.x + 100
        }

        setTimeout(function () {
            window.requestAnimationFrame(() => {
                setCenter(newX, newY, { zoom: 1.2, duration: 500 })
            })
        }, 100)
    }

    return (
        <div
            className={styles.button}
            onClick={() => handleAddNode()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3" />
            </svg>
            <span>
                ADD
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


    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const onLayout = useCallback(
        ({ direction, useInitialNodes = false }) => {
            const opts = { 'elk.direction': direction, ...elkOptions };
            // const ns = useInitialNodes ? initialNodes : nodes;
            // const es = useInitialNodes ? initialEdges : edges;

            getLayoutedElements(nodes, edges, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
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

            ) : position == 'right' ? (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.1 4H5c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm-10 10H5c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Z" />
                    </svg>
                    <span>
                        Vector
                    </span>
                </div>
            ) : (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.2v.8l7 4 7-4v-.8m-14 5v.8l7 4 7-4v-1M12 3 5 7l7 4 7-4-7-4Z" />
                    </svg>
                    <span>
                        Map
                    </span>
                </div>
            )}
        </div>
    )
}


