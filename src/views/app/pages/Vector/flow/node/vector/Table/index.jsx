import React, { useState, useRef, useEffect } from "react";
import DataGridXL from "@datagridxl/datagridxl2";

import styles from './index.module.css'




export default ({ data }) => {
    const dgxlRef = useRef(null);

    const [state, setState] = useState('table')

    useEffect(() => {
        if (!dgxlRef.current.grid) {
            console.log('nenenene', data.data)
            // setTimeout(() => {
                console.log('111', data.data)
                dgxlRef.current.grid = new DataGridXL(dgxlRef.current, { data: data.data });

            // }, 2000)
        }

    }, [data.data]);


    return (
        <>
            <div className={styles.App}>
            
                    <div ref={dgxlRef} style={{height: '300px'}} />
            </div>
        </>
    );
};






