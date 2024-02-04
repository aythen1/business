
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import stylesModal from '../Settings/iam/modal.module.css'
import styles from './PageVector.module.css'

import AddTag from '../Settings/iam/AddTag'



import {
    codeAddon
} from '@/actions/addon'


import {
    setCode
} from '@/slices/addonSlice'






const PageVector = () => {
    const [vector, setVector] = useState(null)
    const [modal, setModal] = useState(true)

    return (
        <div>
            {modal ? (
                <ModalVectorCustom styles={stylesModal} setModal={setModal} vector={vector} />
            ) : (
                <ModalVectorVersion />
            )}
        </div>

    )
}


export default PageVector



export const ModalVectorCustom = ({ styles, setModal, vector }) => {
    const dispatch = useDispatch()

    const { code } = useSelector((state) => state.addon)

    // const [isNewVector, setIsNewVector] = useState(vector?.id ? true : false);
    const [isActive, setIsActive] = useState(false)

    const [state, setState] = useState({
        id: vector?.id || '',
        owner: vector?.owner || '',
        version: vector?.version || '',
        title: vector?.title || '',
        description: vector?.description || '',
        data: vector?.data || '',
        updatedAt: vector?.updatedAt || '',
        createdAt: vector?.createdAt || '',
    });

    // ---------------------------------------------------------------

    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'title') {
            // Verificar si el texto tiene una longitud mayor a cero
            const isValidText = value.trim().length > 0;

            setIsActive(isValidText);

            setState((prevState) => ({
                ...prevState,
                [property]: isValidText ? [value.trim()] : [],  // Asegura que el valor sea un array
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };


    const handleNewVector = () => {
        console.log('ddddescription', state.description)
        dispatch(codeAddon(state.description))
    }

    const handleAddVector = () => {

    }

    const handleDeleteVector = () => {
        dispatch(setCode(null))
    }


    const handleVersionVector = () => {
        // dispatch(setModal(<ModalVectorInfo))
        setModal(false)
    }



    return (
        <div className={styles.modal}>
            <div className={styles.gird2}>
                <h2 className={styles.title} style={{ marginTop: -10 }}>
                    New Vector {state.title}
                </h2>
            </div>
            <div className={styles.dropPhoto}>
                {code ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: code }}
                    />
                ) : (
                    <label>
                        AI AVAILABLE
                    </label>
                )}
            </div>
            <p className={styles.text1}>
                Un vector lo puedes recuperar facilmente en tu addon vector
            </p>
            <p className={styles.textBold}>
                Enter the title for addon.
            </p>
            <div className={styles.input}>
                <input
                    type="text"
                    spellCheck="false"
                    value={state.title}
                    placeholder={'Select title of addon'}
                    onChange={(e) => handleInputChange(e, 'title')}
                />
            </div>
            <p className={styles.textBold}>
                Add to an existing group (optional)
            </p>
            <textarea
                placeholder={'Description Vector..'}
                spellCheck="false"
                value={state.description}
                className={styles.textarea}
                onChange={(e) => handleInputChange(e, 'description')}
            />
            <h2 className={styles.title}>
                Enter key value tags
            </h2>
            <p className={styles.text1}>
                Key value tags helps you organize your users.
            </p>
            <div>
                <AddTag
                    handleInputChange={handleInputChange}
                />
            </div>
            {code ? (
                <div className={styles.button}>
                    <button
                        className={styles.active}
                        onClick={() => handleVersionVector()}
                        style={{
                            width: 100,
                            padding: 4
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#4F0599"><g><g><path fill="fillCurrent" d="M12 5.5 14.5 3 17 5.5 14.5 8zm0 9 2.5-2.5 2.5 2.5-2.5 2.5zm-9 0L5.5 12 8 14.5 5.5 17zm0-9L5.5 3 8 5.5 5.5 8z"></path><path fill="#A365F6" d="m7 10 3-3 3 3-3 3z"></path></g></g></svg>
                    </button>
                    <button
                        onClick={() => handleAddVector()}
                        className={styles.active}
                    >
                        Save Vector
                    </button>
                    <button
                        onClick={() => handleDeleteVector()}
                        className={styles.delete}
                    >
                        Delete Vector
                    </button>
                </div>
            ) : (
                <div className={styles.button}>
                    <button
                        onClick={() => handleNewVector()}
                        className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                    >
                        Create a New Vector
                    </button>
                </div>
            )}
        </div>
    )
}



export const ModalVectorVersion = ({ }) => {
    function organizeVersions(inputList) {
        const organizedVersions = [];
        
        inputList.forEach(({ title, version, createdAt, code }) => {
            const [majorVersion, minorVersion] = version.split('.');
    
            // Buscar el índice de la versión principal en el array
            const majorVersionIndex = organizedVersions.findIndex(item => item.version === majorVersion);
    
            if (minorVersion) {
                if (majorVersionIndex === -1) {
                    // Si la versión principal no está en el array, agrégala con la subversión
                    organizedVersions.push({
                        version: majorVersion,
                        subVersions: [{ title, version, createdAt, code }],
                    });
                } else {
                    // Si la versión principal ya está en el array, añade la subversión
                    organizedVersions[majorVersionIndex].subVersions.push({ title, version, createdAt, code });
                }
            } else {
                // Si es una versión principal sin subversión, agrégala directamente al array
                organizedVersions.push({
                    version: majorVersion,
                    main: [{ title, version, createdAt, code }],
                    subVersions: [],
                });
            }
        });
    
        return organizedVersions;
    }
    
    

    const initialVersion = [{
        title: 'hello world',
        version: '0',
        createdAt: new Date(),
        code: '<button>test button</button>'
    },{
        title: 'hello world',
        version: '0.1',
        createdAt: new Date(),
        code: '<button>test button</button>'
    },{
        title: 'hello world',
        version: '1',
        createdAt: new Date(),
        code: '<button>test button</button>'
    },{
        title: 'hello world',
        version: '1.1',
        createdAt: new Date(),
        code: '<button>test button</button>'
    }]

    const organizedVersions = organizeVersions(initialVersion);

    console.log('organizedVersions', organizedVersions)

    const [listVersion, setListVersion ] = useState(organizedVersions)


    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h2>
                    Selection
                </h2>
                <div className={styles.filter}>
                    <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z" />
                    </svg>
                    Filter
                </div>
            </div>
            <div className={styles.search}>
                <div className={styles.input}>
                    <svg class="" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                    <input
                        placeholder={`Buscar version..`}
                    />
                </div>
            </div>
            <div className={styles.subheader}>
                <b>
                    Editing 1 venue 2 rooms.
                </b>
                <a>
                    Select all
                </a>
            </div>
            <div>
                {listVersion.map((item, index) => (
                    <div className={styles.options}>
                        <div className={styles.arrow}>
                            <svg class="" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4 4 4-4" />
                            </svg>
                        </div>
                        <div className={styles.filters}>
                            <div className={styles.title}>
                                <input
                                    type="checkbox"
                                />
                                Jussi's Seaside Hotel
                            </div>
                            {false && (
                                <div className={styles.filter}>
                                    <input
                                        type="checkbox"
                                    />
                                    Super room
                                    {true ? (
                                        <svg ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.2 19 4.8-7-4.8-7H3l4.8 7L3 19h13.2Z" />
                                        </svg>
                                    ) : (
                                        <svg class="" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M3 4a1 1 0 0 0-.8 1.6L6.6 12l-4.4 6.4A1 1 0 0 0 3 20h13.2c.3 0 .6-.2.8-.4l4.8-7a1 1 0 0 0 0-1.2l-4.8-7a1 1 0 0 0-.8-.4H3Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



// VectorReact tiene que ser un programa sencillo que te permite crear un addon
// Va a guardar una interfaz en el vector para consumir datos con todo el poder del cloud
// 100 % seguro y licencia colabortiva


// Semilla
// vector(
// workspaceId // user client
// projectId // project client
// )

// Accesos decir para que tiene que ser
// database // category = addon

// data // buffer object data
// addon rpa..

// sql //
// options and another filters


// Ay es un documento que intrinsicamente podrás usar con los 20mvps,
// como no hay contexto se creara un reactVector con esa información.
// De hecho la idea es que se pueda crear un vector donde empezar a crear conceptos

// Un aythen vector va a ser una base de datos que tiene que contener solo un nombre,
// los vector name tienen una posición lo veremos luego.

// Entonces esto va a tener un config y un readme que va a permitir leer los archivos
// token: User

// id: son las funciones que va a hacer donde este el id debe ser una conexion
// vector: id es donde se guardaran los datos o se obtendran a nivel data
// version: `se pueden crear versiones que permiten mantener esas posiciones`
// description: ``





// mapa general con todos los clientes,
// añadir clientes en el google maps, y no lo puedo pasar a otro mapa,
// se puede quitar el mano a mano de los clientes,
// para ver las empresas y ahí añadir lugares de interés restaurantes, hoteles, gasolineras
// agentes mapa por empleados por clientes
// comerciales leads / clientes que llevaran los agentes