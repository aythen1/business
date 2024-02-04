// https://lancedb.github.io/lancedb/ann_indexes/#projections-select-clause

const { catchedAsync, response } = require('../utils/err')
const lancedb = require('vectordb')
const fs = require('fs')
const path = require('path')

const jwt = require('jsonwebtoken')


const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,
} = require('../services/lancedb')



const ID = 'test/test'
const secretKey = 'keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf';


const encodeVector = (id) => {
  const str = `${id}`
  const base64Str = btoa(str)
  return base64Str
}

function decodeToken(token) {
  try {
    // Decodifica el token utilizando la clave secreta
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Maneja errores de decodificación, por ejemplo, token no válido o expirado
    console.error('Error al decodificar el token:', error.message);
    return null;
  }
}



const isAuth = async (token) => {
  const data = await decodeToken(token)
  const path = encodeVector(ID)

  // console.log('ddd', data)

  const options = [
    { field: 'id', operator: '==', value: data.id },
    { field: 'user', operator: '==', value: data.user },
    { field: 'isverified', operator: '==', value: true }
  ];

  const resp = await getVector(path, 'users', [0, 0], options)

  if (resp.length > 0) return resp[0]
  return false
}





const decodeVector = (base64Str) => {
  const str = atob(base64Str)

  const [workspaceId, projectId] = str.split('/')
  return { workspaceId, projectId }
}

async function _addVector(req, res) {
  const { id, name, data } = req.body
  // const { workspaceId, projectId } = decodeVector(id)
  // const uri = 'data/vector/' + workspaceId + '/' + projectId

  console.log('_addVector_addVector', id, name, data)
  const resp = await addVector(id, name, vector = [0, 0], data)

  console.log('resp', resp)
  response(res, 200, { data: id })
}

async function _updateVector(req, res) {
  const { token, data } = req.body
  const payload = await isAuth(token)

  if (!payload) {
    return res.status(501).send('Not verify user')
  }

  const { id, name } = req.params
  const { workspaceId, projectId } = decodeVector(id)
  const uri = 'data/vector/' + workspaceId + '/' + projectId
  
  
  console.log('===================================', name, data)
  
  const resp = await addVector(id, name, vector = [0, 0], {message: data})
  
  console.log('===================================', name, resp)
  response(res, 200, { data: id })
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
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const payload = await isAuth(token)

  if (!payload) {
    return res.status(501).send('Not verify user')
  }


  const { id, name } = req.params
  const { workspaceId, projectId } = decodeVector(id)

  const uri = 'data/vector/' + workspaceId + '/' + projectId + '/' + name + '.lance/'

  try {
    await deleteDirSync(uri)

    console.log(`La tabla ${name} ha sido eliminada.`)
  } catch (error) {
    console.error(`Errors al eliminar la tabla ${name}: ${error.message}`)
  }

  response(res, 200, { data: 200 })
}

async function _removeVector(req, res) {

  response(res, 200, { data: 'hello world como estás' })
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
  const { token, search } = req.body
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const payload = await isAuth(token)

  if (!payload) {
    return res.status(501).send('Not verify user')
  }

  try{

    const options = [
      { field: 'title', operator: 'LIKE', value: `%${search}%` }
    ];
    
    const query = await getVector(id, name, [0, 0], options)

    console.log('query', query)

    if(!query.length){
      // response(res, 200, { data: [] })
      return res.status(200).send([])
    }
    
    // response(res, 200, { data: query })
    return res.status(200).send(query)
    
  }catch(err){
    // response(res, 200, { data: [] })
    return res.status(200).send([])
  }


}


async function _loadVector(req, res){
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

    // // not exist table
    // if (tbl === 404) {
    //   await db.createTable(name, message)
    // } else {
    //   await tbl.add(message)
    // }
    addVector(id, name, message)


    response(res, 200, { data: path })
  } catch (error) {
    console.error(`Errors al upload la tabla ${name}: ${error.message}`)
    response(res, 200, { error })
  }
}






// ----------------------------------------------------------------------------------------------

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
  loadVector: catchedAsync(_loadVector),
  addVector: catchedAsync(_addVector),
  deleteVector: catchedAsync(_deleteVector),
  removeVector: catchedAsync(_removeVector),
  openVector: catchedAsync(_openVector),
  getVector: catchedAsync(_getVector),
  getAllVector: catchedAsync(_getAllVector),
  updateVector: catchedAsync(_updateVector)
}
