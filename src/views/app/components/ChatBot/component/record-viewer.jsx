import React, { useState, useEffect } from 'react'

import styles from './record-viewer.module.css'

import { openFile } from '@/actions/vector'

export const RecordViewer = ({ file, click }) => {
  const [volumeArray, setVolumeArray] = useState([])
  const [record, setRecord] = useState(false)
  const [recordPlay, setRecordPlay] = useState(false)

  const fileName = file.message

  console.log('file', fileName)
    useEffect(async () => {
     if(file.data){

         setVolumeArray(JSON.parse(file.data))
     }
    }, [])

  const recordStart = async () => {      
    if (!record) {
        const _record = await openFile(fileName)
        console.log('re', _record)
        setRecord(_record)
    }else{
        setRecordPlay(true)
    }
   
  }

  const recordEnd = () => {
    setRecordPlay(false)
  }

  // Lógica para renderizar un visor de PDF
  return (
    <>
    <div className={styles.containerRecordViewer}>

      <div
        className={styles.recordViewer}
      >
        <div>
          {recordPlay === true ? (
            <div onClick={recordEnd} className={styles.buttonPause}>
              <svg
                className={styles.iconPause}
                viewBox="0 0 34 34"
                height="34"
                width="34"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                x="0px"
                y="0px"
                enableBackground="new 0 0 34 34"
              >
                <path
                  fill="currentColor"
                  d="M9.2,25c0,0.5,0.4,1,0.9,1h3.6c0.5,0,0.9-0.4,0.9-1V9c0-0.5-0.4-0.9-0.9-0.9h-3.6 C9.7,8,9.2,8.4,9.2,9V25z M20.2,8c-0.5,0-1,0.4-1,0.9V25c0,0.5,0.4,1,1,1h3.6c0.5,0,1-0.4,1-1V9c0-0.5-0.4-0.9-1-0.9 C23.8,8,20.2,8,20.2,8z"
                ></path>
              </svg>
            </div>
          ) : (
            <div onClick={recordStart} className={styles.buttonPlay}>
              <svg
                className={styles.iconPlay}
                viewBox="0 0 34 34"
                height="34"
                width="34"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                x="0px"
                y="0px"
                enableBackground="new 0 0 34 34"
              >
                <path
                  fill="currentColor"
                  d="M8.5,8.7c0-1.7,1.2-2.4,2.6-1.5l14.4,8.3c1.4,0.8,1.4,2.2,0,3l-14.4,8.3 c-1.4,0.8-2.6,0.2-2.6-1.5V8.7z"
                ></path>
              </svg>
            </div>
          )}
        </div>
        <div className={styles.containerBox}>
          <div className={styles.barBox}>
            <div className={styles.bar}>
              {volumeArray.map((volume, index) => (
                <div
                  key={index}
                  className={styles.splot}
                  style={{
                    height: `${volume || 1}%` 
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className={styles.textTime}>00:20</div>
        </div>
      </div>
    </div>
    </>
  )
}
