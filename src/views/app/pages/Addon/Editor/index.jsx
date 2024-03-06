
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



// import DOMPurify from 'dompurify';


// import "@tldraw/tldraw/tldraw.css";
// import { htmlExample1 } from './html/example-1'





import { Tldraw } from "@tldraw/tldraw";
import { useEditor } from "@tldraw/tldraw";
import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";



// import IconThrow from './assets/icon-throw.svg'

// import html2canvas from 'html2canvas';
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
  // handleSettingsComponent,
} from '../actions';




export const AddonEditor = ({
  component
}) => {
  const dispatch = useDispatch()
  const [html, setHtml] = useState(component.code);
  // const [activeTab, setActiveTab] = useState("preview");





  // useEffect(() => {
  //   // Puedes agregar aquí cualquier lógica adicional que necesites al actualizar el HTML
  // }, [html, activeTab]);



  // if (!html) {
  //   return null;
  // }

  // handle -------------------------------------------------------

  const [keyFrequency, setKeyFrequency] = useState(
    keysAlt.reduce((acc, { key }) => ({ ...acc, [key]: 0 }), {})
  );


  const handleKeyClick = (key) => {
    // Verificar si la tecla clickeada es 'alt+v'
    if (key === 'alt+v') {
      // Incrementar la frecuencia solo para 'alt+v'
      setKeyFrequency((prevFrequency) => ({
        ...prevFrequency,
        [key]: prevFrequency[key] + 1,
      }));
    }

    // Obtener las 5 teclas más utilizadas
    const sortedKeys = Object.keys(keyFrequency).sort(
      (a, b) => keyFrequency[b] - keyFrequency[a]
    );
    const mostUsedKeys = sortedKeys.slice(0, 5);

    // Actualizar la lista de teclas más utilizadas
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
  // const [hoveredSelector, setHoveredSelector] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseOver = (event) => {
    if (isAltKeyPressed()) {
      // Obtener el selector del elemento actual
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
          console.log('11111');
          const grandparentElement = parentElement.parentElement;
          grandparentElement.insertBefore(currentElement, parentElement);
        }
      } else if (e.key === 'ArrowDown' && nextElement) {
        setIsMove(true)

        // Mover hacia abajo en la jerarquía del DOM
        if (!nextElement) {
          // Si no hay siguiente, colocamos el elemento después del padre
          parentElement.parentElement.insertBefore(currentElement, parentElement.nextElementSibling);
        } else {
          // Si hay un siguiente elemento
          if (nextElement.children.length > 0) {
            // Si el siguiente tiene hijos, el current pasa a ser el primer hijo de ese elemento
            nextElement.insertBefore(currentElement, nextElement.firstElementChild);
          } else {
            // Si el siguiente no tiene hijos
            parentElement.removeChild(currentElement);
            nextElement.appendChild(currentElement);

            // Si es el último, realiza el paso 1 (colocar después del padre)
            if (!nextElement.nextElementSibling) {
              parentElement.parentElement.insertBefore(currentElement, parentElement.nextElementSibling);
            }
          }
        }
      }
    }
  };




  // const swapElements = (el1, el2) => {
  //   const parent = el1.parentNode;
  //   const nextSibling = el1.nextSibling === el2 ? el1 : el2.nextSibling;

  //   el2.parentNode.insertBefore(el1, el2);
  //   parent.insertBefore(el2, nextSibling);
  // };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);





  const [altPressed, setAltPressed] = useState(false);


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



  // // Manejar el cambio en el estado de la tecla Alt
  // useHotkeys('alt', () => setAltPressed(true), { keydown: true }, [altPressed]);
  // useHotkeys('alt', () => setAltPressed(false), { keyup: true }, [altPressed]);


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











// const ComponentCustom = ({ }) => {
//   return (
//     <div>
//       {activeTab === "preview" ? (
//         <div>

//         </div>
//       ) : activeTab === "editor" ? (
//         <div style={{ width: '100%', height: '100vh' }}>
//           <Tldraw
//             persistenceKey="tldraw">
//             <ExportButton setHtml={setHtml} />
//           </Tldraw>
//         </div>
//       ) : (
//         <Editor
//           height="100vh"
//           language="html"
//           theme="vs-dark"
//           value={html}
//           onChange={handleEditorChange}
//           options={{
//             readOnly: false,
//             minimap: { enabled: false },
//           }}
//         />
//       )}
//     </div>
//   )
// }







































// const ExportButton = ({ setHtml }) => {
//   // const editor = useEditor();
//   const [loading, setLoading] = useState(false);
//   // A tailwind styled button that is pinned to the bottom right of the screen
//   return (
//     <button
//       onClick={async (e) => {
//         setLoading(true);
//         try {
//           e.preventDefault();
//           const svg = []
//           // const svg = await editor.getSvg(
//           //   Array.from(editor.currentPageShapeIds)
//           // );
//           if (!svg) {
//             return;
//           }
//           const png = await getSvgAsImage(svg, {
//             type: "png",
//             quality: 1,
//             scale: 1,
//           });
//           const dataUrl = await blobToBase64(png);
//           const resp = await fetch("https://business.ay-cloud.com/service/v1/openai/test", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ image: dataUrl }),
//           })


//           const json = await resp.json();

//           // console.log('json', json.choices[0].message.content)

//           if (json.error) {
//             // console.log("Error from open ai: " + JSON.stringify(json.error));
//             return;
//           }


//           var html = obtainContent(json[0])
//           console.log('html: ', html)
//           // console.log('result', data)

//           // const message = json.choices[0].message.content;
//           // const start = message.indexOf("<!DOCTYPE html>");
//           // const end = message.indexOf("</html>");
//           // const html = message.slice(start, end + "</html>".length);
//           setHtml(html);
//         } finally {
//           setLoading(false);
//         }
//       }}
//       className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ="
//       style={{ zIndex: 1000, position: 'relative' }}
//     >
//       {loading ? (
//         <div className="flex justify-center items-center ">
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//         </div>
//       ) : (
//         "Make Real"
//       )}
//     </button>
//   );
// }








