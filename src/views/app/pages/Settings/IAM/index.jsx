import React, { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'// import React, { useEffect, useRef, useState } from 'react'import styles from './index.module.css'// import IconServer from './assets/IconServer'// import IconArrowDown from './assets/IconArrowDown'// import IconArrowUp from './assets/IconArrowUp'// import IconCopy from './assets/IconCopy'// import IconImportant from './assets/IconImportant'// import IconSettings from './assets/IconSettings'// import NoneInstance from './assets/NoneInstance.webp'// import {  //   // postInstance,//   // getServersZone,//   deleteInstance,//   getProjectInstance// } from '@/store/redux/actions/instances'// import { useParams } from 'next/navigation'// import {  //   addDashboard// } from '@/actions/dashboard'import { useDispatch, useSelector } from 'react-redux'

import styles from './index.module.css'

import TableUsers from './tableUsers'
import TableApplications from './tableApplications'
import TablePolices from './tablePolices'
import TableAPIs from './tableAPIs'
import TableLogs from './tableLogs'

const IAM = ({

}) => {


  /*
  1. Coje un ID de workspaceID para guardar
  2. Coje un ID del tabs con el inisitalFormat para guardar
  3. Guarda/Update/Elimina a través de lanceDB
  4. Guarda en el actions/slice de IAM y muestra con la tabla
  */


  const [selectedTab, setSelectedTab] = useState('users')

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Identity and Access Managmenet (IAM)
      </h2>

      <div className={styles.tabs}>
        <ul className={styles.container}>
          <li
            onClick={() => setSelectedTab('users')} 
            className={`${styles.tab} ${selectedTab === 'users' ? styles.selected : ''}`}
          >
            Users
            <label>
              10
            </label>
          </li>
          <li
            onClick={() => setSelectedTab('applications')}  
            className={`${styles.tab} ${selectedTab === 'applications' ? styles.selected : ''}`}
          >
            Applications
            <label>
              10
            </label>
          </li>
          <li 
            onClick={() => setSelectedTab('polices')} 
            className={`${styles.tab} ${selectedTab === 'polices' ? styles.selected : ''}`}
          >
            Policies
            <label>
              10
            </label>
          </li>
          <li 
            onClick={() => setSelectedTab('apis')} 
            className={`${styles.tab} ${selectedTab === 'apis' ? styles.selected : ''}`}
          >
            API Keys
            <label>
              10
            </label>
          </li>
          <li 
            onClick={() => setSelectedTab('logs')} 
            className={`${styles.tab} ${selectedTab === 'logs' ? styles.selected : ''}`}
          >
            Logs
            <label>
              10
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.table}>
        {selectedTab == 'users' ? (
          <TableUsers />
        ) : selectedTab == 'applications' ? (
          <TableApplications />
        ) : selectedTab == 'polices' ? (
          <TablePolices />
        ) : selectedTab == 'apis' ? (
          <TableAPIs />
        ) : selectedTab == 'logs' ? (
          <TableLogs />
        ): (
          <TableUsers />
        )}
      </div>
    </div>
  )
}

export default IAM
