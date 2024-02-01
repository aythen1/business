import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid';


import Table from './table'
import styles from './index.module.css'
import stylesModal from './modal.module.css'

import AddTag from './AddTag'



import {
  addApplication,
  deleteApplication,
  fetchsApplication
} from '@/actions/iam'


import {
  setModal
} from '@/slices/iamSlice'
// import { fetchsApplication } from '../../../../../../service/controllers/iam';

const TableApplications = ({

}) => {
  const dispatch = useDispatch();

  const { applications } = useSelector((state) => state.iam)

  const [stateTable, setStateTable] = useState('')


  const initialValue = {
    id: uuidv4(),
    name: '',
    description: '',
    status: '',
    tags: [],
    polices: [],
    createdAt: new Date()
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid2}>
        <p className={styles.text}>
          Below is a list of applications in this Organization. You can view more information about each application.
          <a>
            What are applications?
            <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
          </a>
        </p>
        <button
          onClick={() => dispatch(setModal(<PopupModalApp styles={stylesModal} />))}
          className={styles.button}
        >
          <svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
          Create App
        </button>
      </div>
      <div>
        <Table
          fetchs={fetchsApplication}
          items={applications}
          setStateTable={setStateTable}
        >
          <header>
            Applications
          </header>
          <item>
            Name
          </item>
          
        </Table>
      </div>
    </div>
  )
}

export default TableApplications


const PopupModalApp = ({ styles }) => {

  const dispatch = useDispatch()

  // const [email, setEmail] = useState()
  const [isActive, setIsActive] = useState(false)


  // ---
  const [state, setState] = useState({
    name: '',
    description: '',
    tags: [],
    polices: ''
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


  const handleAddApplication = () => {
    const data = {
      name: state.name,
      description: state.description,
      status: 'active',
      // tags: state.tags,
      createdAt: new Date()
      // polices: state.polices,
    }

    dispatch(addApplication({application: data}))
    dispatch(setModal(null))
  }


  return (
    <div className={styles.modal}>
      <h2 className={styles.title} style={{ marginTop: -14 }}>
        Create an Application
      </h2>
      <div className={styles.gird2}>
        <div>
          <label className={styles.labelNum}>
            1
          </label>
        </div>
        <div>
          <h2 className={styles.title}>
            Enter a name and optional description
          </h2>
          <div className={styles.input}>
            <label>
              Name
            </label>
            <input
              value={state.name || 'applications-pricelesss-beaver'}
              onChange={(e) => handleInputChange(e, 'name')}
            />
            <div className={styles.button}>
              <svg viewBox="0 0 24 24" ><path d="M7.5,5.6L5,7L6.4,4.5L5,2L7.5,3.4L10,2L8.6,4.5L10,7L7.5,5.6M19.5,15.4L22,14L20.6,16.5L22,19L19.5,17.6L17,19L18.4,16.5L17,14L19.5,15.4M22,2L20.6,4.5L22,7L19.5,5.6L17,7L18.4,4.5L17,2L19.5,3.4L22,2M13.34,12.78L15.78,10.34L13.66,8.22L11.22,10.66L13.34,12.78M14.37,7.29L16.71,9.63C17.1,10 17.1,10.65 16.71,11.04L5.04,22.71C4.65,23.1 4,23.1 3.63,22.71L1.29,20.37C0.9,20 0.9,19.35 1.29,18.96L12.96,7.29C13.35,6.9 14,6.9 14.37,7.29Z"></path></svg>
            </div>
          </div>
          <div className={styles.info}>
            <svg viewBox="0 0 24 24"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
            <p>
              Your application name can only contain alphanumeric characters, dots and dashes.
            </p>
          </div>
          <div className={styles.input}>
            <label>
              Description
            </label>
            <input
              placeholder={'Description'}
              value={state.description}
              onChange={(e) => handleInputChange(e, 'description')}
            />
          </div>
        </div>
      </div>
      <div className={styles.gird2}>
        <div>
          <label className={styles.labelNum}>
            2
          </label>
        </div>
        <div>
          <h2 className={styles.title}>
            Enter key value tags (optional)
          </h2>
          <p className={styles.text}>
            Key value tags help you organize your applications. You can assign up to 10 tags per application.
          </p>
          <AddTag
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
      <div className={styles.gird2}>
        <div>
          <label className={styles.labelNum}>
            3
          </label>
        </div>
        <div>
          <h2 className={styles.title}>
            Enter key value tags (optional)
          </h2>
          <div className={styles.input}>
            <input placeholder={'Select a policy'} />
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <button
          className={`${isActive ? styles.active : ''}`}
          onClick={() => handleAddApplication()}
        >
          Create application
        </button>
      </div>
    </div>
  )
}

