import React, { useState, useEffect, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import Data from './Data';
import { v4 as uuidv4 } from 'uuid';



import { 
  initialComponent,
  deleteComponent,
  addComponent,
  setComponents 
} from '@/slices/dashboardSlice';

import IconTrash from './assets/IconTrash.svg'



const DragTypes = {
  COMPONENT: 'COMPONENT',
};

const DraggableData = ({ component, index, moveComponent, handleSelectedChange }) => {
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
      <Data component={component} onSelectedChange={handleSelectedChange} />
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
    dispatch(setComponents(updatedComponents));
  };

  // ------
  const [selectedItemsAll, setSelectedItemsAll] = useState([]);

  const handleSelectedChange = (selectedComponent) => {

    console.log('selectedComponentselectedComponentselectedComponent', selectedComponent)
    setSelectedItemsAll((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some((item) => item.id === selectedComponent.id);

      if (isSelected) {
        // Deseleccionar: Filtrar el componente de la lista
        return prevSelectedItems.filter((item) => item.id !== selectedComponent.id);
      } else {
        // Seleccionar: Agregar el componente a la lista
        return [...prevSelectedItems, selectedComponent];
      }
    });


    console.log('sssssss', selectedItemsAll)
  };

  const handleDeleteSelected = () => {
    // Lógica para eliminar los elementos seleccionados
    console.log('Eliminar elementos seleccionados:', selectedItemsAll);

    dispatch(deleteComponent(selectedItemsAll))
  };


  const handleAddGraph = () => {
    let updatedGraph = JSON.parse(JSON.stringify(initialComponent))
    updatedGraph.id = uuidv4()
    dispatch(addComponent(updatedGraph))
  }


  // ------------------------------------------------------------

  const handleCopySelected = useCallback(() => {
    console.log('selectedItemsAll', selectedItemsAll)
    const selectedItemsJson = JSON.stringify(selectedItemsAll);
    navigator.clipboard.writeText(selectedItemsJson);
  }, [selectedItemsAll]);

  const handlePasteSelected = useCallback(async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      const parsedData = JSON.parse(clipboardData);

      console.log('cxscwev', parsedData)
      if (Array.isArray(parsedData)) {
        parsedData.forEach((item) => dispatch(addComponent(item)));
      }
    } catch (error) {
      console.error('Error al pegar desde el portapapeles:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    const handleCopyEvent = (event) => {
      if (event.ctrlKey && event.key === 'c') {
        handleCopySelected();
      }
    };

    const handlePasteEvent = (event) => {
      if (event.ctrlKey && event.key === 'v') {
        handlePasteSelected();
      }
    };

    document.addEventListener('keydown', handleCopyEvent);
    document.addEventListener('keydown', handlePasteEvent);

    return () => {
      document.removeEventListener('keydown', handleCopyEvent);
      document.removeEventListener('keydown', handlePasteEvent);
    };
  }, [handleCopySelected, handlePasteSelected]);



  return (
    <div className={styles.container}>
      {selectedItemsAll.length > 0 ? (
        <div className={styles.search}>
          <div>
            <b>
              ({selectedItemsAll.length})
            </b>
            Boards seleccionados
          </div>

          <button onClick={() => handleDeleteSelected()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 21 21" version="1.1" fill="red"> <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="fillCurrent"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"></path> </g> </g> </g> </svg>
          </button>
        </div>
      ) : (
        <div className={styles.button}>
          <button
            onClick={() => handleAddGraph()}
          >
            Nuevo Grafico
          </button>
        </div>
      )}
      {components.map((component, index) => (
        <div>
          {JSON.stringify(component)}
          <DraggableData
            key={index}
            index={index}
            component={component}
            moveComponent={moveComponent}
            handleSelectedChange={handleSelectedChange}
          />
        </div>
      ))}
    </div>
  );
};

export default MenuLeftData;
