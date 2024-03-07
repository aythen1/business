// DragAndDrop.js
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import styles from './index.module.css';
import Component from './component';




import {
  setDashboard,
  addComponent,
  deleteComponent
} from '@/slices/dashboardSlice';


import {
  setOpenMenuLeft,
  setOpenMenuRight,
  setOpenChatBot,
} from '@/actions/iam'








const Board = ({ 
}) => {

  const dispatch = useDispatch()


  
  
  const [selectedComponent, setSelectedComponent] = useState(-1)
  const [listComponents, setListComponents] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  
  const { openMenuLeft, openMenuRight, openChatBot } = useSelector((state) => state.iam)
  const { dashboards, components } = useSelector((state) => state.dashboard)



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dashboardParam = urlParams.get('dashboard');

    if (dashboardParam) {
      const selectedDashboard = dashboards.find(dashboard => dashboard.id === dashboardParam);

      if (selectedDashboard) {
        dispatch(setDashboard(selectedDashboard));
      }
    }
  }, [dashboards])





  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleContextMenu = (event, item) => {
    setSelectedComponent(item);

    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY });
  };


  
  const handleItemClick = async (e, action) => {
    e.stopPropagation()
    switch(action){
      case 'new':
        dispatch(setOpenMenuRight('graph'))
        break;
      case 'delete':
        dispatch(deleteComponent([selectedComponent]))
        break;
      case 'copy':
        const selectedItemsJson = JSON.stringify(selectedComponent);
        navigator.clipboard.writeText(selectedItemsJson);
        break;
      case 'paste':
        const clipboardData = await navigator.clipboard.readText();
        const parsedData = JSON.parse(clipboardData);
        parsedData.id = uuidv4()

        dispatch(addComponent(parsedData))
        break;
      case 'duplicate':
        dispatch(addComponent([selectedComponent]))
        break;
      case 'support':
        dispatch(setOpenMenuLeft(false))
        dispatch(setOpenMenuRight(false))
        dispatch(setOpenChatBot(true))
        break;
    }
    setContextMenu(null);
  };


  


  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenu && !event.target.closest('.context-menu')) {
        handleCloseContextMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);


  // --------------------------------------------------------------------
  const _selectedComponent = (index) => {
    dispatch(setOpenMenuLeft('graph'))
  }


  useEffect(() => {
    const newComponents = components.map((component, index) => {
      return {
        id: index + 1,
        columnSize: component.styles?.columnSize,
        content: (
          <div
            key={index}
            onContextMenu={(event) => handleContextMenu(event, component)}
            onClick={(e) => {
              e.stopPropagation();
              _selectedComponent(index);
            }}
          >
            <Component component={component} />
          </div>
        ),
      };
    });
    setListComponents(newComponents);
  }, [components]);




  const handleClickGraph = (e) => {
    e.stopPropagation()
    dispatch(setOpenMenuRight('graph'))
  }




  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = listComponents[dragIndex];
    const updatedItems = [...listComponents];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setListComponents(updatedItems);
  };


  


  return (
    <div >
      <DropTarget >
        <div className="components-grids"  style={{ position: 'relative' }}>
          {listComponents.map((component, index) => (
            <div 
              key={index}
            >
              <DraggableItem
                key={component.id}
                component={component}
                index={index}
                moveItem={moveItem}
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
                handleItemClick={handleItemClick}
                handleCloseContextMenu={handleCloseContextMenu}
              />
            </div>
          ))}
          <div onClick={(e) => handleClickGraph(e)}>
            Crear un nuevo componente
          </div>
        </div>
      </DropTarget>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default Board;











const DraggableItem = ({ component, index, moveItem}) => {
  const [isDropping, setIsDropping] = useState(false)
  const dispatch = useDispatch();

  const id = component.id

  const [{ isDragging }, drag] = useDrag({
    type: 'DRAGGABLE_ITEM',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'DRAGGABLE_ITEM',
    hover: (item, monitor) => {
      if (!isDropping) {
        console.log('e')
        setIsDropping(true)
      }
 
          const draggedIndex = item.index;
          const hoverIndex = index;
          
          if (draggedIndex === hoverIndex) {
            return;
          }
          
          const hoverBoundingRect = monitor.getClientOffset();
          const hoverMiddleY = hoverBoundingRect.y + (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          
          if (draggedIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
      }
      
      if (draggedIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      moveItem(draggedIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: (item, monitor) => {
      // console.log('12p24j9rj', item)
      dispatch(addComponent(item))
    }
  });



  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        flex: component.columnSize ? `0 0 ${component.columnSize / 12 * 100}%` : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid black',
        padding: '8px',
        margin: '8px',
      }}
    >
      {component.content}
    </div>
  );
};






const DropTarget = ({ children }) => {
  const [, drop] = useDrop({
    accept: 'DRAGGABLE_ITEM',
  });

  return <div ref={drop}>{children}</div>;
};




const ContextMenu = ({ x, y, onClose, onItemClick }) => {
  const handleItemClick = (e, action) => {
    onItemClick(e, action);
    onClose();
  };

  return (
    <div
      className={styles.contextMenu}
      style={{
        left: x,
        top: y,
      }}
    >
      <button onClick={(e) => handleItemClick(e, 'new')}>Crear Nuevo</button>
      <button onClick={(e) => handleItemClick(e, 'delete')}>Eliminar</button>
      <button onClick={(e) => handleItemClick(e, 'copy')}>Copiar</button>
      <button onClick={(e) => handleItemClick(e, 'paste')}>Pegar</button>
      <button onClick={(e) => handleItemClick(e, 'duplicate')}>Duplicar</button>
      <button onClick={(e) => handleItemClick(e, 'support')}>Analizar AI</button>
    </div>
  );
};