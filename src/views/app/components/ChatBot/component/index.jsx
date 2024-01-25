import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

// import IconArrow from '../assets/icon-arrow.svg'
// import IconComponentGraph from '../assets/icon-component-graph.svg'
import IconComponentGroup from '../assets/icon-component-group.svg'
import IconComponentHeading1 from '../assets/icon-component-heading-1.svg'
import IconComponentHeading2 from '../assets/icon-component-heading-2.svg'
import IconComponentHeading3 from '../assets/icon-component-heading-3.svg'
import IconComponentList from '../assets/icon-component-list.svg'
// import IconComponentMap from '../assets/icon-component-map.svg'
import IconComponentParagraph from '../assets/icon-component-paragraph.svg'
import IconComponentTask from '../assets/icon-component-task.svg'
import IconLabelAlert from '../assets/icon-label-alert.svg'
import IconLabelCancel from '../assets/icon-label-cancel.svg'
import IconLabelInfo from '../assets/icon-label-info.svg'
import IconLabelMark from '../assets/icon-label-mark.svg'
import IconLabelSuccess from '../assets/icon-label-success.svg'
import ItemAvatar from '../assets/item-avatar.png'

import IconUpgrade from '../assets/icon-upgrade.svg'

import FilePDF from '../assets/file-pdf.svg'
// import ItemIconCode from '../assets/item-icon-code.svg'

import IconSection1 from '../assets/icon-section-1.png'
import IconSection2 from '../assets/icon-section-2.png'
import IconSection3 from '../assets/icon-section-3.png'

// import * as IconAction from '../assets/action/images'
import * as IconFile from '../assets/icon/images'


import {
  // openVector,
  openFile
} from '@/utils/vector'

// import { ChromePicker } from 'react-color'

// const [colorPreview] = useState({
//   h: 250,
//   s: 0,
//   l: 0.2,
//   a: 1
// })

