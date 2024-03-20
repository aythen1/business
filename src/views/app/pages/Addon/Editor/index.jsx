
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
  dataAlt,
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
// import Template from "../Flow/node/Template";


import styles from './index.module.css'

export const AddonEditor = ({
  addonId,
  template,
  setTemplate
}) => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const [html, setHtml] = useState(null);


  useEffect(() => {
    console.log('c=C=C=C=', template)
    if (template.content) {
      setHtml(template.content)
    }
  }, [template])

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




  useHotkeys('esc', () => {
    console.log('1i3uhfu4ufhu4fu4', addonId)
    setTemplate({})
    // navigate(`/${'es'}/app/addon/${addonId}`)

    const newUrl = `/${'es'}/app/addon/${addonId}`;
    window.history.pushState({}, '', newUrl);
  })

  // -A: Refresh el componente devolviendo otro parecido pero con diferentes estilos y estructura
  useHotkeys('alt+a', async () => {
    try {
      handleKeyClick('alt+a');
      await handleRefresh(hoveredElement);
    } catch (e) {
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
    if (hoveredElement) {
      const componentsToRemove = hoveredElement.querySelectorAll('.customButtons');
      componentsToRemove.forEach((component) => component.remove());

      const image = await domtoimage.toPng(hoveredElement);
      await new Promise(resolve => setTimeout(resolve, 2000));


      handlChatEditor(dispatch, ModalChatComponent, image);
    }
  });
  // -W: Abre tlweditor para pintar el componente
  useHotkeys('alt+w', async () => {
    handleKeyClick('alt+w');

    if (hoveredElement) {
      const componentsToRemove = hoveredElement.querySelectorAll('.customButtons');
      componentsToRemove.forEach((component) => component.remove());

      const image = await domtoimage.toPng(hoveredElement);
      await new Promise(resolve => setTimeout(resolve, 2000));


      handleViewEditor(dispatch, ModalViewComponent, image);
    }

  });
  // E -: Abre para editar el código
  useHotkeys('alt+e', () => {
    handleKeyClick('alt+e');
    if (hoveredElement) {
      const componentsToRemove = hoveredElement.querySelectorAll('.customButtons');
      componentsToRemove.forEach((component) => component.remove());

      handleCodeEditor(dispatch, ModalIdeComponent, hoveredElement);
    }
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
    dispatch(setModal(<ModalKeysActions dataAlt={dataAlt} keysAlt={keysAlt} keyFrequency={keyFrequency} />))
  }

  // ------------------------------------------------

  const handleButtonLayer = () => {
    setTemplate({})

    const newUrl = `/${'es'}/app/addon/${addonId}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleButtonInfo = () => {
    console.log('info')
    handleSettingsComponent(keysAlt, keyFrequency);
    // setTemplate({})
    // // navigate(`/${'es'}/app/addon/${addonId}`)

    // const newUrl = `/${'es'}/app/addon/${addonId}`;
    // window.history.pushState({}, '', newUrl);
  };



  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className=""
    >
      <div className={styles.buttons} style={{ top: '70px' }} >
        <button >
          <ButtonLeft />
        </button>
        <button >
          <ButtonRight />
        </button>
        <button style={{ marginLeft: 'auto' }}>
          <ButtonTop />
        </button>
        <button>
          <ButtonBottom />
        </button>
      </div>
      <div className={styles.buttons} style={{ bottom: '22px' }}>
        <button>
          <ButtonLayer onClick={handleButtonLayer} />
        </button>
        <button style={{ marginLeft: 'auto' }}>
          <ButtonInfo onClick={handleButtonInfo} />
        </button>
      </div>
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









const ButtonLayer = ({onClick}) => {
 
  return (
    <div
      className={styles.button}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.005 11.19V12l6.998 4.042L19 12v-.81M5 16.15v.81L11.997 21l6.998-4.042v-.81M12.003 3 5.005 7.042l6.998 4.042L19 7.042 12.003 3Z" />
      </svg>

      <span>
        Layer
      </span>
    </div>
  )
}




const ButtonInfo = ({onClick}) => {
  return (
    <div
      className={styles.button}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span>
        Info
      </span>
    </div>
  )
}



const ButtonBottom = () => {
  const handleButtonLeft = () => {
    console.log('1234')
  };

  return (
    <div
      className={styles.button}
      onClick={handleButtonLeft}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
      </svg>



      <span>
        bottom
      </span>
    </div>
  )
}



const ButtonTop = () => {
  const handleButtonLeft = () => {
    console.log('1234')
  };

  return (
    <div
      className={styles.button}
      onClick={handleButtonLeft}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
      </svg>


      <span>
        top
      </span>
    </div>
  )
}




const ButtonRight = () => {
  const handleButtonLeft = () => {
    console.log('1234')
  };

  return (
    <div
      className={styles.button}
      onClick={handleButtonLeft}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
      </svg>

      <span>
        right
      </span>
    </div>
  )
}



const ButtonLeft = () => {
  const handleButtonLeft = () => {
    console.log('1234')
  };

  return (
    <div
      className={styles.button}
      onClick={handleButtonLeft}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
      </svg>

      <span>
        left
      </span>
    </div>
  )
}

