import React from 'react'

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

    const dispatch = useDispatch()

    const Content = ({tab}) => {

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
    }

    return (
        <div className={styles.modal}>
            <Content tab="library" />
        </div>
    )
}

export default Agent