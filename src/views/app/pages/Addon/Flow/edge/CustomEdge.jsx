import React, { useEffect, useRef  } from 'react'
import ReactFlow, { getSmoothStepPath, EdgeText } from 'reactflow';
import { useGraph } from '../index';


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

    const edgePathStyle = {
        fill: 'none',
        stroke: '#3498db', // Replace with your desired color
        strokeWidth: 2, // Adjust the stroke width as needed
      };

    return (
        <>  
            {/* <path
                ref={edgeRef}
                id={id}
                d={getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })}
                style={style}
                className={`react-flow__edge-path ${selectedEdge == id ? 'selected' : ''}`}
                onClick={handleClick}
            /> */}
            {/* <path
                ref={edgeRef}
                id={id}
                d={getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })}
                style={style}
                className={`react-flow__edge-path edge-path-smoothstep ${selectedEdge == id ? 'selected' : ''}`}
                onClick={handleClick}
            /> */}
            {/* <path
        d={getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })}
        style={style}
        className="custom-edge-path"
    /> */}
      <path
        // d={getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })}
        style={{ ...style, ...edgePathStyle }}
        className={`react-flow__edge-path edge-path-smoothstep ${selectedEdge == id ? 'selected' : ''}`}
        // className="custom-edge-path"
      />
            {/* <EdgeText
                x={(sourceX + targetX) / 2}
                y={(sourceY + targetY) / 2}
                label={id}
                className="react-flow__edge-text"
            /> */}

            
        </>
    );
};


export default CustomEdge;