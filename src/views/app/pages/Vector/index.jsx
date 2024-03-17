import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './index.module.css'



import Table from '../Settings/iam/table'


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
  fetchVector,
  deleteVector,
  duplyVector
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

  const { t } = useTranslation()
  const { vectorId } = useParams()

  const { user } = useSelector((state) => state.iam)

  const {
    vectors,
    vector
  } = useSelector((state) => state.vector)



  const [textToolTip, setTextToolTip] = useState(null)
  const [isToolTipHovered, setIsToolTipHovered] = useState(false)
  const [positionToolTip, setPositionToolTip] = useState({ top: 0, left: 0 })


  const [stateTable, setStateTable] = useState('')



  // useEffect(() => {
  //   console.log('vectors', vectors)
  // }, [vectors])


  useEffect(() => {
    const fetchsItems = async () => {
      let id = iniVector({
        workspaceId: user?.id,
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



  const fetchsItems = async () => {
    // console.log('vecttototo')
    // let id = iniVector({
    //   workspaceId: user.id,
    //   projectId: 'vector',
    // })

    // try {
    //   await dispatch(fetchsVector({
    //     id,
    //     name: 'vectors'
    //   }))
    // } catch (err) {
    //   console.log('Err', err)
    // }
  }



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



  // const handleMoreInfo = () => { }

  // const handlePowerOff = () => { }

  // const handleReboot = () => { }


  // const handleDeleteBoard = (id) => {
  //   // dispatch(deleteBoard(id))
  // }

  // const Filters = () => {
  //   return (
  //     <div className={styles.filters}>
  //       <IconArrowUp />
  //       <IconArrowDown />
  //     </div>
  //   )
  // }



  /* checkbox */
  // const [selectedVectors, setSelectedVectors] = useState([]);

  // const handleCheckboxChange = (index) => {
  //   setSelectedVectors((prevSelectedVectors) => {
  //     const newSelectedVectors = [...prevSelectedVectors];
  //     newSelectedVectors[index] = !newSelectedVectors[index];
  //     return newSelectedVectors;
  //   });
  // };

  // const handleSelectAllChange = () => {
  //   const allSelected = selectedVectors.every((isSelected) => isSelected);
  //   setSelectedVectors(new Array(vectors.length).fill(!allSelected));
  // };


  /* visible settings */


  const handleVector = () => {
    dispatch(setModal(<ModalAddVector />))
  }


  // ----------------------------------------------


  useEffect(() => {
    console.log('vectorId', vectorId)
    if (vectorId) {
      let id = iniVector({
        workspaceId: user?.id,
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



  const handleDelete = (id) => {
    if (id) {
      let uri = iniVector({
        workspaceId: user?.id,
        projectId: 'vector'
      })

      dispatch(deleteVector({
        id: uri,
        name: 'vectors',
        data: {
          id
        }
      }))
    }
  }



  const handleDuply = (id) => {
    if (id) {
      console.log('iuse', user.id)
      let uri = iniVector({
        workspaceId: user?.id,
        projectId: 'vector'
      })

      dispatch(duplyVector({
        id: uri,
        name: 'vectors',
        data: {
          id
        }
      }))
    }
  }

  const handleCopyPath = () => {
    alert(1)

  }

  const handleEdit = () => {
    alert(1)

  }



  // -------------------------------------------------------------------------

  const propsFunctions = {
    handleToolTipMouseEnter,
    handleToolTipMouseLeave,
    handleClickVector
  }


  const propsSettings = {
    handleDelete,
    handleDuply,
    handleCopyPath,
    handleEdit
  }

  //   return {
  //   };
  // };










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
                    {t('vector.t1')}
                  </b>
                  <p>
                  {t('vector.t2')}
                    <a onClick={() => handleVector()}>
                    {t('vector.t3')}
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
              <div>
                <Table
                  fetchs={fetchsItems}
                  items={vectors}
                  setStateTable={setStateTable}
                  handleAdd={() => dispatch(setModal(<ModalAddVector />))}

                >
                  <header>
                  {t('vector.t4')}
                  </header>
                  <item component={(props) => <ComponentVector fn={propsFunctions} {...props} />} >
                  {t('vector.t5')}
                  </item>
                  <item component={(props) => <ComponentDimension fn={propsFunctions} {...props} />} >
                  {t('vector.t6')}
                  </item>
                  <item component={(props) => <ComponentSize {...props} />} >
                  {t('vector.t7')}
                  </item>
                  <item component={(props) => <ComponentAgents {...props} />} >
                  {t('vector.t8')}
                  </item>
                  <item component={(props) => <ComponentCreatedAt fn={propsFunctions} {...props} />} >
                  {t('vector.t9')}
                  </item>
                  <item component={(props) => <ComponentSettings fn={propsSettings} {...props} />} >
                    &nbsp;
                  </item>
                </Table>
              </div>
            </div>
          ) : (
            <div className={styles.noneVector}>
              <h2>{t('vector.t10')}</h2>
              <div className={styles.boxNoneVector}>
                <img width="240" alt="" src={NoneVector} />
                <p>
                {t('vector.t11')}
                </p>
                <button onClick={handleAddVector}>
                  <svg viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                  </svg>
                  {t('vector.t12')}
                </button>
                <a onClick={() => handleSupport()}>
                {t('vector.t13')}
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







const ComponentVector = (props) => {
  return (
    <div
      className={styles.vectorName}
      onClick={() => props.fn.handleClickVector(props.item)}
    >
      <span
        className={styles.dot}
        datatooltip={'Running'}
        onMouseEnter={props.fn.handleToolTipMouseEnter}
        onMouseLeave={props.fn.handleToolTipMouseLeave}
      ></span>
      <IconServer width={'30'} height={'30'} />
      <div className={styles.title}>
        <b>{props.item?.title || 'Not title'}</b>
        <span>{props.item?.description || 'Not description'}</span>
      </div>
      <div
        datatooltip={'15 de diciembre'}
        onMouseEnter={props.fn.handleToolTipMouseEnter}
        onMouseLeave={props.fn.handleToolTipMouseLeave}
      >
        <div>
          <IconImportant width={'30'} height={'30'} />
        </div>
      </div>
    </div>
  )
}

const ComponentDimension = (props) => {
  return (
    <div className={styles.vectorIP}>
      {props.item.vector['0'] || 'Not Assigned'}
      <button
        className={styles.buttonCopy}
        datatooltip={'Copy'}
        onMouseEnter={props.fn.handleToolTipMouseEnter}
        onMouseLeave={props.fn.handleToolTipMouseLeave}
      >
        <IconCopy width={'20'} height={'20'} />
      </button>
    </div>
  )
}

const ComponentSize = (props) => {
  return (
    <div
      className={styles.vectorSize}
    >
      <label>
        13kb
      </label>
    </div>
  )
}

const ComponentAgents = (props) => {
  return (
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
  )
}

const ComponentCreatedAt = (props) => {
  return (
    <div
      className={styles.vectorCreatedAt}
      datatooltip={'15 de diciembre'}
      onMouseEnter={props.fn.handleToolTipMouseEnter}
      onMouseLeave={props.fn.handleToolTipMouseLeave}
    >
      15 days ago
    </div>
  )
}

const ComponentSettings = (props) => {

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



  return (
    <div className={styles.vectorSettings}>
      <button
        className={styles.button}
        onClick={() => togglePopupSettings(props.item.id)}
      >
        <IconSettings width={'30'} height={'30'} />
      </button>
      {visiblePopupSettings[props.item.id] && (
        <ul
          className={styles.popupSettings}
          onMouseLeave={() => closePopup(props.item.id)}
        >
          <li onClick={() => props.fn.handleDelete(props.item.id)}>
            Eliminar
          </li>
          <li onClick={() => props.fn.handleDuply(props.item.id)}>
            Duplicar
          </li>
          <li onClick={() => props.fn.handleCopyPath(props.item.id)}>
            Copiar ruta
          </li>
          <li onClick={() => props.fn.handleEdit()} className={styles.hr}>
            Editar
          </li>
        </ul>
      )}
    </div>
  )
}