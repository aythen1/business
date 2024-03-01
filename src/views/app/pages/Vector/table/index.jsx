import React from 'react'
import { useDispatch } from 'react-redux'


import ImgTable from './table.jpeg'

import styles from './index.module.css'

const VectorTable = ({data}) => {
    return (
        <div className={styles.Table}>
            <img src={ImgTable} />
            |{JSON.stringify(data)}|
        </div>
    )
}

export default VectorTable