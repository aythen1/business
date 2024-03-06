import React, { useEffect, useState, useRef, useCallback } from "react";


import { v4 as uuidv4 } from 'uuid';

import styles from './ModalViewComponent.module.css'



// import "@tldraw/tldraw/tldraw.css";
// import { htmlExample1 } from './html/example-1'

// import { Tldraw, useEditor } from "@tldraw/tldraw";
import { Tldraw } from "@tldraw/tldraw";
// import { useEditor } from "@tldraw/tldraw";
// import { useEditor, } from "@tldraw/tldraw";
import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";




const ModalViewComponent = ({ image }) => {

    const [elements, setElements] = useState([{
        type: 'image',
        src: image,
        x: 100,
        y: 100,
        width: 200,
        height: 150,
      }]);


    // const [initialState, setInitialState] = useState({
    //     elements: [
    //         {
    //             id: 'some-unique-id',
    //             type: 'image',
    //             src: image,
    //             x: 100,
    //             y: 100,
    //             width: 1000,
    //             height: 1000,
    //         },
    //     ],
    // });

    console.log('image', image)


    const editor = useEditor();

  const handleMount = useCallback(() => {
    const assetId = uuidv4();
    const imageWidth = 1200;
    const imageHeight = 675;

    const base64Image = 'data:image/png;base64,iVBORw0KG...'; // Tu cadena base64 real

    editor.addShape({
      type: 'image',
      x: (window.innerWidth - imageWidth) / 2,
      y: (window.innerHeight - imageHeight) / 2,
      props: {
        id: assetId,
        type: 'image',
        typeName: 'asset',
        name: 'tldraw.png',
        src: base64Image,
        w: imageWidth,
        h: imageHeight,
        mimeType: 'image/png',
        isAnimated: false,
      },
    });
  }, [editor]);

    return (
        <div className={styles.modal}>
        {/* <Tldraw
            persistenceKey="tldraw"
            elements={elements}
            style={{ height: '100%', width: '100%' }}
            onError={(error) => console.error('Error cargando la imagen:', error)}
        >
          </Tldraw> */}
          <Tldraw
        onMount={handleMount}
      />
    </div>
    )
}


export default ModalViewComponent





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

//           // console.log('resp', resp)

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