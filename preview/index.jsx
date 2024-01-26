import React, { useState, useEffect } from 'react'

// import { openDB } from 'idb'
// import { openDB, deleteDB, wrap, unwrap } from 'idb'

import {
  getVector,
  updateVector,
  deleteVector,
  detectBot,
  detectDrop,
  loadVector,
  openVector
  // iniVector,
  // addVector,
  // getAllVector
} from './handleVector'

import SelectBot from './selectBot'
import Bot from './bot'


import Microphone from './component/microphone'

const I19 = () => {
  const [workspaceId] = useState(null)
  // const [workspaceId, setWorkspaceId] = useState(null)
  // const [projectId, setProjectId] = useState(null)
  // const [space] = useState(null)
  // const [page] = useState(null)
  // const [component] = useState(null)
  const [setFile] = useState(null)
  // const [file, setFile] = useState(null)
  
  const [tokenVector, setTokenVector] = useState('' | null)

  const changeTokenVector = (token) => {
    setTokenVector(token)

    localStorage.setItem('tokenVector', token)
  }

  const [input, setInput] = useState('')
  const [message, setMessage] = useState([])

  //
  const [setDragging] = useState(false)
  // const [dragging, setDragging] = useState(false)
  const [history, setHistory] = useState([])

  /* */
  const handleDragStart = () => {
    setDragging(true)
  }

  const handleDragEnd = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()

    const droppedFile = e.dataTransfer.files[0]
    console.log('droppedFile', droppedFile)
    setFile(droppedFile)
    setDragging(false)

    const reader = new FileReader()

    // Acción a realizar cuando la lectura del archivo esté completa
    reader.onload = async (event) => {
      const formData = new FormData()
      const fileContent = event.target.result
      const type = detectDrop(droppedFile)

      const blob = new Blob([fileContent], { type })
      formData.append('image', blob, droppedFile.name)

      console.log('eeeeeeeeeeeeeeeeee')
      // hay que guardar y obtener un id al azar
      const uri = await loadVector(tokenVector, 'file', formData)

      console.log('uri', uri)

      // console.log('wdediijdejiedj load')
      handleAddMessage(uri, type)
      // console.log('onload Filecontent', fileContent)
    }

    reader.readAsArrayBuffer(droppedFile)
  }


  const loadRecordVector = async (formData, volumeArray) => {
    const uri = await loadVector(tokenVector, 'record', formData)
    console.log('uri', uri)
    const recordMessage = {
      volumeArray,
      uri
    }

    console.log('uri-record', recordMessage)
    handleAddMessage(recordMessage, 'record')
  }

  const handleChange = (event) => {
    const newValue = event.target.value

    setInput(newValue)
    if (event.key === 'Enter') {
      handleAddMessage(newValue)
      setInput('')
    }
  }

  const handleAddMessage = async (value, type = 'text') => {
    const newMessage = detectBot(value, type)

    console.log('new message', newMessage)

    // setHistory([...history, newMessage])
    // setMessage((prevM1essages) => [...prevMessages, newMessage])

    updateVector(tokenVector, 'bot', [...history, newMessage])
  }

  /* */
  const handleUndo = async () => {
    console.log('load')
    // Deshacer la última acción
    const lastValue = history.pop()
    setInput(lastValue?.text || '') // Si no hay historial, establecer el valor en blanco
    setHistory([...history])
    setMessage([...history])

    updateVector(tokenVector, 'bot', history)
  }

  // Función para borrar todo y dejar el input en blanco
  const handleClearAll = async () => {
    setHistory([])
    setMessage([])

    deleteVector(tokenVector, 'bot')
    setTokenVector(null)
  }

  const handleReturn = () => {
    localStorage.removeItem('tokenVector')

    setTokenVector(null)
  }

  useEffect(() => {
    const loadFromIndexedDB = async () => {
      try {
        const dataValues = await getVector(tokenVector, 'bot')
        console.log('val', dataValues)
        setHistory(dataValues || [])
        setMessage(dataValues || [])
      } catch (error) {
        console.error('Error al cargar desde IndexedDB:', error)
      }
    }

    // Llamar a la función para cargar desde IndexedDB al montar el componente
    if (tokenVector) loadFromIndexedDB()
  }, [tokenVector])

  useEffect(() => {
    const existingTokenVector = localStorage.getItem('tokenVector')

    if (existingTokenVector) {
      setTokenVector(existingTokenVector)
    }
  }, []) // El array de dependencias vacío asegura que el efecto se ejecute solo al principio

  return (
    <div>
      {tokenVector && (
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={handleDragStart}
            onDragLeave={handleDragEnd}
            onDrop={handleDrop}
            className="dark:bg-dark-900 dark:text-white"
          >
            <div className="border h-[calc(100vh-300px)]">
              <Bot message={message} openVector={openVector} />
            </div>

            <div>
              <input
                value={input}
                placeholder="Mensaje del bot @action"
                onChange={handleChange}
                onKeyDown={handleChange}
              />
              <button onClick={handleUndo}>Deshacer</button>
              <button onClick={handleClearAll}>Vaciar</button>
              <button onClick={handleReturn}>Atrás</button>
            </div>
            <div>
              <Microphone loadRecordVector={loadRecordVector}/>
              
            </div>
          </div>
        </div>
      )}

      {
        <div>
          <SelectBot
            workspaceId={workspaceId}
            changeTokenVector={changeTokenVector}
          />
        </div>
      }
    </div>
  )
}

export default I19
