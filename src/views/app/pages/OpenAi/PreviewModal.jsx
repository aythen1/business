"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useEditor } from "@tldraw/tldraw";
import { Tldraw } from "@tldraw/tldraw";
import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";

// import "@tldraw/tldraw/tldraw.css";

import {htmlExample1} from './html/example-1'

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






const PreviewModal = () => {
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
        <div className="">
          <TabButton
            active={activeTab === "preview"}
            onClick={() => {
              setActiveTab("preview");
            }}
          >
            Preview
          </TabButton>
          <TabButton
            active={activeTab === "editor"}
            onClick={() => {
              setActiveTab("editor");
            }}
          >
            Editor
          </TabButton>
          <TabButton
            active={activeTab === "code"}
            onClick={() => {
              setActiveTab("code");
            }}
          >
            Code
          </TabButton>
        </div>

        <button
          className=""
          onClick={() => {
            setHtml(null);
          }}
        >
          {/* ... El botón de cerrar */}
        </button>
      </div>

      {activeTab === "preview" ? (
        <iframe
          title="Preview"
          style={{ width: "100%", height: "100vh" }}
          srcDoc={html}
        />
      ) : activeTab === "editor" ? (
        <div style={{width: '100%', height: '100vh'}}>
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

export default PreviewModal;

function TabButton({ active, ...buttonProps }) {
  const className = active
    ? "px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-t-md focus:outline-none focus:ring"
    : "px-4 py-2 text-sm font-medium text-blue-500 bg-transparent hover:bg-blue-100 focus:bg-blue-100 rounded-t-md focus:outline-none focus:ring";
  return <button className={className} {...buttonProps}></button>;
}