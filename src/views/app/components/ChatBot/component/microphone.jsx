// import Recorder from 'recorder-js'
import React, { useState, useEffect } from 'react'

import styles from './microphone.module.css'
//

const Microphone = ({ loadRecordVector }) => {
  // record voice
  //   const [recorder, setRecorder] = useState(null)
  const [record, setRecord] = useState(false)
//   const [audioContext, setAudioContext] = useState(null)
//   const [analyser, setAnalyser] = useState(null)

  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])
  const [volumeArray, setVolumeArray] = useState([])
  const [micActive, setMicActive] = useState(false);

  //   const [isRecording, setIsRecording] = useState(false)

  const [recordPlay, setRecordPlay] = useState(false)
  //   const [paused, setPaused] = useState(false)
  const [totalTime, setTotalTime] = useState(0)

  // Nuevo estado para el valor máximo observado
//   const [maxAmplitude, setMaxAmplitude] = useState(0)

  const [intervalId0, setIntervalId0] = useState(null)
  const [intervalId1, setIntervalId1] = useState(null)

  
  useEffect(() => {
    const initializeAudio = async () => {
     
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)

      microphone.connect(analyser)
      analyser.connect(audioContext.destination)

      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.3

    //   setAudioContext(audioContext)
    //   setAnalyser(analyser)

      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, event.data])
        }
      }

      mediaRecorder.onstop = () => {
        // Aquí puedes realizar acciones adicionales después de detener la grabación si es necesario
        console.log('Grabación completada', audioChunks)

        // Concatenar todos los fragmentos en un solo Blob
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })

        // Crear una URL del Blob
        const audioUrl = URL.createObjectURL(audioBlob)

        // Puedes usar 'audioUrl' para reproducir el audio, enviarlo al servidor, etc.
        console.log('URL del audio:', audioUrl)
      }

      setMediaRecorder(mediaRecorder)

      const dataArray = new Uint8Array(analyser.fftSize)

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray)

        // Tomar un conjunto específico de frecuencias que representen el rango de volumen deseado
        const startFrequency = 20 // Puedes ajustar estos valores según sea necesario
        const endFrequency = 2000

        // Calcular el volumen promedio en el rango de frecuencias
        const relevantData = dataArray.slice(
          (startFrequency * analyser.fftSize) / audioContext.sampleRate,
          (endFrequency * analyser.fftSize) / audioContext.sampleRate
        )

        // Calcular la suma de amplitudes en lugar de promedio
        const sumAmplitude = relevantData.reduce((sum, value) => sum + value, 0)

        // Normalizar el valor a un rango de 0 a 100
        const normalizedVolume =
          (sumAmplitude / (255 * relevantData.length)) * 100

        // console.log('Volumen actual:', normalizedVolume)
        setVolumeArray((prevVolumeArray) => [
          ...prevVolumeArray,
          normalizedVolume
        ])
      }

      const intervalId0 = setInterval(() => {
        if (recordPlay) {
          setTotalTime((prevTime) => prevTime + 1)
        }
      }, 1000)

      const intervalId1 = setInterval(() => {
        if (recordPlay) {
          updateVolume()
        }
      }, 300)

      setIntervalId0(intervalId0) // Guarda el intervalId0 en el estado
      setIntervalId1(intervalId1) // Guarda el intervalId1 en el estado

      return () => {
        clearInterval(intervalId0)
        clearInterval(intervalId1)
        audioContext.close()
        mediaRecorder.stop()
      }
    }

    initializeAudio()
  }, [ recordPlay])

  useEffect(() => {
    if (!recordPlay) {
      clearInterval(intervalId0)
      clearInterval(intervalId1)
    }
  }, [recordPlay])

  //   useEffect(() => {
  //     // Actualizar el contador de tiempo cada segundo
  //     const intervalId = setInterval(() => {
  //       if (recordPlay) {
  //         setTotalTime((prevTime) => prevTime + 1)
  //       }
  //     }, 1000)

  //     return () => clearInterval(intervalId)
  //   }, [recordPlay])

  const recordStart = () => {
    // if (!mediaRecorder) {
    //     initializeAudio(); // Inicializar el micrófono si aún no está inicializado
    //   }

    if (mediaRecorder) {
      setAudioChunks([])
      setVolumeArray([])

      mediaRecorder.start()

      setRecord(true)
      setRecordPlay(true)

      // Actualizar cada segundo
      //   const intervalId = setInterval(() => {
      //     analyzeVolume()
      //   }, 1000)

      // Detener la grabación después de cierto tiempo (ajusta según tus necesidades)
      setTimeout(() => {
        recordEnd()
        // clearInterval(intervalId)
      }, 1000000) // Detener después de 1000 segundos (ajusta según tus necesidades)
    }
  }

  const recordEnd = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setRecord(false)
      setTotalTime(0)


      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Llama a la función de callback con el URL del audio y el array de volumen
      loadRecordVector(audioUrl, volumeArray);

    //   const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })

    //   const isoTime = new Date().toISOString()
    //   const formattedTime = isoTime.replace(/\.\d{3}Z$/, '')
    //   const fileName = `record-${formattedTime}.wav`

    //   const arrayBuffer = await audioBlob.arrayBuffer()
    //   const formData = new FormData()
    //   formData.append(
    //     'image',
    //     new Blob([arrayBuffer], { type: 'audio/wav' }),
    //     fileName
    //   )

    //   console.log('acc', audioChunks)
    //   loadRecordVector(formData, volumeArray)
    }
  }

  const recordPause = () => {
    // Puedes implementar la pausa deteniendo la grabación y manteniendo los datos existentes
    console.log('interval 1')

    // clearInterval(intervalId1)
    mediaRecorder.stop()
    setRecordPlay(false)
  }

  const recordRestart = () => {
    // Puedes implementar la reanudación iniciando una nueva grabación
    mediaRecorder.start()
    setRecordPlay(true)
  }

  const recordDelete = () => {
    // Puedes implementar la reanudación iniciando una nueva grabación
    mediaRecorder.stop()
    setRecordPlay(false)
    setRecord(false)
    setTotalTime(0)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }

  //   const analyzeVolume = async () => {
  //     console.log('eee', audioChunks)
  //     if (audioChunks.length > 0) {
  //       const audioContext = new (window.AudioContext ||
  //         window.webkitAudioContext)()
  //       const analyser = audioContext.createAnalyser()
  //       analyser.fftSize = 256
  //       analyser.smoothingTimeConstant = 0.3

  //       const accumulatedAmplitudes = []

  //       for (const audioChunk of audioChunks) {
  //         const dataArray = new Uint8Array(analyser.fftSize)
  //         const audioBuffer = await audioChunk.arrayBuffer()
  //         const audioSource = audioContext.createBufferSource()
  //         audioSource.buffer = await audioContext.decodeAudioData(audioBuffer)
  //         audioSource.connect(analyser)

  //         analyser.getByteTimeDomainData(dataArray)

  //         const averageAmplitude =
  //           Array.from(dataArray).reduce((sum, value) => sum + value, 0) /
  //           dataArray.length

  //         // Actualizar el valor máximo observado
  //         setMaxAmplitude((prevMax) => Math.max(prevMax, averageAmplitude))

  //         accumulatedAmplitudes.push(averageAmplitude)
  //       }

  //       const normalizedVolume = (maxAmplitude / 255) * 100

  //       setVolumeArray((prevVolumeArray) => [
  //         ...prevVolumeArray,
  //         normalizedVolume
  //       ])
  //     }
  //   }

  return (
    <div className={styles.sectionMicrophone}>
      {!record ? (
        <div className={styles.buttonMicrophone} onClick={recordStart}>
          <svg
            className={styles.iconMicrophone}
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className={styles.sectionRecord}>
          <div onClick={recordDelete} className={styles.buttonDelete}>
            <svg
              className={styles.iconDelete}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 22"
            >
              <path
                d="M5,0,3,2H0V4H16V2H13L11,0ZM15,5H1V19.5A2.5,2.5,0,0,0,3.5,22h9A2.5,2.5,0,0,0,15,19.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          {recordPlay ? (
            <div className={styles.boxDelete}>
              <div className={styles.textTime}>{formatTime(totalTime)}</div>
              <div className={styles.bar}>
                <div className={styles.containerBar}>
                  {volumeArray.map((volume, index) => (
                    <div
                      key={index}
                      className={styles.splot}
                      style={{
                        height: `${volume || 1}%` // Asegurar que tenga al menos 1% para ser visible
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.boxBar}>
              <div onClick={recordRestart} className={styles.buttonPlay}>
                <svg
                  className={styles.iconPlay}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="18px"
                  viewBox="0 0 16 18"
                >
                  <path
                    d="M15.05,8.39,2,.32a1,1,0,0,0-1.53.85V16.83A1,1,0,0,0,2,17.7L15,10.1A1,1,0,0,0,15.05,8.39Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div className={styles.bar}>
                <div className={styles.containerBar}>
                  {volumeArray.map((volume, index) => (
                    <div
                      key={index}
                      className={styles.splot}
                      style={{
                        height: `${volume || 1}%` // Asegurar que tenga al menos 1% para ser visible
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className={styles.textTime}>{formatTime(totalTime)}</div>
            </div>
          )}
          <div className={styles.boxRecord}>
            <div className={styles.boxPlay}>
              {recordPlay ? (
                <div onClick={recordPause} className={styles.buttonPause}>
                  <svg
                    className={styles.iconPause}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="14.75"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    ></circle>
                    <path
                      d="M20.65,21.69V10.25H17.31V21.69Zm-9.3-11.44V21.69h3.34V10.25Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div onClick={recordRestart} className={styles.buttonRestart}>
                  <svg
                    className={styles.iconRestart}
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    x="0px"
                    y="0px"
                    enableBackground="new 0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
            <div onClick={recordEnd} className={styles.buttonEnd}>
              <svg
                className={styles.iconEnd}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35 35"
              >
                <path
                  d="M17.5,0h0A17.51,17.51,0,0,1,35,17.5h0A17.51,17.51,0,0,1,17.5,35h0A17.51,17.51,0,0,1,0,17.5H0A17.51,17.51,0,0,1,17.5,0Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M25.64,18.55,11.2,24.93a.86.86,0,0,1-1.13-.44.83.83,0,0,1-.06-.44l.48-4.11a1.36,1.36,0,0,1,1.24-1.19l7.51-.6a.16.16,0,0,0,.14-.16.16.16,0,0,0-.14-.14l-7.51-.6a1.36,1.36,0,0,1-1.24-1.19L10,12a.84.84,0,0,1,.74-.94.87.87,0,0,1,.45.06l14.44,6.38a.61.61,0,0,1,.31.79A.59.59,0,0,1,25.64,18.55Z"
                  fill="#fff"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Microphone
