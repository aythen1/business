import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';


import Table from './table'
import styles from './index.module.css'
import stylesModal from './modal.module.css'


import {
  addApi,
  deleteApi,
  fetchsApi
} from '@/actions/iam'

import {
  setModal
} from '@/slices/iamSlice'
import { useNavigate } from 'react-router-dom';


const TableAPIs = ({
  apis
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stateTable, setStateTable] = useState('')


  const initialValue = {
    id: uuidv4(),
    type: 'users|applications',
    email: '',
    name: '',
    description: '',
    bearer: '',
    expirationat: '',
    createdAt: new Date()
  }


  const handleClickSupport = () => {
    navigate(`/${'es'}/app/support`)
  }



  return (
    <div className={styles.container}>
      <div className={styles.grid2}>
        <p className={styles.text}>
          Below is a list of the API keys in this Organization.
          <a onClick={() => handleClickSupport()}>
            How to create API keys
            <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
          </a>
        </p>
        <button
          onClick={() => dispatch(setModal(<PopupModalApis styles={stylesModal} />))}
          className={styles.button}
        >
          <svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
          Generate API key
        </button>
      </div>
      <div>
        <Table
          fetchs={fetchsApi}
          items={apis}
          setStateTable={setStateTable}
          handleAdd={() => dispatch(setModal(<PopupModalApis styles={stylesModal} />))}
        >
          <header>
            Apis
          </header>
          <item>
            Name
          </item>
        </Table>
      </div>
    </div>
  )
}

export default TableAPIs





















const PopupModalApis = ({ styles }) => {



  function generateKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }

    return key;
  }


  const [accessKeyId, setAccessKeyId] = useState(generateKey(32))
  const [secretKey, setSecretKey] = useState('SK-'+generateKey(8))

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>
        Generate an API Key
      </h2>
      <div className={styles.alert}>
        <svg viewBox="0 0 24 24" ><path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM12 2C6.47 2 2 6.5 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"></path></svg>
        Copy and store your secret key It will only be shown once.
      </div>
      <p className={styles.text1}>
        Gestiona tus vectores a través del acceso IAM añadiendo tus
        APIs keys para usarlos <br/><br/>
      </p>
        <b className={styles.textBold}>
          Access Key ID:
        </b>
      <div className={styles.code}>
        {accessKeyId}
        <div>
          code
          <svg viewBox="0 0 24 24" ><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>
        </div>
      </div>
        <b className={styles.textBold}>
          Secret Key:
        </b>
      <div className={styles.code}>
      {secretKey}
        <div>
          code
          <svg viewBox="0 0 24 24" ><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>
        </div>
      </div>
      
      <div className={styles.button}>
        <button className={styles.active}>
          Close Generate Key
        </button>
      </div>
    </div>
  )
}














const PopupModalApis1 = ({ styles }) => {
  const dispatch = useDispatch()

  // const [email, setEmail] = useState()
  const [isActive, setIsActive] = useState(false)


  // ---
  // required: ['id', 'type', 'name', 'bearer', 'expirationAt']
  const [state, setState] = useState({
    type: 'users',
    name: '',
    description: '',
    bearer: '',
    expirationat: new Date()
  });



  const handleInputChange = (e, property) => {
    let value = e;
    if (e.target) {
      value = e.target.value;
    }

    if (property === 'name') {
      const isValidValue = value.trim() !== '';

      // Establecer el estado y activar según si el valor no está vacío
      setIsActive(isValidValue);
    }


    setState((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };


  const handleAddApi = () => {
    const data = {
      name: state.name,
      description: state.description,
      status: 'active',
      type: 'users',
      bearer: '123',
      // tags: state.tags,
      expirationat: new Date(),
      createdat: new Date()
      // polices: state.polices,
    }

    dispatch(addApi({ api: data }))
    dispatch(setModal(null))
  }

  return (
    <div className={styles.modal}>
      <h2 className={styles.title} style={{ marginTop: -14 }}>
        Generate an API key
      </h2>
      <div className={`${styles.textBold} ${styles.gird2}`}>
        Select API key bearer
        <svg viewBox="0 0 24 24" ><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
      </div>
      <div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
          />
          Myself (IAM user)
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
          />
          An application
        </div>
      </div>
      <div className={`${styles.input} ${styles.disabled}`}>
        <input
          type="text"
          value="Select application"
          disabled
        ></input>
      </div>
      <div className={styles.input}>
        <label>
          Description
        </label>
        <input
          type="text"
          placeholder={'Optional'}
        />
      </div>
      <div className={styles.input}>
        <label>
          Expiration
        </label>
        <input
          type="text"
          value={state.expirationat}
          onChange={(e) => handleInputChange(e, 'expirationat')}
        />
      </div>
      <div>
        <b className={styles.info}>
          Will this API key be used for Object Storage?
          <svg viewBox="0 0 24 24" ><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
        </b>
        <div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
            />
            Myself (IAM user)
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
            />
            Myself (IAM user)
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <button
          className={styles.active}
          onClick={() => handleAddApi()}
        >
          Generate API Key
        </button>
      </div>
    </div>
  )
}

