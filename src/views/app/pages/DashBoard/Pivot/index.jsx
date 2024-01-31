// DragAndDrop.js
import React, {useState, useEffect} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import styles  from './index.module.css';
import Component  from './component';

import { 
  addDashboard 
} from '@/actions/dashboard';




const DraggableItem = ({ id, index, moveItem, children, columnSize }) => {
  const [isDropping, setIsDropping] = useState (false)
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
      console.log('itt', item)

      if(!isDropping){
        setIsDropping(true)
        dispatch(addComponent(item))
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

const Dashboard = ({ }) => {

  const [items, setItems] = useState([]);
  const { components } = useSelector((state) => state.dashboard)


  useEffect(() => {
    // Cuando components cambia, actualiza el estado items
    const newItems = components.map((component, index) => {
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
    setItems(newItems);
  }, [components]);




  const handleClickGraph = () => {
    setOpenMenuRight('new')
    setOpenChatBot(true)
  }


  

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
  };



  return (
      <DropTarget >
        <div className="components-grids">
          {items.map((item, index) => (
            
            <DraggableItem
              key={item.id}
              id={item.id}
              index={index}
              moveItem={moveItem}
              columnSize={item.columnSize}
            >
              {item.content}
            </DraggableItem>
          ))}
        </div>
      </DropTarget>
  );
};

export default Dashboard;
