import React from 'react';
import styles from "./index.module.css";


// import Files from './page'
import StorageBar from './StorageBar'

const Drive = ({}) => {
  return (
    <div className="scaleway-header">
      <div>
        Total de datos
        <StorageBar />
      </div>
      <div>
        Datos en disco
        <StorageBar />
      </div>
      <div>
        Datos en la nube
        <StorageBar />
      </div>
      <div>
        Datos en local
        <StorageBar />
      </div>
      <div>
        Poner lo que hizo fido con lancedb dejarlo super conectado y con el diseño del drive
      </div>
      {/* <Files /> */}
    </div>
  );
};

export default Drive;