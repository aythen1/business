import React from 'react'

import styles from './ModalElementText.module.css'

const ModalElementText = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.buttons}>
                <button className={styles.active}>
                    Font Pack
                </button>
                <button>
                    Custom
                </button>
            </div>
            <div className={styles.search}>
                <div className={styles.input}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className={styles.texts}>
                <ul>
                    {['', '', ''].map((item, index) => (
                        <li>
                            <b>
                                Alegrya
                            </b>
                            <span>
                                Open Sans for body text
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ModalElementText