import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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




const TableLogs = ({
  logs
}) => {
  const { t } = useTranslation();

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
        {t('iam.logs.t1')}
          <a onClick={() => handleClickSupport()}>
          {t('iam.logs.t2')}
            <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
          </a>
        </p>
      </div>
      <div className={styles.boxForm}>
        <div className={styles.input}>
          <input
            type="text"
            spellCheck="false"
            placeholder={t('iam.logs.t3')}
          />
        </div>
        <div className={styles.input}>
          <label>
          {t('iam.logs.t4')}
          </label>
          <input
            type="text"
            spellCheck="false"
            placeholder={t('iam.logs.t5')}
          />
        </div>
        <div className={styles.input}>
          <label>
          {t('iam.logs.t6')}
          </label>
          <input
            type="text"
            spellCheck="false"
            placeholder={t('iam.logs.t7')}
          />
        </div>
        <div className={styles.input}>
          <label>
          {t('iam.logs.t8')}
          </label>
          <input
            type="text"
            spellCheck="false"
            placeholder={t('iam.logs.t9')}
          />
        </div>
        <div className={styles.button}>
          <button
            onClick={() => handleAddLog()}
          >
            {t('iam.logs.t10')}
          </button>
          <button
            onClick={() => handleResetLog()}
            className={styles.reset}
          >
            {t('iam.logs.t11')}
          </button>
        </div>
        <div className={styles.button}>
          <button
            onClick={() => alert(1)}
            className={styles.filter}
          >
            {t('iam.logs.t12')}
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
          {t('iam.logs.t13')}
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
  const { t } = useTranslation()
  
  return (
    <div className={styles.modal}>
      <h2 className={styles.title} style={{ marginTop: -10 }}>
      {t('iam.logs.t14')}
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
          {t('iam.logs.t15')}
          </label>
          <div className={styles.gird2}>
            <div className={styles.dot}></div>
            <span>
            {t('iam.logs.t16')}
            </span>
          </div>
        </div>
        <div className={styles.item}>
          <label>
          {t('iam.logs.t17')}
          </label>
          <div>
            <div></div>
            <span>
            {t('iam.logs.t18')}
            </span>
          </div>
        </div>
        <div className={styles.item}>
          <label>
          {t('iam.logs.t19')}:
          </label>
          <div>
            <span>
              Dec 15, 2023
            </span>
          </div>
        </div>
        <div className={styles.item}>
          <label>
          {t('iam.logs.t20')}:
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
        {t('iam.logs.t21')}
        </h2>
        <div className={`${styles.box} ${styles.gird2}`}>
          <p className={styles.text}>
          {t('iam.logs.t22')}
          </p>
          <div className={styles.button}>
            <button className={styles.delete}>
            {t('iam.logs.t23')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
