import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './index.module.css'



import Board from './board'


import IconServer from './assets/IconServer'
import IconArrowDown from './assets/IconArrowDown'
import IconArrowUp from './assets/IconArrowUp'
import IconCopy from './assets/IconCopy'
import IconImportant from './assets/IconImportant'
import IconSettings from './assets/IconSettings'
import NoneVector from './assets/NoneVector.webp'


import BackgroundVector from './assets/background-vector'


import {
  setModal
} from '@/slices/iamSlice'

import {
  iniVector,
  fetchsVector,
  fetchVector
} from '@/actions/vector'


import {
  setVector
} from '@/slices/vectorSlice'



import {
  ModalAddVector
} from './ModalVector'




const Vector = ({ }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { vectorId } = useParams()

  const { user } = useSelector((state) => state.iam)

  const {
    vectors,
    vector
  } = useSelector((state) => state.vector)



  const [textToolTip, setTextToolTip] = useState(null)
  const [isToolTipHovered, setIsToolTipHovered] = useState(false)
  const [positionToolTip, setPositionToolTip] = useState({ top: 0, left: 0 })



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
    dispatch(setModal(<ModalAddVector />))
  }

  const handleClickVector = (item) => {
    dispatch(setVector(item))
    navigate(`/${'es'}/app/vector/${item.id}`)
  }

  const handleToolTipMouseEnter = (e) => {
    setIsToolTipHovered(true)
    setPositionToolTip({ top: e.clientY, left: e.clientX })
    console.log('eeee', e.target.getAttribute('datatooltip'))
    console.log('ua', e.target.dataset.datatooltip)
    const value = e.target.getAttribute('datatooltip')
    setTextToolTip(value)
  }

  const handleToolTipMouseLeave = () => {
    setIsToolTipHovered(false)
  }



  const handleMoreInfo = () => { }

  const handlePowerOff = () => { }

  const handleReboot = () => { }


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


  const handleVector = () => {
    dispatch(setModal(<ModalAddVector />))
  }


  // ----------------------------------------------


  useEffect(() => {
    console.log('vectorId', vectorId)
    if (vectorId) {
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
                  <b>
                    Crear un nuevo vector para tu proyecto
                  </b>
                  <p>
                    Un vector permite guardar datos locales, conectarlos en la nube, con serverless
                    poderlos entender y crear de una forma más personalizada nunca antes imaginada.
                    <a onClick={() => handleVector()}>
                      Nuevo vector
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>
                    </a>
                  </p>
                </div>
                <div className={styles.background}>
                  <BackgroundVector />
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
                  <div className={styles.headerDimension}>
                    Dimension
                    <Filters />
                  </div>
                  <div className={styles.headerSize}>
                    Size
                    <Filters />
                  </div>
                  <div className={styles.headerAgents}>
                    Agentes
                    <Filters />
                  </div>
                  <div className={styles.headerCreated}>
                    CreatedAt
                    <Filters />
                  </div>
                </div>
                <div className={styles.tableVectors}>
                  {vectors.map((vector, index) => (
                    <div key={index} className={styles.vectorsList}>
                      <div className={styles.vectorCheckBox}>
                        <input
                          type="checkbox"
                          checked={selectedVectors[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </div>
                      <div
                        className={styles.vectorName}
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
                          datatooltip={'15 de diciembre'}
                          onMouseEnter={handleToolTipMouseEnter}
                          onMouseLeave={handleToolTipMouseLeave}
                        >
                          <div>
                          <IconImportant width={'30'} height={'30'} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.vectorIP}>
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
                        className={styles.vectorSize}
                      >
                        <label>
                          13kb
                        </label>
                      </div>
                      <div
                        className={styles.vectorAgents}
                      >
                        <div>
                          A
                        </div>
                        <div>
                          B
                        </div>
                        <div>
                          C
                        </div>
                      </div>
                      <div
                        className={styles.vectorCreatedAt}
                        datatooltip={'15 de diciembre'}
                        onMouseEnter={handleToolTipMouseEnter}
                        onMouseLeave={handleToolTipMouseLeave}
                      >
                        15 days ago
                      </div>
                      <div className={styles.vectorSettings}>
                        <button
                          className={styles.button}
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
                            <li onClick={() => handlePowerOff()}>
                              Resume
                            </li>
                            <li onClick={() => handleReboot()}>
                              Reboot
                            </li>
                            <li onClick={() => handleDeleteBoard(board.id)}>
                              Delete
                            </li>
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
