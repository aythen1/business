
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
    stack.push([startNodeId]); 

    while (stack.length > 0) {
        const currentPath = stack.pop();
        const currentNodeId = currentPath[currentPath.length - 1];

        if (visited.has(currentNodeId)) continue;

        visited.add(currentNodeId);

        const incomingEdges = edges.filter((edge) => edge.target === currentNodeId);
        const originNodeIds = incomingEdges.map((edge) => edge.source);

        if (originNodeIds.length === 0) {
            const reversedPath = currentPath.slice().reverse();

            if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
                pathsReverse.push(reversedPath);
            }
        }

        for (const originNodeId of originNodeIds) {
            if (!visited.has(originNodeId)) {
                const newPath = [...currentPath, originNodeId];

                const currentNodeType = nodes.find((node) => node.id === originNodeId)?.type;

                if (currentNodeType === 'selectorVector') {
                    const reversedPath = newPath.slice().reverse();

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
    stack.push([startNodeId]); 

    while (stack.length > 0) {
        const currentPath = stack.pop();
        const currentNodeId = currentPath[currentPath.length - 1];

        if (visited.has(currentNodeId)) continue;

        visited.add(currentNodeId);

        const incomingEdges = edges.filter((edge) => edge.source === currentNodeId);
        const originNodeIds = incomingEdges.map((edge) => edge.target);

        if (originNodeIds.length === 0) {
            const reversedPath = currentPath.slice().reverse();

            if (reversedPath.some(nodeId => nodes.find(node => node.id === nodeId)?.type === 'selectorVector')) {
                pathsReverse.push(reversedPath);
            }
        }

        for (const originNodeId of originNodeIds) {
            if (!visited.has(originNodeId)) {
                const newPath = [...currentPath, originNodeId];

                const currentNode = nodes.find((node) => node.id === originNodeId);

                if (currentNode.type === 'selectorComponent' && (!currentNode.data.prompt || currentNode.data.prompt.length < 10)) {
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
                    return []; 
                }

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