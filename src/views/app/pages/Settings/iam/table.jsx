import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import styles from './table.module.css'


import {
  TableRender
} from '../utils/TableRender'


const Table = ({
  fetchs,
  children,
  items,
  setStateTable,
  handleAdd
}) => {
  // --------------------------------------------------------------------------------------------------------------
  const { t } = useTranslation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // --------------------------------------------------------------------------------------------------------------
  const [table, setTable] = useState(null)

  const [textToolTip, setTextToolTip] = useState(null)
  const [isToolTipHovered, setIsToolTipHovered] = useState(false)
  const [positionToolTip, setPositionToolTip] = useState({ top: 0, left: 0 })


  const title = React.Children.toArray(children).filter(
    (child) => child.type === 'header'
  )[0]?.props.children;


  const camelCase = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, ' ')
      .replace(/\b(\d+)\b/g, '_$1')  
      .replace(/\s+(.)/g, (_, match) => match.toUpperCase());
  };



  // --------------------------------------------------------------------------------------------------------------
  const handleCheckboxChange = (index) => {
    setSelectedDashboard((prevSelectedDashboards) => {
      const newSelectedDashboards = [...prevSelectedDashboards]

      newSelectedDashboards[index] = !newSelectedDashboards[index]
      return newSelectedDashboards
    })
  }

  // --------------------------------------------------------------------------------------------------------------
  const handleToolTipMouseEnter = (e) => {
    setIsToolTipHovered(true)
    setPositionToolTip({ top: e.clientY, left: e.clientX })
    setTextToolTip(e.target.dataset.tooltip)
  }

  const handleToolTipMouseLeave = () => {
    setIsToolTipHovered(false)
  }





  // --------------------------------------------------------------------------------------------------------------
  const onFilter = async (type) => {
    console.log('type filter', type)

    await dispatch(fetchs({ order: 'desc' }))
  }


  useEffect(() => {
    const fetchItems = () => {
      const filteredItems = React.Children.toArray(children)
        .filter((child) => child.type === 'item')
        .map((item) => {
          const filterAttribute = item.props.filter; 
          const nameAttribute = item.props.name; 
          const title = item.props.children
          const tag = filterAttribute || camelCase(title).toLowerCase(); 
          const name = nameAttribute || item.props.children
          const size = item.props.size || null
          const component = item.props.component || null

          return {
            tag,
            title,
            name,
            size,
            component
          };
        });

      setTable(<TableRender 
        items={items} 
        filteredItems={filteredItems} 
        setStateTable={setStateTable} 
        onFilter={onFilter} 
      />)
    }
    if (items && items.length > 0) fetchItems()

  }, [items])








  // ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('wfiurhurhgu')
        // await dispatch(fetchs({}))
        fetchs({})

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);



  const handleClickSupport = () => {
    navigate(`/${'es'}/app/support`)
  }



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
              {t('iam.table.t1')}
            </p>
            <button onClick={handleAdd}>
              <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
              </svg>
              {t('iam.table.t2')} {title}
            </button>
            <a onClick={() => handleClickSupport()}>
            {t('iam.table.t3')}
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
