const { catchedAsync, response } = require('../utils/err')
const lancedb = require('vectordb')
const fs = require('fs')
const path = require('path')



const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,
} = require('../services/lancedb')






const decodeVector = (base64Str) => {
  const str = atob(base64Str)

  const [workspaceId, projectId] = str.split('/')
  return { workspaceId, projectId }
}







async function _addVector(req, res) {
  const { id, name, data } = req.body

  // console.log('d', id, name, data)

  const resp = await addVector(id, name, vector = [0, 0], data)

  // console.log('resp', resp)
  // response(res, 200, { data: resp })

  return res.status(200).send(resp)
}




async function _updateVector(req, res) {
  const { data } = req.body


  const { id, name } = req.params
  // const { workspaceId, projectId } = decodeVector(id)
  // const uri = 'data/vector/' + workspaceId + '/' + projectId

  console.log('update vector', id, name, data)

  // const resp = await addVector(id, name, vector = [0, 0], data)
  const resp = await updateVector(id, name, vector = [0, 0], data)
  // const resp = await addVector(id, name, vector = [0, 0], {message: data})
  console.log('resp', resp)

  return res.status(200).send(resp)
  // response(res, 200, { data: resp })
}






const addVectorData = async (req, res) => {
  try {
    const { id, title, data, vector } = req.body

    // console.log('idddd', id, data, vector)

    // console.log('==============', addon, vector)
    // const path = encodeVector(`addon/${data.title || 'shared'}`)
    // const name = vector.title + '-' + data.title
    // const result = await isAuth(token)

    const resp = await addVector(id, title, [0, 0, 0], data, { vectors: vector })
    // console.log('reess', resp)
    return res.status(200).send(data)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}







function _deleteDirSync(directorio) {
  try {
    const archivos = fs.readdirSync(directorio)

    archivos.forEach((archivo) => {
      const rutaArchivo = path.join(directorio, archivo)
      const stats = fs.statSync(rutaArchivo)

      if (stats.isDirectory()) {
        eliminarDirectorioSync(rutaArchivo) // Recursivamente eliminar directorios internos
      } else {
        fs.unlinkSync(rutaArchivo) // Eliminar archivo
      }
    })

    fs.rmdirSync(directorio) // Eliminar el directorio vacío
    console.log(`Directorio ${directorio} eliminado exitosamente.`)
  } catch (err) {
    console.error(`Error al eliminar el directorio ${directorio}: ${err}`)
  }
}



async function _deleteVector(req, res) {
  const { id, name } = req.params
  const { data } = req.body
  // console.log('delete', id, name, data)

  const resp = await deleteVector(id, name, data)
  // console.log('rrrrrr', resp)

  return res.status(200).send(data)
  // response(res, 200, { data: 200 })
}



async function _removeVector(req, res) {

  // response(res, 200, { data: 'hello world como estás' })
  const { id, name } = req.params
  const { workspaceId, projectId } = decodeVector(id)

  const uri = 'data/vector/' + workspaceId + '/' + projectId + '/' + name + '.lance/'

  try {
    await deleteDirSync(uri)

    console.log(`La tabla ${name} ha sido eliminada.`)
  } catch (error) {
    console.error(`Errors al eliminar la tabla ${name}: ${error.message}`)
  }

  // response(res, 200, { data: 200 })
  return res.status(200).send(200)
}







async function _openVector(req, res) {
  const { path } = req.body
  const pathSegments = path.split('/')
  const uri = btoa('data/vector/' + pathSegments[2] + '/' + pathSegments[3])
  const name = pathSegments[4]
  const fileName = pathSegments[5]

  const conditions = [{
    field: 'message', operator: '==', value: fileName
  }]

  const query = await getVector(uri, name, [0, 0], conditions)

  response(res, 200, { data: query })

}






async function _getVector(req, res) {
  const { id, name } = req.params
  const { data } = req.body

  try {
    let options = []


    if (data.title) {
      options = [
        { field: 'title', operator: 'LIKE', value: `%${data.title}%` }
      ];
    }else if (data.id) {
      options = [
        { field: 'id', operator: 'LIKE', value: `%${data.id}%` }
      ];
    }

    console.log('options', options)


    const query = await getVector(id, name, [0, 0], options)
    // const query = await getVector(id, name, [0, 0])

    if (!query.length) {
      // response(res, 200, { data: [] })
      return res.status(200).send([])
    }

    // response(res, 200, { data: query })
    if(options.length > 0){
      return res.status(200).send(query[0])
    }else{
      return res.status(200).send(query)
    }

  } catch (err) {
    // response(res, 200, { data: [] })
    return res.status(200).send([])
  }
}





async function _loadVector(req, res) {
  const { id, name } = req.params
  const { workspaceId, projectId } = decodeVector(id)

  const uri = 'data/vector/' + workspaceId + '/' + projectId
  const file = req.file
  const path = uri + '/' + name + '/' + file.originalname

  try {
    let type
    if (name === 'records') {
      type = 'record'
    } else {
      type = file.mimetype
    }

    const db = await lancedb.connect(uri)
    const tbl = await db.openTable(name)

    const message = [
      {
        currentDate: new Date().toISOString(),
        message: file.originalname,
        type,
        data: JSON.stringify(file),
        vector: [0, 0]
      }
    ]


    addVector(id, name, message)

    response(res, 200, { data: path })
  } catch (error) {
    console.error(`Errors al upload la tabla ${name}: ${error.message}`)
    response(res, 200, { error })
  }
}




async function _getAllVector(req, res) {
  const db = await lancedb.connect('data/vector')

  const tables = await db.tableNames()


  const tableInfoArray = await Promise.all(
    tables.map(async (table) => {
      const tbl = await db.openTable(table)
      const count = await tbl.countRows()

      // Crear un objeto con las propiedades deseadas
      return {
        title: table,
        count
      }
    })
  )

  response(res, 200, { data: tableInfoArray })
}




module.exports = {
  addVector: catchedAsync(_addVector),
  updateVector: catchedAsync(_updateVector),
  addVectorData: catchedAsync(addVectorData),

  loadVector: catchedAsync(_loadVector),
  deleteVector: catchedAsync(_deleteVector),
  removeVector: catchedAsync(_removeVector),
  openVector: catchedAsync(_openVector),
  getVector: catchedAsync(_getVector),
  getAllVector: catchedAsync(_getAllVector),
}
