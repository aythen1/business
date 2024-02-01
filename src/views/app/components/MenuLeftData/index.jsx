import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import Data from './Data';


import { updateComponents } from '@/slices/dashboardSlice';


const DragTypes = {
  COMPONENT: 'COMPONENT',
};

const DraggableData = ({ component, index, moveComponent }) => {
  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.COMPONENT,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: DragTypes.COMPONENT,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveComponent(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Data component={component} />
    </div>
  );
};

const MenuLeftData = ({ setRef }) => {
  const dispatch = useDispatch();
  const { components } = useSelector((state) => state.dashboard);

  const moveComponent = (fromIndex, toIndex) => {
    const updatedComponents = [...components];
    const [movedComponent] = updatedComponents.splice(fromIndex, 1);
    updatedComponents.splice(toIndex, 0, movedComponent);

    // Dispatch una acción para actualizar el estado de Redux con la nueva lista de componentes
    dispatch(updateComponents(updatedComponents));
  };

  return (
    <div className={styles.container}>
      {components.map((component, index) => (
        <DraggableData
          key={index}
          index={index}
          component={component}
          moveComponent={moveComponent}
        />
      ))}
    </div>
  );
};

export default MenuLeftData;
