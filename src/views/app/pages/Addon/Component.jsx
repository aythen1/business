"use client";

//views\app\components\MenuRightComponent\listComponent.module.css

import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from 'react-redux'

import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';

import Editor from "@monaco-editor/react";
import { useEditor } from "@tldraw/tldraw";
import { Tldraw } from "@tldraw/tldraw";
import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";


import{
  setOpenMenuRight,
  setOpenChatBot
} from '@/actions/iam'



import IconCopy from './assets/copy.png'
import IconDelete from './assets/delete.png'
import IconMove from './assets/move.png'
import IconCode from './assets/code.png'
import IconView from './assets/view.png'
import IconGPT from './assets/gpt.png'


// import DOMPurify from 'dompurify';


// import "@tldraw/tldraw/tldraw.css";

import { htmlExample1 } from './html/example-1'

function obtainContent(texto, type = 'html') {
  const regexString = '```' + type + '\\s*([\\s\\S]*?)```';
  const regex = new RegExp(regexString);
  const coincidencia = texto.match(regex);

  if (coincidencia && coincidencia[1]) {
    return coincidencia[1].trim();
  } else {
    return null;
  }
}



const ExportButton = ({ setHtml }) => {
  // const editor = useEditor();
  const [loading, setLoading] = useState(false);
  // A tailwind styled button that is pinned to the bottom right of the screen
  return (
    <button
      onClick={async (e) => {
        setLoading(true);
        try {
          e.preventDefault();
          const svg = []
          // const svg = await editor.getSvg(
          //   Array.from(editor.currentPageShapeIds)
          // );
          if (!svg) {
            return;
          }
          const png = await getSvgAsImage(svg, {
            type: "png",
            quality: 1,
            scale: 1,
          });
          const dataUrl = await blobToBase64(png);
          const resp = await fetch("https://business.ay-cloud.com/service/v1/openai/test", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: dataUrl }),
          })

          // console.log('resp', resp)

          const json = await resp.json();

          // console.log('json', json.choices[0].message.content)

          if (json.error) {
            // console.log("Error from open ai: " + JSON.stringify(json.error));
            return;
          }


          var html = obtainContent(json[0])
          console.log('html: ', html)
          // console.log('result', data)

          // const message = json.choices[0].message.content;
          // const start = message.indexOf("<!DOCTYPE html>");
          // const end = message.indexOf("</html>");
          // const html = message.slice(start, end + "</html>".length);
          setHtml(html);
        } finally {
          setLoading(false);
        }
      }}
      className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ="
      style={{ zIndex: 1000, position: 'relative' }}
    >
      {loading ? (
        <div className="flex justify-center items-center ">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        </div>
      ) : (
        "Make Real"
      )}
    </button>
  );
}






