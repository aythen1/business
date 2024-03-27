import React from 'react'


import styles from './ModalTemplate.module.css'

const ModalTemplate = ({ code }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.template}>
                <div
                    dangerouslySetInnerHTML={{ __html: code }}
                />
            </div>
            <div className={styles.container}>
                <h3>
                    Title addon
                </h3>
                <div>
                    <span>
                        href://link.com/#hello/#div
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                    </svg>

                </div>
                <div className={styles.date}>
                    Fecha de creación
                </div>
                <div className={styles.shortcut}>
                    <label>
                        Editor
                    </label>
                    <label>
                        Eliminar
                    </label>
                    <label>
                        Duplicar
                    </label>
                    <label>
                        Link
                    </label>
                    <label>
                        Duplicar
                    </label>
                    <label>
                        Generate GPT
                    </label>
                </div>
                <div className={styles.vectors}>
                    <label>
                        Vectores #01
                    </label>
                    <label>
                        Vectores #01
                    </label>
                    <label>
                        Vectores #01
                    </label>
                </div>
                <div className={styles.styles}>
                    <div>
                        <b>
                            Style
                        </b>
                        <div>
                            <label className={styles.active}>
                                Apple
                            </label>
                            <label>
                                Nike
                            </label>
                            <label>
                                Spotify
                            </label>
                            <label>
                                Stripe
                            </label>
                            <label>
                                Google
                            </label>
                        </div>
                    </div>
                    <div>
                        <b>
                            Complexity
                        </b>
                        <div>
                            <label className={styles.active}>
                                Minimal
                            </label>
                            <label>
                                Detailed
                            </label>
                        </div>
                    </div>
                    <div>
                        <b>
                            Theme
                        </b>
                        <div>
                            <label>
                                Light
                            </label>
                            <label className={styles.active}>
                                Dark
                            </label>
                        </div>
                    </div>
                    <div>
                        <b>
                            Colors
                        </b>
                        <div>
                            <label>
                                Monochrome
                            </label>
                            <label className={styles.active}>
                                Gradient
                            </label>
                        </div>
                    </div>
                    <div>
                        <b>
                            Corner Rounding
                        </b>
                        <div>
                            <label>
                                None
                            </label>
                            <label className={styles.active}>
                                Small
                            </label>
                            <label>
                                Medium
                            </label>
                            <label>
                                Large
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.chats}>
                    <div className={styles.chat}>
                        <div className={styles.you}>
                            Hello world
                        </div>
                        <div className={styles.me}>
                            Hello world
                        </div>
                    </div>
                    <div className={styles.textarea}>
                        <textarea
                            placeholder={`Inserta un ticket`}
                        />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ModalTemplate