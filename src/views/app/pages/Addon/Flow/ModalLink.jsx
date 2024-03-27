import React from 'react'

import styles from './ModalLink.module.css'

const ModalLink = ({ }) => {
    return (
        <div className={styles.modal}>
            <h2 className={styles.title}>
                Compartir [Nombre del proyecto]
            </h2>
            <div className={styles.search}>
                <input
                    placeholder={'Add people, groups, and calendar events'}
                />
            </div>
            <div className={styles.withAccess}>
                <b className={styles.title}>
                    People with access
                </b>
                <div className={styles.person}>
                    <div className={styles.logo}>
                        I
                    </div>
                    <div className={styles.content}>
                        <b>
                            Aythen Company (you)
                        </b>
                        <span>
                            info@aythen.com
                        </span>
                    </div>
                    <button>
                        Owner
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className={styles.person}>
                    <div className={styles.logo}>
                        I
                    </div>
                    <div className={styles.content}>
                        <b>
                            carles.1994@gmail.com
                        </b>
                        <span>
                            carles.1994@gmail.com
                        </span>
                    </div>
                    <button>
                        Editor
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
                        </svg>
                        <ul>
                            <li>
                                Editor
                            </li>
                            <li>
                                Vista
                            </li>
                            <li>
                                Eliminar
                            </li>
                        </ul>
                    </button>
                </div>
            </div>
            <div className={styles.sharedAccess}>
                <b className={styles.title}>
                    General Access
                </b>
                <div className={styles.item}>
                    <div className={styles.logo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                        </svg>
                    </div>
                    <div className={styles.content}>
                        <b>
                            Restricted
                        </b>
                        <span>

                            Only people with access can open with the link
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.link}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                    </svg>
                    Copy link
                </button>
                <button className={styles.done}>
                    Done
                </button>
            </div>
        </div>
    )
}

export default ModalLink