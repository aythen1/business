import React, { memo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Handle } from "reactflow";

import styles from './CustomVector.module.css'

import { useGraph } from '../index';

import VectorData from './vector/Data'
import VectorInfo from './vector/Info'
import VectorSchema from './vector/Schema'
import VectorSQL from './vector/SQL'


import IconExcel from './assets/icon-excel.svg'
import IconWord from './assets/icon-word.svg'
import IconOther from './assets/icon-other.svg'


export default memo(({ id, data, isConnectable, sourcePosition }) => {
  const { nodes, edges, setNodes, setEdges } = useGraph();

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [filter, setFilter] = useState('')


  const handleSelectVector = () => {
    if (filter) {
      setFilter(null)
    } else {
      setFilter('info')
    }
  }




  const handleDuplicate = () => {
    setShowContextMenu(false)

    const node = nodes.filter((node) => node.id === id)[0]

    const newNode = {
      id: uuidv4(),
      type: "selectorVector",
      data: {
        header: node.data.header,
        data: node.data.data,
        connectedNodeIds: []
      },
      date: new Date(),
      position: {
        x: node.position.x + node.width + 40,
        y: node.position.y
      }
    }

    setNodes((prevNodes) => [...prevNodes, newNode])
  };

  const handleDelete = () => {
    alert(1)
    setShowContextMenu(false)

    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };




  return (
    <>
      {id}
      <Handle
        id={id}
        type="target"
        position="left"
        style={{ left: -10, top: 25, background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle type="source"
        position="right"
        style={{ right: -10, top: 25, background: "#555" }}
        isConnectable={isConnectable}
      />
      {showContextMenu && (
        <ContextMenu onDuplicate={handleDuplicate} onDelete={handleDelete} />
      )}
      <div
        className={styles.customVector}
        onClick={() => handleSelectVector()}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
      >
        <div className={styles.logo}>
          <img src={IconExcel} />
        </div>
        <div className={styles.info}>
          <div className={styles.top}>
            <p>
              {data.title ? data.title : 'Not found'}
            </p>
            <label>
              {data.size ? data.size : '0kb'}
            </label>
          </div>
          <div className={styles.bottom}>
            <span>
              {data.date ? JSON.stringify(data.date) : '-'}
            </span>
            <b>
              IN OUT
            </b>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.buttons}>
          <button
            className={styles.return}
            onClick={() => handleClickReturn()}
          >
            Atrás
          </button>
          <button
            className={styles.upload}
            onClick={() => handleClickUpload()}
          >
            Subir
          </button>
        </div>
        <div>
          {filter == 'data' ? (
            <VectorData id={id} data={data} setFilter={setFilter} />
          ) : filter == 'sql' ? (
            <VectorSQL id={id} data={data} setFilter={setFilter} />
          ) : filter == 'schema' ? (
            <VectorSchema id={id} data={data} setFilter={setFilter} setNodes={setNodes} />
          ) : filter == 'info' && (
            <VectorInfo id={id} data={data} setFilter={setFilter} />
          )}
        </div>
      </div>
    </>
  );
});




const ContextMenu = ({ onDuplicate, onDelete }) => {
  return (
    <div className={styles.contextMenu}>
      <ul>
        <li onClick={onDuplicate}>
          Duplicar
        </li>
        <li onClick={onDelete}>
          Eliminar
        </li>
      </ul>
    </div>
  )
}