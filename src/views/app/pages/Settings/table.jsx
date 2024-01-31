import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';

import { v4 as uuidv4 } from 'uuid'

// import React, { useEffect, useRef, useState } from 'react'
import styles from './table.module.css'


import {
  TableRender
} from './utils/TableRender'


import {
  getVector,
  updateVector,
  deleteVector,
  detectBot,
  detectDrop,
  loadVector,
  openFile,
  openVector,
  iniVector,
  removeAllVector
  // addVector,
  // getAllVector
} from '@/utils/vector'


import {
  handleMoreInfo,
  handlePowerOff,
  handleReboot,
  handleStandby,
  handleDetachIP,
  handleDeleteInstance,
} from './utils/instances'

// import {
//   // postInstance,
//   // getServersZone,
//   deleteInstance,
//   getProjectInstance
// } from '@/store/redux/actions/instances'

// import { useParams } from 'next/navigation'

import {
  loadDashboard,
  addDashboard
} from '@/actions/dashboard'


import { useDispatch, useSelector } from 'react-redux'

const Table = ({
  children,
  items
}) => {
  // --------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch()

  const roomTable = 'table-123'

  // --------------------------------------------------------------------------------------------------------------
  // const [editMode, setEditMode] = useState(false)
  const [listItems, setListItems] = useState([])

  const [textToolTip, setTextToolTip] = useState(null)
  const [isToolTipHovered, setIsToolTipHovered] = useState(false)
  const [positionToolTip, setPositionToolTip] = useState({ top: 0, left: 0 })


  /* checkbox */
  const [selectedDashboards, setSelectedDashboards] = useState([])

  const [tokenVector, setTokenVector] = useState('' || null)
  

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



  // --------------------------------------------------------------------------------------------------------------


  const camelCase = (str) => {
    // Convierte el string a camelCase
    // return str.replace(/[^a-zA-Z]/g, ' ').replace(/\s+(.)/g, (_, match) => match.toUpperCase());
    return str.replace(/[^a-zA-Z0-9]/g, ' ')
      .replace(/\b(\d+)\b/g, '_$1')  // Mueve los números al inicio con un guion bajo
      .replace(/\s+(.)/g, (_, match) => match.toUpperCase());
  };



  const handleNavigation = async () => {

  };




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




  // --------------------------------------------------------------------------------------------------------------
  const title = React.Children.toArray(children).filter(
    (child) => child.type === 'header'
  )[0]?.props.children;





  // setListItems(filteredItems);



  // Función para incrementar el nombre del encabezado si existe
  const incrementHeaderName = (header) => {
    const match = header.match(/^(.*)_copy(\d*)$/);

    if (match) {
      const baseName = match[1];
      const copyNumber = match[2] ? parseInt(match[2], 10) + 1 : 1;
      return `${baseName}_copy${copyNumber}`;
    }

    return `${header}_copy1`;
  };

  // --------------------------------------
  const [dragging, setDragging] = useState(false)
  const [tableData, setTableData] = useState(false)
  // const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    console.log('drop')
    e.preventDefault()

    const droppedFile = e.dataTransfer.files[0]
    console.log('droppedFile', droppedFile)
    // setFile(droppedFile)
    setDragging(false)

    const reader = new FileReader()

    const type = detectDrop(droppedFile)
    // Acción a realizar cuando la lectura del archivo esté completa
    reader.onload = async (event) => {
      const fileContent = event.target.result;
      const workbook = XLSX.read(fileContent, { type: 'array' });
      // Asumiendo que solo hay una hoja en el archivo XLSX
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Obtener las propiedades de las columnas (claves)
      // Obtener las propiedades de las columnas (claves)
      const keys = Object.keys(sheet)
        .filter((key) => /^[A-Z]+\d+$/.test(key))  // Filtrar por formato de celda (por ejemplo, A1, B2)
        .sort();  // Ordenar claves alfabéticamente

      // Crear una matriz representando filas y columnas
      const matrix = keys.reduce((acc, key) => {
        const [, col, row] = key.match(/([A-Z]+)(\d+)/);
        acc[row - 1] = acc[row - 1] || [];
        acc[row - 1].push(sheet[key]?.v || sheet[key]?.w);
        return acc;
      }, []);

      const items = matrix.slice(1);

      const headers = matrix[0].reduce((obj, header, index) => {
        let uniqueHeader = header;

        // Agregar un guion bajo "_" al principio si el encabezado es un número
        if (typeof header === 'number') {
          uniqueHeader = `_${header}`;
        }
        // console.log('ee2de', uniqueHeader, Object.values(obj).includes(uniqueHeader))
        if (obj[uniqueHeader]) {
          while (obj[uniqueHeader]) {
            uniqueHeader = incrementHeaderName(uniqueHeader);
          }
        }
        uniqueHeader = camelCase(uniqueHeader);

        obj[uniqueHeader] = index;
        return obj;
      }, {});

      const table = {
        header: headers,
        items: items
      }

      const file = {
        type,
        name: droppedFile.name,
        base64Content: JSON.stringify(table)
      }


      setTableData(table)

      

      const { vector, uri } = await loadVector(tokenVector, 'file', file )
      console.log('vector', uri, vector)

      localStorage.setItem(`token-${roomTable}`, JSON.stringify({vector, uri}))
      // Convertir el contenido a base64
      // const base64Content = btoa(String.fromCharCode.apply(null, new Uint8Array(fileContent)));
      // Convertir el contenido a base64
      // const base64Content = arrayBufferToBase64(fileContent);
      // const blob = dataURItoBlob(`data:${type};base64,${base64Content}`);

      // console.log('type', type)

      // const blob = new Blob([fileContent], { type })
      // formData.append('image', base64Content, droppedFile.name)

      // console.log('eeeeeeeeeeeeeeeeee', formData)
      // hay que guardar y obtener un id al azar

      // const file = {
      //   type,
      //   name: droppedFile.name,
      //   base64Content
      // }

      // const { vector, uri} = await loadVector(tokenVector, 'file', file )


      // const dropMessage = {
      //   vector,
      //   uri
      // }

    }

    reader.readAsArrayBuffer(droppedFile)
  }

  const handleDragStart = () => {
    setDragging(false)
  }

  const handleDragEnd = () => {
    setDragging(false)
  }



  useEffect(() => {

    const fetchItems = () => {
      const filteredItems = React.Children.toArray(children)
        .filter((child) => child.type === 'item')
        .map((item) => {
          const title = item.props.children;
          const tag = camelCase(title);


          const pos = tableData.header[tag] ? tableData.header[tag] - 1 : -1;
          const items = tableData.items ? (pos !== -1 ? tableData.items[pos] : []) : [];

          const data = {
            title: title,
            tag: tag,
            // render: renderModule(tag, items) // Asegúrate de haber definido la función renderModule
          };

          return data;
        });

      setListItems(filteredItems)
    }

    if (tableData) fetchItems()

  }, [tableData])




 // ----------------
 useEffect(() => {
  const loadFromIndexedDB = async () => {
    try {
      const dataValues = await getVector(tokenVector, 'file')

      // setHistory(dataValues || [])
      // setMessage(dataValues || [])

    } catch (error) {
      console.error('Error al cargar desde IndexedDB:', error)
    }
  }

  // Llamar a la función para cargar desde IndexedDB al montar el componente
  if (tokenVector){
    loadFromIndexedDB()
  }
}, [tokenVector])


