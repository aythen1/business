import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-dom'
import { useNavigate } from 'react-router-dom';


import styles from './index.module.css'

import TableUsers from './tableUsers'
import TableApplications from './tableApplications'
import TablePolices from './tablePolices'
import TableAPIs from './tableAPIs'
import TableLogs from './tableLogs'

const IAM = ({

}) => {

  const {
    users,
    applications,
    polices,
    apis,
    logs
  } = useSelector((state) => state.iam)


  const navigate = useNavigate()



  const [selectedTab, setSelectedTab] = useState('users')


  const handleClickHome = () => {
    navigate(`/${'es'}/app/settings/home`)
  }

  return (
    <div className={styles.container}>
      <div>
        <div
          className={styles.back}
          onClick={() => handleClickHome()}
        > 
          <svg viewBox="0 0 16 16" class="e1afnb7a2 css-1bkb0co e1gt4cfo0"><path d="M5.3 8.7a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.4 1.4L7.42 8l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4Z"></path></svg>
          Back to home
        </div>
        <h2 className={styles.title}>
          Identity and Access Managmenet (IAM)
        </h2>

      </div>

      <div className={styles.tabs}>
        <ul className={styles.container}>
          <li
            onClick={() => setSelectedTab('users')}
            className={`${styles.tab} ${selectedTab === 'users' ? styles.selected : ''}`}
          >
            Users
            {users.length > 0 && (
              <label>
                {users.length}
              </label>
            )}
          </li>
          <li
            onClick={() => setSelectedTab('applications')}
            className={`${styles.tab} ${selectedTab === 'applications' ? styles.selected : ''}`}
          >
            Applications
            {applications.length > 0 && (
              <label>
                {applications.length}
              </label>
            )}
          </li>
          <li
            onClick={() => setSelectedTab('polices')}
            className={`${styles.tab} ${selectedTab === 'polices' ? styles.selected : ''}`}
          >
            Polices
            {polices.length > 0 && (
              <label>
                {polices.length}
              </label>
            )}
          </li>
          <li
            onClick={() => setSelectedTab('apis')}
            className={`${styles.tab} ${selectedTab === 'apis' ? styles.selected : ''}`}
          >
            API Keys
            {apis.length > 0 && (
              <label>
                {apis.length}
              </label>
            )}
          </li>
          <li
            onClick={() => setSelectedTab('logs')}
            className={`${styles.tab} ${selectedTab === 'logs' ? styles.selected : ''}`}
          >
            Logs
            {logs.length > 0 && (
              <label>
                {logs.length}
              </label>
            )}
          </li>
        </ul>
      </div>

      <div className={styles.table}>
        {selectedTab == 'users' ? (
          <TableUsers users={users} />
        ) : selectedTab == 'applications' ? (
          <TableApplications applications={applications} />
        ) : selectedTab == 'polices' ? (
          <TablePolices polices={polices} />
        ) : selectedTab == 'apis' ? (
          <TableAPIs apis={apis} />
        ) : selectedTab == 'logs' ? (
          <TableLogs logs={logs} />
        ) : (
          <TableUsers users={users} />
        )}
      </div>
    </div>
  )
}

export default IAM
