import React, { createContext, useContext, useState } from 'react';

const GraphContext = createContext();

export const useGraph = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const addNode = {}
  const setIsEditor = {}
  
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [selectedEdge, setSelectedEdge] = useState(false);

  const value = {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedEdge,
    setSelectedEdge,
    addNode,
    setIsEditor
  };

  return (
    <GraphContext.Provider value={value}>
      {children}
    </GraphContext.Provider>
  );
};