import styles from "./index.module.css";

import React, { useState } from 'react';

import IconArrow from './assets/IconArrow.svg'
import IconAdd from './assets/IconAdd.svg'
import IconEarse from './assets/IconEarse.svg'
import IconTrash from './assets/IconTrash.svg'

const MenuLeftData = ({ className, ...props }) => {
  const [showSettings, setShowSettings] = useState(false)

  const [inputs, setInputs] = useState([{
    title: 'hello world',
    description: 'hello world'
  }])

  const handleCancel = () => {

  }
  const handleSave = () => {

  }
  const handleHello = () => {
    alert(1)
  }


  return (
    <div>
      <div className={styles["header-input"]}>
        <input />
        <div>
          {showSettings ? (
            <button onClick={() => setShowSettings(!showSettings)}>
              <img src={IconArrow} />
            </button>
          ):(
          <button onClick={() => setShowSettings(!showSettings)}>
            <img src={IconEarse} />
          </button>
            )}
          <button onClick={() => setShowSettings(!showSettings)}>
            <img src={IconTrash} />
          </button>
        </div>
      </div>
      {showSettings && (

        <div className={styles["graph-list"]}>
          <div>
            <div>
              createdAt
              updatedAt
            </div>
          </div>
          <div>
            Filtros keys añadias
            <div>
              {inputs.map((input, index) => {
                return (
                  <div
                    key={index}
                  >
                    {input.title}
                    {input.description}
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div>
              <div>
                Selecciona las fechas
              </div>
              <div>
                Selecciona los datos de interés
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleCancel()}
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSave()}
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuLeftData;