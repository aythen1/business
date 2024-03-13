import React, { } from "react";

import styles from './Info.module.css'


// import IconExcel from '../assets/icon-excel.svg'
// import IconWord from '../assets/icon-word.svg'

import IconExcel from '../../../../Settings/drive/assets/icons/XSL.svg'
import IconWord from '../../../../Settings/drive/assets/icons/DOC.svg'
import IconOther from '../assets/icon-other.svg'




export default ({ data, setFilter }) => {
    const handleClickData = () => {
        setFilter('table')
    }

    const handleClickAgent = () => {
        setFilter('agent')
    }
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>
                        Automatiza Lancedb
                    </h2>
                </div>
                <div className={styles.banner}>
                    <p>
                        Si es otro multimedia puedes hacerlo visible a todo el mundo
                    </p>
                    <div className={styles.buttons}>
                        <button>
                            <img src={IconExcel} />
                            Excel
                        </button>
                        <button className={styles.desactive}>
                            <img src={IconWord} />
                            Word
                        </button>
                        <button className={styles.desactive}>
                            <img src={IconOther} />
                            Other
                        </button>
                    </div>
                </div>
                <div className={styles.form}>
                    <b>
                        Quién tiene acceso a este dato
                    </b>
                    <div className={styles.input}>
                        <input
                            type="checkbox"
                        />
                        <span>
                            Datos a todo el mudno
                        </span>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="checkbox"
                        />
                        <span>

                            Datos desde gpt
                        </span>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="checkbox"
                        />
                        <span>

                            Datos con llave a esa persona
                        </span>
                    </div>
                </div>
                <div className={styles.divButton}>
                    <button
                        onClick={() => handleClickData()}
                    >
                        Ir a Datos
                    </button>
                    <button
                        className={styles.bot}
                        onClick={() => handleClickAgent()}
                    >
                        Crear Agente
                    </button>
                </div>
            </div>
        </>
    );
};
