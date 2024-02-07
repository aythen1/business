import styles from "./index.module.css";
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';


// import { PromptTemplate } from 'langchain/prompts'
// import { OpenAI } from 'langchain/llms'
// import { LLMChain } from 'langchain/chains'

// const template = 'What sound does the {animal} make?'
// const prompt = new PromptTemplate({
//   template,
//   inputVariables: ['animal']
// })

// const llm = new OpenAI()

// const chain = new LLMChain({ llm, prompt })

// const response = await chain.call({ animal: 'cat' })
// console.log({ response })


import Bot from './bot'

// import { openDB } from 'idb'
// import { openDB, deleteDB, wrap, unwrap } from 'idb'

import {
  getVector,
  updateVector,
  deleteVector,
  detectBot,
  detectDrop,
  loadVector,
  openVector,
  iniVector,
  removeAllVector
  // addVector,
  // getAllVector
} from '@/utils/vector'

// import SelectBot from './selectBot'
// import Bot from './bot'
import Microphone from './component/microphone'

import { 
  setOpenChatBot
 } from "@/actions/iam";
// import { useDispatch } from "react-redux";
import Picker from 'emoji-picker-react';

const ChatBot = ({

}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [workspaceId] = useState(null)


  const { gpts } = useSelector((state) => state.iam) 

  const [ listGpts, setListGpts ] = useState([])

  const [file, setFile] = useState(null)
  const [tokenVector, setTokenVector] = useState('' || null)
    const [input, setInput] = useState('')
    const [message, setMessage] = useState([])
    const [dragging, setDragging] = useState(false)
    const [history, setHistory] = useState([])
  // ------------------------------------------------------------------------------------------------------------

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const onEmojiClick = (event, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  
  };
  
    const changeTokenVector = (token) => {
      setTokenVector(token)
  
      localStorage.setItem('tokenVector', token)
    }
  
    /* */
    const handleDragStart = () => {
      setDragging(true)
    }
  
    const handleDragEnd = () => {
      setDragging(false)
    }
  
    
    function arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }

    const handleDrop = (e) => {
      console.log('drop')
      e.preventDefault()
  
      const droppedFile = e.dataTransfer.files[0]
      console.log('droppedFile', droppedFile)
      setFile(droppedFile)
      setDragging(false)
  
      const reader = new FileReader()
  
      // Acción a realizar cuando la lectura del archivo esté completa
      reader.onload = async (event) => {
        // const formData = new FormData()
        const fileContent = event.target.result
        const type = detectDrop(droppedFile)

        // Convertir el contenido a base64
        // const base64Content = btoa(String.fromCharCode.apply(null, new Uint8Array(fileContent)));
        // Convertir el contenido a base64
        const base64Content = arrayBufferToBase64(fileContent);
        // const blob = dataURItoBlob(`data:${type};base64,${base64Content}`);


        console.log('type', type)
  
        // const blob = new Blob([fileContent], { type })
        // formData.append('image', base64Content, droppedFile.name)
  
        // hay que guardar y obtener un id al azar

        const file = {
          type,
          name: droppedFile.name,
          base64Content
        }

        const { vector, uri} = await loadVector(tokenVector, 'files', file )
  
        
        const dropMessage = {
          vector,
          uri
        }

        // console.log('wdediijdejiedj load')
        handleAddMessage(dropMessage, type)
        // console.log('onload Filecontent', fileContent)
      }
  
      reader.readAsArrayBuffer(droppedFile)
    }
  
  
    const loadRecordVector = async (formData, volumeArray) => {
      const uri = await loadVector(tokenVector, 'records', formData)
      console.log('uri', uri)
      const recordMessage = {
        volumeArray,
        uri
      }
  
      console.log('uri-record', recordMessage)
      handleAddMessage(recordMessage, 'records')
    }
  
    const handleChange = (event) => {
      const newValue = event.target.value
  
      setInput(newValue)

      if(input.startsWith('/')){
        console.log('gpts', gpts)
        setListGpts(gpts)
      }else if (event.key === 'Enter') {
        handleAddMessage(newValue)
        setInput('')
      }
    }
  
    const handleAddMessage = async (value, type = 'text') => {
      const newMessage = await detectBot(value, type)
  
      console.log('new message', newMessage)
  
      setHistory([...history, newMessage])
      setMessage((prevMessages) => [...prevMessages, newMessage])
  
      updateVector(tokenVector, 'bots', [...history, newMessage])
    }
  
    /* */
    const handleUndo = async () => {
      console.log('load')
      // Deshacer la última acción
      const lastValue = history.pop()
      setInput(lastValue?.text || '') // Si no hay historial, establecer el valor en blanco
      setHistory([...history])
      setMessage([...history])
  
      updateVector(tokenVector, 'bots', history)
    }
  
    // Función para borrar todo y dejar el input en blanco
    const handleClearAll = async () => {
      setHistory([])
      setMessage([])
  
      deleteVector(tokenVector, 'bots')
      setTokenVector(null)
    }
  
    const handleReturn = () => {
      localStorage.removeItem('tokenVector')
  
      setTokenVector(null)
    }


    const handleRemove = () => {
      alert('remove all alert bonito')
      removeAllVector('vector')
    }



  // ------------------------------------------------------------------------------------------------------------

  const createDashboard = () => {
    const workspaceId = uuidv4();
    const projectId = uuidv4();

    const obj = {
      workspaceId,
      projectId
    }

    const token = iniVector(obj)
    console.log('token', token, obj)

    localStorage.setItem('tokenVector', token)
    setTokenVector(token)
  }

  useEffect(() => {
    const loadFromIndexedDB = async () => {
      try {
        const dataValues1 = await getVector(tokenVector, 'bots')
        const dataValues = JSON.parse(dataValues1[0].message)
        console.log('val', dataValues)

        setHistory(dataValues || [])
        setMessage(dataValues || [])
      } catch (error) {
        console.error('Error al cargar desde IndexedDB:', error)
      }
    }

    // Llamar a la función para cargar desde IndexedDB al montar el componente
    if (tokenVector){
      loadFromIndexedDB()
    }
  }, [tokenVector])
  // }, [tokenVector])




  useEffect(() => {
    const existingTokenVector = localStorage.getItem('tokenVector')
    console.log('=======', existingTokenVector)
    if (existingTokenVector) {
      setTokenVector(existingTokenVector)
    }else{
      createDashboard()
    }
  }, []) // El array de dependencias vacío asegura que el efecto se ejecute solo al principio



  const handleClickGPT = () => {
    dispatch(setOpenChatBot(false))

    navigate(`/${'es'}/app/gpt`)
  }




  return (
    <div>
      {!tokenVector ? (
        <div>
            No tengo token vector
        </div>
      ) : (
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={handleDragStart}
            onDragLeave={handleDragEnd}
            onDrop={handleDrop}
            className="dark:bg-dark-900 dark:text-white"
          >
            <div className={styles["ChatBotRight"]}>
              <Bot message={message} gpts={gpts} openVector={openVector}  />
            </div>
              <div className={styles["botFooter"]}>
                <button onClick={() => setShowPicker((val) => !val)}>😊</button>
                {showPicker && (
                  <div
                    ref={pickerRef}
                    className={styles["emojiPicker"]}
                    style={{
                      position: 'absolute',
                      bottom: '80px',
                      left: '45px',
                      zIndex: '2',
                    }}
                  >
                    <Picker onEmojiClick={onEmojiClick} />
                  </div>
                )}
                <button id="dropdown-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <div className={styles["textarea"]}>
                  <textarea
                    value={input}
                    placeholder="Mensaje del bot @action"
                    onChange={handleChange}
                    onKeyDown={handleChange}
                  />
                </div>
                <div className={styles["microphoneWrapper"]}>
                  {/* <Microphone loadRecordVector={loadRecordVector} /> */}
                </div>
              </div>
              
            <div className={styles["buttons"]}>
              <div className={styles["left"]}>
                <button onClick={handleClickGPT}>GPT Store</button>
              </div>
              <div className={styles["right"]}>
                <button onClick={handleUndo}>Deshacer</button>
                <button onClick={handleClearAll}>Vaciar</button>
                <button onClick={handleReturn}>Atrás</button>
                <button onClick={handleRemove}>Remove</button>
              </div>
            </div>
              <div>
               
                {/* <Microphone loadRecordVector={loadRecordVector}/> */}
                {/* <Microphone loadRecordVector={loadRecordVector} /> */}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}



export default ChatBot





// export const ChatBot = ({}) => {


//   const sendMessage = () => {

    
//   }

//   return (
//     <div>
//       <div>
//         <label>

//           have a response
//         </label>
//       </div>
//       <div>
//         <textarea />
//         <button onClick={() => sendMessage()}>
//           Enviar un mensaje
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;