import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid';

import Table from './table'
import styles from './index.module.css'
import stylesModal from './modal.module.css'

import AddTag from './AddTag'


import {
    fetchsUser,
    addUser,
    deleteUser
} from '@/actions/iam'

import {
    setModal
} from '@/slices/iamSlice'
// import { getEmail } from '../../../../../../service/services/email';



const TableUsers = ({

}) => {
    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.iam)

    const [stateTable, setStateTable] = useState('')

    useEffect(() => {
      if(stateTable.startsWith('edit-item:')){
        const id = stateTable.split(':')[1]
        const index = users.findIndex(user => user.id === id);
        const user = users[index]
        console.log('user', user)

        dispatch(setModal(<PopupModalUser user={user} styles={stylesModal} />))
      }else if(stateTable.startsWith('delete-item:')){
        const id = stateTable.split(':')[1]
        const token = localStorage.getItem('token')
        dispatch(deleteUser({token, id}))
      }
    }, [stateTable])


    



    return (
        <div className={styles.container}>
            <div className={styles.grid2}>
                <p className={styles.text}>
                    Below is a list of users in this Organization. You can view more information about each user.
                    <a>
                        What are users?
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </a>
                </p>
                <button
                    onClick={() => dispatch(setModal(<PopupModalAddUser styles={stylesModal} />))}
                    className={styles.button}
                >
                    <svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
                    Add user
                </button>
            </div>
            <div>

                <Table 
                    fetchs={fetchsUser}
                    items={users}
                    setStateTable={setStateTable}
                >
                    <header>
                        Users
                    </header>
                    <item filter="user-email">
                        User
                    </item>
                    <item>
                        Is Verified
                    </item>
                    <item filter="date" name="upgradedat">
                        Last Login
                    </item>
                    <item  filter="date" name="upgradedat">
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
        const token = localStorage.getItem('token')
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
            <h2 className={styles.title} style={{ marginTop: -10 }}>
                Invite user(s)
            </h2>
            <p className={styles.textBold}>
                Enter the email address of each user to invite, separated by commas.
            </p>
            <textarea
                placeholder={'mails@example.com'}
                className={styles.textarea}
                value={state.email}
                onChange={(e) => handleInputChange(e, 'email')}
            />
            <h2 className={styles.title}>
                Enter key value tags
            </h2>
            <p className={styles.text1}>
                Key value tags helps you organize your users. You can assign up to 10 tags per user.
            </p>
            <AddTag 
                handleInputChange={handleInputChange}
                />
            <p className={styles.textBold}>
                Add to an existing group (optional)
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
                    Invite
                </button>
            </div>
        </div>
    )
}


const PopupModalUser = ({ styles, user }) => {
    const dispatch = useDispatch();

    const handleClickRemoveUser = () => {
        const id = user.id
        const token = localStorage.getItem('token')
        dispatch(deleteUser({token, id}))   
        dispatch(setModal(null))
    }


    return (
        <div className={styles.modal}>
            <h2 className={styles.title} style={{ marginTop: -10 }}>
                User information
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
            <AddTag />
            <div className={styles.containerRemove}>
                <h2 className={styles.title}>
                    Remove user
                </h2>
                <div className={`${styles.box} ${styles.gird2}`}>
                    <p className={styles.text}>
                        Removing a user from this Organization automatically deletes their API keys, and any policies directly attached to them will be left orphaned.
                    </p>
                    <div className={styles.button}>
                        <button 
                            onClick={() => handleClickRemoveUser()}
                            className={styles.delete}
                        >
                            Remove user
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}














