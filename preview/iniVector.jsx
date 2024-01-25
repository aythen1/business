import apiBackend from '@/utils/services/apiBackend.js'

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

// Codificar el objeto a Base64
const encodeVector = (obj) => {
  const str = `${obj.workspaceId}/${obj.projectId}`
  const base64Str = btoa(str)
  return base64Str
}

// Decodificar la cadena Base64 a objeto
export const decodeVector = (base64Str) => {
  const str = atob(base64Str)

  const [workspaceId, projectId] = str.split('/')
  return { workspaceId, projectId }
}

//
export const iniVector = (obj) => {
  encodeVector(obj)
}

export const openVector = async (pathName) => {
  try {
    const res = await apiBackend.post(
      'http://localhost:4000/api/v1/gpt/vector/file',
      {
        path: pathName
      }
    )
    const file = JSON.parse(res.data.data.data[0].data)
    console.log('res', file)

    // // Supongamos que buffer contiene los datos del archivo test.eps

    // Convertir el buffer a Blob
    const blob = new Blob([file.buffer.data], { type: file.mimetype })

    // Crear un enlace de descarga
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.download = file.originalname

    // Agregar el enlace al cuerpo del documento (invisible)
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)

    // Simular clic en el enlace para iniciar la descarga
    downloadLink.click()

    // Eliminar el enlace después de la descarga
    document.body.removeChild(downloadLink)

    return 200
  } catch (error) {
    console.error('Error:', error)
  }
}

export const openRecordVector = async(pathName) => {
  console.log('open record vector')

  try {
    const res = await apiBackend.post(
      'http://localhost:4000/api/v1/gpt/vector/file',
      {
        path: pathName
      }
    )

    console.log('rr', res)
    const file = JSON.parse(res.data.data.data[0].data)
    console.log('resss record', file)

  
    return file
  } catch (error) {
    console.error('Error:', error)
  }

}


export const loadVector = async (vectorId, name, formData) => {
  try {
    const res = await apiBackend.post(
      `http://localhost:4000/api/v1/gpt/vector/load/${vectorId}/${name}`,
      formData
    )
    console.log('dd load vector', res)
    return res.data.data.data
  } catch (error) {
    console.error('Error:', error)
  }
}




