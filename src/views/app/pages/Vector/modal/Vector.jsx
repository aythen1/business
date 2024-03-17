import React, { useState, useEffect } from 'react'


import MenuLeft from './MenuLeft'
import MenuRight from './MenuRight'
import MonacoEditor from './MonacoEditor'

import styles from './Vector.module.css'



import Recurso5 from './assets/vector/Recurso5'
import Recurso6 from './assets/vector/Recurso6'
import Recurso7 from './assets/vector/Recurso7'
import Recurso8 from './assets/vector/Recurso8'
import Recurso9 from './assets/vector/Recurso9'
import Recurso10 from './assets/vector/Recurso10'



const ItemTypes = {
    LIST_ITEM: 'listItem',
};

const Vector = ({ }) => {



    const [codes, setCodes] = useState([])



    // -----------------------------------------------------------
    // const [searchResults, setSearchResults] = useState([]);



    // -----------------------------------------------------------




    // -----------------------------------------------------------

    const handleAddCode = () => {
        const newCode = {
            title: 'hello world',
            description: 'lorem ipsum',
            dimension: [0, 0, 0, 0],
            code: '<div>hello putting</div>'
        };

        // Concatena el nuevo código a la lista existente (prevCodes)
        setCodes(prevCodes => prevCodes.concat(newCode));
    };
    // -----------------------------------------------------------

    // -----------------------------------------------------------

    // -----------------------------------------------------------



    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.item}>
                    <div className={styles.logo}>
                        A
                    </div>
                    <span>
                        dimension A.jsx
                    </span>
                    <button className={styles.close}>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className={styles.notification}>
                En library Model vamos a poder crear tiempos para leer toda esa información
                y ordernar en código, dimension y version todo el model.
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                </svg>
            </div>
            <div className={styles.container}>
                <div>
                    <MenuLeft styles={styles} />
                </div>
                <div>
                    {codes.length > 0 ? (
                        <div>
                            <ul>
                                {codes.map((code, index) => (
                                    <li>
                                        <MonacoEditor />
                                    </li>
                                ))}
                            </ul>
                            <div
                                className={styles.addCode}
                                onClick={() => handleAddCode()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z" />
                                </svg>
                                Add code
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noneCode}>
                            <Recurso7 />
                            <b>
                                No hay código
                            </b>
                            <p>
                                Lorem ipsum dolor et durum
                            </p>
                            <div className={styles.buttons}>
                                <button>
                                    Buscar códigos
                                </button>
                                <button
                                    onClick={() => handleAddCode()}
                                >
                                    Añadir código
                                </button>
                            </div>
                            <div className={styles.message}>
                                <textarea
                                    placeholder={'Escribe aquí tu consulta..'}
                                />
                                <button>
                                    <svg width="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path d="M474.123 209.81c11.525-34.577 7.569-72.423-10.838-103.904-27.696-48.168-83.433-72.94-137.794-61.414a127.14 127.14 0 00-95.475-42.49c-55.564 0-104.936 35.781-122.139 88.593-35.781 7.397-66.574 29.76-84.637 61.414-27.868 48.167-21.503 108.72 15.826 150.007-11.525 34.578-7.569 72.424 10.838 103.733 27.696 48.34 83.433 73.111 137.966 61.585 24.084 27.18 58.833 42.835 95.303 42.663 55.564 0 104.936-35.782 122.139-88.594 35.782-7.397 66.574-29.76 84.465-61.413 28.04-48.168 21.676-108.722-15.654-150.008v-.172zm-39.567-87.218c11.01 19.267 15.139 41.803 11.354 63.65-.688-.516-2.064-1.204-2.924-1.72l-101.152-58.49a16.965 16.965 0 00-16.687 0L206.621 194.5v-50.232l97.883-56.597c45.587-26.32 103.732-10.666 130.052 34.921zm-227.935 104.42l49.888-28.9 49.887 28.9v57.63l-49.887 28.9-49.888-28.9v-57.63zm23.223-191.81c22.364 0 43.867 7.742 61.07 22.02-.688.344-2.064 1.204-3.097 1.72L186.666 117.26c-5.161 2.925-8.258 8.43-8.258 14.45v136.934l-43.523-25.116V130.333c0-52.64 42.491-95.13 95.131-95.302l-.172.172zM52.14 168.697c11.182-19.268 28.557-34.062 49.544-41.803V247.14c0 6.02 3.097 11.354 8.258 14.45l118.354 68.295-43.695 25.288-97.711-56.425c-45.415-26.32-61.07-84.465-34.75-130.052zm26.665 220.71c-11.182-19.095-15.139-41.802-11.354-63.65.688.516 2.064 1.204 2.924 1.72l101.152 58.49a16.965 16.965 0 0016.687 0l118.354-68.467v50.232l-97.883 56.425c-45.587 26.148-103.732 10.665-130.052-34.75h.172zm204.54 87.39c-22.192 0-43.867-7.741-60.898-22.02a62.439 62.439 0 003.097-1.72l101.152-58.317c5.16-2.924 8.429-8.43 8.257-14.45V243.527l43.523 25.116v113.022c0 52.64-42.663 95.303-95.131 95.303v-.172zM461.22 343.303c-11.182 19.267-28.729 34.061-49.544 41.63V264.687c0-6.021-3.097-11.526-8.257-14.45L284.893 181.77l43.523-25.116 97.883 56.424c45.587 26.32 61.07 84.466 34.75 130.053l.172.172z" fillRule="nonzero"></path></svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.menuRight}>
                    <MenuRight styles={styles} />
                </div>
            </div>
        </div>
    )
}

export default Vector











