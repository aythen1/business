import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import Vector from './Vector'
import HomeVector from './HomeVector'
// import LibraryModel from './LibraryModel'
// import LogBackup from './LogBackup'
// import MonacoEditor from './MonacoEditor'



import styles from './index.module.css'


const Agent = ({ }) => {
    const [tab, setTab] = useState('info')
    const [content, setContent] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        let content
        if (tab == 'info') {
            setContent(<HomeVector />)
        } else  {
            setContent(<Vector />)
        }

    }, [tab])


    return (
        <div className={styles.modal} style={{height: '100%'}}>
            {content}
        </div>
    )
}

export default Agent