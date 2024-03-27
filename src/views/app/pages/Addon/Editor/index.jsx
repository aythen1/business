
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
// import ModalBlockElements from './ModalBlockElements'





import domtoimage from 'dom-to-image';


import styles from './index.module.css'



import ModalElementHref from './ModalElementHref'
import ModalElementText from './ModalElementText'
import ModalElementColor from './ModalElementColor'
import ModalElementImage from './ModalElementImage'

import {
  dataAlt,
  keysAlt,

  addSectionsToElement,
  addButtonsToElement,
  isLeavingToButtons,
  isAltKeyPressed,
  getSelector,

  handleRefresh,
  handleChangeTexts,
  handleChangeImages,
  handleAddForm,
  handleDeleteComponent,
  // handleOpenBlock,
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







export const AddonEditor = ({
  addonId,
  template,
  setTemplate
}) => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const [html, setHtml] = useState(null);

  // html -----------------------------------------------------------
  const [isMove, setIsMove] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);


  useEffect(() => {
    console.log('c=C=C=C=', template)
    if (template.content) {
      setHtml(template.content)


      // //
      // setTimeout(() => {
      //   // console.log('teeee', template)
      //   containerRef.current.scrollTop = template.offset - 350
      //   // containerRef.current.classList.remove('loading')
      //   containerRef.current.classList.remove(styles.loading);

      // }, 100)

    }
  }, [template])

  useEffect(() => {
    if (html) {
      const targetElement = document.querySelector(`.customSection[tab-section="${template.index}"]`);
      console.log('target element', targetElement)
      // Verificar si se encontró el elemento
      if (targetElement) {
        // Calcular la posición vertical del elemento con respecto al viewport
        const offsetTop = targetElement.offsetTop;
        console.log('top', offsetTop)
        containerRef.current.scrollTop = offsetTop
        containerRef.current.classList.remove(styles.loading);
        // Desplazarse hasta la posición del elemento
        // window.scrollTo({
        //   top: offsetTop,
        //   behavior: 'smooth' // Desplazamiento suave
        // });
      }
    }
  }, [html])

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


  // ----------------------------------------------------------------

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
      let parentElement = currentElement.parentElement;
      const nextElement = currentElement.nextElementSibling;
      const prevElement = currentElement.previousElementSibling;

      if (e.key === 'ArrowLeft') {

      } else if (e.key === 'ArrowRight') {

      } else if (e.key === 'ArrowUp' && parentElement && parentElement !== document.body) {
        console.log('prevElement', prevElement)
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
      } else if (e.key === 'ArrowDown') {
        setIsMove(true);

        let nextSiblingElement = currentElement.nextElementSibling;
        let parentElement = currentElement.parentElement;

        // Verificar si hay un siguiente hermano
        while (!nextSiblingElement && parentElement && parentElement !== document.body) {
          // Si no hay un siguiente hermano y todavía hay un elemento padre, ascendemos un nivel
          parentElement = parentElement.parentElement;
          nextSiblingElement = parentElement.nextElementSibling;
        }

        if (nextSiblingElement) {
          // Si encontramos un siguiente hermano, movemos el elemento actual al principio de ese contenedor
          nextSiblingElement.insertBefore(currentElement, nextSiblingElement.firstElementChild);
        }
      }
    }
  };


  // const handleKeyDown = (e) => {
  //   e.preventDefault();
  //   console.log('eee')

  //   const currentElement = document.querySelector('.selectedComponent');

  //   if (currentElement) {
  //     const parentElement = currentElement.parentElement;
  //     const nextElement = currentElement.nextElementSibling;
  //     const prevElement = currentElement.previousElementSibling;


  //     if (e.key === 'ArrowUp' && parentElement && parentElement !== document.body) {
  //       if (prevElement) {
  //         if (prevElement.lastElementChild) {
  //           prevElement.lastElementChild.appendChild(currentElement);
  //         } else {
  //           parentElement.insertBefore(currentElement, prevElement);
  //         }
  //       } else {
  //         const grandparentElement = parentElement.parentElement;
  //         grandparentElement.insertBefore(currentElement, parentElement);
  //       }
  //     } else if (e.key === 'ArrowDown' && nextElement) {
  //       setIsMove(true)

  //       if (!nextElement) {
  //         parentElement.parentElement.insertBefore(currentElement, parentElement.nextElementSibling);
  //       } else {
  //         if (nextElement.children.length > 0) {
  //           nextElement.insertBefore(currentElement, nextElement.firstElementChild);
  //         } else {
  //           parentElement.removeChild(currentElement);
  //           nextElement.appendChild(currentElement);

  //           if (!nextElement.nextElementSibling) {
  //             parentElement.parentElement.insertBefore(currentElement, parentElement.nextElementSibling);
  //           }
  //         }
  //       }
  //     }
  //   }
  // };





  // useHotkeys('esc', () => {
  //   setTemplate({})

  //   // const newUrl = `/${'es'}/app/addon/${addonId}`;
  //   // window.history.pushState({}, '', newUrl);
  // })


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
    try {
      handleKeyClick('alt+t');
      handleChangeTexts(hoveredElement);
    } catch (e) {
      
    }
  });
  // -I: Cambia las imagenes que detecte
  useHotkeys('alt+i', () => {
    try {
      handleKeyClick('alt+i');
      handleChangeImages(hoveredElement);
    } catch (e) {
      
    }
  });
  // -F: Añade un formulario
  useHotkeys('alt+f', () => {
    try {
      handleKeyClick('alt+f');
      handleAddForm(hoveredElement);
    } catch (e) {
      
    }
  });
  // -R: Borra el componente
  useHotkeys('alt+r', () => {
    try {
      handleKeyClick('alt+r');
      handleDeleteComponent(hoveredElement);
    } catch (e) {
      
    }
  });
  // -C: Copia el componente
  useHotkeys('alt+c', () => {
    try {
      handleKeyClick('alt+c');
      handleCopyComponent(hoveredElement);
    } catch (e) {
      
    }
  });
  // -B: Open blocks
  // useHotkeys('alt+b', () => {
  //   handleKeyClick('alt+b');
  //   handleOpenBlock(dispatch, ModalBlockElements)
  // });
  // -V: Pega el componente
  useHotkeys('alt+v', () => {
    try {
      handleKeyClick('alt+v');
      handlePasteComponent(hoveredElement);
    } catch (e) {
      
    }
  });

  // -D: Duplica el componente
  useHotkeys('alt+d', () => {
    try {
      handleKeyClick('alt+d');
      handleDuplicateComponent(hoveredElement);
    } catch (e) {
      
    }
  });
  // -X: Corta el componente para insertarlo en otro lado
  useHotkeys('alt+x', () => {
    try {
      handleKeyClick('alt+x');
      handleCutComponent(hoveredElement);
    } catch (e) {
      
    }
  });
  // -1..9: Inserta en el componente un valor del vector
  useHotkeys('alt+n', () => {
    try {
      handleKeyClick('alt+n');
      handleDataVector(hoveredElement);
    } catch (e) {
      
    }
  });
  // -U: Poner todo con colores primarios
  useHotkeys('alt+u', () => {
    try {
      handleKeyClick('alt+u');
      handleColorPrimary(hoveredElement);
    } catch (e) {
      
    }
  });
  // -A: Abre para insertar un componente (menurightcomponent)
  useHotkeys('alt+o', () => {
    try {
      handleKeyClick('alt+o');
      handleInsertComponent(dispatch);
    } catch (e) {
      
    }
  });
  // -A: Abre para insertar un componente (menurightcomponent)
  useHotkeys('alt+p', () => {
    // dispatch(setModal(<ModalElementHref />))
    // dispatch(setModal(<ModalElementText />))
    // dispatch(setModal(<ModalElementColor />))
    dispatch(setModal(<ModalElementImage />))

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
    handleSettingsComponent(keysAlt, keyFrequency);
  });


  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);


  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);



  // Cambiar el cursor y agregar/quitar la clase en el body según el estado de la tecla Alt
  let isAltCustomSection = false

  useEffect(() => {
    const handleKeyDownAlt = (event) => {
      if (event.key === 'Alt') {
        if (!isAltCustomSection) {
          isAltCustomSection = true
          console.log('add alt')
          const sections = document.querySelectorAll('.customSection')

          console.log('sections', sections)
          addSectionsToElement(sections)
        }
        document.body.classList.add('pressAlt');
      }
    };

    const handleKeyUpAlt = (event) => {
      if (event.key === 'Alt') {
        console.log('delete alt')
        isAltCustomSection = false
        document.querySelectorAll('.customSections').forEach(element => element.remove());
        document.body.classList.remove('pressAlt');
      }
    };

    // Agregar listeners para eventos keydown y keyup
    document.addEventListener('keydown', handleKeyDown);

    document.addEventListener('keydown', handleKeyDownAlt);
    document.addEventListener('keyup', handleKeyUpAlt);
    // Limpiar al desmontar el componente
    return () => {
      document.body.classList.remove('pressAlt');
      document.removeEventListener('keydown', handleKeyDown);

      document.removeEventListener('keydown', handleKeyDownAlt);
      document.removeEventListener('keyup', handleKeyUpAlt);
    };
  }, []);

  // -------------------------------------------------

  const handleSettingsComponent = (keysAlt, keyFrequency) => {
    dispatch(setModal(<ModalKeysActions dataAlt={dataAlt} keysAlt={keysAlt} keyFrequency={keyFrequency} />))
  }

  // ------------------------------------------------

  const handleButtonLayer = () => {
    setTemplate({})
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
      {/* <div className={styles.buttons} style={{ top: '70px' }} >
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
      </div> */}
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
        // style={{ background: '#fff' }}
        className={`${styles.hoverable} ${styles.loading} ${isHovered ? 'hovered' : ''}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        dangerouslySetInnerHTML={{ __html: html }}
      >
        {/* {isHovered && <div>Hovered Selector: {hoveredSelector}</div>} */}
      </div>
    </div>
  );
};


























const ButtonLayer = ({ onClick }) => {

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




const ButtonInfo = ({ onClick }) => {
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



