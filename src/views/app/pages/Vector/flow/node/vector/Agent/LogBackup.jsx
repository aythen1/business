import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './LogBackup.module.css'


import {
    deleteBackupVector,
    addBackupVector
} from '@/actions/vector'


const LogBackup = ({ }) => {

    const dispatch = useDispatch()

    const handleDeleteBackup = () => {
        dispatch(deleteBackupVector({ }))
    }
    
    const handleAddBackup = () => {
        dispatch(addBackupVector({ }))

    }

    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h3>
                    Backup Vector
                </h3>
                <p>
                    Activar para hacer una copia de dato teniendo en cuenta toda la dimension del archivo.
                </p>
            </div>
            <div className={styles.type}>
                <div className={styles["checkbox-container"]}>
                    <input
                        type="checkbox"
                        className={styles['checkbox-remember']}
                    // checked={isChecked}
                    // onChange={handleCheckboxChange}
                    />
                    <div className={styles["remember-me"]} >
                        Enviar cada día
                    </div>
                </div>
                <div className={styles["checkbox-container"]}>
                    <input
                        type="checkbox"
                        className={styles['checkbox-remember']}
                    // checked={isChecked}
                    // onChange={handleCheckboxChange}
                    />
                    <div className={styles["remember-me"]} >
                        2 veces al mes
                    </div>
                </div>
                <div className={styles["checkbox-container"]}>
                    <input
                        type="checkbox"
                        className={styles['checkbox-remember']}
                    // checked={isChecked}
                    // onChange={handleCheckboxChange}
                    />
                    <div className={styles["remember-me"]} >
                        1 sola vez al mess
                    </div>
                </div>
            </div>
            <div className={styles.adjunt}>
                <p>
                    Se te enviara un correo con la copia, quieres que te envemos una copia a otro email como adjuntoº
                </p>
                <ul>
                    <li>
                        email1@example.com
                        <div className={styles.button}>
                            <button>
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3c0 .6-.4 1-1 1H5m11 4h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-7a1 1 0 0 0-1 1v1m4 3v10c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1v-7.1c0-.3 0-.5.2-.7l2.5-2.9c.2-.2.5-.3.8-.3H13c.6 0 1 .4 1 1Z" />
                                </svg>
                            </button>
                            <button>
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </div>
                    </li>
                    <li>
                        email2@example.com
                    </li>
                </ul>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => handleDeleteBackup()}
                >
                    Delete Backup
                </button>
                <button
                    className={styles.addBackup}
                    onClick={() => handleAddBackup()}
                >
                    Add Backup
                </button>
            </div>


        </div>
    )
}

export default LogBackup