export const addVector = async (obj, overwrite = false) => {
  try {
    const res = await apiBackend.post(
      'http://localhost:4000/api/v1/gpt/vector/',
      {
        overwrite,
        vectorId: encodeVector({
          workspaceId: obj.workspaceId,
          projectId: obj.projectId
        }),
        name: obj.name,
        data: obj.data
      }
    )
    console.log('add vector', res)
    return res.data.data.data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const updateVector = async (vectorId, name, data) => {
  try {
    const res = await apiBackend.post(
      `http://localhost:4000/api/v1/gpt/vector/${vectorId}/${name}`,
      {
        data
      }
    )

    return res.data.data.data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const deleteVector = async (vectorId, name) => {
  try {
    const res = await apiBackend.delete(
      `http://localhost:4000/api/v1/gpt/vector/${vectorId}/${name}`
    )
    console.log('dd', res)
    return res.data.data.slice(0, 4)
  } catch (error) {
    console.error('Error:', error)
  }
}

export const getVector = async (vectorId, name) => {
  try {
    const res = await apiBackend.get(
      `http://localhost:4000/api/v1/gpt/vector/${vectorId}/${name}`
    )
    return res.data.data.data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const getAllVector = async () => {
  try {
    const res = await apiBackend.get('http://localhost:4000/api/v1/gpt/vector/')
    // console.log('dd', res.data.data.data)
    return res.data.data.data.slice(0, 4)
  } catch (error) {
    console.error('Error:', error)
  }
}

export const detectDrop = (file) => {
  if (file.type.startsWith('video/vnd.dlna.mpeg-tts')) {
    // setVideoFile(video)
    console.log('ts', file.type)
    return 'video/vnd.dlna.mpeg-tts'
  } else if (file.type.startsWith('text/javascript')) {
    // setVideoFile(video)
    console.log('js', file.type)
    return 'text/javascript'
  } else if (file.type.startsWith('text/css')) {
    // setVideoFile(video)
    console.log('js', file.type)
    return 'text/css'
  } else if (file.type.startsWith('text/html')) {
    console.log('html', file.type)
    return 'text/html'
  } else if (file.type.startsWith('video/')) {
    // setVideoFile(video)
    console.log('video', file.type)
    return file.type
  } else if (file.type.startsWith('image/')) {
    console.log('image', file.type)
    return file.type
  } else if (file.type.startsWith('application/x-zip-compressed')) {
    console.log('zip', file.type)
    return 'application/x-zip-compressed'
  } else if (file.type.startsWith('application/pdf')) {
    console.log('pdf', file.type)
    return 'application/pdf'
  } else if (file.type.startsWith('text/plain')) {
    console.log('text', file.type)
    return 'text/plain'
  } else if (file.type.startsWith('audio/mpeg')) {
    console.log('mp3', file.type)
    return 'audio/mpeg'
  } else if (file.type.startsWith('application/json')) {
    console.log('json', file.type)
    return 'application/json'
  } else if (file.type.startsWith('application/postscript')) {
    console.log('ai', file.type)
    return 'application/postscript'
  } else {
    const fileExtension = file.name.split('.').pop()

    switch (fileExtension.toLowerCase()) {
      case 'jsx':
        console.log('jsx', file.type)
        return 'text/jsx'
      case 'md':
        console.log('md', file.type)
        return 'text/md'
    }
  }
}

export const detectBot = (value, type) => {
  let response
 

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
    'text/md',
    // premium
    'record'
  ]

  const target = allowDrop.includes(type)
  // console.log('target,', target)
  if (target) {
    switch(type){
      case 'record':
        response = {
          currentDate: new Date(),
          message: value.uri,
          data: JSON.stringify(value.volumeArray),
          type
        }
      break
      default:
        response = {
          currentDate: new Date(),
          message: value,
          // document: 'droppedFile', // texto | image |
          type
        }
    }
    
  }else{
     // Define el regex para capturar el camel-case después de @
  const regex = /@([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)/
  const match = value.match(regex)
    
    if(match){

      // Switch basado en el camel-case
      const camelCase = match[1]
      switch (camelCase) {
        case 'new-workspace':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'new/workspace'
          }
          break
        case 'new-project':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'new/project'
          }
          break
        case 'new-space':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'new/space'
          }
          break
        case 'new-page':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'new/page'
          }
          break
        case 'new-component':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'new/component'
          }
          break
        case 'workspace':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'workspace/viewer'
          }
          break
        case 'project':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'project/viewer'
          }
          break
        case 'space':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'space/viewer'
          }
          break
        case 'page':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'page/viewer'
          }
          break
        case 'component':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'component/viewer'
          }
          break
        case 'plugin':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'plugin/model'
          }
          break
        case 'translate':
          response = {
            currentDate: new Date(),
            message: value,
            type: 'plugin/translate'
          }
          break
        case 'bot':
        case 'help':
          response = { currentDate: new Date(), message: value, type: 'bot' }
          break
        case 'text':
          response = { currentDate: new Date(), message: value, type: 'text' }
          break
        default:
          if (camelCase.startsWith('edit-')) {
            value = {
              flag: camelCase,
              component: 'component de prueba test A1'
            }
            response = {
              currentDate: new Date(),
              message: value,
              type: `edit/${camelCase.slice(5)}`
            }
          } else {
            response = { currentDate: new Date(), message: value, type }
          }
      }
    }else {
      // No se encontró un patrón @[camel-case]
      response = { currentDate: new Date(), message: value, type: 'text' }
    }
  } 

  return response
}
