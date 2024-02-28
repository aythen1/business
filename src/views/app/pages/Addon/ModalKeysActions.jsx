import React, { useEffect } from 'react'

import styles from './ModalKeysActions.module.css'


const ModalKeysActions = ({ keysAlt, keyFrequency }) => {

    useEffect(() => {
        console.log('keys', keysAlt)
        console.log('keysfrequency', keyFrequency)

    }, [keysAlt])

    return (
        <div className={styles.modal}>
            <div className={styles.frequency}>
                {Object.keys(keyFrequency).map(key => (
                    <div>
                        <label>
                            {keyFrequency[key].title}
                        </label>
                        {keyFrequency[key].title}
                    </div>
                ))}
            </div>
            <div className={styles.keys}>
                {keysAlt.map((item, index) => (
                    <div className={styles.key}>
                        <label>
                            {item.key}
                        </label>
                        <div>
                            <b>
                                {item.title}
                            </b>
                            <span>
                                {item.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default ModalKeysActions

