import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import styles from './InfoTable.module.css'


import LogBuckup from './LogBackup'
import LibraryModel from './LibraryModel'

import {
    setModal
} from '@/slices/iamSlice'

const InfoTable = ({ }) => {

    const dispatch = useDispatch()

    const [table, setTable] = useState({
        title: 'lorem ipsum',
        description: 'lorem ipsum',
    })



    const handleClickBackup = () => {
        dispatch(setModal(<LogBuckup />))
    }

    const handleClickLibrary = () => {
        dispatch(setModal(<LibraryModel />))
    }

    return (
        <div className={styles.modal}>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.title}>
                        <label>
                            Título
                        </label>
                        <input
                            type="text"
                            value={table.title}
                        />
                    </div>
                    <div className={styles.description}>
                        <label>
                            Description
                        </label>
                        <textarea
                            value={table.description}
                        />
                    </div>
                </div>
                <div className={styles.right}>
                    <button onClick={handleClickBackup}>
                        buckup
                    </button>
                    <button onClick={handleClickLibrary}>
                        library
                    </button>
                </div>
            </div>
            <p className={styles.text}>
                solo en una dimensión se puede generar datos pero puedes generar varios tipos de Datos
                por ejemplo [0, 1] y [0, 2] comparten dimension pero tienen la posibilidad de generar 2 tipos de
                datos.
            </p>
            <div className={styles.tableContainer}>
                <div className={styles.tables}>
                    <div className={styles.tables}>
                        {['', ''].map(() => (
                            <div className={styles.table}>
                                {['', ''].map(() => (
                                    <div className={styles.cols}>
                                        {['', ''].map(() => (
                                            <div className={styles.cell}>
                                                Celda
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <div className={styles.footer}>
                                    |---------------------|
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoTable