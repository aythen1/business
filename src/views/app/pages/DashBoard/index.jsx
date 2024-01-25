import React, { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

// import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'

import IconServer from './assets/IconServer'
import IconArrowDown from './assets/IconArrowDown'
import IconArrowUp from './assets/IconArrowUp'
import IconCopy from './assets/IconCopy'
import IconImportant from './assets/IconImportant'
import IconSettings from './assets/IconSettings'
import NoneInstance from './assets/NoneInstance.webp'


// import {
//   // postInstance,
//   // getServersZone,
//   deleteInstance,
//   getProjectInstance
// } from '@/store/redux/actions/instances'

// import { useParams } from 'next/navigation'

import {
  addDashboard
} from '@/actions/dashboard'


import { useDispatch, useSelector } from 'react-redux'

const Dashboard = ({
  setDashboardId
}) => {
  const dispatch = useDispatch()

  // const { projectId } = useParams()

  // const [editMode, setEditMode] = useState(false)
  const [listDashboards, setListDashboards] = useState([])

  const [textToolTip, setTextToolTip] = useState(null)
  const [isToolTipHovered, setIsToolTipHovered] = useState(false)
  const [positionToolTip, setPositionToolTip] = useState({ top: 0, left: 0 })

  // const instances = dispatch(getProjectInstance()
  const dashboards = useSelector((state) => state.dashboard?.dashboards)

  const dataFetch = async () => {
    try{
      console.log('data fetch')
      // await dispatch(getProjectInstance(projectId))
    }catch(err){  
      console.log('Error', err)
    }
  }

  useEffect(() => {
    console.log('wdnwndnie', dashboards)
    setListDashboards(dashboards)
  }, [dashboards])


  const handleAddDashboard = (uuid) => {
    const newUUID = uuidv4()

    // setDashboardId(newUUID)

    const newDashboard = {
      name: 'new Dashboard'
    }

    dispatch(addDashboard(newDashboard))

    // // Actualizar la URL con el nuevo UUID
    const newURL = `?dashboard=${encodeURIComponent(newUUID)}`
    window.history.pushState(null, null, newURL)
  }


  const handleToolTipMouseEnter = (e) => {
    setIsToolTipHovered(true)
    setPositionToolTip({ top: e.clientY, left: e.clientX })
    // console.log('dataset', e.target.dataset.tooltip)
    setTextToolTip(e.target.dataset.tooltip)
  }

  const handleToolTipMouseLeave = () => {
    setIsToolTipHovered(false)
  }

  const handleClickDashboard = (id) => {
    const newUUID = uuidv4()
    setDashboardId(newUUID)
    // setDashboardId(id)

    const newURL = `?dashboard=${encodeURIComponent(id)}`
    window.history.pushState(null, null, newURL)
  }

  // const handlePopupSettings = () => {
  //   alert(1)
  // }

  const handleMoreInfo = () => {}

  const handlePowerOff = () => {}

  const handleReboot = () => {}

  const handleStandby = () => {}

  const handleDetachIP = () => {}

  const handleDeleteInstance = (id) => {
    // dispatch(deleteInstance(id))
  }

  const Filters = () => {
    return (
      <div className={styles.filters}>
        <IconArrowUp />
        <IconArrowDown />
      </div>
    )
  }

  // const listInstances = [
  //   // {
  //   //   instance: {
  //   //     name: 'scw-develop',
  //   //     type: 'PLAY2-MICRO'
  //   //   },
  //   //   ip: '163.177.175.163',
  //   //   created: '2023-12-30T12:16:08.260Z',
  //   //   zone: 'PAR 1'
  //   // },
  //   // {
  //   //   instance: {
  //   //     name: 'scw-develop',
  //   //     type: 'PLAY2-MICRO'
  //   //   },
  //   //   ip: '163.177.175.163',
  //   //   created: '2023-12-30T12:16:08.260Z',
  //   //   zone: 'PAR 1'
  //   // }
  // ]

  // const [isChecked, setIsChecked] = useState(false)

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked)
  // }

  /* checkbox */
  const [selectedDashboards, setSelectedDashboards] = useState([])

  const handleCheckboxChange = (index) => {
    setSelectedDashboard((prevSelectedDashboards) => {
      // Clonar el array para no mutar el estado directamente
      const newSelectedDashboards = [...prevSelectedDashboards]

      // Alternar la selección de la instancia en el índice dado
      newSelectedDashboards[index] = !newSelectedDashboards[index]

      return newSelectedDashboards
    })
  }

  /* visible settings */
  const [visiblePopupSettings, setVisiblePopupSettings] = useState({})

  const togglePopupSettings = (instanceIndex) => {
    setVisiblePopupSettings((prevVisiblePopups) => ({
      ...prevVisiblePopups,
      [instanceIndex]: !prevVisiblePopups[instanceIndex]
    }))
  }

  const closePopup = (instanceIndex) => {
    setVisiblePopupSettings((prevVisiblePopups) => ({
      ...prevVisiblePopups,
      [instanceIndex]: false
    }))
  }

  return (
    <div className={styles.boxInstances + ' ' + styles.mdNone}>

      {listDashboards.length !== 0 ? (
        <div>
          <div className={styles.alertInstance}>
            <div className={styles.alertInstanceIcon}>
              <IconImportant width={'20'} fill={'#000fff'} />
            </div>
            <div className={styles.alertInstanceText}>
              <b>Requirements for moving to routed IP</b>
              <p>
                Before moving to a ROUTED IP, ensure no static network
                configuration is in use, and your ‘scaleway-ecosystem’ and
                ‘cloud-init’ packages are updated. Note that Instances with a
                bootscript are not compatible with routed IPs.
                <a>
                  Using routed IPs
                  <svg viewBox="0 0 24 24">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                  </svg>
                </a>
              </p>
            </div>
          </div>
          <div className={styles.header}>
            <div className={styles.headerCheckBox}>
              <input type="checkbox" />
            </div>
            <div className={styles.headerName}>
              Name
              <Filters />
            </div>
            <div className={styles.headerIP}>IP Address</div>
            <div className={styles.headerCreated}>
              Created
              <Filters />
            </div>
            <div className={styles.headerZone}>
              Zone
              <Filters />
            </div>
          </div>
          <div
            className={
              (selectedDashboards.filter((selected) => selected).length >= 1
                ? styles.activeCheckbox
                : '') +
              ' ' +
              styles.listInstances
            }
          >
            {listDashboards.map((dashboard, index) => (
              <div key={index} className={styles.instancesList}>
                <div className={styles.instanceCheckBox}>
                  <input
                    type="checkbox"
                    checked={selectedDashboards[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
                <div
                  className={styles.instanceName}
                  onClick={() => handleClickDashboard(dashboard.id)}
                >
                  <span
                    className={styles.dot}
                    data-toolTip={'Running'}
                    onMouseEnter={handleToolTipMouseEnter}
                    onMouseLeave={handleToolTipMouseLeave}
                  ></span>
                  <IconServer width={'30'} height={'30'} />
                  <div className={styles.title}>
                    <b>{dashboard?.name}</b>
                    <span>{dashboard?.type}</span>
                  </div>
                  <div
                    data-toolTip={'Move to routed IP to support IP mobility'}
                    onMouseEnter={handleToolTipMouseEnter}
                    onMouseLeave={handleToolTipMouseLeave}
                  >
                    <IconImportant width={'30'} height={'30'} />
                  </div>
                </div>
                <div className={styles.instanceIP}>
                  {dashboard.ip || 'Not Assigned'}
                  <button
                    className={styles.buttonCopy}
                    data-toolTip={'Copy'}
                    onMouseEnter={handleToolTipMouseEnter}
                    onMouseLeave={handleToolTipMouseLeave}
                  >
                    <IconCopy width={'20'} height={'20'} />
                  </button>
                </div>
                <div
                  className={styles.instanceCreatedAt}
                  data-toolTip={'15 de diciembre'}
                  onMouseEnter={handleToolTipMouseEnter}
                  onMouseLeave={handleToolTipMouseLeave}
                >
                  15 days ago
                </div>
                <div className={styles.instanceCountry}>
                  <img
                    alt=""
                    className={styles.flag}
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZyBjbGlwLXBhdGg9InVybCgjYSkiPgogICAgICAgIDxwYXRoIGZpbGw9IiNGMEYwRjAiIGQ9Ik0xMiAyNGM2LjYyNyAwIDEyLTUuMzczIDEyLTEyUzE4LjYyNyAwIDEyIDAgMCA1LjM3MyAwIDEyczUuMzczIDEyIDEyIDEyWiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNEODAwMjciIGQ9Ik0yNCAxMmMwLTUuMTYtMy4yNTYtOS41NTgtNy44MjYtMTEuMjU0djIyLjUwOEMyMC43NDQgMjEuNTU4IDI0IDE3LjE2IDI0IDEyWiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMwMDUyQjQiIGQ9Ik0wIDEyYzAgNS4xNiAzLjI1NyA5LjU1OCA3LjgyNiAxMS4yNTRWLjc0NkMzLjI1NiAyLjQ0MiAwIDYuODQgMCAxMloiLz4KICAgIDwvZz4KICAgIDxkZWZzPgogICAgICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoMjR2MjRIMHoiLz4KICAgICAgICA8L2NsaXBQYXRoPgogICAgPC9kZWZzPgo8L3N2Zz4K"
                  />
                  {dashboard.zone}
                </div>
                <div className={styles.instanceMove}>
                  <button className={styles.button}>Move Ip</button>
                </div>
                <div className={styles.instanceSettings}>
                  <button
                    className={styles.button}
                    // onClick={handlePopupSettings}
                    onClick={() => togglePopupSettings(index)}
                  >
                    <IconSettings width={'30'} height={'30'} />
                  </button>
                  {visiblePopupSettings[index] && (
                    <ul
                      className={styles.popupSettings}
                      onMouseLeave={() => closePopup(index)}
                    >
                      <li onClick={() => handleMoreInfo()} className={styles.hr}>
                        More info
                      </li>
                      <li onClick={() => handlePowerOff()}>Power off</li>
                      <li onClick={() => handleReboot()}>Reboot</li>
                      <li onClick={() => handleStandby()}>Standby</li>
                      <li onClick={() => handleDetachIP()}>Detach IP(s)</li>
                      <li onClick={() => handleDeleteInstance(instance.id)}>Delete</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isToolTipHovered && (
            <div
              className={styles.popupToolTip}
              style={{ top: positionToolTip.top, left: positionToolTip.left }}
            >
              {textToolTip}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.noneInstance}>
          <h2>Dashboards</h2>
          <div className={styles.boxNoneInstance}>
            <img width="240" alt="" src={NoneInstance} />
            <p>
              Create a high-performance Kubernetes cluster in just a few clicks,
              scale effortlessly and focus on your applications with Kapsule.
              Want to manage nodes from different providers? Discover the power
              of centralized Kubernetes management with Kosmos.
            </p>
            <button onClick={handleAddDashboard}>
              <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
              </svg>
              Create Dashboard
            </button>
            <a>
              Instance Quickstart Documentation
              <svg viewBox="0 0 24 24">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
