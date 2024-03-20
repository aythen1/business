import React, { useState, useEffect, useRef } from 'react'
import ReactFlow, { getSmoothStepPath, getStraightPath, getBezierPath, EdgeLabelRenderer, BaseEdge, EdgeText } from 'reactflow';
import { useGraph } from '../index';

import styles from './CustomEdge.module.css'

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {} }) => {
    const edgeRef = useRef(null);

    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedEdge,
        setSelectedEdge,
        addNode
    } = useGraph();

    const handleClick = () => {
        setSelectedEdge(id);
    };

    const handleKeyPress = (event) => {
        if (selectedEdge == id && event.key === 'Delete') {
            const newEdges = edges.filter((edge) => edge.id !== id);
            setEdges(newEdges);
        }
    };

    useEffect(() => {
        const handleKeyPressWithRef = (event) => handleKeyPress(event);
        document.addEventListener('keydown', handleKeyPressWithRef);

        return () => {
            document.removeEventListener('keydown', handleKeyPressWithRef);
        };
    }, [selectedEdge, id]);



    const [path, labelX, labelY] = getSmoothStepPath({
        sourceX: sourceX,
        sourceY: sourceY,
        sourcePosition: sourcePosition,
        targetX: targetX,
        targetY: targetY,
        targetPosition: targetPosition,
    });

    const onEdgeClick = (evt) => {
        evt.stopPropagation();
        const edgeIndex = Object.values(edges).findIndex(edge => edge.id === id);
        const edge = edges[edgeIndex]
        console.log('currentIndex', id, edge)
        // Obtener el último nodo

        const nodeIndex = Object.values(nodes).findIndex(node => node.id === edge.source);
        const lastNode = nodes[nodeIndex]
        console.log('lastNode', nodes, edge.source, lastNode)
        addNode(lastNode)
    };

    return (
        <>
            {/* <BaseEdge path={path} style={style} /> */}
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <button className={styles.addEdge} onClick={onEdgeClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                        </svg>
                    </button>
                </div>
            </EdgeLabelRenderer>

            <path
                ref={edgeRef}
                id={id}
                d={path}
                style={style}
                className={`react-flow__edge-path ${selectedEdge == id ? 'selected' : ''}`}
                onClick={handleClick}
            />

            <path
                ref={edgeRef}
                id={id}
                d={path}
                className={`react-flow__edge-path edge-path-line ${selectedEdge == id ? 'selected' : ''}`}
                onClick={handleClick}
            />
            {/* <EdgeText
                x={(sourceX + targetX) / 2}
                y={(sourceY + targetY) / 2}
                // label={id}
                className="react-flow__edge-text"
                label={(
                    <div>
                        ekdekifik
                        <g
                            className={styles.addEdge}
                        >
                            efowrfirifmik +
                        </g>
                    </div>
                )}
            /> */}
        </>
    );
};


export default CustomEdge;