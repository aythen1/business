import React from 'react'

import styles from './ModalElementImage.module.css'

const ModalElementImage = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.top}>
                <b>
                    Image
                </b>
                <button>
                    Regenerate
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
                    </svg>
                </button>
            </div>
            <div className={styles.image}>
                <img src="https://via.placeholder.com/200" />
            </div>
            <div className={styles.buttons}>
                <button className={styles.replace}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    Replace
                </button>
                <button className={styles.delete}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                    </svg>
                </button>
            </div>
            <b 
                className={styles.title}
                style={{
                    marginTop: 10
                }}
            >
                Alt text
            </b>
            <div className={styles.input}>
                <input
                    type="text"
                    placeholder={'Slack message with team communicating an'}
                />
            </div>
            <label className={styles.label}>
                Describe the image to improve SEO and accesibility
            </label>
            <b className={styles.title}>
                Image position
            </b>
            <div className={styles.ranges}>
                <div>
                    <label>
                        H
                    </label>
                    <input type="range" id="volume" name="volume" min="0" max="100" value="50" />
                </div>
                <div>
                    <label>
                        V
                    </label>
                    <input type="range" id="volume" name="volume" min="0" max="100" value="50" />
                </div>
            </div>
        </div>
    )
}

export default ModalElementImage