import React, { useState } from 'react'

import styles from './index.module.css'

import apiBackend from '@/utils/apiBackend'


const Admin = () => {

    const [contextMenu, setContextMenu] = useState(false)


    const [listItem, setListItem] = useState([{
        title: 'e'
    }, {
        title: 'e'
    }, {
        title: 'e'
    }, {
        title: 'e'
    }])


    const handleItem = () => {
        setContextMenu(true)
    }


    ///////////////////////////////////////////////////////////////
    const handlePayment = async () => {
        const token = localStorage.getItem("token");
        const response = await apiBackend.post(
            "/stripe/create/session",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('data', response);
    
    }
    const handleAccountExpress = async () => {
        const token = localStorage.getItem("token");
        const response = await apiBackend.post(
            "/stripe/account/express",
            {
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('data', response);
    }
    const handleAccountLink = async () => {
        const token = localStorage.getItem("token");
        const response = await apiBackend.post(
            "/stripe/account/link",
            {
                acc: 'acct_1OvLQsFK6PmPnbY2'
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('data', response);
    }

    const handleCardAdd = async () => {
        const token = localStorage.getItem("token");
        const response = await apiBackend.post(
            "/stripe/card/add",
            {
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('data', response);
    }

    const handlePaymentSheet = async () => {
        const token = localStorage.getItem("token");
        const response = await apiBackend.post(
            "/stripe/payment/sheet",
            {
                email: 'info@aythen.com',
                price: 100
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('data', response);
    }



    return (
        <div className={styles.container}>
            <div>
                <button
                onClick={() => handlePaymentSheet()}
                >
                    Intent Payment
                </button>
            </div>
            <div className={styles.graphs}>
                <div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207" />
                    </svg>
                    <div>
                        <b>
                            0
                        </b>
                        <span>
                            Usuarios
                        </span>
                    </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
                    </svg>
                    <div>
                        <b>
                            0
                        </b>
                        <span>
                            Suscripciones
                        </span>
                    </div>
                </div>
                <div>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667" />
                    </svg>
                    <div>
                        <b>
                            0
                        </b>
                        <span>
                            Values
                        </span>
                    </div>
                </div>
                <div>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207" />
                    </svg>
                    <div>
                        <b>
                            0
                        </b>
                        <span>
                            Grow
                        </span>
                    </div>
                </div>

            </div>
            <div className={styles.filters}>
                <div className={styles.search}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder={'Buscar un usuario'}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div className={styles.search}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder={'Buscar una fecha'}
                    />
                </div>
                <div className={styles.filter}>
                    <div className={styles.label}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                        </svg>
                        Label
                    </div>

                    {true ? (
                        <button className={styles.check}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    ) : (
                        <button className={styles.check}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                            </svg>
                        </button>
                    )}
                    {true ? (
                        <button className={styles.check}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                            </svg>
                        </button>
                    ) : (
                        <button className={styles.check}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                            </svg>
                        </button>
                    )}



                </div>
            </div>
            <div className={styles.table}>
                {listItem.map((item, key) => (
                    <li
                        key={key}
                        onClick={() => handleItem(item)}
                    >
                        <div>
                            {true ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clipRule="evenodd" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z" />
                                </svg>
                            )}
                            Nombre de usuario
                        </div>
                        <div>
                            Pais Direccion
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            Fecha total
                        </div>
                        <div>
                            {true ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            ) : false ? (
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 11H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4.5M7 11V7a3 3 0 0 1 6 0v1.5m2.5 5.5v1.5l1 1m3.5-1a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                                </svg>
                            )}
                            Suscriptcion
                        </div>
                        <div>
                            Total
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </li>
                ))}
            </div>
            <ContextMenu
                conextMenu={contextMenu}
                setContextMenu={setContextMenu}
            />
        </div>
    )
}


export default Admin








const ContextMenu = ({ conextMenu, setContextMenu }) => {

    const handleReturn = () => {
        setContextMenu(false)
    }

    if (!conextMenu) return null

    return (
        <div className={styles.popup}>
            <div className={styles.overlay} />
            <div className={styles.modal}>
                <div className={styles.top}>
                    <button
                    onClick={() => handleReturn()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4" />
                        </svg>
                    </button>

                    <div className={styles.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z" />
                        </svg>

                        id
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                        </svg>
                    </div>
                    <div className={styles.button}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                        </svg>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.avatar}>
                        A
                    </div>
                    <div>
                        <div className={styles.gird2}>
                            <div className={styles.input}>
                                <label>
                                    Nombre
                                </label>
                                <input />
                            </div>
                            <div className={styles.input}>
                                <label>
                                    apellido
                                </label>
                                <input />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.boxForm} >
                    <div className={styles.gird}>
                        <div className={styles.input}>
                            <label>
                                Tiempo de inicio
                            </label>
                            <input />
                        </div>
                        <div className={styles.input}>
                            <label>
                                Tiempo de Suscriptcion
                            </label>
                            <input />
                        </div>
                    </div>
                </div>
                <div className={styles.boxForm}>
                    <div className={styles.gird}>
                        <div className={styles.input}>
                            <label>
                                business
                            </label>
                            <input />
                        </div>
                        <div className={styles.input}>
                            <label>
                                payment due date
                            </label>
                            <input />
                        </div>
                    </div>
                    <div className={styles.gird}>
                        <div className={styles.input}>
                            <label>
                                business card
                            </label>
                            <input type />
                        </div>
                        <div className={styles.input}>
                            <label>
                                Valor anual
                            </label>
                            <input />
                        </div>
                    </div>
                </div>
                <div className={styles.boxForm}>
                    <div className={styles.gird}>
                        <div className={styles.input}>
                            <label>
                                Telefno
                            </label>
                            <input />
                        </div>
                        <div className={styles.input}>
                            <label>
                                Email
                            </label>
                            <input />
                        </div>
                    </div>
                    <div className={styles.gird}>
                        <div className={styles.input}>
                            <label>
                                DNI
                            </label>
                            <input />
                        </div>
                        <div className={styles.input}>
                            <label>
                                ID
                            </label>
                            <input />
                        </div>
                    </div>
                    <div className={styles.gird}>
                        <div className={styles.input}>
                            <label>
                                País
                            </label>
                            <input />
                        </div>
                        <div className={styles.input}>
                            <label>
                                Ciudad
                            </label>
                            <input />
                        </div>
                    </div>
                    <div className={styles.gird}>
                        <div className={styles.input}>
                            <label>
                                Dirección
                            </label>
                            <input />
                        </div>
                        <div className={styles.input}>
                            <label>
                                Hello
                            </label>
                            <input />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}