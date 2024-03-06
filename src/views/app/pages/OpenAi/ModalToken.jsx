import React, { useState, useEffect, useRef } from 'react';

import styles from './ModalToken.module.css'

const ModalToken = () => {

    const [token, setToken] = useState('');
    const inputRef = useRef(null);


    useEffect(() => {
        if(token){
            localStorage.setItem('token-gpt', token);
        }
    }, [token]);


    useEffect(() => {
        const storedToken = localStorage.getItem('token-gpt');
        console.log('storedtokej', storedToken)
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handlePasteToken = () => {
        navigator.clipboard.readText().then((clipboardValue) => {
            inputRef.current.value = clipboardValue;
            setToken(clipboardValue);
        });
    };


    const handleDeleteToken = () => {
        localStorage.setItem('token-gpt', '')
        setToken('')
    }


    return (
        <div className={styles.modal}>
            <div className={styles.title}>
                API keys

            </div>
            <div className={styles.text}>
                Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them.
            </div>
            <div className={styles.text}>
                Enable tracking to see usage per API key on the
                <a>
                    Usage page.
                </a>
            </div>
            {token ? (
                <div className={styles.isToken}>
                    <b>
                        Este es tu nuevo token
                    </b>
                    <div>
                        Comprueba tu token
                        <span>
                            {token}
                        </span>
                    </div>
                    <button 
                        className={styles.buttonDelete}
                        onClick={() => handleDeleteToken()}
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div>
                    <div className={styles.noneToken}>
                        <b>
                            You currently do not have any API keys
                        </b>
                        <span>
                            Create one using the button below to get started
                        </span>
                    </div>
                    <div className={styles.boxToken}>
                        <b className={styles.title}>
                            Create new secret key
                        </b>
                        <div className={styles.input}>
                            <label>
                                Name
                            </label>
                            <input
                                type="text"
                            />
                        </div>
                        <div className={styles.inputToken}>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder='Insert Token Api'
                            />
                            <button
                                onClick={() => handlePasteToken()}
                            >
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M9 8v3c0 .6-.4 1-1 1H5m11 4h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-7a1 1 0 0 0-1 1v1m4 3v10c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1v-7.1c0-.3 0-.5.2-.7l2.5-2.9c.2-.2.5-.3.8-.3H13c.6 0 1 .4 1 1Z" />
                                </svg>
                                Paste
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.footer}>
                <b>
                    Default organization
                </b>
                <span>
                    If you belong to multiple organizations, this setting controls which organization is used by default when making requests with the API keys above.
                </span>
            </div>
            <div className={styles.buttons}>
                <button className={styles.search}>
                    Search Addon
                </button>
                <button>
                    Create Addon
                </button>
            </div>
        </div>
    )
}


export default ModalToken