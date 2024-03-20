import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import styles from './HomeVector.module.css'


import Graph from './assets/graph.jpeg'
// import { Dashboard1 } from './assets/Dashbaord1'
import Dashboard1 from './assets/dashbaord2.png'
import Dashboard2 from './assets/dashbaord2.png'



const InfoTable = ({ }) => {

    const dispatch = useDispatch()

    const [table, setTable] = useState({
        title: 'lorem ipsum',
        description: 'lorem ipsum',
    })





    return (
        <div className={styles.modal}>
            <div className={styles.banner}>
                <div className={styles.header}>
                    <h3>
                        Empieza a usar Aythen
                    </h3>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                <div className={styles.containerBanner}>
                    <div className={styles.grids}>
                        <div>
                            <label>
                                <div className={styles.dot} />
                                Sin código
                            </label>
                            <div className={styles.content}>
                                <b>
                                    Comparte un enlace de pago
                                </b>
                                <a>
                                    Iniciar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </a>
                                <div>
                                    <img src={Dashboard1} />
                                </div>
                            </div>

                        </div>
                        <div>
                            <label>
                                <div className={styles.dot} />
                                Sin código
                            </label>
                            <div className={styles.content}>
                                <b>
                                    Comparte un enlace de pago
                                </b>
                                <a>
                                    Iniciar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </a>
                                <div>
                                    <img src={Dashboard2} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z" clip-rule="evenodd" />
                            </svg>

                            Explora todos los productos
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                            </svg>

                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z" />
                            </svg>

                            Para desarrolladores
                            <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                Modo activo
                            </label>
                            <div>
                                Clave publicable pk...
                            </div>
                            <div>
                                Clave secreta
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </div>
                        </div>
                        <div>
                            Ver documentación
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.integration}>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <span>
                            Estado de la integración
                        </span>
                        <p>
                            !Ya está todo listo!
                        </p>
                    </div>
                    <div className={styles.right}>
                        Paso 4/4
                    </div>
                </div>
                <div className={styles.progress}>
                    <div />
                </div>
                <p className={styles.text}>
                    Has procesado tu primer pago en tiempo real. Pudes consultar
                    esta sección  en cualquier momento para ver el estado de tu integración.
                </p>
                <button>
                    Listo
                </button>
            </div>
            <div className={styles.graphs}>
                <div className={styles.header}>
                    <b>
                        Tu integración
                    </b>
                    <div>
                        <button>
                            4 h
                        </button>
                        <button>
                            12 h
                        </button>
                        <button>
                            24 h
                        </button>
                        <button>
                            1 s
                        </button>
                    </div>
                </div>
                <div className={styles.containerGraph}>
                    <div className={styles.left}>
                        <b>
                            Solicitudes API
                        </b>
                        <div>
                            <div>
                                <span>
                                    Satisfactoria
                                </span>
                                <p>
                                    21
                                </p>
                            </div>
                            <div>
                                <span>
                                    Fallidas
                                </span>
                                <p>
                                    0
                                </p>
                            </div>
                        </div>
                        <img src={Graph} />
                    </div>
                    <div className={styles.right}>
                        <b>
                            Webhooks
                        </b>
                        <div>
                            <div>
                                <span>
                                    Satisfactoria
                                </span>
                                <p>
                                    21
                                </p>
                            </div>
                            <div>
                                <span>
                                    Fallidas
                                </span>
                                <p>
                                    0
                                </p>
                            </div>
                        </div>
                        <img src={Graph} />
                    </div>
                </div>
            </div>
            <div className={styles.dimensions}>
                <div className={styles.header}>
                    <b>
                        Dimensión del vector
                    </b>
                    <a>
                        Actualización disponible
                    </a>
                </div>
                <ul className={styles.table}>
                    <li>
                        <span>

                            2023-03-11
                        </span>
                        <label>
                            Última
                        </label>
                        <div className={styles.stats}>
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.events}>
                <ul>
                    <li>
                        <div className={styles.labelEvent}>
                        Evento
                        </div>
                        <div className={styles.labelId}>
                        Id
                        </div>
                        <div className={styles.labelDate}>
                        Fecha
                        </div>
                    </li>
                    <li>
                        <div className={styles.labelEvent}>
                        Se creó un nuevo pago pi_3OvKPuJxrGNMjw0d0aEhC2sx por 100,00 US$.
                        </div>
                        <div className={styles.labelId}>
                        evt_3OvKPuJxrGNMjw0d0PW0uyEM
                        </div>
                        <div classNa3me={styles.labelDate}>
                        17/3/24 15:10:26
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.event}>
                <div className={styles.header}>
                    <b>
                        Evento
                    </b>
                    <h2>
                        payment_intent.created
                    </h2>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            Fecha
                        </span>
                        <a>
                            17/3/24 15:10:26
                        </a>
                    </div>
                    <div>
                        <span>
                            Fuente
                        </span>
                        <a>
                            API
                        </a>
                    </div>
                </div>
                <div className={styles.data}>
                    <b>
                        Datos del evento
                    </b>
                    <div>
                        Json
                        <button>
                            Ver las 67 líneas
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InfoTable