export const AddonEditor = ({
 
}) => {
  const dispatch = useDispatch()

  const [html, setHtml] = useState(htmlExample1);

  const [activeTab, setActiveTab] = useState("preview");



  const handleEditorChange = (value, event) => {
    // Este handler se activará cuando cambie el contenido del editor
    setHtml(value);
  };

  useEffect(() => {
    // Puedes agregar aquí cualquier lógica adicional que necesites al actualizar el HTML
  }, [html, activeTab]);



  if (!html) {
    return null;
  }

  // handle -------------------------------------------------------

  const handleComponentCopy = () => {
    if (hoveredElement) {
      const el = hoveredElement;
      const outerHtml = el.outerHTML;

      // Crear un elemento de texto temporal para copiar al portapapeles
      const tempElement = document.createElement('textarea');
      tempElement.value = outerHtml;
      document.body.appendChild(tempElement);

      // Seleccionar y copiar al portapapeles
      tempElement.select();
      document.execCommand('copy');

      // Eliminar el elemento temporal
      document.body.removeChild(tempElement);
    }
  }

  const handleComponentDelete = () => {
    if (hoveredElement) {
      hoveredElement.remove();
    }
  }

  const handleComponentGPT = () => {
    dispatch(setOpenChatBot(true))
  }

  const handleComponentMove = () => {
    alert(1)
  }

  const handleComponentCode = () => {

  }

  const handleComponentView = async () => {
    if (hoveredElement) {
      alert(1)
      const canvas = await html2canvas(hoveredElement);

      // Convertir el canvas a una imagen
      const image = canvas.toDataURL('image/png');

      // Crear un enlace para descargar la imagen
      const downloadLink = document.createElement('a');
      downloadLink.href = image;
      downloadLink.download = 'captura.png'; // Puedes cambiar el nombre del archivo según tus necesidades

      // Simular un clic en el enlace para iniciar la descarga
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }
  // html -----------------------------------------------------------
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [hoveredSelector, setHoveredSelector] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseOver = (event) => {
    if (isAltKeyPressed()) {
      setIsHovered(true);
      // Obtener el selector del elemento actual
      const newHoveredElement = document.elementFromPoint(event.clientX, event.clientY);

      if (newHoveredElement) {
        setHoveredElement(newHoveredElement);
        setHoveredSelector(getSelector(newHoveredElement));

        // Obtener la posición del cursor
        setPosition({ x: event.clientX, y: event.clientY });

        // Agregar className al elemento más profundo
        newHoveredElement.classList.add('selectedComponent'); // Reemplaza 'tuClassName' con el nombre que desees

        // Agregar div con botones al elemento más profundo
        addButtonsToElement(newHoveredElement);
      }
    }
  };

  const handleMouseOut = (event) => {
    setIsHovered(false);
    setHoveredSelector('');

    const isLeavingToButtons = (
      event.relatedTarget &&
      event.relatedTarget.classList.contains('customButtons')
    );

    // Restablecer className y quitar div con botones solo si no estás saliendo hacia los botones
    if (hoveredElement && !isLeavingToButtons) {
      hoveredElement.classList.remove('selectedComponent');
      removeButtonsFromElement(hoveredElement);
    }

    // Limpiar la referencia al elemento
    setHoveredElement(null);
  };

  const isAltKeyPressed = () => {
    return window.event ? window.event.altKey : false;
  };

  const getSelector = (element) => {
    const selectors = [];
    let targetElement = element;

    const collectSelectors = (el) => {
      const id = el.id;
      if (id) {
        selectors.push(`#${id}`);
      }

      const classNames = Array.from(el.classList).join('.');
      if (classNames) {
        selectors.push(`.${classNames}`);
      }
    };

    collectSelectors(element);

    const selector = selectors.join(' ');

    return selector;
  };

  const addButtonsToElement = (element) => {

    // Definir el componente CustomButtons localmente
    const CustomButtons = () => {
      return (
        <div className="customButtons">
          <div>
            <button onClick={() => handleComponentGPT()}>
              <img src={IconGPT} />
            </button>
            <button onClick={() => handleComponentCode()}>
              <img src={IconCode} />
            </button>
            {/* <button onClick={() => handleComponentMove()}>
            <img src={IconMove} />
          </button> */}
          </div>
          <div>
            <button onClick={() => handleComponentView()}>
              <img src={IconView} />
            </button>
            <button onClick={() => handleComponentCopy()}>
              <img src={IconCopy} />
            </button>
            <button onClick={() => handleComponentDelete()}>
              <img src={IconDelete} />
            </button>
          </div>
        </div>
      );
    };

    // Crear el div con botones
    const buttonsDiv = document.createElement('div');

    // Montar el componente CustomButtons en el div
    ReactDOM.render(<CustomButtons />, buttonsDiv);

    // Añadir el div al elemento más profundo
    element.appendChild(buttonsDiv);
  };




  const removeButtonsFromElement = (element) => {
    // Eliminar el div con botones si existe
    const buttonsDiv = element.querySelector('.customButtons');
    if (buttonsDiv) {
      buttonsDiv.remove();
    }
  };




  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className=""
      style={{
        width: "calc(100% - 64px)",
        height: "calc(100% - 64px)",
      }}
    >
      <div className="">
   

        <button
          className=""
          onClick={() => {
            setHtml(null);
          }}
        >
          cerrar
          {/* ... El botón de cerrar */}
        </button>
      </div>
      {/* <iframe
        title="Preview"
        style={{ width: "100%", height: "100vh" }}
        srcDoc={html}
      /> */}

      {activeTab === "preview" ? (
        <div>
          <div
            ref={containerRef}
            className={`hoverable ${isHovered ? 'hovered' : ''}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            dangerouslySetInnerHTML={{ __html: html }}
          >
            {/* {isHovered && <div>Hovered Selector: {hoveredSelector}</div>} */}
          </div>
          {isHovered && hoveredSelector && (
            <div>
              Hovered Selector: {hoveredSelector}
            </div>
          )}
        </div>
      ) : activeTab === "editor" ? (
        <div style={{ width: '100%', height: '100vh' }}>
          <Tldraw
            persistenceKey="tldraw">
            <ExportButton setHtml={setHtml} />
          </Tldraw>
        </div>
      ) : (
        <Editor
          height="100vh"
          language="html"
          theme="vs-dark"
          value={html}
          onChange={handleEditorChange}
          options={{
            readOnly: false,
            minimap: { enabled: false },
          }}
        />
      )}
    </div>
  );
};




