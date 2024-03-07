import React from 'react'


import styles from './LogBackup.module.css'

const LogBackup = ({ }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h3>
                    Backup Vector
                </h3>
                <p>
                    Activar para hacer una copia de dato teniendo en cuenta toda la dimension del archivo.
                </p>
            </div>
            <div className={styles.type}>
                <label>
                    <input type="checkbox" />
                    Enviar cada día
                </label>
                <label>
                    <input type="checkbox" />
                    2 veces al mes
                </label>
                <label>
                    <input type="checkbox" />
                    1 sola vez al mes
                </label>
            </div>
            <div className={styles.adjunt}>
                <p>
                    Se te enviara un correo con la copia, quieres que te envemos una copia a otro email como adjuntoº
                </p>
                <ul>
                    <li>
                        email1@example.com
                    </li>
                    <li>
                        email2@example.com
                    </li>
                </ul>
            </div>


        </div>
    )
}

export default LogBackup