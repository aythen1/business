import React from 'react'

import styles from './ModalElementColor.module.css'

const ModalElementColor = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.buttons}>
                <button className={styles.active}>
                    Mood
                </button>
                <button>
                    Custom
                </button>
            </div>
            <div className={styles.search}>
                <div className={styles.input}>
                    <input
                        placeholder={'Light'}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                    </svg>
                </div>
                <ul className={styles.list}>
                    <li>
                        Light
                    </li>
                    <li>
                        Dark
                    </li>
                </ul>
            </div>
            <div className={styles.colors}>
                <ul>
                    {['', '', ''].map((item, index) => (
                        <li className={styles.color}>
                            <div>
                                <div className={styles.label}>
                                    <div
                                        className={styles.dot}
                                        style={{ backgroundColor: 'red' }}
                                    />
                                    <span>
                                        Aa
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className={styles.label}>
                                    <div
                                        className={styles.dot}
                                        style={{ backgroundColor: 'red' }}
                                    />
                                    <span>
                                        Bb
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className={styles.label}>
                                    <div
                                        className={styles.dot}
                                        style={{ backgroundColor: 'red' }}
                                    />
                                    <span>
                                        Cc
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className={styles.label}>
                                    <div
                                        className={styles.dot}
                                        style={{ backgroundColor: 'red' }}
                                    />
                                    <span>
                                        Dd
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default ModalElementColor