import React, { useState, useEffect, useRef } from 'react'
// import { openDB, deleteDB, wrap, unwrap } from 'idb'

// import InfoAythen from './infoAythen.jsx'
import styles from './bot.module.css'

// import { loadWorkspaces, getWorkspace } from './handleBot'

import {
  BotViewer,
  TextViewer,
  WebView,
  // RecordViewer,
  FileViewer,
  PdfViewer,
  ImageViewer,
  WorkspaceViewer,
  ProjectViewer,
  SpaceViewer,
  PageViewer,
  ComponentViewer,
  NewWorkspace,
  NewProject,
  NewSpace,
  NewPage,
  NewComponent,
  NewPlugin,
  PluginTranslate,
  PluginModel,
  EditColor,
  EditText,
  EditColorPicker,
  EditLabel,
  EditSection
} from './component/index'
// import { valuesIn } from 'lodash'

import { RecordViewer } from './component/record-viewer'

const Bots = ({
  message,
  openVector
}) => {
  //   const [internalHistory, setInternalHistory] = useState(history)
  const [internalMessage, setInternalMessage] = useState(message)

  //   const [internalType, setInternalType] = useState(type)

  //   const [internalWorkspace, setInternalWorkspace] = useState(workspace)
  //   const [internalProject, setInternalProject] = useState(project)
  //   const [internalSpace, setInternalSpace] = useState(space)
  //   const [internalPage, setInternalPage] = useState(page)
  //   const [internalComponent, setInternalComponent] = useState(component)
  //   const [internalFile, setInternalFile] = useState(file)

  // Function to scroll down in the chat container
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight - 200
    }
  }







  useEffect(() => {
    setInternalMessage(message)
    // scrollToBottom()

    // Esperar 100 milisegundos antes de llamar a scrollToBottom
    const timeoutId = setTimeout(() => {
      scrollToBottom()
    }, 100)

    // Limpieza del timeout en el caso de que el componente se desmonte antes de que transcurran los 100 ms
    return () => clearTimeout(timeoutId)
  }, [message])

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
        return <RecordViewer file={message}/>
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

  return (
    <div
      ref={chatContainerRef}
      className={styles['container']}
    >
      {internalMessage.map((message, key) => (
        <div key={key}>
          {renderViewer(message)}
        </div>
      ))}

      {internalMessage.length === 0 && (
        // <InfoAythen />
        <div>
          No existe nada que sea el sistema de pago ¿?
        </div>
      )}
      {/* <ImageViewer /> */}
      {/* {renderViewer()} */}
    </div>
  )
}

export default Bots
