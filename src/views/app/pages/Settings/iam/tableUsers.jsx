import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Table from './table'
import styles from './index.module.css'
import stylesModal from './modal.module.css'

import AddTag from '@/views/app/pages/shared/AddTag'


import {
    fetchsUser,
    addUser,
    deleteUser
} from '@/actions/iam'

import {
    setModal
} from '@/slices/iamSlice'



const TableUsers = ({
    users
}) => {
    const { t } = useTranslation()
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [stateTable, setStateTable] = useState('')

    useEffect(() => {
        if (stateTable.startsWith('edit-item:')) {
            const id = stateTable.split(':')[1]
            const index = users.findIndex(user => user.id === id);
            const user = users[index]

            dispatch(setModal(<PopupModalUser user={user} styles={stylesModal} />))
        } else if (stateTable.startsWith('delete-item:')) {
            const id = stateTable.split(':')[1]
            dispatch(deleteUser({ id }))
        } else if (stateTable.startsWith('checkbox-item')) {
            console.log('selected checkbox')
        }
    }, [stateTable])





    const handleClickSupport = () => {
        navigate(`/${'es'}/app/support`)
    }


    return (
        <div className={styles.container}>
            <div className={styles.grid2}>
                <p className={styles.text}>
                {t('iam.users.t1')}
                    <a onClick={() => handleClickSupport()}>
                    {t('iam.users.t2')}
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </a>
                </p>
                <button
                    onClick={() => dispatch(setModal(<PopupModalAddUser styles={stylesModal} />))}
                    className={styles.button}
                >
                    <svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
                    {t('iam.users.t3')}
                </button>
            </div>
            <div>
                <Table
                    fetchs={fetchsUser}
                    items={users}
                    setStateTable={setStateTable}
                    handleAdd={() => dispatch(setModal(<PopupModalAddUser styles={stylesModal} />))}
                >
                    <header>
                        Usuario
                    </header>
                    <item filter="checkbox" size="50">

                    </item>
                    <item filter="user-email">
                        User
                    </item>
                    <item>
                        Is Verified
                    </item>
                    <item filter="date" name="upgradedat">
                        Last Login
                    </item>
                    <item filter="date" name="upgradedat">
                        Joined On
                    </item>
                    <item filter="options">
                        Options
                    </item>
                </Table>
            </div>
        </div>
    )
}



export default TableUsers







const PopupModalAddUser = ({ styles }) => {
    const { t } = useTranslation()
    
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)


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
            const emailArray = value.split(',').map(email => email.trim());
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
            user: state.email,
            tags: state.tags,
            group: state.group
        }

        dispatch(addUser(data))
    }



    return (
        <div className={styles.modal}>
            <h2 className={styles.title} style={{ marginTop: -10 }}>
            {t('iam.users.t4')}
            </h2>
            <p className={styles.textBold}>
            {t('iam.users.t5')}
            </p>
            <textarea
                placeholder={'mails@example.com'}
                className={styles.textarea}
                value={state.email}
                onChange={(e) => handleInputChange(e, 'email')}
            />
            <h2 className={styles.title}>
            {t('iam.users.t6')}
            </h2>
            <p className={styles.text1}>
            {t('iam.users.t7')}
            </p>
            <AddTag
                handleInputChange={handleInputChange}
            />
            <p className={styles.textBold}>
            {t('iam.users.t8')}
            </p>
            <div className={styles.input}>
                <input
                    type="text"
                    value={state.group || 'Select or type group'}
                    onChange={(e) => handleInputChange(e, 'group')}
                />
            </div>
            <div className={styles.button}>
                <button
                    onClick={() => handleAddUser()}
                    className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                >
                    {t('iam.users.t9')}
                </button>
            </div>
        </div>
    )
}


const PopupModalUser = ({ styles, user }) => {
    const dispatch = useDispatch();

    const handleClickRemoveUser = () => {
        const id = user.id
        dispatch(deleteUser({ id }))
        dispatch(setModal(null))
    }


    return (
        <div className={styles.modal}>
            <h2 className={styles.title} style={{ marginTop: -10 }}>
            {t('iam.users.t10')}
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
                    {t('iam.users.t11')}
                    </label>
                    <div className={styles.gird2}>
                        <div className={styles.dot}></div>
                        <span>
                        {t('iam.users.t12')}
                        </span>
                    </div>
                </div>
                <div className={styles.item}>
                    <label>
                    {t('iam.users.t13')}
                    </label>
                    <div>
                        <div></div>
                        <span>
                        {t('iam.users.t14')}
                        </span>
                    </div>
                </div>
                <div className={styles.item}>
                    <label>
                    {t('iam.users.t15')}:
                    </label>
                    <div>
                        <span>
                            Dec 15, 2023
                        </span>
                    </div>
                </div>
                <div className={styles.item}>
                    <label>
                    {t('iam.users.t16')}:
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
                {t('iam.users.t17')}
                </h2>
                <div className={`${styles.box} ${styles.gird2}`}>
                    <p className={styles.text}>
                    {t('iam.users.t18')}
                    </p>
                    <div className={styles.button}>
                        <button
                            onClick={() => handleClickRemoveUser()}
                            className={styles.delete}
                        >
                           {t('iam.users.t19')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}














