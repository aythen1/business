import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';

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


const TableAPIs = ({
  
}) => {
  const dispatch = useDispatch();

  const { apis } = useSelector((state) => state.iam)

  const [stateTable, setStateTable] = useState('')


  const initialValue = {
    id:  uuidv4(),
    type: 'users|applications',
    email: '',
    name: '',
    description: '',
    bearer: '',
    expirationat: '',
    createdAt: new Date()
  }
 


  return (
    <div className={styles.container}>
      <div className={styles.grid2}>
        <p className={styles.text}>
          Below is a list of the API keys in this Organization. 
          <a>
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




const PopupModalApis = ({styles}) => {
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

    dispatch(addApi({api: data}))
    dispatch(setModal(null))
  }

  return (
      <div className={styles.modal}>
          <h2 className={styles.title} style={{marginTop: -14}}>
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
              <input type="text" ></input>
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
                onClick={() => handleAddApi()}
              >
                  Generate API Key
              </button>
          </div>
      </div>
  )
}

