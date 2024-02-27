import React, { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

// import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'

import { useDispatch, useSelector } from 'react-redux'


import Board from './Board'


import IconServer from './assets/IconServer'
import IconArrowDown from './assets/IconArrowDown'
import IconArrowUp from './assets/IconArrowUp'
import IconCopy from './assets/IconCopy'
import IconImportant from './assets/IconImportant'
import IconSettings from './assets/IconSettings'
import NoneDashboard from './assets/NoneDashboard.webp'


// import {
//   // postBoard,
//   // getServersZone,
//   deleteBoard,
//   getProjectBoard
// } from '@/store/redux/actions/boards'

// import { useParams } from 'next/navigation'

import {
  addDashboard,
  fetchsDashboard
} from '@/actions/dashboard'

import {
  setDashboard
} from '@/slices/dashboardSlice'


import { useNavigate } from 'react-router-dom'


// import { fetchsDashboard } from '../../../../../service/controllers/dashboard'

const Dashboard = ({ }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const { projectId } = useParams()

  // const [editMode, setEditMode] = useState(false)
  const [listDashboards, setListDashboards] = useState([])

  const [textToolTip, setTextToolTip] = useState(null)
  const [isToolTipHovered, setIsToolTipHovered] = useState(false)
  const [positionToolTip, setPositionToolTip] = useState({ top: 0, left: 0 })

  // const boards = dispatch(getProjectBoard()
  const {
    dashboards,
    dashboard
  } = useSelector((state) => state.dashboard)





  // ---------------------------------------------------------------------

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const dashboardParam = urlParams.get('dashboard');

  //   if (dashboardParam) {
  //     const selectedDashboard = dashboards.find(dashboard => dashboard.id === dashboardParam);

  //     if (selectedDashboard) {
  //       // Establecer el dashboard utilizando dispatch
  //       dispatch(setDashboard(selectedDashboard));
  //     }
  //   }


  //   setListDashboards(dashboards)
  // }, [dashboards])


  useEffect(() => {
    const fetchsItems = async () => {
      try {
        await dispatch(fetchsDashboard())
      } catch (err) {
        console.log('Err', err)
      }
    }

    if (dashboards.length == 0) fetchsItems()
  }, [])




  // ---------------------------------------------------------------------

  const handleAddDashboard = async (uuid) => {
    const newUUID = uuidv4()
    // setDashboardId(newUUID)

    const newDashboard = {
      id: newUUID,
      name: 'new Dashboard'
    }

    await dispatch(addDashboard(newDashboard))

    // // Actualizar la URL con el nuevo UUID
    // navigate(`/es/app/board`)
    navigate(`/es/app/board?dashboard=${encodeURIComponent(newDashboard.id)}`)
  }

  const handleClickDashboard = (item) => {
    // const newUUID = uuidv4()
    // setDashboardId(id)
    // setDashboardId(id)

    dispatch(setDashboard(item))

    // const newURL = `?dashboard=${encodeURIComponent(id)}`
    navigate(`/es/app/board?dashboard=${item.id}`)
    // window.history.pushState(null, null, newURL)
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


  // const handlePopupSettings = () => {
  //   alert(1)
  // }

  const handleMoreInfo = () => { }

  const handlePowerOff = () => { }

  const handleReboot = () => { }

  const handleStandby = () => { }

  const handleDetachIP = () => { }

  const handleDeleteBoard = (id) => {
    // dispatch(deleteBoard(id))
  }

  const Filters = () => {
    return (
      <div className={styles.filters}>
        <IconArrowUp />
        <IconArrowDown />
      </div>
    )
  }



  /* checkbox */
  const [selectedDashboards, setSelectedDashboards] = useState([]);

  const handleCheckboxChange = (index) => {
    setSelectedDashboards((prevSelectedDashboards) => {
      const newSelectedDashboards = [...prevSelectedDashboards];
      newSelectedDashboards[index] = !newSelectedDashboards[index];
      return newSelectedDashboards;
    });
  };

  const handleSelectAllChange = () => {
    const allSelected = selectedDashboards.every((isSelected) => isSelected);
    setSelectedDashboards(new Array(dashboards.length).fill(!allSelected));
  };


  /* visible settings */
  const [visiblePopupSettings, setVisiblePopupSettings] = useState({})

  const togglePopupSettings = (boardIndex) => {
    setVisiblePopupSettings((prevVisiblePopups) => ({
      ...prevVisiblePopups,
      [boardIndex]: !prevVisiblePopups[boardIndex]
    }))
  }

  const closePopup = (boardIndex) => {
    setVisiblePopupSettings((prevVisiblePopups) => ({
      ...prevVisiblePopups,
      [boardIndex]: false
    }))
  }


  const handleClickSupport = () => {
    navigate(`/${'es'}/app/support`)
  }

  return (
    <div>
      {!dashboard ? (
        <div className={styles.boxBoards + ' ' + styles.mdNone}>
          {dashboards.length !== 0 ? (
            <div>
              <div className={styles.alertBoard}>
                <div className={styles.alertBoardIcon}>
                  <IconImportant width={'20'} fill={'var(--color-primary-0)'} />
                </div>
                <div className={styles.alertBoardText}>
                  <b>Requirements for moving to routed IP</b>
                  <p>
                    Before moving to a ROUTED IP, ensure no static network
                    configuration is in use, and your ‘scaleway-ecosystem’ and
                    ‘cloud-init’ packages are updated. Note that Boards with a
                    bootscript are not compatible with routed IPs.
                    <a onClick={() => handleClickSupport()}>
                      Using routed IPs
                      <svg viewBox="0 0 24 24">
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                      </svg>
                    </a>
                  </p>
                </div>
              </div>
              <div
                className={
                  (selectedDashboards.filter((selected) => selected).length >= 1
                    ? styles.activeCheckbox
                    : '') +
                  ' ' +
                  styles.listBoards
                }
              >
                <div className={styles.header}>
                  <div className={styles.headerCheckBox}>
                    <input
                      type="checkbox"
                      checked={selectedDashboards.every((isSelected) => isSelected)}
                      onChange={handleSelectAllChange}
                    />
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
                <div className={styles.tableDashboards}>
                  {dashboards.map((dashboard, index) => (
                    <div key={index} className={styles.boardsList}>
                      <div className={styles.boardCheckBox}>
                        <input
                          type="checkbox"
                          checked={selectedDashboards[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </div>
                      <div
                        className={styles.boardName}
                        onClick={() => handleClickDashboard(dashboard)}
                      >
                        <span
                          className={styles.dot}
                          datatooltip={'Running'}
                          onMouseEnter={handleToolTipMouseEnter}
                          onMouseLeave={handleToolTipMouseLeave}
                        ></span>
                        <IconServer width={'30'} height={'30'} />
                        <div className={styles.title}>
                          <b>{dashboard?.name}</b>
                          <span>{dashboard?.type}</span>
                        </div>
                        <div
                          datatooltip={'Move to routed IP to support IP mobility'}
                          onMouseEnter={handleToolTipMouseEnter}
                          onMouseLeave={handleToolTipMouseLeave}
                        >
                          <IconImportant width={'30'} height={'30'} />
                        </div>
                      </div>
                      <div className={styles.boardIP}>
                        {dashboard.ip || 'Not Assigned'}
                        <button
                          className={styles.buttonCopy}
                          datatooltip={'Copy'}
                          onMouseEnter={handleToolTipMouseEnter}
                          onMouseLeave={handleToolTipMouseLeave}
                        >
                          <IconCopy width={'20'} height={'20'} />
                        </button>
                      </div>
                      <div
                        className={styles.boardCreatedAt}
                        datatooltip={'15 de diciembre'}
                        onMouseEnter={handleToolTipMouseEnter}
                        onMouseLeave={handleToolTipMouseLeave}
                      >
                        15 days ago
                      </div>
                      <div className={styles.boardCountry}>
                        <img
                          alt=""
                          className={styles.flag}
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZyBjbGlwLXBhdGg9InVybCgjYSkiPgogICAgICAgIDxwYXRoIGZpbGw9IiNGMEYwRjAiIGQ9Ik0xMiAyNGM2LjYyNyAwIDEyLTUuMzczIDEyLTEyUzE4LjYyNyAwIDEyIDAgMCA1LjM3MyAwIDEyczUuMzczIDEyIDEyIDEyWiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNEODAwMjciIGQ9Ik0yNCAxMmMwLTUuMTYtMy4yNTYtOS41NTgtNy44MjYtMTEuMjU0djIyLjUwOEMyMC43NDQgMjEuNTU4IDI0IDE3LjE2IDI0IDEyWiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMwMDUyQjQiIGQ9Ik0wIDEyYzAgNS4xNiAzLjI1NyA5LjU1OCA3LjgyNiAxMS4yNTRWLjc0NkMzLjI1NiAyLjQ0MiAwIDYuODQgMCAxMloiLz4KICAgIDwvZz4KICAgIDxkZWZzPgogICAgICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoMjR2MjRIMHoiLz4KICAgICAgICA8L2NsaXBQYXRoPgogICAgPC9kZWZzPgo8L3N2Zz4K"
                        />
                        {dashboard.zone}
                      </div>
                      <div className={styles.boardMove}>
                        <button className={styles.button}>Move Ip</button>
                      </div>
                      <div className={styles.boardSettings}>
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
                            <li onClick={() => handleDeleteBoard(board.id)}>Delete</li>
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
            <div className={styles.noneDashboard}>
              <h2>Dashboards</h2>
              <div className={styles.boxNoneDashboard}>
                <img width="240" alt="" src={NoneDashboard} />
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
                  Board Quickstart Documentation
                  <svg viewBox="0 0 24 24">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className={styles.alertBoard}>
            <div className={styles.alertBoardIcon}>
              <IconImportant width={'20'} fill={'#000fff'} />
            </div>
            <div className={styles.alertBoardText}>
              <b>Requirements for moving to routed IP</b>
              <p>
                Before moving to a ROUTED IP, ensure no static network
                configuration is in use, and your ‘scaleway-ecosystem’ and
                ‘cloud-init’ packages are updated. Note that Boards with a
                bootscript are not compatible with routed IPs.
                <a onClick={() => handleClickSupport()}>
                  Using routed IPs
                  <svg viewBox="0 0 24 24">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                  </svg>
                </a>
              </p>
            </div>
          </div>
          <Board />
        </div>
      )}
    </div>
  )
}

export default Dashboard
