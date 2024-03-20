import React, { memo, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux'

import { Handle, useReactFlow } from "reactflow";

import styles from './CustomVector.module.css'

import { useGraph } from '../index';

import VectorTable from './vector/Table'
import VectorUpload from './vector/Upload'
import VectorBackup from './vector/Backup'
import VectorInfo from './vector/Info'
import VectorBoard from './vector/Board'
// import VectorAgent from './vector/Agent'
// import VectorInfo from './vector/Info'

// import VectorSQL from './vector/SQL'

import ModalVector from '../../modal'

// import IconExcel from './assets/icon-excel.svg'
import IconExcel from '../../../Settings/drive/assets/icons/XSL.jsx'


import {
  setDimension
} from '@/slices/vectorSlice'


import {
  setModal
} from '@/slices/iamSlice'

import {
  calculateTimeAgo,
  formatBytes
} from '@/utils'


export default memo(({ id, data, isConnectable, sourcePosition }) => {
  const dispatch = useDispatch()

  const {
    dimension
  } = useSelector((state) => state.vector)


  const { nodes, edges, setNodes, setEdges, addNode } = useGraph();

  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);


  const [filter, setFilter] = useState('')

  const { zoomIn, zoomOut, setCenter } = useReactFlow();

  useEffect(() => {
    setFilter(data.status)
  }, [data])



  useEffect(() => {
    if (dimension && dimension.id == id) {
      // console.log('eee', id, nodePosition)
      const node = nodes.filter((node) => node.id === id)[0]

      const reactFlowElement = document.querySelector('.react-flow');
      if (reactFlowElement) {
        const x = node.position.x + 300
        const y = node.position.y + 200


        const zoom = 0.9

        setCenter(x, y, { zoom, duration: 400 });
      }
    }
  }, [dimension]);



  const handleSelectVector = (e) => {
    const selectedElements = document.querySelectorAll(`.${styles.selected}`);
    selectedElements.forEach((element) => {
      element.classList.remove(styles.selected);
    });

    if (filter) {
      setFilter(null)
    } else {
      setFilter('table')
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




  // useEffect(() => {
  //   const currentNode = nodes.find(node => node.id === id);
  //   if (currentNode) {
  //     // setPosition(currentNode.position);
  //     console.log('currentNode', currentNode)
  //   }
  // }, [])

  const handleSetFilter = (e, filter) => {
    e.stopPropagation()
    setFilter(filter)
  }


  const handleAddNode = (e) => {
    e.stopPropagation()
    dispatch(setModal(null))
    addNode()
  }

  const handleDimension = (e) => {
    e.stopPropagation()
    dispatch(setModal(<ModalVector />))
  }

  const handleCode = (e) => {
    e.stopPropagation()
    dispatch(setModal(null))
  }

  // ----------------------------------------------------
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showContextMenu && !event.target.closest('.contextMenu')) {
        setShowContextMenu(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showContextMenu]);
  
  // ----------------------------------------------------
  const handleTitle = (e) => {
    e.stopPropagation()
  }


  return (
    <>
      {/* {id} */}
      <Handle
        id={id}
        type="target"
        position="left"
        style={{ left: '-8px' }}
        className={styles.handleLeft}
        isConnectable={isConnectable}
      />
      <Handle 
        type="source"
        position="right"
        style={{ right: '-8px' }}
        className={styles.handleRight}
        isConnectable={isConnectable}
      />
      {showContextMenu && (
        <ContextMenu
          x={contextMenuPosition.x}
          y={contextMenuPosition.y}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      )}
      <div className={styles.customVector}>
        <div
          className={`${styles.boxVector} ${filter && styles.active} ${(filter == 'table' || filter == 'graph') && styles.maxWidth}`}
          onClick={(e) => handleSelectVector(e)}
          onDoubleClick={(e) => handleSetFilter(e, 'agent')}
          onContextMenu={(e) => {
            e.preventDefault();

            const boundingBox = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - boundingBox.left;
            const y = e.clientY - boundingBox.top;

            setContextMenuPosition({ x, y });
            setShowContextMenu(true);
          }}
        >
          <div className={styles.logo}>
            {/* <img src={IconExcel} /> */}
            <IconExcel />
          </div>
          <div className={styles.info}>
            <div className={styles.top}>
                <input
                  type="text"
                  spellCheck="false"
                  onClick={(e) => handleTitle(e)}
                  onDoubleClick={(e) => handleTitle(e)}
                  value={data.title || 'Not found'}
                />
              <div className={styles.label}>
                <span className={styles.time}>
                  {data.date ? calculateTimeAgo(data.date) : '-'}
                </span>
                <label>
                  {data.size ? formatBytes(data.size) : '0kb'}
                </label>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.buttons}>
                <button onClick={(e) => handleSetFilter(e, 'table')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 6c0 1.657-3.134 3-7 3S5 7.657 5 6m14 0c0-1.657-3.134-3-7-3S5 4.343 5 6m14 0v6M5 6v6m0 0c0 1.657 3.134 3 7 3s7-1.343 7-3M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6" />
                  </svg>
                </button>
                <button
                  className={styles.return}
                  onClick={(e) => handleSetFilter(e, 'board')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
                  </svg>
                </button>
                <button
                  className={styles.upload}
                  onClick={(e) => handleSetFilter(e, 'settings')}
                >
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
                  </svg>

                </button>
                <button onClick={(e) => handleAddNode(e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.872 9.687 20 6.56 17.44 4 4 17.44 6.56 20 16.873 9.687Zm0 0-2.56-2.56M6 7v2m0 0v2m0-2H4m2 0h2m7 7v2m0 0v2m0-2h-2m2 0h2M8 4h.01v.01H8V4Zm2 2h.01v.01H10V6Zm2-2h.01v.01H12V4Zm8 8h.01v.01H20V12Zm-2 2h.01v.01H18V14Zm2 2h.01v.01H20V16Z" />
                  </svg>
                </button>
                <button onClick={(e) => handleDimension(e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 9 3 3-3 3m5 0h3M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
        <div>
          {filter == 'table' ? (
            <VectorTable id={id} data={data} />
          ) : filter == 'upload' ? (
            <VectorUpload />
          ) : filter == 'backup' ? (
            <VectorBackup />
          ) : filter == 'board' ? (
            <VectorBoard />
          ) : filter == 'settings' && (
            <VectorInfo setFilter={setFilter} />
          )}
        </div>
      </div>


    </>
  );
});




const ContextMenu = ({ x, y, onDuplicate, onDelete }) => {
  return (
    <div className={styles.contextMenu} style={{ top: y, left: x }} >
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