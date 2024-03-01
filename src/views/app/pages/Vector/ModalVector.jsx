import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import styles from '../Settings/iam/modal.module.css'
// src\views\app\pages\Settings\iam\modal.module.css

import AddTag from '@/views/app/pages/shared/AddTag'
// src\views\app\pages\shared\AddTag.jsx

import { v4 as uuidv4 } from 'uuid';



import {
    iniVector,
    addVector,
    deleteVector
} from '@/actions/vector'


import {
    setModal
} from '@/slices/iamSlice'

// import {
//     fetchsVector,

//     addVectorData,
//     updateVector,
//     addVector
// } from '@/actions/vector'





export const ModalAddVector = ({ }) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [email, setEmail] = useState()
    const [isActive, setIsActive] = useState(false)


    const { user } = useSelector((state) => state.iam)

    // ---
    const [state, setState] = useState({
        title: '',
        description: '',
        tags: []
    });




    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'title') {
            setIsActive(value.length >= 5);

            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };




    const handleNewVector = async () => {
        let id = iniVector({
            workspaceId: user.id,
            projectId: 'vector',
        })
        const data = {
            // user: state.email,
            // tags: state.tags,
            // group: state.group,

            id: uuidv4(),
            version: '',
            title: '',
            description: '',

            code: '',
            data: '',

            nodes: [],
            edges: []
        }

        await dispatch(addVector({
            id,
            name: 'vectors',
            data
        }))


        dispatch(setModal(null))


        navigate(`/${'es'}/app/vector/${data.id}`)
    }



    return (
        <div className={styles.modal}>
            <h2 className={styles.title} style={{ marginTop: -10 }}>
                Create a New Vector
            </h2>
            <div className={styles.maxHeight}>
                <p className={styles.textBold}>
                    Añade un titulo para tu vector.
                </p>
                <div className={styles.input}>
                    <input
                        type="text"
                        spellCheck="false"
                        placeholder={'Escribe el titulo'}
                        value={state.title}
                        onChange={(e) => handleInputChange(e, 'title')}
                    />
                </div>
                <p className={styles.textBold}>
                    Añade una descripción para tu vector.
                </p>
                <textarea
                    spellCheck="false"
                    placeholder={'Escribe la descripción'}
                    className={styles.textarea}
                    value={state.description}
                    onChange={(e) => handleInputChange(e, 'description')}
                />
                <h2 className={styles.title}>
                    Enter key value tags
                </h2>
                <p className={styles.text1}>
                    Key value tags helps you organize your vectors. You can assign up to 10 tags per user.
                </p>
                <AddTag
                    handleInputChange={handleInputChange}
                />
            </div>

            <div className={styles.button}>
                <button
                    onClick={() => handleNewVector()}
                    className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                >
                    New Vector
                </button>
            </div>
        </div>
    )
}












export const ModalVector = ({ vector }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.iam)

    const handleDeleteVector = () => {
        // const id = vector.id
        const id = iniVector({
            workspaceId: user.id,
            projectId: 'vector',
        })

        dispatch(deleteVector({
            id,
            name: 'vectors',
            data: {
                id: vector.id
            }
        }))


        dispatch(setModal(null))
        navigate(`/${'es'}/app/vector`)
    }


    return (
        <div className={styles.modal}>
            <h2 className={styles.title} style={{ marginTop: -10 }}>
                Vector information
            </h2>
            <div className={styles.girdBox2}>
                <div className={`${styles.item} ${styles.gird1}`}>
                    <label>
                        ID:
                    </label>
                    <div className={styles.gird2}>
                        <span>
                            {vector.id || 'null'}
                            {/* 6cab0034-da88-4209-950d-f3efe9a4e583 */}
                        </span>
                        <div>
                            <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <label>
                        Status
                    </label>
                    <div className={styles.gird2}>
                        <div className={styles.dot}></div>
                        <span>
                            Activated
                        </span>
                    </div>
                </div>
                <div className={styles.item}>
                    <label>
                        Type
                    </label>
                    <div>
                        <div></div>
                        <span>
                            Guest
                        </span>
                    </div>
                </div>
                <div className={styles.item}>
                    <label>
                        Joined on:
                    </label>
                    <div>
                        <span>
                            Dec 15, 2023
                        </span>
                    </div>
                </div>
                <div className={styles.item}>
                    <label>
                        Last login:
                    </label>
                    <div>
                        <span>
                            Jan 19, 2024
                        </span>
                    </div>
                </div>
            </div>
            <AddTag />
            <div className={styles.containerRemove}>
                <h2 className={styles.title}>
                    Remove Vector
                </h2>
                <div className={`${styles.box} ${styles.gird2}`}>
                    <p className={styles.text}>
                        Removing a user from this Organization automatically deletes their API keys, and any policies directly attached to them will be left orphaned.
                    </p>
                    <div className={styles.button}>
                        <button
                            onClick={() => handleDeleteVector()}
                            className={styles.delete}
                        >
                            Remove Vector
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


