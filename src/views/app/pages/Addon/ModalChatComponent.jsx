import React from 'react'


import styles from './ModalChatComponent.module.css'


const ModalChatComponent = ({image}) => {
    return (
        <div className={styles.modal}>
            <b className={styles.title}>
                Editar el componente 
            </b>
            <p className={styles.text}>
                Personaliza tu componente 100% libre con GPT
            </p>
            <div className={styles.listVersion}>
                <div className={styles.boxVersion}>
                    <div className={styles.date}>
                        27-02-2024
                    </div>
                    <div className={styles.photo}>
                        <img src={image} />
                    </div>
                    <div className={styles.prompt}>
                        prompt
                    </div>
                </div>
            </div>
            <div className={styles.chat}>
                <textarea
                    className={styles.textarea}
                />
                <button>
                    GPT
                </button>
            </div>
            <div className={styles.buttons}>
                <button className={styles.acept}>
                    Aceptar
                </button>
                <button className={styles.deny}>
                    Cancelar
                </button>
            </div>

        </div>
    )
}

export default ModalChatComponent