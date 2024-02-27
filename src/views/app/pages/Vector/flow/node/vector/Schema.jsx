import React, { useState, useEffect } from "react";
import * as xlsx from 'xlsx';


// import Dropzone from 'react-dropzone';
import styles from './Schema.module.css'

import { fields } from './fields';


import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import { QueryBuilder } from 'react-querybuilder';


export default ({ id, data: _data, setFilter, setNodes }) => {


  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    title: '',
    header: [],
    data: []
  })

  const handleSelectStep = (id) => {
    setStep(id)
  }



  const handleClickDrop = () => {
    const inputFile = document.createElement('input');

    inputFile.type = 'file';
    inputFile.accept = '.xls, .xlsx';
    inputFile.addEventListener('change', (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        const newDataTransfer = new DataTransfer();
        newDataTransfer.items.add(selectedFile);

        const dropEvent = new DragEvent('drop', { dataTransfer: newDataTransfer });

        handleDrop(dropEvent);
      }
    });

    inputFile.click();
  };





  const handleDrop = (e) => {
    const file = e.dataTransfer.files[0];

    e.preventDefault()
    // const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = xlsx.read(binaryData, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const title = `${file.name.replace(/\.[^/.]+$/, '')}_name`; // Eliminar extensión del nombre del archivo
      const header = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0];
      const data = xlsx.utils.sheet_to_json(worksheet).map(row => {
        const rowData = {};
        header.forEach(column => {
          rowData[column] = row[column];
        });
        return rowData;
      });



      setData({
        title,
        header,
        data
      })

    };

    reader.readAsBinaryString(file);
  };



  useEffect(() => {
    console.log('data', data)
  }, [data])



  const handleAddData = () => {
    console.log('c0jvcuneruhn')

    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              data: data,
            },
          };
        }
        return node;
      });
    });

    setFilter('data')
  }

  return (
    <>
      <div className={styles.modal} >
        <div className={styles.header}>
          <div >
            <label className={`${step >= 1 && styles.active}`}>
              1
            </label>
            Upload file
          </div>
          <div >
            <label className={`${step >= 2 && styles.active}`}>
              2
            </label>
            Select header row
          </div>
          {/* <div >
            <label className={`${step >= 3 && styles.active}`}>
              3
            </label>
            Validate Data
          </div> */}
        </div>
        {step == 1 ? (
          <div>
            <div>
              <h2 className={styles.title}>
                Upload file
              </h2>
              <p className={styles.text}>
                Data that we expect:<br />
                (You will have  a chance to rename or remove columns in next steps)
              </p>
            </div>
            {data?.data?.length > 0 && (
              <div className={styles.scrollbar}>
                <PreviewData data={data} limit={2} />
              </div>
            )}
            <div style={{ zIndex: 999, position: 'relative' }}>
              <div
                refs="schema"
                onClick={(e) => handleClickDrop(e)}
                onDrop={(e) => handleDrop(e)}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{
                  zIndex: 999,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '2px dashed #ccc',
                  borderRadius: '4px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                Arrastra y suelta un archivo .xls o .xlsx aquí,<br /> o haz clic para seleccionar uno.
              </div>
            </div>
            {data?.data?.length > 0 && (
              <div className={styles.button}>
                <button onClick={() => handleSelectStep(2)}>
                  Next Step
                </button>
              </div>
            )}

          </div>
        ) : step == 2 ? (
          <div>
            <div>
              <p>
                Poder cambiar el nombre de todas comprobar que funciona con un icono

              </p>
              <h2>
                Your table
              </h2>
              <div>
                <PreviewData data={data} limit={2} />
              </div>
              <h2>
                Will become
              </h2>
              <div>
                <ModifyData data={data} limit={2} />
              </div>

            </div>
            {data.data.length > 0 && (
              <div className={styles.buttons}>
                <button className={styles.return} onClick={() => handleSelectStep(1)}>
                  Borrar Datos
                </button>
                <button onClick={() => handleAddData()}>
                  Next Step
                </button>
              </div>
            )}
          </div>
        ) : step == 3 && (
          <div>
            <APIData />
          </div>
        )}


      </div>
    </>
  );
};




