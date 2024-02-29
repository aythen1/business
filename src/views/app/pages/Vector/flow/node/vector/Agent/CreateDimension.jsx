import React from 'react'

import { useDispatch } from 'react-redux'

import InfoTable from './InfoTable'
import LibraryModel from './LibraryModel'
import LogBackup from './LogBackup'
import MonacoEditor from './MonacoEditor'


import {
    setModal
} from '@/slices/iamSlice'


import styles from './CreateDimension.module.css'


const Agent = ({ }) => {

    const dispatch = useDispatch()

    const handleClickAccess = (tab) => {

        let content
        if (tab == 'info') {
            content = <InfoTable />
        } else if (tab == 'library') {
            content = <LibraryModel />
        } else if (tab == 'backup') {
            content = <InfoTable />
        } else {
            content = <LogBackup />
        }

        dispatch(setModal(content))
    }

    return (
        <div className={styles.modal}>
            <p className={styles.text}>
                Un agente es un observador de cualquier dato
                n agentes pueden crear n dimensiones
            </p>
            <div className={styles.digit}>
                <input
                    type="text" />
                <input
                    type="text" />
                <input
                    type="text" />
                <input
                    type="text" />
                <input
                    type="text" />
            </div>
            <p className={styles.title}>
                Cada posición es una dimension
            </p>
            <p className={styles.text}>
                En cada agente puedes crear datos a través de algoritmos
                crea uno fácil usando el sistema dimensional
            </p>
            <button
                className={styles.button}
                onClick={() => handleClickAccess('info')}
            >
                Crear un nuevo flow
            </button>


            {/* <div>
                <div>
                    <InfoTable />
                </div>
                <div>
                    <InfoTable />
                </div>
                <div>
                    <LibraryModel />
                </div>
                <div>
                    <MonacoEditor />
                </div>
                <div>
                    <LogBackup />
                </div>
            </div> */}
        </div>
    )
}

export default Agent