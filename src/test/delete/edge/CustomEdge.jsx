import React, { useState, useEffect, useRef  } from 'react'
import ReactFlow, { getBezierPath, EdgeText } from 'reactflow';
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
        setSelectedEdge
    } = useGraph();

    const handleClick = () => {
        setSelectedEdge(id);
        // console.log('setSelectedEdge', setEdge, edges)
    };

    const handleKeyPress = (event) => {
        if (selectedEdge == id && event.key === 'Delete') {
            // Filtra los edges excluyendo el que tiene el ID actual
            const newEdges = edges.filter((edge) => edge.id !== id);
            // Actualiza el estado con el nuevo array de edges
            setEdges(newEdges);
        }
    };

    useEffect(() => {
        const handleKeyPressWithRef = (event) => handleKeyPress(event);
        // Agrega el event listener al montar el componente
        document.addEventListener('keydown', handleKeyPressWithRef);

        // Remueve el event listener al desmontar el componente
        return () => {
            document.removeEventListener('keydown', handleKeyPressWithRef);
        };
    }, [selectedEdge, id]);



    return (
        <>  
            <path
                ref={edgeRef}
                id={id}
                d={getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })}
                style={style}
                className={`react-flow__edge-path ${selectedEdge == id ? 'selected' : ''}`}
                onClick={handleClick}
            />
            <path
                ref={edgeRef}
                id={id}
                d={getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })}
                style={style}
                className={`react-flow__edge-path edge-path-line ${selectedEdge == id ? 'selected' : ''}`}
                onClick={handleClick}
            />
            <EdgeText
                x={(sourceX + targetX) / 2}
                y={(sourceY + targetY) / 2}
                label={id}
                className="react-flow__edge-text"
            />
        </>
    );
};


export default CustomEdge;