const PreviewData = ({ data: _data, limit = 20 }) => {
  const { header, data } = _data;

  const cellWidth = 100 / header.length + '%';

  return (
    <table
      className={styles.tablePreview}
      style={{ tableLayout: 'fixed', width: '100%' }}
    >
      <thead>
        <tr>
          {header.map((columnName, index) => (
            <th key={index} style={{ width: cellWidth }}>
              {columnName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(0, limit).map((rowData, rowIndex) => (
          <tr key={rowData.__rowNum__}>
            {header.map((columnName, index) => (
              <td key={index} style={{ width: cellWidth }}>
                {rowData[columnName]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};



const ModifyData = ({ data: _data, limit = 20 }) => {
  const { header, data } = _data;
  const [newHeader, setNewHeader] = useState(header.map(() => ''));

  // console.log('eee', data)

  const cellWidth = 100 / header.length + '%';

  const isValidVariable = (variable) => {
    // Implementa tu lógica para validar si es una variable válida
    // Puedes usar expresiones regulares u otras validaciones según tus necesidades
    return /^[a-zA-Z_]\w*$/.test(variable);
  };

  return (
    <table className={styles.tableModify} style={{ tableLayout: 'fixed', width: '100%' }}>
      <thead>
        <tr>
          {newHeader.map((newColumnName, index) => (
            <th key={index} style={{ width: cellWidth }}>
              <div>
                <input
                  type="text"
                  placeholder={header[index]}
                  value={newColumnName}
                  onChange={(e) => {
                    const updatedHeader = [...newHeader];
                    updatedHeader[index] = e.target.value;
                    setNewHeader(updatedHeader);
                  }}
                />
                <label
                  className={isValidVariable(newColumnName) ? styles.active : styles.inactive}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9" />
                  </svg>
                </label>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(0, limit).map((rowData, rowIndex) => (
          <tr key={rowData.__rowNum__}>
            {header.map((columnName, index) => (
              <td key={index} style={{ width: cellWidth }}>
                {rowData[columnName]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const APIData = ({ }) => {
  // Uso del componente
  const items = [
    { available: true, type: 'GET', path: '/users', description: 'Get list of users' },
    { available: false, type: 'POST', path: '/users', description: 'Create a new user' },
    // Agrega más objetos según sea necesario
  ];



  const [editedItems, setEditedItems] = useState(items);

  const handleInputChange = (index, field, value) => {
    setEditedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index][field] = value;
      return newItems;
    });
  };

  const handleDeleteItem = (index) => {
    setEditedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const handleAddItem = () => {
    setEditedItems((prevItems) => [
      ...prevItems,
      { available: false, type: '', path: '', description: '' },
    ]);
  };

  /// ----------------------->
  const initialQuery = { combinator: 'and', rules: [] };
  const [query, setQuery] = useState(initialQuery);

  return (
    <div>
      <h2>API Data</h2>
      <ul>
        {editedItems.map((item, index) => (
          <li key={index}>
            <strong>Available:</strong>
            <input
              type="checkbox"
              checked={item.available}
              onChange={(e) => handleInputChange(index, 'available', e.target.checked)}
            /><br />

            <strong>Type:</strong>
            <input
              type="text"
              value={item.type}
              onChange={(e) => handleInputChange(index, 'type', e.target.value)}
            /><br />

            <strong>Path:</strong>
            <input
              type="text"
              value={item.path}
              onChange={(e) => handleInputChange(index, 'path', e.target.value)}
            /><br />

            <strong>Description:</strong>
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
            />

            <button onClick={() => handleDeleteItem(index)}>Delete</button>

            <div>
              <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
                <QueryBuilder
                  fields={fields}
                  query={query}
                  onQueryChange={setQuery}
                  listsAsArrays
                  showCloneButtons
                  showLockButtons
                  showNotToggle
                  controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                />
              </QueryBuilderDnD>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleAddItem}>Add New Item</button>
    </div>
  );
};