export const calculateTimeAgo = (timestamp) => {
  const currentTime = new Date()
  const previousTime = new Date(timestamp)
  const timeDifference = currentTime - previousTime

  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds} seconds ago`
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else {
    return `${days} days ago`
  }
}

export const BotViewer = ({ text }) => {
  // Lógica para renderizar un visor de PDF
  if (typeof text === 'string')
    return (
      <div>
        <div className={styles.option}>
          <div>{text}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.avatar}>
            <img src={ItemAvatar.src} />
          </div>
          <div className={styles.messages}>
            <div className={styles.option + ' ' + styles.bot}>
              <div>Más información</div>
              <div>Ir a workspace</div>
              <div onClick="">Nuevo proyecto</div>
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>En que te puedo ayudar?</p>
            </div>
          </div>
        </div>
      </div>
    )
  return <div>not found text</div>
}

export const TextViewer = ({ text }) => {
  // Lógica para renderizar un visor de PDF
  if (typeof text === 'string')
    return (
      <div>
        <div className={styles.option}>
          <div>{text}</div>
        </div>
      </div>
    )
  return <div>not found text</div>
}


export const FileViewer = ({ file, click }) => {
  const fileName = file.message
  const mimeType = fileName.split('.').pop()
  const name = fileName.split('/').pop()

  // console.log('n', name)

  // Lógica para renderizar un visor de PDF
  return (
    <>
      <div
        className={styles.filePdf}
        onClick={() => {
          click(fileName)
        }}
      >
        <div className={styles.file}>
          <div className={styles.iconPdf}>
            {/* <FileIcon type={mimeType} /> */}
            <img src={IconFile[mimeType]?.src} alt={mimeType} />
          </div>
          <div className={styles.message}>
            <span> {file.currentDate}</span>
            <span>
              {file.type} - {name}
            </span>
          </div>
          <div className={styles.iconUpgrade}>
            <img src={IconUpgrade.src} />
          </div>
        </div>
      </div>
    </>
  )
}

export const PdfViewer = ({ file }) => {
  // Lógica para renderizar un visor de PDF
  return (
    <>
      <div className={styles.filePdf}>
        <div className={styles.file}>
          <div className={styles.iconPdf}>
            <img src={FilePDF.src} />
          </div>
          <div className={styles.message}>
            <span>PDF - {file.message}</span>
            <span>{file.currentDate}</span>
          </div>
          <div className={styles.iconUpgrade}>
            <img src={IconUpgrade.src} />
          </div>
        </div>
      </div>
    </>
  )
}

export const WebView = ({ file }) => {
  // Lógica para renderizar un visor web
  return <div>Web Viewer: {file.name}</div>
}

export const ImageViewer = ({ file }) => {
  const [fileVector, setFileVector] = useState(null)
  // Lógica para renderizar un visor de imágenes
  console.log('file', file)

  useEffect(async () => {
    const data = JSON.parse(file.data)

    const fetchData = async () => {
      try {
        const dataURI = await openFile(data);
        setFileVector(dataURI)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [file.data]);



  return (
  <div className={styles.boxImageViewer}>
    Image Viewerfrr: {file.message}
    {fileVector && (
    <img src={fileVector} />
    )}
  </div>
  )

}

export const WorkspaceViewer = ({ workspace }) => {
  return (
    <>
      {workspace.length > 0 ? (
        <div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>No hay workspace!</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Workspaces</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>
                Elige el workspace que quieras!
              </p>
            </div>
          </div>
          <div>
            {workspace.map((workspace, key) => (
              <div
                key={key}
                className={styles.option}
                // onClick={() => {getInternalWorkspace(workspace.id)}}
              >
                <div>{workspace.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export const ProjectViewer = ({ project }) => {
  return (
    <>
      {project.length > 0 ? (
        <div>No hay proyectos</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Textos</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            {project.map((project, key) => (
              <div
                key={key}
                className={styles.option}
                // onClick={() => {setInternalType('new-project')}}
              >
                <div>{project.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export const SpaceViewer = ({ space }) => {
  return (
    <>
      {space.length > 0 ? (
        <div>No hay espacios</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>espacios</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            {space.map((project, key) => (
              <div
                key={key}
                className={styles.option}
                // onClick={() => {setInternalType('new-project')}}
              >
                <div>{project.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export const PageViewer = ({ page }) => {
  return (
    <>
      {page.length > 0 ? (
        <div>No hay page</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>page</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            {page.map((project, key) => (
              <div
                key={key}
                className={styles.option}
                // onClick={() => {setInternalType('new-project')}}
              >
                <div>{project.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export const ComponentViewer = ({ component }) => {
  return (
    <>
      {component.length > 0 ? (
        <div>No hay componente</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Textos</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el que quieras!</p>
              <div className={styles.components}>
                <div>
                  <div className={styles.icon}>
                    <img src={IconComponentParagraph.src} />
                  </div>
                  <span>Párrafo</span>
                </div>
                <div>
                  <div className={styles.icon}>
                    <img src={IconComponentHeading1.src} />
                  </div>
                  <span>Heading 1</span>
                </div>
                <div>
                  <div className={styles.icon}>
                    <img src={IconComponentHeading2.src} />
                  </div>
                  <span>Heading 2</span>
                </div>
                <div>
                  <div className={styles.icon}>
                    <img src={IconComponentHeading3.src} />
                  </div>
                  <span>Heading 3</span>
                </div>
                <div>
                  <div className={styles.icon}>
                    <img src={IconComponentList.src} />
                  </div>
                  <span>Lista ordenada</span>
                </div>
                <div>
                  <div className={styles.icon}>
                    <img src={IconComponentGroup.src} />
                  </div>
                  <span>Lista desordenada</span>
                </div>
                <div>
                  <div className={styles.icon}>
                    <img src={IconComponentTask.src} />
                  </div>
                  <span>Lista de tareas</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.option}>
              <div>Volver</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const NewWorkspace = ({ workspace }) => {
  return (
    <>
      {workspace.length > 0 ? (
        <div>No se puede crear un nuevo workspace </div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Nuevo proyecto</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            <div>Quiero crear uno nueevo Quiero seleccionar los archivos</div>
          </div>
        </div>
      )}
    </>
  )
}

export const NewProject = ({ project }) => {
  return (
    <>
      {project.length > 0 ? (
        <div>No se puede crear un nuevo proyecto </div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Nuevo proyecto</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            <div>Quiero crear uno nueevo Quiero seleccionar los archivos</div>
          </div>
        </div>
      )}
    </>
  )
}

export const NewSpace = ({ space }) => {
  return (
    <>
      {space.length > 0 ? (
        <div>No se puede crear un nuevo space </div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Nuevo space</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            <div>Quiero crear uno nueevo Quiero seleccionar los archivos</div>
          </div>
        </div>
      )}
    </>
  )
}

export const NewPage = ({ page }) => {
  return (
    <>
      {page.length > 0 ? (
        <div>No se puede crear un nuevo page </div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Nuevo page</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            <div>Quiero crear uno nueevo Quiero seleccionar los archivos</div>
          </div>
        </div>
      )}
    </>
  )
}

export const NewComponent = ({ component }) => {
  return (
    <>
      {component.length > 0 ? (
        <div>No se puede crear un nuevo component </div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Nuevo component</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            <div>Quiero crear uno nueevo Quiero seleccionar los archivos</div>
          </div>
        </div>
      )}
    </>
  )
}

export const NewPlugin = ({ plugin }) => {
  return (
    <>
      {plugin.length === 0 ? (
        <div>No se puede crear un nuevo proyecto </div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Nuevo proyecto</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            <div>Quiero crear un nuevo plugin Quiero seleccionar un plugin</div>
          </div>
        </div>
      )}
    </>
  )
}

export const PluginTranslate = ({ translate }) => {
  return (
    <>
      {translate.length > 0 ? (
        <div>No se traducir</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Traducir el texto</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            <div>Quiero traducir los diferentes idiomas</div>
          </div>
        </div>
      )}
    </>
  )
}

export const PluginModel = ({ model }) => {
  return (
    <>
      {model.length > 0 ? (
        <div>No se model</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Conectar a otro bot #12345 (plugin)</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el proyecto que quieras!</p>
            </div>
          </div>
          <div>
            <div>Quiero traducir los diferentes idiomas</div>
          </div>
        </div>
      )}
    </>
  )
}

export const EditColor = ({ component }) => {
  return (
    <>
      {typeof component === 'object' &&
      component.flag &&
      typeof component.flag === 'string' &&
      component.flag === 'edit-color' ? (
        <div>No se model</div>
      ) : (
        <div className={styles.card}>
          <div className={styles.avatar}>
            <img src={ItemAvatar.src} />
          </div>
          <div className={styles.box}>
            <div className={styles.header}>
              <b>Asistente</b> de Aythen
            </div>
            <p className={styles.paragraph}>Aquí tienes algunas paletas</p>
            <div className={styles.pallete}>
              <div>
                <b>Caramel</b>
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const EditText = ({ component }) => {
  return (
    <>
      {component.length > 0 ? (
        <div>No se model</div>
      ) : (
        <div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>
                Hola 👋 <br />
                ¿En qué te puedo ayudar?
              </p>
            </div>
          </div>
          <div>
            <div className={styles.option}>
              <div>Paletas de colores</div>
              <div>Textos</div>
              <div>Labels</div>
              <div>Otros...</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const EditColorPicker = ({ component }) => {
  return (
    <>
      {component.length > 0 ? (
        <div>No se model</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Ver más</div>
              <div>Elige un color</div>
              <div>Labels</div>
              <div>Otros...</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el que quieras!</p>
              <div>{/* <ChromePicker color={colorPreview} /> */}</div>
            </div>
          </div>
          <div>
            <div className={styles.option}>
              <div>Volver</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const EditLabel = ({ component }) => {
  return (
    <>
      {component.length > 0 ? (
        <div>No se model</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Textos</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el que quieras!</p>
              <div className={styles.labels}>
                <div className={styles.label}>
                  <img src={IconLabelCancel.src} />
                  <span>Label</span>
                </div>
                <div className={styles.label}>
                  <img src={IconLabelSuccess.src} />
                  <span>Label</span>
                </div>
                <div className={styles.label}>
                  <img src={IconLabelInfo.src} />
                  <span>Label</span>
                </div>
                <div className={styles.label}>
                  <img src={IconLabelAlert.src} />
                  <span>Label</span>
                </div>
                <div className={styles.label}>
                  <img src={IconLabelMark.src} />
                  <span>Label</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.option}>
              <div>Volver</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const EditSection = ({ component }) => {
  return (
    <>
      {component.length === 0 ? (
        <div>No se model</div>
      ) : (
        <div>
          <div>
            <div className={styles.option}>
              <div>Textos</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={ItemAvatar.src} />
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <b>Asistente</b> de Aythen
              </div>
              <p className={styles.paragraph}>Elige el que quieras!</p>
              <div className={styles.sections}>
                <div>
                  <img src={IconSection1.src} />
                </div>
                <div>
                  <img src={IconSection2.src} />
                </div>
                <div>
                  <img src={IconSection3.src} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.option}>
              <div>Volver</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
