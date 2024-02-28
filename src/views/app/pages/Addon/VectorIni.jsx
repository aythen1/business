
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


// import styles from '../Settings/iam/modal.module.css'
import styles from './VectorIni.module.css'


import {
    addVectorAddon,
    addAddon,
    codeAddon
} from '@/actions/addon'


import {
    setCode
} from '@/slices/addonSlice'




import AddTag from '@/views/app/pages/shared/AddTag'



const initialDescription = `Crea una landing page para una pagina comercial de un negocio, que tenga la marca coorporativa de colores verdes, crea los siguientes componentes.

1. Header: Las 4 anclas de esta landingpage.
2. Formulario: Teléfono, nombre, términos.
3. Newsletter: Poner tu email.
4. About Us: Un carousel con una foto y un texto.`




const VectorCustom = ({ setModal, vector }) => {
    const dispatch = useDispatch()

    const { addon, code } = useSelector((state) => state.addon)

    const textareaRef = useRef(null);

    // const [isNewVector, setIsNewVector] = useState(vector?.id ? true : false);
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const [state, setState] = useState({
        id: vector?.id || '',
        version: vector?.version || '0',
        title: vector?.title || '',
        description: vector?.description || initialDescription,
        code: vector?.code || '',
        updatedAt: vector?.updatedAt || new Date(),
        createdAt: vector?.createdAt || new Date(),
    });


    useEffect(() => {
        if (code) {
            setIsLoading(false)
            handleInputChange(code, 'code')
        }
    }, [code])





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
                [property]: isValidText ? value.trim() : '',
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };


    const handleNewVector = () => {
        setIsLoading(true)
        dispatch(codeAddon({
            user: state.description
        }))
    }

    const handleAddVector = async () => {
        dispatch(addVectorAddon({
            addon,
            vector: state,
        }))
        dispatch(setModal(null))
    }

    const handleDeleteVector = () => {
        dispatch(setCode(null))
    }


    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Restablecer la altura para recalcular
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [state.description]);



    return (
        <div className={styles.modal}>
            <div className={styles.left}>
                {isLoading ? (
                    <div className={styles.bar}>
                        <div className={styles.progress}></div>
                    </div>
                ) : (
                    <div>
                        {code ? (
                            <div className={styles.button}>
                                <button
                                    className={styles.active}
                                    onClick={() => handleNewVector()}
                                    style={{
                                        minWidth: 45,
                                        width: 45,
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
                                    Delete
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
                )}

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
                <div style={{ width: '100%' }}>
                    <textarea
                        spellCheck="false"
                        ref={textareaRef}
                        value={state.description}
                        className={styles.textarea}
                        onChange={(e) => handleInputChange(e, 'description')}
                    />
                </div>
                <h2 className={styles.title}>
                    Enter key value tags
                </h2>
                <p className={styles.text}>
                    Key value tags helps you organize your users.
                </p>
                <div>
                    <AddTag
                        handleInputChange={handleInputChange}
                    />
                </div>
            </div>
            <div className={styles.right}>

                <div style={{ width: '100%' }}>
                    <div className={styles.dropPhoto}>
                        {code ? (
                            <div
                                className={styles.zoom}
                                dangerouslySetInnerHTML={{ __html: code }}
                            />
                        ) : (
                            <label>
                                AI AVAILABLE
                            </label>
                        )}
                    </div>
                </div>
                <p className={styles.text}>
                    Un vector lo puedes recuperar facilmente en tu addon vector
                </p>

            </div>
        </div>
    )
}



export default VectorCustom