import React, { useRef, useEffect, memo } from "react";
import { Handle } from "reactflow";
import DataGridXL from "@datagridxl/datagridxl2";

import styles from './Data.module.css'


export default ({ data, setFilter }) => {
    const dgxlRef = useRef(null);


    // useEffect(() => {
    //     if (!dgxlRef.current.grid) {
    //         dgxlRef.current.grid = new DataGridXL(dgxlRef.current,{ data: data.data});
    //     }
    // }, [data.data]);

    useEffect(() => {
        // Verifica si el componente ya ha sido inicializado y si los datos han cambiado
        if (dgxlRef.current.grid && dgxlRef.current.grid.data !== data.data) {
            // Actualiza los datos del DataGridXL
            dgxlRef.current.grid.setData(data.data);
        } else {
            // Si no ha sido inicializado, o si los datos son los mismos, inicializa o reinstancia el DataGridXL
            dgxlRef.current.grid = new DataGridXL(dgxlRef.current, { data: data.data });
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
            </div>
        </>
    );
};






