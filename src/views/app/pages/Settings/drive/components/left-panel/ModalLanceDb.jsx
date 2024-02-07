import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import stylesModal from '../../../iam/modal.module.css'


const ModalLanceDb = ({ }) => {
    const [tag, setTag] = useState('home')

    return (
        <div>
            {tag == 'home' ? (
                <LanceHome styles={stylesModal} setTag={setTag} />

            ) : tag == 'custom' ? (
                <LanceCustom styles={stylesModal} setTag={setTag} />
            ) : (
                <LanceShare styles={stylesModal} setTag={setTag} />
            )}
        </div>
    )
}



export default ModalLanceDb





const LanceHome = ({ styles, setTag }) => {
    const dispatch = useDispatch()

    const handleClickShare = () => {
        setTag('share')
    }
    
    const handleClickInvite = () => {
        setTag('custom')
    }

    return (
        <div className={styles.modal}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Share your LanceDB
                </h2>
                <p className={styles.textBold}>
                    Enter the email address of each user to invite, separated by commas.
                </p>
                <p className={styles.text1}>
                    Key value tags helps you organize your users. You can assign up to 10 tags per user.
                </p>
                <div className={styles.button}>
                    <button
                        onClick={() => handleClickShare()}
                        className={`${styles.desactive}`}
                    >
                        Share
                    </button>
                    <button
                        onClick={() => handleClickInvite()}
                        className={`${styles.desactive}`}
                    >
                        Invite
                    </button>
                </div>
            </div>
        </div>
    )
}



const LanceCustom = ({ styles }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState()
    const [isActive, setIsActive] = useState(false)


    // ---
    const [state, setState] = useState({
        email: [],
        tags: [],
        group: '',
    });




    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'email') {
            // Dividir los correos electrónicos por comas y quitar los espacios en blanco
            const emailArray = value.split(',').map(email => email.trim());

            // Verificar si al menos hay un correo electrónico válido
            const isValidEmail = emailArray.some(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

            setIsActive(isValidEmail);

            setState((prevState) => ({
                ...prevState,
                [property]: isValidEmail ? emailArray : [value],
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };




    const handleAddUser = () => {
        const data = {
            token: token,
            user: state.email,
            tags: state.tags,
            group: state.group
        }

        dispatch(addUser(data))
    }


    return (
        <div className={styles.modal} style={{width: '300px'}}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    New LanceDB
                </h2>
                <p className={styles.text1}>
                    Key value tags helps you organize your users. You can assign up to 10 tags per user.
                </p>
                <div>
                    <p className={styles.textBold}>
                        Add to an existing group (optional)
                    </p>
                        <div className={styles.input}>
                            <input
                                type="text"
                                value={'Select or type group'}
                                onChange={(e) => handleInputChange(e, 'group')}
                            />
                        </div>
                    <p className={styles.textBold} style={{marginTop: 10}}>
                        Add to an existing group (optional)
                    </p>
                        <div className={styles.input}>
                            <input
                                type="text"
                                value={'Select or type group'}
                                onChange={(e) => handleInputChange(e, 'group')}
                            />
                        </div>
                    <p className={styles.textBold} style={{ marginTop: '1em' }}>
                        Enter the email address of each user to invite, separated by commas.
                    </p>
                    <textarea
                        placeholder={'mails@example.com'}
                        className={styles.textarea}
                        value={state.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                    />

                    <div className={styles.button}>
                        <button
                            // onClick={() => handleAddUser()}
                            className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                        >
                            Invite
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}




const LanceShare = ({ styles }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState()
    const [isActive, setIsActive] = useState(false)


    // ---
    const [state, setState] = useState({
        email: [],
        tags: [],
        group: '',
    });




    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'email') {
            // Dividir los correos electrónicos por comas y quitar los espacios en blanco
            const emailArray = value.split(',').map(email => email.trim());

            // Verificar si al menos hay un correo electrónico válido
            const isValidEmail = emailArray.some(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

            setIsActive(isValidEmail);

            setState((prevState) => ({
                ...prevState,
                [property]: isValidEmail ? emailArray : [value],
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };




    const handleAddUser = () => {
        const data = {
            token: token,
            user: state.email,
            tags: state.tags,
            group: state.group
        }

        dispatch(addUser(data))
    }


    return (
        <div className={styles.modal}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Share your LanceDB
                </h2>
                <div className={styles.girdBox2}>
                    <div className={`${styles.item} ${styles.gird1}`}>
                        <label>
                            ID:
                        </label>
                        <div className={styles.gird2}>
                            <span>
                                6cab0034-da88-4209-950d-f3efe9a4e583
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
                <p className={styles.text1}>
                    Key value tags helps you organize your users. You can assign up to 10 tags per user.
                </p>
                <div>
                    <p className={styles.textBold}>
                        Add to an existing group (optional)
                    </p>
                    <div className={styles.gird2}>
                        <div className={styles.input}>
                            <input
                                type="text"
                                value={'Select or type group'}
                                onChange={(e) => handleInputChange(e, 'group')}
                            />
                        </div>
                        <div className={styles.input}>
                            <input
                                type="text"
                                value={'Select or type group'}
                                onChange={(e) => handleInputChange(e, 'group')}
                            />
                        </div>
                    </div>
                    <p className={styles.textBold} style={{ marginTop: '1em' }}>
                        Enter the email address of each user to invite, separated by commas.
                    </p>
                    <textarea
                        placeholder={'mails@example.com'}
                        className={styles.textarea}
                        value={state.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                    />

                    <div className={styles.button}>
                        <button
                            // onClick={() => handleAddUser()}
                            className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                        >
                            Invite
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


