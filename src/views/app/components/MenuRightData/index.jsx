import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';



import {
  fetchsVector,
  iniVector,
  addVector
} from '@/actions/vector'


import {
  setVector,
} from '@/slices/iamSlice'


import styles from "./index.module.css";

const MenuRightData = ({ }) => {
  const dispatch = useDispatch()

  const [dbs, setDbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [tokenVector, setTokenVector] = useState(iniVector({
    workspaceId: 'test1',
    projectId: 'test1'
  }))


  const fetchData = async () => {
    const _dbs = await fetchsVector(tokenVector, 'datas', searchTerm)

    const filteredData = _dbs.filter(db =>
      db.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDbs(filteredData);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const [changeData, setChangeData] = useState('');

  const handleChangeData = (event) => {
    setChangeData(event.target.value);
    setSearchTerm(event.target.value);
  };


  // --------------------------------------------------------------
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileData = new Uint8Array(event.target.result);
      const workbook = XLSX.read(fileData, { type: 'array' });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const header = jsonData[0];

      const data = jsonData.slice(1).filter(row => row.some(cell => cell !== undefined && cell !== null));

      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');

      const title = `${fileNameWithoutExtension}_data`;
      const result = {
        header,
        data,
        title,
      };

      const resp = await addVector(tokenVector, 'datas', result);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };


  // ---------------------------------------------
  const handleSelectVector = (db) => {
    console.log('djduwcn', db)
    dispatch(setVector(db))
  }


  return (
    <div
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={styles.search}>
        <input
          type='text'
          value={changeData}
          onChange={handleChangeData}
        />
      </div>
      <div className={styles.title}>
        Importa aquí tus datos
      </div>

      <div className={styles.container}>
        <div
          className={styles.box}
          onClick={handleFileClick}
        >
          <div className={styles.new}>
            +
          </div>
          <div className={styles.grid}>
            <div className={styles.title}>
              <input
                type="text"
                value={changeData}
              />
            </div>
            <div className={styles.settings}>
              ...
            </div>
            insertar dades
          </div>
        </div>


        {dbs.length === 0 ? (
          <div className={styles.noResults}>
            No hay resultados. Inserta tus datos.
          </div>
        ) : (
          dbs.map((db, index) => (
            <div
              key={index}
              className={styles.box}
              onClick={() => handleSelectVector(db)}
            >
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
          ))
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        accept=".xls, .xlsx"
      />
    </div>
  );
};

export default MenuRightData;