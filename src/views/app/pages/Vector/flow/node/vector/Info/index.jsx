import React, { } from "react";

import styles from './index.module.css'


// import IconExcel from '../assets/icon-excel.svg'
// import IconWord from '../assets/icon-word.svg'

import IconExcel from '../../../../../Settings/drive/assets/icons/XSL'
import IconWord from '../../../../../Settings/drive/assets/icons/DOC'
import IconOther from '../../assets/icon-other.svg'




export default ({ data, setFilter }) => {
    const handleBackup = () => {
        setFilter('backup')
    }

    const handleUpload = () => {
        setFilter('upload')
    }
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.banner}>
                    <p>
                        Si es otro multimedia puedes hacerlo visible a todo el mundo
                    </p>
                    <div className={styles.buttons}>
                        <button>
                            {/* <img src={IconExcel} /> */}
                            <IconExcel />
                            Excel
                        </button>
                        <button className={styles.desactive}>
                            {/* <img src={IconWord} /> */}
                            <IconWord />
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
                    <div className={styles["checkbox-container"]}>
                        <input
                            type="checkbox"
                            className={styles['checkbox-remember']}
                        />
                        <div className={styles["remember-me"]} >
                        Datos a todo el mudno
                        </div>
                    </div>
                    <div className={styles["checkbox-container"]}>
                        <input
                            type="checkbox"
                            className={styles['checkbox-remember']}
                        />
                        <div className={styles["remember-me"]} >
                        Datos desde gpt
                        </div>
                    </div>
                </div>
                <div className={styles.divButton}>
                    <button
                        onClick={() => handleBackup()}
                    >
                        Backup
                    </button>
                    <button
                        className={styles.bot}
                        onClick={() => handleUpload()}
                    >
                        Uplaod
                    </button>
                </div>
            </div>
        </>
    );
};
