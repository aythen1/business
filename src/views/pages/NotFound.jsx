import React from 'react'
import styles from './NotFound.module.css'

const NotFound = () => (
    <div className={styles.main}>
      <h2>
        404
      </h2>
      <p>Página no encontrada</p>
      {/* Puedes personalizar el contenido de la página 404 según tus necesidades */}
    </div>
  );


export default NotFound;