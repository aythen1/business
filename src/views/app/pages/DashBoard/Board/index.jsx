// DragAndDrop.js
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.css';
import Component from './component';

import {
  addComponent 
} from '@/slices/dashboardSlice';


import {
  setOpenMenuLeft,
  setOpenMenuRight,
  setOpenChatBot,
} from '@/actions/iam'





const DraggableItem = ({ id, index, moveItem, children, columnSize }) => {
  const [isDropping, setIsDropping] = useState(false)
  const dispatch = useDispatch();


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
      // console.log('itt', item, isDragging)
      
      if (!isDropping) {
        console.log('e')
        setIsDropping(true)
      }
      
      // if(!item.index && !isDropping){
        //   const _item = {
          //     ...item,
          //     index: 999
          //   }
          
          //   return;
          // }
          
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
      console.log('12p24j9rj', item)
      dispatch(addComponent(item))
    }
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        flex: columnSize ? `0 0 ${columnSize / 12 * 100}%` : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid black',
        padding: '8px',
        margin: '8px',
      }}
    >
      {children}
    </div>
  );
};

const DropTarget = ({ children }) => {
  const [, drop] = useDrop({
    accept: 'DRAGGABLE_ITEM',
  });

  return <div ref={drop}>{children}</div>;
};



const Board = ({ 
}) => {

  const dispatch = useDispatch()
  
  const [selectedComponent, setSelectedComponent] = useState(-1)
  const [listComponents, setListComponents] = useState([]);
  
  const { openMenuLeft, openMenuRight, openChatBot } = useSelector((state) => state.iam)
  const { components } = useSelector((state) => state.dashboard)


  const _selectedComponent = (index) => {
    dispatch(setOpenMenuLeft('graph'))
  }


  useEffect(() => {
    console.log('components', components)
    // Cuando components cambia, actualiza el estado items
    const newComponents = components.map((component, index) => {
      return {
        id: index + 1,
        columnSize: component.styles?.columnSize,
        content: (
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              _selectedComponent(index);
            }}
          >
            <Component>
              {JSON.stringify(component)}
            </Component>
          </div>
        ),
      };
    });
    setListComponents(newComponents);
  }, [components]);




  const handleClickGraph = (e) => {
    e.stopPropagation()
    dispatch(setOpenMenuRight('graph'))
    // setOpenChatBot(true)
  }




  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = listComponents[dragIndex];
    const updatedItems = [...listComponents];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setListComponents(updatedItems);
  };


  // ---------------------------------------------------------------------
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event, item) => {
    setSelectedComponent(item);

    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY });
  };

  const handleItemClick = (action) => {
    // Aquí puedes manejar las acciones específicas para cada botón
    switch(action){
      case 'new':
        
        break;
      case 'delete':
        
        break;
      case 'copy':
        
        break;
      case 'cut':
        
        break;
      case 'duplicate':
        
        break;
      case 'support':
        
        break;
    }


    setContextMenu(null);
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cierra el menú contextual si se hace clic fuera de él
      if (contextMenu && !event.target.closest('.context-menu')) {
        handleCloseContextMenu();
      }
    };

    // Agrega el manejador de eventos click al documento
    document.addEventListener('click', handleClickOutside);

    // Limpia el manejador de eventos al desmontar el componente
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);



  return (
    <div >
      <DropTarget >
        <div className="components-grids"  style={{ position: 'relative' }}>
          {components.map((component, index) => (
            <DraggableItem
              key={component.id}
              id={component.id}
              index={index}
              moveItem={moveItem}
              columnSize={component.columnSize}
            >
              <div onContextMenu={(event) => handleContextMenu(event, component)}>
                
                {component.content}
              </div>
            </DraggableItem>
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









const ContextMenu = ({ x, y, onClose, onItemClick }) => {
  const handleItemClick = (action) => {
    onItemClick(action);
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
      <button onClick={() => handleItemClick('new')}>Crear Nuevo</button>
      <button onClick={() => handleItemClick('delete')}>Eliminar</button>
      <button onClick={() => handleItemClick('copy')}>Copiar</button>
      <button onClick={() => handleItemClick('cut')}>Cortar</button>
      <button onClick={() => handleItemClick('duplicate')}>Duplicar</button>
      <button onClick={() => handleItemClick('support')}>Analizar AI</button>
    </div>
  );
};

