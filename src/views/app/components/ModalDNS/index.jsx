import React from 'react'

import styles from './index.module.css'

const ModalDNS = ({ }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.buttons}>
                <button className={styles.cancel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </button>
                <button className={styles.steps}>
                    Step-by-step-guide
                </button>
                <button className={styles.verify}>
                    Verify Changes
                </button>
            </div>
            <div className={styles.container}>
                <h3>
                    Set up your domain
                </h3>
                <b>
                    You'll do this manually at your domain provider's website
                </b>
                <ul>
                    <li>
                        <div>
                            1
                        </div>
                        <p>
                            Log in your domain provider's website
                        </p>
                    </li>
                    <li>
                        <div>
                            2
                        </div>
                        <p>
                            Change your DNS settings to the values lised below
                        </p>
                    </li>
                    <li>
                        <div>
                            3
                        </div>
                        <p>
                            When you're done, come back here and press the
                            <b>
                                Verify changes
                            </b>
                            button
                        </p>
                    </li>
                </ul>
            </div>
            <div className={styles.table}>
                <ul>
                    <li className={styles.header}>
                        <div className={styles.type}>
                            Type
                        </div>
                        <div className={styles.name}>
                            Name
                        </div>
                        <div className={styles.points}>
                            Points to
                        </div>
                    </li>
                    <li className={styles.data}>
                        <div className={styles.type}>
                            A
                        </div>
                        <div className={styles.name}>
                            @
                        </div>
                        <div className={styles.points}>
                            <button>
                                Copy
                            </button>
                            <span>
                                199.34.228.182
                            </span>
                        </div>
                    </li>
                    <li className={styles.data}>
                        <div className={styles.type}>
                            CNAME
                        </div>
                        <div className={styles.name}>
                            www
                        </div>
                        <div className={styles.points}>
                            <button>
                                Copy
                            </button>
                            <span>
                                mybusiness.com
                            </span>
                        </div>
                    </li>
                    <li className={styles.data}>
                        <div className={styles.type}>
                            TXT
                        </div>
                        <div className={styles.name}>
                            @
                        </div>
                        <div className={styles.points}>
                            <button>
                                Copy
                            </button>
                            <span>
                                179a2410-e573-11ee-a479-79f569c0a36
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ModalDNS