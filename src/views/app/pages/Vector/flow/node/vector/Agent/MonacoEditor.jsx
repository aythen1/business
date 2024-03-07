import React, { useRef, useState, useEffect } from 'react'

import styles from './MonacoEditor.module.css'

import Editor from "@monaco-editor/react";




const MonacoEditor = ({ }) => {
    const editorRef = useRef();

    const [html, setHtml] = useState('Hello world')


    const handleEditorChange = (value, event) => {
        console.log('value', value)
        setHtml(value)
    }


    return (
        <div className={styles.editor}>
            <div>
                <Editor
                    ref={editorRef}
                    height="100vh"
                    language="html"
                    theme="vs-light"
                    value={html}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: true },
                    }}
                />
            </div>
        </div>
    )
}

export default MonacoEditor









const ModalMonacoEditor = ({ }) => {
    return (
        <div className={styles.modal}>
            <p>
                Aqui tiene que abrir el editor que todos los archivos vienen de library model

            </p>
            <p>
            Lo unico importante es que aqui se van a guardar las dimensiones

            Una dimension se guarda al darle ctrl+s o guardar
            </p>
            <p>
            #012345# esto estaria en la dimension 6 y tendria el orden de un vector

            </p>
            <span>
                Crea tu primer vector de prueba
            </span>
            <div className={styles.code}>
                <input 
                    type="text"
                />
                <input 
                    type="text"
                />
                <input 
                    type="text"
                />
                <input 
                    type="text"
                />
            </div>

        </div>
    )
}