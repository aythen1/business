import React from 'react'

import styles from './ModalElementHref.module.css'

const ModalElementHref = () => {
    return (
        <div className={styles.modal}>
            <b className={styles.title}>
                Link Type
            </b>
            <div className={styles.search}>
                <div className={styles.input}>
                    <input
                        placeholder={'Serch'}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                    </svg>
                </div>
                <ul className={styles.list}>
                    <li>
                        Page
                    </li>
                    <li>
                        External
                    </li>
                    <li>
                        Email
                    </li>
                    <li>
                        Phone
                    </li>
                </ul>
            </div>
            <b className={styles.title}>
                Url
            </b>
            <div className={styles.search}>
                <div className={styles.input}>
                    <input />
                </div>
            </div>
            <label className={styles.label}>
                A link to another website
            </label>
            <div className={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                />
                <div >
                    Enviar cada día
                </div>
            </div>
        </div>
    )
}

export default ModalElementHref