import styles from "./index.module.css";
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


import Bot from './bot'
import BotAgent from './botAgent'

import {
  fetchsVector,
  updateVector,
  deleteVector,
  detectBot,
  detectDrop,
  loadVector,
  openVector,
  iniVector,
  removeAllVector
} from '@/actions/vector'



import {
  addChatbot,
  deleteChatbot
} from '@/actions/chatbot'


import Microphone from './component/microphone'

import {
  setOpenChatBot,
  setOpenMenuLeft,
  setOpenMenuRight
} from "@/actions/iam";


import Picker from 'emoji-picker-react';

const ChatBot = ({

}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [workspaceId] = useState(null)


  const {
    message,
    chatbot,
    chatbots
  } = useSelector((state) => state.chatbot)


  const { user, gpts } = useSelector((state) => state.iam)

  const [listGpts, setListGpts] = useState([])

  const [file, setFile] = useState(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [dragging, setDragging] = useState(false)

  // ------------------------------------------------------------------------------------------------------------

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);




  // ------------------------------------------------------------------------------------------------------------



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
    e.preventDefault()

    const droppedFile = e.dataTransfer.files[0]
    console.log('droppedFile', droppedFile)
    setFile(droppedFile)
    setDragging(false)

    const reader = new FileReader()

    reader.onload = async (event) => {
      const fileContent = event.target.result
      const type = detectDrop(droppedFile)
      const base64Content = arrayBufferToBase64(fileContent);

      const file = {
        type,
        name: droppedFile.name,
        base64Content
      }

      const { vector, uri } = await loadVector(tokenVector, 'files', file)
      const dropMessage = {
        vector,
        uri
      }

      handleAddMessage(dropMessage, type)
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

    if (input.startsWith('/')) {
      console.log('gpts', gpts)
      setListGpts(gpts)
    } else if (event.key === 'Enter') {
      handleAddMessage(newValue)
      setInput('')
    }
  }

  const handleAddMessage = async (value, type = 'text') => {
    const newMessage = await detectBot(value, type)
    const obj = {
      workspaceId: user.id,
      projectId: chatbot.id
    }

    const token = iniVector(obj)

    setMessages((prevMessages) => [...prevMessages, newMessage])
    dispatch(updateVector({
      id: token, 
      name: 'chatbots_vector', 
      data: {
        message: newMessage,
        createdAt: new Date().toISOString()
      }
    }))
  }



  useEffect(() => {
    const loadFromIndexedDB = async () => {
      try {
        const obj = {
          workspaceId: 'test',
          projectId: 'test'
        }

        const token = iniVector(obj)
        console.log('token', token, obj)

        const dataValues1 = await dispatch(fetchsVector({
          id: token,
          name: 'chatbots',
        }))

        const dataValues = JSON.parse(dataValues1[0].message)
        console.log('val', dataValues)
      } catch (error) {
        console.error('Error al cargar desde IndexedDB:', error)
      }
    }

    loadFromIndexedDB()

  }, [user])



  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        handleEscKey();
      }
    };

    const handleEscKey = () => {
      dispatch(setOpenChatBot(null))
      dispatch(setOpenMenuLeft(null))
      dispatch(setOpenMenuRight(null))
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [])






  // -------------------------------------------------------
  const handleClickGPT = () => {
    dispatch(setOpenChatBot(false))

    navigate(`/${'es'}/app/gpt`)
  }



  // -------------------------------------------------------
  const handleCancel = () => {
    dispatch(setOpenChatBot(false))
  }


  const handleAccept = () => {
    const data = {
      id: '',
      version: '',
      public: false,
      available: true,
      logo: '',
      name: '',
      description: '',
      num: 0,
      message: []
    }

    dispatch(addChatbot(data))

  }


  const handleDelete = () => {
    alert(1)
    dispatch(deleteChatbot({
      id: chatbot.id
    }))
    
  }





  return (
    <div>
      {chatbots.length == 0 ? (
        <div className={styles.noToken}>
          <b className={styles.title}>
            No tengo token vector
          </b>
          <p className={styles.text}>
            Estas seguro que quieres crear un chatbot nuevo?
          </p>
          <div className={styles.buttons}>
            <button
              className={styles.cancell}
              onClick={() => handleCancel()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
              </svg>
            </button>
            <button
              className={styles.accept}
              onClick={() => handleAccept()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
              </svg>
            </button>
          </div>
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
              <BotAgent />
              <Bot
                messages={messages}
                gpts={gpts}
                openVector={openVector}
                handleDelete={handleDelete}
              />
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
              <button
                id="dropdown-btn"
                onClick={() => handleClickGPT()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <div className={styles["textarea"]}>
                {message && (
                  <img src={message.buffer} />
                )}
                <textarea
                  value={input}
                  placeholder="Mensaje del bot @action"
                  spellCheck="false"
                  onChange={handleChange}
                  onKeyDown={handleChange}
                />
              </div>
              <div className={styles["microphoneWrapper"]}>
                {/* <Microphone loadRecordVector={loadRecordVector} /> */}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}



export default ChatBot





