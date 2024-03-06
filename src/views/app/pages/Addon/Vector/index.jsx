
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.css'

import AddonData from './Data'
import AddonCustom from './Custom'
import AddonVersion from './Version'

const ModalVector = ({ modal: _modal, addon }) => {
    // const [vector, setVector] = useState(null)
    const [modal, setModal] = useState(_modal || 'custom')

    // const { addon, vectors } = useSelector((state) => state.addon)



    const handleClickCustom = () => {
        setModal('custom')

    }

    const handleClickData = () => {
        setModal('data')

    }


    const handleClickVersion = () => {
        setModal('version')

    }





    return (
        <div>
            <div className={styles.header}>
                {addon?.id && (
                    <div className={styles.gird2}>
                        <div
                            className={styles.filter}
                            onClick={() => handleClickCustom()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z" />
                            </svg>
                            Addon
                        </div>
                        <div
                            className={styles.data}
                            onClick={() => handleClickVersion()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M5 6a3 3 0 1 1 4 2.8V9a4 4 0 0 0 4 4h.2a3 3 0 1 1 0 2H13a6 6 0 0 1-4-1.5v1.7a3 3 0 1 1-2 0V8.8A3 3 0 0 1 5 6Z" fill="evenodd" />
                            </svg>
                            Version
                        </div>
                        <div
                            className={styles.data}
                            onClick={() => handleClickData()}
                        >
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 7.2c4.4 0 8-1.2 8-2.6C20 3.2 16.4 2 12 2S4 3.2 4 4.6C4 6 7.6 7.2 12 7.2ZM12 22c5 0 8-1.7 8-2.6V15h-.2a7.8 7.8 0 0 1-1.3.7l-.2.1c-2 .7-4.2 1-6.3 1a19 19 0 0 1-6.3-1h-.2a10.1 10.1 0 0 1-1.3-.7L4 15v4.4c0 1 3 2.6 8 2.6Zm7-14c-.1.2-.3.2-.5.3l-.2.1c-2 .7-4.2 1-6.3 1a19 19 0 0 1-6.3-1h-.2a10.2 10.2 0 0 1-1.3-.7L4 7.6V12c0 1 3 2.6 8 2.6s8-1.7 8-2.6V7.6h-.2a7.8 7.8 0 0 1-.7.5Z" />
                            </svg>

                            Data
                        </div>
                        
                    </div>
                )}
            </div>
            {modal == 'custom' ? (
                <AddonCustom setModal={setModal} addon={addon} />
            ) : modal == 'data' ? (
                <AddonData setModal={setModal} addon={addon} />
            ) : modal == 'version' && (
                <AddonVersion setModal={setModal} addon={addon} />
            )}
        </div>

    )
}


export default ModalVector








