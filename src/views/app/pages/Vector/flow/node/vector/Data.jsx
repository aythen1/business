import React, { useRef, useEffect, memo } from "react";
import { Handle } from "reactflow";
import DataGridXL from "@datagridxl/datagridxl2";

import styles from './Data.module.css'


export default ({ data, setFilter }) => {
    const dgxlRef = useRef(null);


    useEffect(() => {
        if (!dgxlRef.current.grid) {
            dgxlRef.current.grid = new DataGridXL(dgxlRef.current,{ data: data.data});
        }
    }, [data.data]);

    const handleClickReturn = () => {
        setFilter('info')
    }

    return (
        <>
            <div className={styles.App}>
                <button 
                    className={styles.return}
                    onClick={() => handleClickReturn()}
                >
                    Atrás
                </button>
                <div ref={dgxlRef}  />
                {/* <button onClick={() => download(dgxlRef.current)}>download as CSV</button> */}
            </div>
        </>
    );
};






