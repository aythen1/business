import React, { useState, useEffect } from 'react'

import styles from './ModalKeysActions.module.css'


const ModalKeysActions = ({ dataAlt, keysAlt, keyFrequency }) => {

    // const [uniqueKeys, setUniqueKeys] = useState([]);
    const [groupedData, setGroupedData] = useState({});

    // Actualizar datos cuando cambie keysAlt
    useEffect(() => {
        // Paso 1: Obtener todos los valores únicos de 'key' en 'dataAlt'
        // const uniqueKeys = [...new Set(dataAlt.map(item => item.key))];
        // setUniqueKeys(uniqueKeys);

        // Paso 2: Crear grupos por los diferentes valores de 'keysAlt.category'
        const groupedData = {};
        dataAlt.forEach(data => {
            if (!groupedData[data.key]) {
                groupedData[data.key] = {
                    title: data.title,
                    description: data.description,
                    items: []
                }
            }
        });

        // Paso 3: Asignar elementos de 'dataAlt' a los grupos correspondientes
        dataAlt.forEach(data => {
            const items = keysAlt.filter(alt => alt.category === data.key);

            if (items) {
                groupedData[data.key].items = items
            }
        });


        console.log('groupedData', groupedData)
        setGroupedData(groupedData);
    }, [keysAlt]);



    // useEffect(() => {
    //     console.log('keys', keysAlt)
    //     console.log('keysfrequency', keyFrequency)

    // }, [keysAlt])

    return (
        <div className={styles.modal}>
            {Object.entries(groupedData).map(([category, data], index) => (
                <div key={index}>
                    <h2>
                        {data.title}
                    </h2>
                    <p>
                    {data.description}
                    </p>
                    <div className={styles.keys}>
                        {data.items.map((item, index) => (
                            <div className={styles.key}>
                                <label>
                                    {item.key}
                                </label>
                                <div>
                                    <b>
                                        {item.title}
                                    </b>
                                    <span>
                                        {item.description}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}


            <div className={styles.frequency}>
                {Object.keys(keyFrequency).map(key => (
                    <div>
                        <label>
                            {keyFrequency[key].title}
                        </label>
                        {keyFrequency[key].title}
                    </div>
                ))}
            </div>
        </div>
    )
}



export default ModalKeysActions

