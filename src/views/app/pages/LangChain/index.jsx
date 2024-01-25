import React from 'react';
import styles from "./index.module.css";


import NoneLangChain from './assets/NoneLangChain.webp'

const LangChain = ({}) => {

  const handleAddDashboard = (uuid) => {
    alert(1)
  }



  return (
    <div className={styles.boxLangChains}>
<div className={styles.noneLangChain}>
          <h2>LangChain</h2>
          <div className={styles.boxNoneLangChain}>
            <img width="240" alt="" src={NoneLangChain} />
            <p>
            LangChain es un marco para la creación de aplicaciones 
      utilizando modelos de lenguaje grandes (LLM). Incluido el análisis 
      y resumen de documentos , los chatbots y el análisis de código . 
            </p>
            <button onClick={handleAddDashboard}>
              <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
              </svg>
              Soon Available
            </button>
            <a>
              LangChain Quickstart Documentation
              <svg viewBox="0 0 24 24">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
              </svg>
            </a>
          </div>
        </div>
    </div>
    
  );
};

export default LangChain;

    // <div >


    //   chatbots
    //   generación de recuperación aumentada
    //   resumen de documentos
    //   generacion de datos semanticos

    //   Poner que no esta disponible todavia un soon now!

    //   Algo muy parecido a esto
    //   https://console.scaleway.com/document-db/LangChains
    // </div>