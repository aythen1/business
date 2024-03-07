import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import InfoAythen from './infoAythen'
import styles from './bot.module.css'


import {
  updateDefault
} from '@/actions/iam'

import {
  BotViewer,
  TextViewer,
  WebView,
  FileViewer,
  PdfViewer,
  ImageViewer,
  WorkspaceViewer, //
  ProjectViewer, //
  SpaceViewer, //
  PageViewer, //
  ComponentViewer, //
  NewWorkspace, //
  NewProject, //
  NewSpace, //
  NewPage, //
  NewComponent, //
  NewPlugin, //
  PluginTranslate,
  PluginModel,
  EditColor,
  EditText,
  EditColorPicker,
  EditLabel,
  EditSection
} from './component/index'

import { RecordViewer } from './component/record-viewer'




const Bots = ({
  gpt: _gpt,
  gpts,
  messages,
  handleDelete,
  openVector
}) => {
  const dispatch = useDispatch()

  const { message } = useSelector((state) => state.chatbot)

  const [gpt, setGpt] = useState(_gpt)
  const [listGpts, setListGpts] = useState(gpts)
  const [internalMessage, setInternalMessage] = useState(messages)


  const chatContainerRef = useRef(null)

  const handleAudioMessage = (audioUrl, volumeArray) => {
    const newAudioMessage = {
      type: 'audio',
      url: audioUrl,
      volumeArray: volumeArray,
    };

    // Agrega el nuevo mensaje de audio al estado
    setInternalMessage((prevMessages) => [...prevMessages, newAudioMessage]);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight - 200
    }
  }

  useEffect(() => {
    setInternalMessage(messages)

    const timeoutId = setTimeout(() => {
      scrollToBottom()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [messages])




  const renderViewer = (message) => {
    const allowDrop = [
      'video/vnd.dlna.mpeg-tts',
      'text/javascript',
      'text/css',
      'text/html',
      'video/mp4',
      'application/x-zip-compressed',
      'application/pdf',
      'text/plain',
      'audio/mpeg',
      'application/json',
      'application/postscript',
      'text/jsx',
      'text/md'
    ]

    const target = allowDrop.includes(message.type)

    if (target) return <FileViewer file={message} click={openVector} />


    console.log('(message.type', message.type)
    switch (message.type) {
      case 'record':
        return <RecordViewer file={message} />
      case 'image/jpeg':
      case 'image/png':
        return <ImageViewer file={message} />
      case 'application/pdf':
        return <PdfViewer file={message} />
      case 'WebView/web':
        return <WebView file={[]} />
      case 'workspace/viewer':
        return <WorkspaceViewer workspace={[0]} />
      case 'project/viewer':
        return <ProjectViewer project={[0]} />
      case 'space/viewer':
        return <SpaceViewer space={[0]} />
      case 'page/viewer':
        return <PageViewer page={[0]} />
      case 'component/viewer':
        return <ComponentViewer component={[0]} />
      case 'new/workspace':
        return <NewWorkspace workspace={[0]} />
      case 'new/project':
        return <NewProject project={[0]} />
      case 'new/space':
        return <NewSpace space={[0]} />
      case 'new/Page':
        return <NewPage page={[0]} />
      case 'new/component':
        return <NewComponent component={[0]} />
      case 'new/plugin':
        return <NewPlugin plugin={[0]} />
      case 'plugin/translate':
        return <PluginTranslate translate={message} />
      case 'plugin/model':
        return <PluginModel model={message} />
      case 'edit/color':
        return <EditColor component={message} />
      case 'edit/text':
        return <EditText component={message} />
      case 'edit/colorpicker':
        return <EditColorPicker component={message} />
      case 'edit/label':
        return <EditLabel component={message} />
      case 'edit/section':
        return <EditSection component={message} />
      case 'bot':
        return <BotViewer text={message.message} />
      case 'text':
        return <TextViewer text={message.message} />
      default:
        // console.log(',deedd', message)
        return <div>error server</div>
    }
  }



  const handleClickFav = (value, id) => {
    const data = {
      id,
      fav: value
    }

    dispatch(updateDefault({
      table: 'gpts',
      data
    }))
  }


  const selectedBot = (item) => {
    setListGpts([])
    setGpt(item)
  }


  const handleReturnClick = () => {
    setGpt(false)
  }



  return (
    <div
      ref={chatContainerRef}
      className={styles['container']}
    >
      {internalMessage.length > 0 && (
        <div 
          className={styles.ButtonDelete}
          onClick={handleDelete}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
          </svg>
        </div>
      )}
      {internalMessage.map((message, key) => (
        <div key={key}>
          {renderViewer(message)}
        </div>
      ))}

      {gpt ? (
        <div className={styles["grid-gpt"]}>
          <div
            className={styles["grid"]}
          >
            <div className={styles["container"]}>
              <div className={styles["header"]} >
                <img src={gpt.image} className={styles["image"]} />
                <div className={styles["info"]}>
                  <b className={styles["title"]}>
                    <div className={styles["buttonFav"]}>
                      {gpt.fav ? (
                        <button
                          className={styles["active"]}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleClickFav(false, gpt.id)
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className={styles["desactive"]}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleClickFav(true, gpt.id)
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.9c0-.2 0-.5.2-.6l.6-.3h8.4c.2 0 .4 0 .6.3l.2.6V21Z" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {gpt.title}
                  </b>
                  <div className={styles["label"]}>
                    <span className={styles["author"]}>
                      By khanack.org
                    </span>
                    <span className={styles["downlaod"]}>
                      50.5K
                    </span>
                  </div>
                </div>
                <div
                  className={styles['return']}
                  onClick={() => handleReturnClick()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                  </svg>
                </div>
              </div>
              <p className={styles["description"]}>
                {gpt.description}
              </p>
            </div>
          </div>
        </div>
      ) : listGpts.length > 0 ? (
        <div className={styles["grid-gpts"]}>
          {listGpts.map((item, index) => (
            <div
              key={index}
              onClick={() => selectedBot(item)}
              className={styles["grid"]}
            >
              <div className={styles["left"]}>
                <img src={item.image} className={styles["image"]} />
              </div>
              <div className={styles["container"]}>
                <b className={styles["title"]}>
                  <div className={styles["buttonFav"]}>
                    {item.fav ? (
                      <button
                        className={styles["active"]}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClickFav(false, item.id)
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className={styles["desactive"]}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClickFav(true, item.id)
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.9c0-.2 0-.5.2-.6l.6-.3h8.4c.2 0 .4 0 .6.3l.2.6V21Z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.title}
                </b>
                <p className={styles["description"]}>
                  {item.description}
                </p>
                <div className={styles["label"]}>
                  <span className={styles["author"]}>
                    By khanack.org
                  </span>
                  <span className={styles["downlaod"]}>
                    50.5K
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ height: '100%' }}>
          {internalMessage.length === 0 && (
            <InfoAythen />
          )}
        </div>
      )}
    </div>
  )
}

export default Bots
