
import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';



import 'reactflow/dist/style.css';

import { useOpenAI } from '../openai'

import ReactFlow, { useReactFlow, MiniMap, Background, addEdge, SelectionMode, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import styles from './index.module.css'


import CustomEdge from "./edge/CustomEdge";
import CustomTemplate from "./node/CustomTemplate"
import ELK from 'elkjs/lib/elk.bundled.js';

import ConnectionLine from './connection/line';



import {
    setStatus
} from '@/slices/addonSlice'

import {
    parseChartString,
    generatePromptTree
} from './prompt'



import {
    fetchAddon,
    updateAddon,

    iniVector,
    fetchsVectorAddon,
    addVectorAddon
} from '@/actions/addon'



const GraphContext = createContext();
export const useGraph = () => useContext(GraphContext);

const panOnDrag = [1, 2];

const edgeTypes = {
    customEdge: CustomEdge
}

const nodeTypes = {
    selectorTemplate: CustomTemplate,
};

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



export const AddonFlow = ({
    setIsEditor
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { addonId } = useParams()

    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [selectedEdge, setSelectedEdge] = useState(false);

    const [miniMapVisible, setMiniMapVisible] = useState(false);
    const [zoomInitial, setZoomInitial] = useState(false);


    // ------------------------------
    const { user } = useSelector((state) => state.iam)

    const {
        addon,
    } = useSelector((state) => state.addon)


    useEffect(() => {
        const fetchItem = async () => {
            const nodes = JSON.parse(addon.nodes)

            for (var i = 0; i < nodes.length; i++) {
                const node = nodes[i]

                let id = iniVector({
                    path0: 'addon',
                    path1: addonId,
                    path2: node.id
                })

                const resp = await dispatch(fetchsVectorAddon({
                    id: id,
                    name: 'templates'
                }))

                if (resp.payload.length > 0) {
                    nodes[i].data.components = JSON.parse(resp.payload[0].components)
                }
            }
            setNodes(nodes)
            setEdges(JSON.parse(addon.edges))
        }

        if (addon.id) {
            fetchItem()
        } else if (addonId) {
            dispatch(fetchAddon(addonId))
            dispatch(setStatus('active'))
        }
    }, [addon])



    // ---------------------------------

    const saveNode = async () => {
        let id = iniVector({
            workspaceId: user?.id,
            projectId: addonId,
        })

        const updateNodes = JSON.parse(JSON.stringify(nodes))
        console.log('nodes', nodes)
        for (var i = 0; i < updateNodes.length; i++) {
            const node = updateNodes[i]
            console.log('node ->', node)
            const title = node.data.title
            const components = node.data.components

            updateNodes[i].data.components = []

            const arr = []

            for (var j = 0; j < components.length; j++) {
                const component = components[j]

                arr.push({
                    id: component.id,
                    text: component.text,
                    image: component.image,
                    code: component.code
                })

                console.log('===========', {
                    id: component.id,
                    text: component.text,
                    image: component.image,
                    code: component.code
                })
                // console.log('arr')
            }


            await dispatch(addVectorAddon({
                addon: { id: addon.id },
                vector: {
                    id: node.id,
                    title: title,
                    components: arr
                }
            }));

        }


        const data = {
            id: addon.id,
            // title: '1111',
            nodes: updateNodes,
            edges: edges
        }

        console.log('!!!!!!', data)


        dispatch(updateAddon(data))
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

            if (sourceNode && targetNode) {
                const { type: sourceType } = sourceNode;
                const { type: targetType } = targetNode;

                if (sourceType == 'selectorTemplate') {

                } else {
                    const isTopHandle = sourceHandle.endsWith('_top')
                    const handleName = isTopHandle ? 'top_connectedNodeIds' : 'bottom_connectedNodeIds';

                    if (sourceType === 'selectorTemplate') {
                        setNodes((prevNodes) => {
                            const updatedNodes = [...prevNodes];
                            const sourceNodeIndex = updatedNodes.findIndex((node) => node.id === source);
                            if (sourceNodeIndex !== -1) {
                                updatedNodes[sourceNodeIndex].data.handles[handleName].push(target);
                            }
                            return updatedNodes;
                        });
                    }
                }
            }

            setEdges(addEdge({ ...connection, type: "customEdge" }, edges))

        },
        [setNodes, setEdges, nodes])



    // -------------------------------------------------------
    const addNode = (lastNode = false, direction = 'row') => {
        let newX = 0
        let newY = 0
        let handles = {}

        if (lastNode) {
            if (direction == 'row') {
                newY = lastNode.position.y;
                newX = lastNode.position.x + lastNode.width + 100
            } else if (direction == 'column') {
                newY = lastNode.position.y + lastNode.height + 50;
                newX = lastNode.position.x;
            } else {
                console.log('direction', direction)
                newY = direction.x;
                newX = direction.y;
            }

            handles = {
                top_connectedNodeIds: [lastNode.id],
                bottom_connectedNodeIds: [],
            }
        }

        const newNode = {
            id: uuidv4(),
            type: 'selectorTemplate',
            dragHandle: '.custom-drag-handle',
            data: {
                title: '',
                error: '',
                handles,
                components: []
            },
            date: new Date(),
            position: { x: newX, y: newY },
            sourcePosition: 'right',
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);


        if (lastNode) {
            const newEdge = {
                id: uuidv4(),
                source: lastNode?.id,
                target: newNode.id,
                type: 'customEdge'
            };

            setEdges((prevEdges) => [...prevEdges, newEdge]);
        }
    };


    // -----------------------------------------------------------
    const reactFlowWrapper = useRef(null);

    const onDragStart = () => {
        return false;
    };

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



    // ---------------------------------------------------------------
    const [reactFlowInstance, setReactFlowInstance] = useState(null)

    const handleReactFlowInit = (reactFlow) => {
        setReactFlowInstance(reactFlow);
    };


    const defaultViewport = {
        zoom: 0.01,
        position: { x: 0, y: 0 }
    };


    // ---------------------------------------------------------------
    const value = {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedEdge,
        setSelectedEdge,
        addNode,
        setIsEditor,
        reactFlowWrapper,
        reactFlowInstance
    };


    return (
        <GraphContext.Provider value={value}>
            <div
                ref={reactFlowWrapper}
                style={{ width: '100%', height: 'calc(100vh - 55px)' }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onInit={handleReactFlowInit}
                    fitView
                    minZoom={0.2}
                    maxZoom={3}
                    defaultZoom={defaultViewport.zoom}
                    defaultPosition={defaultViewport.position}
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
                    connectionLineComponent={ConnectionLine}
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
                        color="var(--color-primary-4)"
                    />
                    <div className={styles.buttons} style={{ top: '18px' }} >
                        <button onClick={saveNode} >
                            <ButtonSave save={false} />
                        </button>
                        <button >
                            <ButtonAdd addNode={addNode} nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                        <button >
                            <ButtonTree />
                        </button>
                        <button style={{ marginLeft: 'auto' }}>
                            <PositionComponent position="column" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                        <button>
                            <PositionComponent position="row" nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                        </button>
                    </div>
                    <div className={styles.barLoading}>
                        <BarMana />
                        <BarBalance />
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
                            <ButtonHeadMap setMiniMapVisible={setMiniMapVisible} />
                        </button>
                        <button >
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


const ButtonHeadMap = ({ setMiniMapVisible }) => {
    const handleButtonMap = () => {
        setMiniMapVisible((prevVisible) => !prevVisible);
    }

    return (
        <div
            className={styles.button}
            onClick={handleButtonMap}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a28.076 28.076 0 0 1-1.091 9M7.231 4.37a8.994 8.994 0 0 1 12.88 3.73M2.958 15S3 14.577 3 12a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088A5.98 5.98 0 0 1 18 12a30 30 0 0 1-.464 6.232M6 12a6 6 0 0 1 9.352-4.974M4 21a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M7.5 19.336C9 17.092 9 14.845 9 12a3 3 0 1 1 6 0c0 .749 0 1.521-.031 2.311M12 12c0 3 0 6-2 9" />
            </svg>
            <span>
                head map
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
            newY = lastNode.position.y;
            newX = lastNode.position.x + lastNode.width + 100
        }

        setTimeout(function () {
            window.requestAnimationFrame(() => {
                setCenter(newX + 100, newY + 160, { zoom: 1.6, duration: 500 })
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



const ButtonTree = ({ save = false }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClickTree = async () => {
        if (!isLoading) {
            setIsLoading(true)

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

                setIsLoading(false)
            } catch (err) {
                console.log('err', err);
            }
        }
    };

    return (
        <div
            className={styles.button}
            onClick={() => handleClickTree()}
        >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v4m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            </svg>
            <span>
                Tree
            </span>
        </div>
    )
}



const ButtonSave = ({ save = true }) => {
    console.log('save', save)
    return (
        <div>
            {save ? (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 3a3 3 0 0 0-1 5.83v6.34a3.001 3.001 0 1 0 2 0V15a2 2 0 0 1 2-2h1a5.002 5.002 0 0 0 4.927-4.146A3.001 3.001 0 0 0 16 3a3 3 0 0 0-1.105 5.79A3.001 3.001 0 0 1 12 11h-1c-.729 0-1.412.195-2 .535V8.83A3.001 3.001 0 0 0 8 3Z" />
                    </svg>


                    <span>
                        SAVE
                    </span>
                </div>
            ) : (
                <div className={styles.button}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.9c0-.2 0-.5.2-.6l.6-.3h8.4c.2 0 .4 0 .6.3l.2.6V21Z" />
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V9a3 3 0 0 0-3-3h-3m1.5-2-2 2 2 2" />
                    </svg>
                    <span>
                        SAVED
                    </span>
                </div>
            )}
        </div>
    )
}



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




// --------------------------------------------------------

const elk = new ELK();

const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '240',
};


const getLayoutedElements = (nodes, edges, options = {}) => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const numColumns = 5; // Número de columnas
    const numRows = Math.ceil(nodes.length / numColumns); // Calcular el número de filas necesario
    const graph = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node, index) => ({
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            width: 150,
            height: node.height,
            // Calcular la posición x e y en función del índice y el número de columnas
            x: isHorizontal ? index * 200 : Math.floor(index / numRows) * 200,
            y: isHorizontal ? Math.floor(index / numRows) * 200 : (index % numRows) * 200,
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


    // const node = nodes[0]

    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const onLayout = useCallback(
        ({ direction }) => {
            const opts = { 'elk.direction': direction, ...elkOptions };
            // const ns = useInitialNodes ? initialNodes : nodes;
            // const es = useInitialNodes ? initialEdges : edges;

            getLayoutedElements(nodes, edges, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
                setNodes(layoutedNodes);
                setEdges(layoutedEdges);

                // window.requestAnimationFrame(() => {
                // setCenter(posX, posY, { zoom: 0.4, duration: 2000 })
                // });
                // setTimeout(() => {
                let posX = 0
                let posY = 0
                if (layoutedNodes.length > 0) {
                    let pos = layoutedNodes[0].position
                    posX = pos.x
                    posY = pos.y
                }

                setCenter(posX, posY, { zoom: 0.4, duration: 2000 })
                // }, 200)
                // window.requestAnimationFrame(() => fitView());
            });
        },
        [nodes, edges]
    );

    const onClick = () => {
        if (position == 'column') {
            onLayout({ direction: 'RIGHT' })
        } else {
            onLayout({ direction: 'DOWN' })
        }
    }



    return (
        <div
            onClick={onClick}
        >
            {position == 'column' ? (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v14M9 5v14M4 5h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>
                        Column
                    </span>
                </div>

            ) : position == 'row' && (
                <div className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.2v.8l7 4 7-4v-.8m-14 5v.8l7 4 7-4v-1M12 3 5 7l7 4 7-4-7-4Z" />
                    </svg>
                    <span>
                        Row
                    </span>
                </div>
            )}
        </div>
    )
}






const BarMana = () => {
    return (
        <div className={styles.barMana}>
            <div className={`${styles.bar} ${styles.active}`} />
            <div className={`${styles.bar} ${styles.active}`} />
            <div className={`${styles.bar} ${styles.active}`} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.line} />
        </div>
    )
}

const BarBalance = () => {
    return (
        <div className={styles.barBalance}>
            <div className={`${styles.bar} ${styles.active}`} />
            <div className={`${styles.bar} ${styles.active}`} />
            <div className={`${styles.bar} ${styles.active}`} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.line} />
        </div>
    )
}