useEffect( () => {
  const tokenRoomTable = localStorage.getItem('token-' + roomTable)
  const dataTable = JSON.parse(tokenRoomTable)

  const fetchData = async () => {
    try {
      const dataURI = await openFile(dataTable);
      const data = JSON.parse(dataURI)
      
      setTableData({
        header: data.header,
        items: data.items,
      })
      // setFileVector(dataURI)
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [tokenVector]);


  useEffect(() => {
    const existingTokenVector = localStorage.getItem('tokenVector')

    if (existingTokenVector) {
      setTokenVector(existingTokenVector)
    }else{
      console.log('not exist token')
    }
  }, []) 



  return (
    <div
      className={styles.boxTable + ' ' + styles.mdNone}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragStart}
      onDragLeave={handleDragEnd}
      onDrop={handleDrop}
    >
      {/* {listItems.map((item, index) =>
        item.type !== 'header' ? (
          <th key={index}>{item}</th>
        ) : null
      )} */}
      {listItems.length !== 0 ? (
        <div >
          <ul className={styles.listTable}>
            {listItems.map((item, index) => {
              if (typeof item.render === 'object') {
                return (
                  <li
                    className={styles.containerTable}
                    key={index}
                  >
                    {item.title} --------
                    {item.render}
                  </li>
                );
              }

              return null; // Si item.render no es un objeto, no renderizamos nada
            })}
          </ul>
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
              <p className={styles["title"]}>
              Un texto más sencillo 
            </p>
            <button onClick={handleAddDashboard}>
              <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
              </svg>
              Create Dashboard
              </button>
              
              <a className={styles["title_two"]}>
               
                Instance Quickstart Documentation
                <svg viewBox="0 0 24 24">
                  <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                </svg>
              {/*  */}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Table
