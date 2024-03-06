
function findOutputsInPaths(targetId, paths, i) {
    let sortedPaths = [];

    paths.forEach((path, index) => {
        const targetIndex = path.indexOf(targetId);
        if (targetIndex !== -1 && index !== i) {
            const newNodeId = path[targetIndex - 1]
            sortedPaths.push(newNodeId);
        }
    });

    return sortedPaths;
}


function insertOutputsPaths(paths) {
    let nodeUnion = {};

    let sortedPaths = paths.sort((a, b) => b.length - a.length);

    for (const [i, path] of sortedPaths.entries()) {
        // Obtener el subconjunto de elementos intermedios del path
        const pathWithoutFirstAndLast = path.slice(1, -1);

        for (const [n, nodeId] of pathWithoutFirstAndLast.entries()) {
            const currentNode = nodes.find(node => node.id === nodeId);
            if (currentNode.type == 'selectorVector') {
                continue;
            }

            const positionPaths = findOutputsInPaths(nodeId, sortedPaths, i);
            if (positionPaths.length > 0) {
                if (!nodeUnion[nodeId]) {
                    nodeUnion[nodeId] = []
                }
                for (const position of positionPaths) {
                    if (!nodeUnion[nodeId].includes(position)) {
                        nodeUnion[nodeId].push(position)
                    }
                }

            }

        }
    }
    return { sortedPaths, nodeUnion }
}


function findInputsPaths(targetId, paths, i) {
    let sortedPaths = [];

    paths.forEach((path, index) => {
        const targetIndex = path.indexOf(targetId);
        if (targetIndex !== -1 && index !== i) {
            const newNodeId = path[targetIndex - 1]
            sortedPaths.push(newNodeId);
        }
    });

    return sortedPaths;
}



function insertInputsPaths(paths) {
    let nodeUnion = {};

    let sortedPaths = paths.sort((a, b) => b.length - a.length);

    for (const [i, path] of sortedPaths.entries()) {
        // Obtener el subconjunto de elementos intermedios del path
        const pathWithoutFirstAndLast = path.slice(1, -1);

        for (const [n, nodeId] of pathWithoutFirstAndLast.entries()) {
            const positionPaths = findInputsPaths(nodeId, sortedPaths, i);
            if (positionPaths.length > 0) {
                if (!nodeUnion[nodeId]) {
                    nodeUnion[nodeId] = []
                }
                for (const position of positionPaths) {
                    if (!nodeUnion[nodeId].includes(position)) {
                        nodeUnion[nodeId].push(position)
                    }
                }

            }

        }
    }
    return { sortedPaths, nodeUnion }
}


const obtainOutputsPaths = async (startNodeId, nodes, edges) => {
    const pathsReverse = [];
    const visited = new Set();

    const stack = [];
    stack.push([startNodeId]); // Comienza con el startNodeId proporcionado en un camino

    while (stack.length > 0) {
        const currentPath = stack.pop();
        const currentNodeId = currentPath[currentPath.length - 1];

        if (visited.has(currentNodeId)) continue;

        visited.add(currentNodeId);

        const incomingEdges = edges.filter((edge) => edge.target === currentNodeId);
        const originNodeIds = incomingEdges.map((edge) => edge.source);

        if (originNodeIds.length === 0) {
            // Fin del camino, agrega al resultado invirtiendo el orden
            const reversedPath = currentPath.slice().reverse();

            // Verifica si el camino contiene al menos un nodo "selectorVector" antes de agregarlo
            if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
                pathsReverse.push(reversedPath);
            }
        }

        for (const originNodeId of originNodeIds) {
            if (!visited.has(originNodeId)) {
                const newPath = [...currentPath, originNodeId];

                // Obtén el tipo del nodo actual
                const currentNodeType = nodes.find((node) => node.id === originNodeId)?.type;

                // Si encuentras un nodo de tipo "selectorVector", agrega este camino al resultado
                if (currentNodeType === 'selectorVector') {
                    const reversedPath = newPath.slice().reverse();

                    // Verifica nuevamente antes de agregar el camino si contiene al menos un nodo "selectorVector"
                    if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
                        pathsReverse.push(reversedPath);
                    }
                } else {
                    stack.push(newPath);
                }
            }
        }
    }

    return pathsReverse;
};



const obtainInputsPaths = async (startNodeId, nodes, edges) => {
    const pathsReverse = [];
    const visited = new Set();

    const stack = [];
    stack.push([startNodeId]); // Comienza con el startNodeId proporcionado en un camino

    while (stack.length > 0) {
        const currentPath = stack.pop();
        const currentNodeId = currentPath[currentPath.length - 1];

        if (visited.has(currentNodeId)) continue;

        visited.add(currentNodeId);

        const incomingEdges = edges.filter((edge) => edge.source === currentNodeId);
        const originNodeIds = incomingEdges.map((edge) => edge.target);

        if (originNodeIds.length === 0) {
            // Fin del camino, agrega al resultado invirtiendo el orden
            const reversedPath = currentPath.slice().reverse();

            // Verifica si el camino contiene al menos un nodo "selectorVector" antes de agregarlo
            if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
                pathsReverse.push(reversedPath);
            }
        }

        // console.log('originNodeIds', originNodeIds)

        for (const originNodeId of originNodeIds) {
            if (!visited.has(originNodeId)) {
                const newPath = [...currentPath, originNodeId];

                // Obtén el tipo del nodo actual
                const currentNode = nodes.find((node) => node.id === originNodeId);
                console.log('currentNodeType', currentNode.type)


                // Verifica si es un nodo de tipo "selectorComponent" y su prompt está vacío o tiene menos de 10 caracteres
                if (currentNode.type === 'selectorComponent' && (!currentNode.data.prompt || currentNode.data.prompt.length < 10)) {
                    // Agrega el nodo al setNodes con el id y al error con el mensaje correspondiente
                    const errorMessage = currentNode.data.prompt ? 'Prompt too short' : 'Prompt not found';
                    setNodes((prevNodes) => {
                        return prevNodes.map((node) => {
                            if (node.id === currentNode.id) {
                                return {
                                    ...node,
                                    data: {
                                        ...node.data,
                                        error: errorMessage,
                                    },
                                };
                            }
                            return node;
                        });
                    });
                    return []; // Devuelve false para no agregar al pathsReverse
                }



                // Resto de tu lógica aquí
                const reversedPath = newPath.slice().reverse();
                if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
                    pathsReverse.push(reversedPath);
                } else {
                    stack.push(newPath);
                }


            }
        }
    }

    return pathsReverse;
};




module.exports = {
    findOutputsInPaths,
    insertOutputsPaths,
    findInputsPaths,
    insertInputsPaths,
    obtainOutputsPaths,
    obtainInputsPaths
}