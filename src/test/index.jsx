import React, { useState } from 'react';
// import './App.css';

const TreeNode = ({ node, onAddChild, onDelete, onToggle, onDragStart, onDragOver, onDrop }) => {
  const [newChildText, setNewChildText] = useState('');

  const handleAddChild = () => {
    if (newChildText.trim() !== '') {
      onAddChild(node.id, newChildText);
      setNewChildText('');
    }
  };

  const handleDelete = () => {
    onDelete(node.id);
  };

  const handleToggle = () => {
    onToggle(node.id);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', node.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver(node.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(node.id);
  };

  return (
    <div
      className="tree-node"
      style={{ marginLeft: `${node.depth * 20}px` }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <span>{node.text}</span>
      <button onClick={handleAddChild}>Añadir hijo</button>
      <button onClick={handleDelete}>Eliminar</button>
      <button onClick={handleToggle}>{node.expanded ? 'Contraer' : 'Expandir'}</button>
      {node.expanded && (
        <ul>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onToggle={onToggle}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const [tree, setTree] = useState({
    id: 'root',
    text: 'Root',
    depth: 0,
    expanded: true,
    children: [
      { id: '1', text: 'Item 1', depth: 1, expanded: false, children: [] },
      { id: '2', text: 'Item 2', depth: 1, expanded: false, children: [] },
    ],
  });

  const traverseTree = (currentNode, nodeId, callback) => {
    if (currentNode.id === nodeId) {
      callback(currentNode);
    } else if (currentNode.children) {
      currentNode.children.forEach((child) => traverseTree(child, nodeId, callback));
    }
  };

  const handleAddChild = (parentId, childText) => {
    setTree((prevTree) => {
      const newTree = { ...prevTree };
      traverseTree(newTree, parentId, (parent) => {
        const newChild = {
          id: `${parentId}-${parent.children.length + 1}`,
          text: childText,
          depth: parent.depth + 1,
          expanded: false,
          children: [],
        };
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(newChild);
      });
      return newTree;
    });
  };

  const handleDelete = (nodeId) => {
    setTree((prevTree) => {
      const newTree = { ...prevTree };
      let parent;
      traverseTree(newTree, nodeId, (currentNode) => {
        parent = currentNode;
      });

      if (parent) {
        parent.children = parent.children.filter((child) => child.id !== nodeId);
      }
      return newTree;
    });
  };

  const handleToggle = (nodeId) => {
    setTree((prevTree) => {
      const newTree = { ...prevTree };
      traverseTree(newTree, nodeId, (currentNode) => {
        currentNode.expanded = !currentNode.expanded;
      });
      return newTree;
    });
  };

  const handleDragStart = (draggedNodeId) => {
    setTree((prevTree) => {
      const newTree = { ...prevTree };
      traverseTree(newTree, draggedNodeId, (draggedNode) => {
        draggedNode.isDragging = true;
      });
      return newTree;
    });
  };

  const handleDragOver = (targetNodeId) => {
    setTree((prevTree) => {
      const newTree = { ...prevTree };
      traverseTree(newTree, targetNodeId, (targetNode) => {
        targetNode.isOver = true;
      });
      return newTree;
    });
  };

  const handleDrop = (targetNodeId) => {
    setTree((prevTree) => {
      const newTree = { ...prevTree };
      let draggedNode;
      traverseTree(newTree, (node) => node.isDragging, (node) => {
        draggedNode = node;
      });

      if (draggedNode) {
        traverseTree(newTree, draggedNode.id, (node) => {
          node.isDragging = false;
        });

        let targetNode;
        traverseTree(newTree, targetNodeId, (node) => {
          targetNode = node;
        });

        if (targetNode) {
          draggedNode.depth = targetNode.depth + 1;
          targetNode.children.push(draggedNode);
        }
      }

      // Reset drag and drop states
      traverseTree(newTree, (node) => node.isDragging || node.isOver, (node) => {
        node.isDragging = false;
        node.isOver = false;
      });

      return newTree;
    });
  };

  return (
    <div>
      <TreeNode
        node={tree}
        onAddChild={handleAddChild}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </div>
  );
};

export default App;
