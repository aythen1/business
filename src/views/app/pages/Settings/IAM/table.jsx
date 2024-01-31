import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';

import { v4 as uuidv4 } from 'uuid'

// import React, { useEffect, useRef, useState } from 'react'
import styles from './table.module.css'


import {
  TableRender
} from '../utils/TableRender'




// import {
//   // postInstance,
//   // getServersZone,
//   deleteInstance,
//   getProjectInstance
// } from '@/store/redux/actions/instances'

// import { useParams } from 'next/navigation'

// import {
//   fetchsUser,
// } from '@/actions/iam'


import { useDispatch, useSelector } from 'react-redux'

const Table = ({
  fetchs,
  children,
  items,
  setStateTable
}) => {
  // --------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch()
  // --------------------------------------------------------------------------------------------------------------
  // const [editMode, setEditMode] = useState(false)
  const [table, setTable] = useState(null)
  const [listItems, setListItems] = useState([])

  const [textToolTip, setTextToolTip] = useState(null)
  const [isToolTipHovered, setIsToolTipHovered] = useState(false)
  const [positionToolTip, setPositionToolTip] = useState({ top: 0, left: 0 })


  const title = React.Children.toArray(children).filter(
    (child) => child.type === 'header'
  )[0]?.props.children;


  const camelCase = (str) => {
    // Convierte el string a camelCase
    // return str.replace(/[^a-zA-Z]/g, ' ').replace(/\s+(.)/g, (_, match) => match.toUpperCase());
    return str.replace(/[^a-zA-Z0-9]/g, ' ')
      .replace(/\b(\d+)\b/g, '_$1')  // Mueve los números al inicio con un guion bajo
      .replace(/\s+(.)/g, (_, match) => match.toUpperCase());
  };



  // --------------------------------------------------------------------------------------------------------------

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
  // --------------------------------------------------------------------------------------------------------------







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





  // --------------------------------------------------------------------------------------------------------------

  // --------------------------------------
 

  useEffect(() => {
    const fetchItems = () => {
      const filteredItems = React.Children.toArray(children)
        .filter((child) => child.type === 'item')
        .map((item) => {
          // const tag = camelCase(title).toLowerCase();
          const filterAttribute = item.props.filter; // Obtén el valor del atributo filter si existe
          const nameAttribute = item.props.name; // Obtén el valor del atributo filter si existe
          const title = item.props.children
          const tag = filterAttribute || camelCase(title).toLowerCase(); // Usa el valor de filterAttribute si existe, de lo contrario, utiliza el título
          const name = nameAttribute || item.props.children
          const size = item.props.size || 200
          
          return {
            tag,
            title, 
            name,
            size
          };
        });

        setTable(<TableRender items={items} filteredItems={filteredItems} setStateTable={setStateTable} />)
    }
    if (items && items.length > 0) fetchItems()

  }, [items])



  




 // ----------------



useEffect( () => {
  // const tokenRoomTable = localStorage.getItem('token-' + roomTable)
  // const dataTable = JSON.parse(tokenRoomTable)

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')

      await dispatch(fetchs({token}))

    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);





  return (
    <div
      className={styles.boxTable}
    >
      {table ? (
        <div >
          {table}
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
        <div className={styles.noneTable}>
          <h2>{title}</h2>
          <div className={styles.boxNoneTable}>
            <p>
              Un texto más sencillos
            </p>
            <button onClick={handleAddDashboard}>
              <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
              </svg>
              Create Dashboard
            </button>
            <a >
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

export default Table
