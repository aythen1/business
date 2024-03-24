import React, { } from "react";

import styles from './Info.module.css'


import IconExcel from '../assets/icon-excel.svg'
import IconWord from '../assets/icon-word.svg'
import IconOther from '../assets/icon-other.svg'

export default ({ data, setFilter }) => {
    const handleClickData = () => {
        setFilter('data')
    }

    const handleClickSchema = () => {
        setFilter('schema')
    }
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>
                        Ajustes del vector
                    </h2>
                </div>
                <div className={styles.banner}>
                    <p>
                        Edita tu configuración del vector con el tipo de dato
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
                        Quién puede acceder al vector:
                    </b>
                    <div className={styles.input}>
                        <input
                            type="checkbox"
                        />
                        <span>
                            Acceso público
                        </span>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="checkbox"
                        />
                        <span>
                            Acceso desde el link
                        </span>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="checkbox"
                        />
                        <span>
                            Acceso a todo el IAM
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
                        onClick={() => handleClickSchema()}
                    >
                        View Schema
                    </button>
                </div>
            </div>
        </>
    );
};
