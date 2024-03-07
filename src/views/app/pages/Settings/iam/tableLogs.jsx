import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import Table from './table'
import styles from './index.module.css'
import stylesModal from './modal.module.css'



import {
  addLog,
  deleteLog,
  deleteLogs,
  fetchsLog
} from '@/actions/iam'



import {
  setModal
} from '@/slices/iamSlice'
import { useNavigate } from 'react-router-dom';




const TableLogs = ({
  logs
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.iam)

  const [stateTable, setStateTable] = useState('')


  const initialValue = {
    id: uuidv4(),
    action: 'created|updated|deleted',
    resource: '',
    performedBy: {
      email: '',
      userId: uuidv4()
    },
    createdAt: new Date()
  }


  // ---
  const [state, setState] = useState({
    name: '',
    description: '',
    tags: [],
    polices: ''
  });


  const handleResetLog = () => {
    dispatch(deleteLogs({}))
  }




  const handleAddLog = () => {
    const data = {
      name: state.name || `Access to {${user?.name}}`,
      action: 'created',
      description: state.description,
      status: 'active',
      createdAt: new Date()
    }

    dispatch(addLog({ log: data }))
    dispatch(setModal(null))
  }

  const handleClickSupport = () => {
    navigate(`/${'es'}/app/support`)
  }



  // -----------------------------------------------------------------
  useEffect(() => {
    if(stateTable.startsWith('edit-item:')){
      const id = stateTable.split(':')[1]
      console.log('item', id)
      dispatch(setModal(<PopupModalLogs styles={stylesModal} />))
    }
  }, [stateTable])

  return (
    <div className={styles.container}>
      <div className={styles.grid2}>
        <p className={styles.text}>
          Below is the list of your IAM resource logs. IAM resources can be IAM users, applications, groups, API keys and policies. You can get more details about each of them.
          <a onClick={() => handleClickSupport()}>
            How to understand my logs?
            <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
          </a>
        </p>
      </div>
      <div className={styles.boxForm}>
        <div className={styles.input}>
          <input
            type="text"
            spellCheck="false"
            placeholder={'Filter by exact IAM resource ID'}
          />
        </div>
        <div className={styles.input}>
          <label>
            Date
          </label>
          <input
            type="text"
            spellCheck="false"
            placeholder={'Fecha de iam'}
          />
        </div>
        <div className={styles.input}>
          <label>
            Category
          </label>
          <input
            type="text"
            spellCheck="false"
            placeholder={'category'}
          />
        </div>
        <div className={styles.input}>
          <label>
            Action
          </label>
          <input
            type="text"
            spellCheck="false"
            placeholder={'Action'}
          />
        </div>
        <div className={styles.button}>
          <button
            onClick={() => handleAddLog()}
          >
            Add
          </button>
          <button
            onClick={() => handleResetLog()}
            className={styles.reset}
          >
            Reset
          </button>
        </div>
        <div className={styles.button}>
          <button
            onClick={() => alert(1)}
            className={styles.filter}
          >
            Filter
          </button>
        </div>
      </div>
      <div>
        <Table
          fetchs={fetchsLog}
          items={logs}
          setStateTable={setStateTable}
          handleAdd={() => dispatch(setModal(<PopupModalLogs styles={stylesModal} />))}
        >
          <header>
            Logs
          </header>
          <item>
            Name
          </item>
          <item>
            Action
          </item>
          <item>
            Description
          </item>
          <item>
            Status
          </item>
          <item>
            createdAt
          </item>
        </Table>
      </div>
    </div>
  )
}

export default TableLogs




const PopupModalLogs = ({ styles }) => {
  return (
    <div className={styles.modal}>
      <h2 className={styles.title} style={{ marginTop: -10 }}>
        Logs information
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
      <div className={styles.containerRemove}>
        <h2 className={styles.title}>
          Remove Log
        </h2>
        <div className={`${styles.box} ${styles.gird2}`}>
          <p className={styles.text}>
            Removing a log from this Organization automatically deletes their API keys, and any policies directly attached to them will be left orphaned.
          </p>
          <div className={styles.button}>
            <button className={styles.delete}>
              Remove log
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
