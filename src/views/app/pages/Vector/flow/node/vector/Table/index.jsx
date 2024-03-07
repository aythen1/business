import React, { useState, useRef, useEffect } from "react";
import DataGridXL from "@datagridxl/datagridxl2";

import styles from './index.module.css'



import Upload from './Upload'

export default ({ data, setFilter }) => {
    const dgxlRef = useRef(null);

    const [state, setState] = useState('table')

    useEffect(() => {
        if (!dgxlRef.current.grid) {
            dgxlRef.current.grid = new DataGridXL(dgxlRef.current,{ data: data.data});
        }
    }, [data.data]);

    const handleClickReturn = () => {
        setFilter('info')
    }


    const handleClickUpload = () => {
        setState('upload')
    }

    return (
        <>
            <div className={styles.App}>
                <div className={styles.buttons}>
                <button 
                    className={styles.return}
                    onClick={() => handleClickReturn()}
                >
                    Atrás
                </button>
                <button 
                    className={styles.upload}
                    onClick={() => handleClickUpload()}
                >
                    Subir
                </button>
                </div>
                {state == 'table' ? (
                    <div ref={dgxlRef}  />
                ) : (
                    <Upload />
                )}
            </div>
        </>
    );
};






