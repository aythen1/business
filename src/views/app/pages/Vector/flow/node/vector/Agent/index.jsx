import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import InfoTable from './InfoTable'
import LibraryModel from './LibraryModel'
import LogBackup from './LogBackup'
import MonacoEditor from './MonacoEditor'


import {
    setModal
} from '@/slices/iamSlice'


import styles from './index.module.css'


const Agent = ({ }) => {
    const [tab, setTab] = useState('info')

    const dispatch = useDispatch()

    useEffect(() => {
        let content
        if (tab == 'info') {
            content = <InfoTable />
        } else if (tab == 'library') {
            content = <LibraryModel />
        } else if (tab == 'backup') {
            content = <InfoTable />
        } else if (tab == 'editor') {
            content = <MonacoEditor />
        }else {
            content = <LogBackup />
        }

        dispatch(setModal(content))
    }, [tab])


    return (
        <div className={styles.modal}>
            wewcrec
        </div>
    )
}

export default Agent