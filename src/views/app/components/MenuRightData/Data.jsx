import React, { useState, useEffect } from 'react';
import styles from "./Data.module.css";

const Data = ({ }) => {
  const [dbs, setDbs] = useState([])

  const fetchData = () => {
    const _dbs = [{
      image: 'image puppeter',
      title: 'New Data',
      date: '17/10/23',
      size: '0KB'
    },{
      image: 'image puppeter',
      title: 'New Data',
      date: '17/10/23',
      size: '0KB'
    },{
      image: 'image puppeter',
      title: 'New Data',
      date: '17/10/23',
      size: '0KB'
    },{
      image: 'image puppeter',
      title: 'New Data',
      date: '17/10/23',
      size: '0KB'
    }];

    setDbs(_dbs);
  };

  useEffect(() => {
    fetchData();
  }, []); 



  const handleAddLanceDB = () => {
    
    return []
  }

 const [changeData, setChangeData] = useState('');

 const handleChangeData = (event) => {
   setChangeData(event.target.value);
 };

  return (
    <div>
      <div className={styles.title}>
        Importa aquí tus datos
      </div>

      <div className={styles.container}>
        <div 
          className={styles.box}
        >
          <div className={styles.new}>
            +
          </div>
          <div className={styles.grid}>
            <div className={styles.title}>
            <input 
              type="text"
              value={changeData}
              onChange={handleChangeData}
            />
            </div>
            <div className={styles.settings}>
              ...
            </div>
          </div>
        </div>
        {dbs.map( (db, index) => (
          <div className={styles.box}>
            <div className={styles.image}>
              {db.image || 'Not found'}
            </div>
            <div className={styles.grid}>
              <div className={styles.name}>
                {db.title || 'Not title'}
              </div>
              <div className={styles.settings}>
                ...
              </div>
              <div className={styles.date}>
              {db.date || '- - -'}
              </div>
              <div className={styles.size}>
              {db.size || '0KB'}  
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;