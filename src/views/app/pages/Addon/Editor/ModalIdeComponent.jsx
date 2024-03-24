import React, { useEffect, useState, useRef } from "react";

import Editor from "@monaco-editor/react";
import styles from './ModalIdeComponent.module.css'


const ModalIdeComponent = ({ hoveredElement }) => {
    const editorRef = useRef(null);

    const [themeMode, setThemeMode] = useState(() => {
        const storedMode = localStorage.getItem('darkMode');
        if (storedMode && storedMode == 'dark') {
            return 'vs-dark'
        }
        return 'vs-light'
    });

    // console.log('hoveredElement.outerHtml', hoveredElement.outerHTML)
    const [html, setHtml] = useState(identationCodes(hoveredElement.outerHTML));

    // useEffect(() => {
    //     console.log(editorRef.current);
    // }, []);

    // const [value, setValue] = useState('<h1>Hello, World!</h1>')
    // const [value, setValue] = useState(code || "");

    const handleEditorChange = (value) => {
        setHtml(value);
    };


    // ---------------------------------------------------
    const handleGlobalKeyDown = (e) => {
        if (e.altKey) {
          switch (e.key) {
            case 'a':
                alert('Se ha presionado Alt + A');
                handleCopy();
              break;
            case 'd':
              alert('Se ha presionado Alt + D');
              break;
            case 'e':
              alert('Se ha presionado Alt + E');
              break;
            case 'c':
                alert(1)
              handleCopy();
              break;
            case 'x':
              handleCut();
              break;
            case 'v':
              handlePaste();
              break;
            case 'z':
              handleUndo();
              break;
            default:
              break;
          }
        }
      };

    const getMonacoEditor = () => {
        if (editorRef.current) {
          return editorRef.current
        }
        return null;
      };
    
      // Función para manejar la acción de copiar
      const handleCopy = () => {
        const editor = getMonacoEditor();
        if (editor) {
          const selection = editor.getSelection();
          const selectedText = editor.getModel().getValueInRange(selection);
          navigator.clipboard.writeText(selectedText);
        }
      };
    
      // Función para manejar la acción de cortar
      const handleCut = () => {
        const editor = getMonacoEditor();
        if (editor) {
          const selection = editor.getSelection();
          const selectedText = editor.getModel().getValueInRange(selection);
          navigator.clipboard.writeText(selectedText);
          editor.executeEdits('my-source', [{ range: selection, text: '' }]);
        }
      };
    
      // Función para manejar la acción de pegar
      const handlePaste = async () => {
        const editor = getMonacoEditor();
        if (editor) {
          const text = await navigator.clipboard.readText();
          const position = editor.getPosition();
          editor.executeEdits('my-source', [{ range: new window.monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column), text }]);
        }
      };
    
      // Función para manejar la acción de deshacer
      const handleUndo = () => {
        const editor = getMonacoEditor();
        if (editor) {
          editor.trigger('undo', 'editor.action.undo');
        }
      };
    

    useEffect(() => {
        // Agregar el manejador de eventos de teclado al montar el componente
        window.addEventListener('keydown', handleGlobalKeyDown);
        // Remover el manejador de eventos de teclado al desmontar el componente
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, []);



    return (
        <div className={styles.modal1}>
            <Editor
                // ref={editorRef}
                onMount={(editor) => { editorRef.current = editor; }}
                height="80vh"
                defaultLanguage="html"
                defaultValue="// some comment"
                theme={themeMode}
                // theme="vs-light"
                value={html}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: true },
                }}
            />
        </div>
    )
}


export default ModalIdeComponent

























export const identationCodes = (code) => {
  const addIdent = (text, size) => {
    let identation = ''
    for (let i = 0; i < size; i++) {
      identation += '  '
    }
    return identation + text.trim() + '\n'
  }

  const codeLinesArray = code.split('\n')

  let newCode = ''

  const lvlArray = []

  codeLinesArray.forEach((el) => {
    const matchOpen = el.match(/<[^/>]+>|<[^/]+(?=$)/)
    const matchClose = el.match(/<\/|\/>/)

    if (matchOpen) {
      if (!/^\s*$/.test(el)) {
        lvlArray.push(el)
        newCode += addIdent(el, lvlArray.length)
      }
    }
    if (matchClose) {
      if (!/^\s*$/.test(el)) {
        newCode += addIdent(el, lvlArray.length)
        lvlArray.pop()
      }
    }
    if (!matchClose && !matchOpen) {
      if (!/^\s*$/.test(el)) {
        newCode += addIdent(el, lvlArray.length)
      }
    }
  })

  return newCode
}
