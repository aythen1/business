"use client";

//views\app\components\MenuRightComponent\listComponent.module.css

import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from 'react-redux'


import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";


import PageVector from './PageVector'


import {
  setModal
} from '@/slices/iamSlice'




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


  const addon = [{
    data: [],
    rpa: [],
    version: 0,
    description: ''
  }]


  const config = [{
    routes: [{
      query: 'path',
      body: 'asset'
    }]

  }]

  const value = [{

  }]
  

  return (
    <div>
      <div>
        Accesos al bot <br />
        <ul>
          <li >
            <button onClick={() => dispatch(setModal(<PageVector />))}>
              More info
            </button>
          </li>
          <li>
            <button>
              Nueva page
            </button>
          </li>
          <li>
            <button>
              Eliminar page
            </button>
          </li>
          <li>
            <button>
              Crear componente
            </button>
          </li>
        </ul>
      </div>
      
      {addon.map((vector, index) => {
        return (
          <ay
            vector={vector}
          // data={data}
          // rpa={rpa}
          // version={version}
          // description={description}
          >
      // si tiene esto lo elimina literalmente
            /* esto tambien lo pueda quitar*/
            Quiero crear un programa de que me permita crear la estructura
          </ay>
        )
      })}


      La idea es que puedas combinarlo



    </div>
  )

};





