// https://lancedb.github.io/lancedb/ann_indexes/#projections-select-clause

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




// const fs = require('fs')
// const path = require('path')
// const archiver = require('archiver')
// const KEY_OPENAI = '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'

// Codificar el objeto a Base64
// const encodeVector = (obj) => {
//     const str = `${obj.userId}-${obj.workspaceId}-${obj.projectId}`
//     const base64Str = btoa(str)
//     return base64Str
//   }

// const pdf = require('pdf-parse')
// const pdf = require('pdf-parse')

// const KEY_OPENAI = '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'

// Decodificar la cadena Base64 a objeto
const decodeVector = (base64Str) => {
  const str = atob(base64Str)

  const [workspaceId, projectId] = str.split('/')
  return { workspaceId, projectId }
}

async function _addVector(req, res) {
  const { id, name, data } = req.body
  const { workspaceId, projectId } = decodeVector(id)
  // const uri = 'data/vector/' + workspaceId + '/' + projectId

  console.log('wcenic!!!!!!!!!!!!!!', name)
  const resp = await addVector(id, name, vector = [0, 0], data)

  response(res, 200, { data: id })

  // const { vectorId, name, overwrite, data } = req.body
  // const { workspaceId, projectId } = decodeVector(vectorId)
  // const dataName = 'data/vector/' + workspaceId + '/' + projectId
  // const _vector = [1.3, 1.4]

  // const tableSchema = {
  //   type: 'object',
  //   properties: {
  //     currentDate: { type: 'string' },
  //     message: { type: 'string' },
  //     type: { type: 'string' },
  //     data: { type: 'string' }
  //     // ... otras propiedades según tus necesidades
  //   },
  //   required: ['currentDate', 'message', 'type']
  // }

  // const _data = data.map((obj) => {
  //   const { vector, _distance, ...rest } = obj

  //   if (!rest.data) rest.data = JSON.stringify({})

  //   return { ...rest, vector: _vector }
  // })

  // console.log('d', _data)

  // try {
  //   const db = await lancedb.connect(dataName)

  //   console.log('xwdiwediie')

  //   if (!overwrite) {
  //     await db.createTable(name, _data, { schema: tableSchema })
  //   } else {
  //     await db.createTable(name, _data, {
  //       schema: tableSchema,
  //       writeMode: 'overwrite'
  //     })
  //   }

  //   response(res, 200, { data: vectorId })
  // } catch (error) {
  //   console.error('Error translating text:', error)
  //   response(res, 200, { data: vectorId })
  //   // throw error
  // }
}

async function _updateVector(req, res) {
  const { id, name } = req.params
  const { data } = req.body
  // const { workspaceId, projectId } = decodeVector(id)
  // const uri = 'data/vector/' + workspaceId + '/' + projectId
  
  
  console.log('===================================', name, data)
  
  const resp = await addVector(id, name, vector = [0, 0], {message: data})
  
  console.log('===================================', name, resp)
  response(res, 200, { data: id })

  // // await tbl.add([
  // //   { vector: [1.3, 1.4], item: 'fizz', price: 100.0 },
  // //   { vector: [9.5, 56.2], item: 'buzz', price: 200.0 }
  // // ])
  // const { id, name } = req.params

  // const { workspaceId, projectId } = decodeVector(id)

  // const { data } = req.body
  // const dataName = 'data/vector/' + workspaceId + '/' + projectId

  // let _vector = [1.3, 1.4]

  // try {
  //   const db = await lancedb.connect(dataName)

  //   const _data = data.map((obj) => {
  //     const { vector, _distance, ...rest } = obj
  //     return { ...rest, vector: _vector }
  //   })

  //   await db.createTable(name, _data, { writeMode: 'overwrite' })
  //   response(res, 200, { data: id })
  // } catch (error) {
  //   console.error('Error translating text:', error)
  //   response(res, 202, { data: id })
  //   // throw error
  // }
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

  // Split the path into an array of segments
  const pathSegments = path.split('/')
  // const uri = pathSegments[0] + '/' + pathSegments[1] + '/' + pathSegments[2] + '/' + pathSegments[3]
  const uri = btoa('data/vector/' + pathSegments[2] + '/' + pathSegments[3])
  const name = pathSegments[4]
  const fileName = pathSegments[5]

  const conditions = [{
    field: 'message', operator: '==', value: fileName
  }]

  const query = await getVector(uri, name, [0, 0], conditions)
  
  response(res, 200, { data: query })

  // try {
  //   const db = await lancedb.connect(uri)
  //   const tbl = await db.openTable(name)

  //   const query = await tbl
  //     .search([2, 2.1])
  //     .where(
  //       `(
  //       message = '${fileName}'
  //     )`
  //     )
  //     .execute()
  //   response(res, 200, { data: query })
  // } catch (error) {
  //   response(res, 200, { error })
  // }
}

async function _getVector(req, res) {
  try{
    const { id, name } = req.params
    const { workspaceId, projectId } = decodeVector(id)
    
    // const uri = 'data/vector/' + workspaceId + '/' + projectId
    
    // const db = await lancedb.connect(uri)
    // const tbl = await db.openTable(name)

    console.log('idd', id, name, workspaceId, projectId)
    
    // const query = await tbl.search([100, 100]).limit(99).execute()
    const query = await getVector(id, name, [0, 0])
    // console.log('qq', query)
    // console.log('wcjwncunwucuewncue', query)
    if(!query.length){
      response(res, 200, { data: [] })
    }
  
    response(res, 200, { data: query })
  }catch(err){
    response(res, 200, { data: [] })
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

async function _indexVector(req, res) {

  response(res, 200, { data: 200 })
}




module.exports = {
  loadVector: catchedAsync(_loadVector),
  addVector: catchedAsync(_addVector),
  deleteVector: catchedAsync(_deleteVector),
  removeVector: catchedAsync(_removeVector),
  openVector: catchedAsync(_openVector),
  getVector: catchedAsync(_getVector),
  getAllVector: catchedAsync(_getAllVector),
  indexVector: catchedAsync(_indexVector),
  updateVector: catchedAsync(_updateVector)
}
