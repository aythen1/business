import React, { memo, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux'

import { Handle, useReactFlow } from "reactflow";

import styles from './CustomVector.module.css'

import { useGraph } from '../index';

import VectorTable from './vector/Table'
import VectorInfo from './vector/Info'
import VectorAgent from './vector/Agent'

import VectorSQL from './vector/SQL'


import IconExcel from './assets/icon-excel.svg'


import {
  setDimension
} from '@/slices/vectorSlice'


export default memo(({ id, data, isConnectable, sourcePosition }) => {
  const dispatch = useDispatch()

  const {
    dimension
  } = useSelector((state) => state.vector)


  const { nodes, edges, setNodes, setEdges } = useGraph();

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [filter, setFilter] = useState('')

  const { zoomIn, zoomOut, setCenter } = useReactFlow();

  useEffect(() => {
    setFilter(data.status)
  }, [data])



  useEffect(() => {
    if (dimension) {
      const nodePosition = dimension.position;

      const reactFlowElement = document.querySelector('.react-flow');
      if (reactFlowElement) {
        const x = nodePosition.x + 300
        const y = nodePosition.y + 200

        const zoom = 0.9

        setCenter(x, y, { zoom, duration: 400 });
      }
    }
  }, [dimension]);



  const handleSelectVector =  (e) => {
    const selectedElements = document.querySelectorAll(`.${styles.selected}`);
    selectedElements.forEach((element) => {
      element.classList.remove(styles.selected);
    });

    if (filter) {
      setFilter(null)
    } else {
      setFilter('info')
    }

    const node = nodes.filter((node) => node.id === id)[0]
    dispatch(setDimension(node))


    const selectedVector = e.target.closest(`.${styles.boxVector}`);
    if (selectedVector) {
      selectedVector.classList.add(styles.selected);
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
      <div className={styles.customVector}>
        <div
          className={styles.boxVector}
          onClick={(e) => handleSelectVector(e)}
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
      </div>

      <div>
        {filter == 'table' ? (
          <VectorTable id={id} data={data} setFilter={setFilter} />
        ) : filter == 'sql' ? (
          <VectorSQL id={id} data={data} setFilter={setFilter} />
        ) : filter == 'info' ? (
          <VectorInfo id={id} data={data} setFilter={setFilter} />
        ) : filter == 'agent' && (
          <VectorAgent id={id} data={data} setFilter={setFilter} />
        )}
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