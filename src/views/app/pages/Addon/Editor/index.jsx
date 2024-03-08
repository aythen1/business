
import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { useHotkeys } from 'react-hotkeys-hook';



import {
  setModal
} from '@/slices/iamSlice'


import ModalToken from '../../OpenAi/ModalToken'

import ModalKeysActions from './ModalKeysActions'

import ModalChatComponent from './ModalChatComponent'
import ModalIdeComponent from './ModalIdeComponent'
import ModalViewComponent from './ModalViewComponent'





import domtoimage from 'dom-to-image';






import {
  keysAlt,

  addButtonsToElement,
  isLeavingToButtons,
  isAltKeyPressed,
  getSelector,

  handleRefresh,
  handleChangeTexts,
  handleChangeImages,
  handleAddForm,
  handleDeleteComponent,
  handleCopyComponent,
  handlePasteComponent,
  handleInsertComponent,
  handleDuplicateComponent,
  handleCutComponent,
  handleDataVector,
  handleColorPrimary,
  handleViewEditor,
  handlChatEditor,
  handleCodeEditor,
} from '../actions';




export const AddonEditor = ({
  component
}) => {
  const dispatch = useDispatch()
  const [html, setHtml] = useState(component.code);

  // handle -------------------------------------------------------

  const [keyFrequency, setKeyFrequency] = useState(
    keysAlt.reduce((acc, { key }) => ({ ...acc, [key]: 0 }), {})
  );


  const handleKeyClick = (key) => {
    if (key === 'alt+v') {
      setKeyFrequency((prevFrequency) => ({
        ...prevFrequency,
        [key]: prevFrequency[key] + 1,
      }));
    }

    const sortedKeys = Object.keys(keyFrequency).sort(
      (a, b) => keyFrequency[b] - keyFrequency[a]
    );
    const mostUsedKeys = sortedKeys.slice(0, 5);

    setFrequentKeys(
      keysAlt.filter(({ key }) => mostUsedKeys.includes(key)).slice(0, 5)
    );

    console.log(`Key clicked: ${key}`);
  };



  const [frequentKeys, setFrequentKeys] = useState(
    keysAlt.slice(0, 5)
  );


  // html -----------------------------------------------------------
  const [isMove, setIsMove] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseOver = (event) => {
    if (isAltKeyPressed()) {
      const newHoveredElement = document.elementFromPoint(event.clientX, event.clientY);

      console.log('handleMouseOver', newHoveredElement, !isLeavingToButtons(event.relatedTarget))
      if (newHoveredElement && !isLeavingToButtons(event.relatedTarget)) {
        document.querySelectorAll('.customButtons').forEach((buttonsDiv) => { buttonsDiv.remove() });
        document.querySelectorAll('.selectedComponent').forEach(element => element.classList.remove('selectedComponent'));

        newHoveredElement.classList.add('selectedComponent')
        setPosition({ x: event.clientX, y: event.clientY });
        setHoveredElement(newHoveredElement);
        addButtonsToElement(newHoveredElement, frequentKeys);
      }
    }
  };

  const handleMouseOut = (event) => {
    console.log('handleMouseOut', event.relatedTarget?.closest('.selectedComponent'))
    if (!isMove && hoveredElement && !event.relatedTarget?.closest('.selectedComponent') && !isLeavingToButtons(event.relatedTarget)) {
      document.querySelectorAll('.customButtons').forEach((buttonsDiv) => { buttonsDiv.remove() });
      document.querySelectorAll('.selectedComponent').forEach(element => element.classList.remove('selectedComponent'));

      setHoveredElement(null);
    }
  };




  // --------------------------------------
  const handleKeyDown = (e) => {
    e.preventDefault();

    const currentElement = document.querySelector('.selectedComponent');

    if (currentElement) {
      const parentElement = currentElement.parentElement;
      const nextElement = currentElement.nextElementSibling;
      const prevElement = currentElement.previousElementSibling;


      if (e.key === 'ArrowUp' && parentElement && parentElement !== document.body) {
        if (prevElement) {
          if (prevElement.lastElementChild) {
            prevElement.lastElementChild.appendChild(currentElement);
          } else {
            parentElement.insertBefore(currentElement, prevElement);
          }
        } else {
          const grandparentElement = parentElement.parentElement;
          grandparentElement.insertBefore(currentElement, parentElement);
        }
      } else if (e.key === 'ArrowDown' && nextElement) {
        setIsMove(true)

        if (!nextElement) {
          parentElement.parentElement.insertBefore(currentElement, parentElement.nextElementSibling);
        } else {
          if (nextElement.children.length > 0) {
            nextElement.insertBefore(currentElement, nextElement.firstElementChild);
          } else {
            parentElement.removeChild(currentElement);
            nextElement.appendChild(currentElement);

            if (!nextElement.nextElementSibling) {
              parentElement.parentElement.insertBefore(currentElement, parentElement.nextElementSibling);
            }
          }
        }
      }
    }
  };



  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);






  // -A: Refresh el componente devolviendo otro parecido pero con diferentes estilos y estructura
  useHotkeys('alt+a', async () => {
    try{
      handleKeyClick('alt+a');
      await handleRefresh(hoveredElement);
    }catch(e){
      console.log('hello world', e)
      dispatch(setModal(<ModalToken />))
    }
  });

  // -T: Cambia los textos que detecte
  useHotkeys('alt+t', () => {
    handleKeyClick('alt+t');
    handleChangeTexts(hoveredElement);
  });
  // -I: Cambia las imagenes que detecte
  useHotkeys('alt+i', () => {
    handleKeyClick('alt+i');
    handleChangeImages(hoveredElement);
  });
  // -F: Añade un formulario
  useHotkeys('alt+f', () => {
    handleKeyClick('alt+f');
    handleAddForm(hoveredElement);
  });
  // -R: Borra el componente
  useHotkeys('alt+r', () => {
    handleKeyClick('alt+r');
    handleDeleteComponent(hoveredElement);
  });
  // -C: Copia el componente
  useHotkeys('alt+c', () => {
    handleKeyClick('alt+c');
    handleCopyComponent(hoveredElement);
  });
  // -V: Pega el componente
  useHotkeys('alt+v', () => {
    handleKeyClick('alt+v');
    handlePasteComponent(hoveredElement);
  });

  // -D: Duplica el componente
  useHotkeys('alt+d', () => {
    handleKeyClick('alt+d');
    handleDuplicateComponent(hoveredElement);
  });
  // -X: Corta el componente para insertarlo en otro lado
  useHotkeys('alt+x', () => {
    handleKeyClick('alt+x');
    handleCutComponent(hoveredElement);
  });
  // -1..9: Inserta en el componente un valor del vector
  useHotkeys('alt+n', () => {
    handleKeyClick('alt+n');
    handleDataVector(hoveredElement);
  });
  // -U: Poner todo con colores primarios
  useHotkeys('alt+u', () => {
    handleKeyClick('alt+u');
    handleColorPrimary(hoveredElement);
  });
  // -A: Abre para insertar un componente (menurightcomponent)
  useHotkeys('alt+o', () => {
    handleKeyClick('alt+o');
    handleInsertComponent(dispatch);
  });
  // -Q: Abre para editar el componente en el chatbot
  useHotkeys('alt+q', async () => {
    handleKeyClick('alt+q');
    const image = await domtoimage.toPng(hoveredElement);
    await new Promise(resolve => setTimeout(resolve, 2000));

    handlChatEditor(dispatch, ModalChatComponent, image);
  });
  // -W: Abre tlweditor para pintar el componente
  useHotkeys('alt+w', async () => {
    handleKeyClick('alt+w');

    const image = await domtoimage.toPng(hoveredElement);
    await new Promise(resolve => setTimeout(resolve, 2000));

    handleViewEditor(dispatch, ModalViewComponent, image);
  });
  // E -: Abre para editar el código
  useHotkeys('alt+e', () => {
    handleKeyClick('alt+e');
    handleCodeEditor(dispatch, ModalIdeComponent, hoveredElement);
  });
  // -alt+ctrl: Abrir ajustes de addons
  useHotkeys('alt+ctrl', () => {
    handleKeyClick('alt+ctrl');
    console.log('rr', keysAlt)
    handleSettingsComponent(keysAlt, keyFrequency);
  });



  // Cambiar el cursor y agregar/quitar la clase en el body según el estado de la tecla Alt
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Alt') {
        document.body.classList.add('pressAlt');
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Alt') {
        document.body.classList.remove('pressAlt');
      }
    };

    // Agregar listeners para eventos keydown y keyup
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Limpiar al desmontar el componente
    return () => {
      document.body.classList.remove('pressAlt');
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // -------------------------------------------------

  const handleSettingsComponent = (keysAlt, keyFrequency) => {
    dispatch(setModal(<ModalKeysActions keysAlt={keysAlt} keyFrequency={keyFrequency} />))
  }



  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className=""
    >
      <div
        ref={containerRef}
        style={{ background: '#fff' }}
        className={`hoverable ${isHovered ? 'hovered' : ''}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        dangerouslySetInnerHTML={{ __html: html }}
      >
        {/* {isHovered && <div>Hovered Selector: {hoveredSelector}</div>} */}
      </div>
    </div>
  );
};






