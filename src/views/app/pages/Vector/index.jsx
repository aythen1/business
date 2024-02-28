import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'

// import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'



import Board from './board'


import IconServer from './assets/IconServer'
import IconArrowDown from './assets/IconArrowDown'
import IconArrowUp from './assets/IconArrowUp'
import IconCopy from './assets/IconCopy'
import IconImportant from './assets/IconImportant'
import IconSettings from './assets/IconSettings'
import NoneVector from './assets/NoneVector.webp'


// import {
//   // postBoard,
//   // getServersZone,
//   deleteBoard,
//   getProjectBoard
// } from '@/store/redux/actions/boards'

// import { useParams } from 'next/navigation'


import {
  setModal
} from '@/slices/iamSlice'

import {
  iniVector,
  addVector,
  fetchsVector,
  fetchVector
} from '@/actions/vector'


import {
  setVector
} from '@/slices/vectorSlice'



import {
  ModalAddVector
} from './ModalVector'




// import { fetchsVector } from '../../../../../service/controllers/vector'

const Vector = ({ }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { vectorId } = useParams()

  // const { projectId } = useParams()

  const { user } = useSelector((state) => state.iam)

  const {
    vectors,
    vector
  } = useSelector((state) => state.vector)


  // const [editMode, setEditMode] = useState(false)
  const [listVectors, setListVectors] = useState([])

  const [textToolTip, setTextToolTip] = useState(null)
  const [isToolTipHovered, setIsToolTipHovered] = useState(false)
  const [positionToolTip, setPositionToolTip] = useState({ top: 0, left: 0 })

  // const boards = dispatch(getProjectBoard()




  // ---------------------------------------------------------------------

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const vectorParam = urlParams.get('vector');

  //   if (vectorParam) {
  //     const selectedVector = vectors.find(vector => vector.id === vectorParam);

  //     if (selectedVector) {
  //       // Establecer el vector utilizando dispatch
  //       dispatch(setVector(selectedVector));
  //     }
  //   }


  //   setListVectors(vectors)
  // }, [vectors])


  useEffect(() => {
    console.log('vectors', vectors)
  }, [vectors])


  useEffect(() => {
    const fetchsItems = async () => {
      let id = iniVector({
        workspaceId: user.id,
        projectId: 'vector',
      })

      try {
        await dispatch(fetchsVector({
          id,
          name: 'vectors'
        }))
      } catch (err) {
        console.log('Err', err)
      }
    }

    if (vectors.length == 0) fetchsItems()
  }, [])




  // ---------------------------------------------------------------------

  const handleAddVector = async (uuid) => {
    // const newUUID = uuidv4()
    // // setVectorId(newUUID)

    // const newVector = {
    //   id: newUUID,
    //   name: 'new Vector'
    // }

    // await dispatch(addVector(newVector))

    // // // Actualizar la URL con el nuevo UUID
    // // navigate(`/es/app/board`)
    // navigate(`/${'es'}/app/vector/${newVector.id}`)
    dispatch(setModal(<ModalAddVector />))
  }

  const handleClickVector = (item) => {
    // const newUUID = uuidv4()
    // setVectorId(id)
    // setVectorId(id)

    dispatch(setVector(item))

    // const newURL = `?vector=${encodeURIComponent(id)}`
    navigate(`/${'es'}/app/vector/${item.id}`)
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
  const [selectedVectors, setSelectedVectors] = useState([]);

  const handleCheckboxChange = (index) => {
    setSelectedVectors((prevSelectedVectors) => {
      const newSelectedVectors = [...prevSelectedVectors];
      newSelectedVectors[index] = !newSelectedVectors[index];
      return newSelectedVectors;
    });
  };

  const handleSelectAllChange = () => {
    const allSelected = selectedVectors.every((isSelected) => isSelected);
    setSelectedVectors(new Array(vectors.length).fill(!allSelected));
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


  const handleSupport = () => {
    navigate(`/${'es'}/app/support`)
  }


  // ----------------------------------------------


  useEffect(() => {
    console.log('vectorId', vectorId)
    if(vectorId){
      let id = iniVector({
        workspaceId: user.id,
        projectId: 'vector'
      })

      dispatch(fetchVector({
        id, 
        name: 'vectors',
        data: {
          id: vectorId
        }
      }))
    }
  }, [vectorId])

  return (
    <div>
      {vector ? (
        <div>
          <Board />
        </div>
      ) : (
        <div className={styles.boxBoards + ' ' + styles.mdNone}>
          {vectors.length !== 0 ? (
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
                    <a onClick={() => handleSupport()}>
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
                  (selectedVectors.filter((selected) => selected).length >= 1
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
                      checked={selectedVectors.every((isSelected) => isSelected)}
                      onChange={handleSelectAllChange}
                    />
                  </div>
                  <div className={styles.headerName}>
                    Vector
                    <Filters />
                  </div>
                  <div className={styles.headerIP}>
                    Dimension
                    <Filters />
                  </div>
                  <div className={styles.headerCreated}>
                    Agentes
                    <Filters />
                  </div>
                </div>
                <div className={styles.tableVectors}>
                  {vectors.map((vector, index) => (
                    <div key={index} className={styles.boardsList}>
                      <div className={styles.boardCheckBox}>
                        <input
                          type="checkbox"
                          checked={selectedVectors[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </div>
                      <div
                        className={styles.boardName}
                        onClick={() => handleClickVector(vector)}
                      >
                        <span
                          className={styles.dot}
                          datatooltip={'Running'}
                          onMouseEnter={handleToolTipMouseEnter}
                          onMouseLeave={handleToolTipMouseLeave}
                        ></span>
                        <IconServer width={'30'} height={'30'} />
                        <div className={styles.title}>
                          <b>{vector?.title || 'Not title'}</b>
                          <span>{vector?.description || 'Not description'}</span>
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
                        {vector.vector['0'] || 'Not Assigned'}
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
            <div className={styles.noneVector}>
              <h2>Vectors</h2>
              <div className={styles.boxNoneVector}>
                <img width="240" alt="" src={NoneVector} />
                <p>
                  Create a high-performance Kubernetes cluster in just a few clicks,
                  scale effortlessly and focus on your applications with Kapsule.
                  Want to manage nodes from different providers? Discover the power
                  of centralized Kubernetes management with Kosmos.
                </p>
                <button onClick={handleAddVector}>
                  <svg viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                  </svg>
                  Create Vector
                </button>
                <a onClick={() => handleSupport()}>
                  Board Quickstart Documentation
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
    </div >
  )
}

export default Vector
