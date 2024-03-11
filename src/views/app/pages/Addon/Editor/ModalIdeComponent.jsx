import React, { useEffect, useState, useRef } from "react";

import Editor from "@monaco-editor/react";


import styles from './ModalIdeComponent.module.css'


const ModalIdeComponent = ({ hoveredElement }) => {
    const editorRef = useRef();

    console.log('hoveredElement.outerHtml', hoveredElement.outerHTML)
    const [html, setHtml] = useState(hoveredElement.outerHTML);

    useEffect(() => {
        console.log(editorRef.current);
    }, []);

    
    const handleEditorChange = (value, event) => {
        // Este handler se activará cuando cambie el contenido del editor
        console.log('value', value)
        setHtml(value);
    };

    return (
        <div className={styles.modal1}>
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
    )
}


export default ModalIdeComponent