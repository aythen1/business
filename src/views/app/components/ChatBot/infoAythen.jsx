import React from 'react'

import styles from './infoAythen.module.css'

import IconChatbot from './assets/IconChatbot.webp'
import { useNavigate } from 'react-router-dom'

const InfoAythen = ({ }) => {
    const navigate = useNavigate()

    const handleLearnMore = () => {
        navigate(`/${'es'}/app/settings/support`)
    }
    return (
        <div className={styles.container}>
            <img src={IconChatbot} className={styles.image} />
            <p className={styles.paragraph}>
                Run your quantum algorighms with QaaS. Create dedicated
                sessions on a specific platform to execute your jobs
            </p>
            <div className={styles.buttons}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.9 4H9c.5 0 .9.4.9.9V9c0 .5-.4.9-.9.9H5a.9.9 0 0 1-.9-.9V5c0-.5.4-.9.9-.9Zm10 0H19c.5 0 .9.4.9.9V9c0 .5-.4.9-.9.9h-4a.9.9 0 0 1-.9-.9V5c0-.5.4-.9.9-.9Zm-10 10H9c.5 0 .9.4.9.9V19c0 .5-.4.9-.9.9H5a.9.9 0 0 1-.9-.9v-4c0-.5.4-.9.9-.9Z" />
                    </svg>
                    See documentation
                </button>
                <button className={styles.create}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    Create a Agent
                </button>
            </div>
            <div 
                className={styles.button}
                onClick={() => handleLearnMore()}
            >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m8 10.9 7-3.2m-7 5.4 7 3.2M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                </svg>
            </div>
        </div>
    )
}


export default InfoAythen