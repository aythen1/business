// https://lancedb.github.io/lancedb/ann_indexes/#projections-select-clause

const { catchedAsync, response } = require('../utils/err')
const lancedb = require('vectordb')
const fs = require('fs').promises
const path = require('path')
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

async function addVector(req, res) {
  const { vectorId, name, overwrite, data } = req.body
  const { workspaceId, projectId } = decodeVector(vectorId)
  const dataName = 'data/vector/' + workspaceId + '/' + projectId
  const _vector = [1.3, 1.4]

  const tableSchema = {
    type: 'object',
    properties: {
      currentDate: { type: 'string' },
      message: { type: 'string' },
      type: { type: 'string' },
      data: { type: 'string' }
      // ... otras propiedades según tus necesidades
    },
    required: ['currentDate', 'message', 'type']
  }

  const _data = data.map((obj) => {
    const { vector, _distance, ...rest } = obj

    if (!rest.data) rest.data = JSON.stringify({})

    return { ...rest, vector: _vector }
  })

  console.log('d', _data)

  try {
    const db = await lancedb.connect(dataName)

    console.log('xwdiwediie')

    if (!overwrite) {
      await db.createTable(name, _data, { schema: tableSchema })
    } else {
      await db.createTable(name, _data, {
        schema: tableSchema,
        writeMode: 'overwrite'
      })
    }

    response(res, 200, { data: vectorId })
  } catch (error) {
    console.log('Error translating text:', error)
    response(res, 200, { data: vectorId })
    // throw error
  }
}

async function updateVector(req, res) {
  // await tbl.add([
  //   { vector: [1.3, 1.4], item: 'fizz', price: 100.0 },
  //   { vector: [9.5, 56.2], item: 'buzz', price: 200.0 }
  // ])
  const { id, name } = req.params

  const { workspaceId, projectId } = decodeVector(id)

  const { data } = req.body
  const dataName = 'data/vector/' + workspaceId + '/' + projectId

  let _vector = [1.3, 1.4]

  try {
    const db = await lancedb.connect(dataName)
    // console.log('create', data)

    // if(data.length > 0 && data[0].vector ){
    //     _vector = data[0].vector
    // }

    const _data = data.map((obj) => {
      const { vector, _distance, ...rest } = obj
      return { ...rest, vector: _vector }
    })

    await db.createTable(name, _data, { writeMode: 'overwrite' })
    response(res, 200, { data: id })
  } catch (error) {
    console.error('Error translating text:', error)
    response(res, 202, { data: id })
    // throw error
  }
}

function eliminarDirectorioSync(directorio) {
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

async function deleteVector(req, res) {
  const { id, name } = req.params

  const { workspaceId, projectId } = decodeVector(id)

  const uri =
    'data/vector/' + workspaceId + '/' + projectId + '/' + name + '.lance/'

  //   const tablePath = path.join(uri, `${name}.ldb`)

  try {
    // Verificar si la tabla existe antes de intentar eliminarla
    // await fs.access(uri)

    // Eliminar la tabla
    // await fs.removeSync(uri)

    await eliminarDirectorioSync(uri)

    console.log(`La tabla ${name} ha sido eliminada.`)
  } catch (error) {
    console.error(`Errors al eliminar la tabla ${name}: ${error.message}`)
  }

  response(res, 200, { data: 200 })
}

async function removeVector(req, res) {
  //   const tbl = await db.openTable(id)

  //   await tbl.delete()
  // await tbl.delete('item = "fizz"')

  // const con = await lancedb.connect('./.lancedb')
  // const data = [
  //   { id: 1, vector: [1, 2] },
  //   { id: 2, vector: [3, 4] },
  //   { id: 3, vector: [5, 6] }
  // ]
  // const tbl = await con.createTable('my_table', data)
  // await tbl.delete('id = 2')
  // await tbl.countRows() // Returns 2

  // const to_remove = [1, 5]
  // await tbl.delete(`id IN (${to_remove.join(',')})`)7
  response(res, 200, { data: 'hello world como estás' })
}


async function borrarContenidoDirectorio(rutaDirectorio) {
  try {
    // Obtener la lista de elementos en el directorio
    const elementos = await fs.readdir(rutaDirectorio);

    console.log('el', elementos)

    // Iterar sobre cada elemento y borrarlo
    for (const elemento of elementos) {
      const rutaElemento = path.join(rutaDirectorio, elemento);
      const stat = await fs.stat(rutaElemento);

      if (stat.isDirectory()) {
        // Si es un directorio, llamar recursivamente a la función para borrar su contenido
        await borrarContenidoDirectorio(rutaElemento);
      } else {
        // Si es un archivo, borrarlo
        await fs.unlink(rutaElemento);
      }
    }

    // Después de borrar todos los elementos, eliminar el directorio principal
    await fs.rmdir(rutaDirectorio);
    console.log(`Contenido de ${rutaDirectorio} borrado.`);
  } catch (error) {
    console.error(`Error al borrar contenido de ${rutaDirectorio}: ${error.message}`);
  }
}

async function removeAllVector(req, res) {
  const { path: pathVariable } = req.body;
  console.log('remove all', pathVariable);
  try {
    const directorioBase = 'data/'; // Ruta base del directorio

    // Construir la ruta completa del directorio
    const rutaDirectorio = path.join(directorioBase, pathVariable || '');

    // Llamar a la función para borrar contenido de manera recursiva
    await borrarContenidoDirectorio(rutaDirectorio);

    console.log(`Contenido de ${rutaDirectorio} borrado.`);
    // Asegúrate de definir correctamente la función de respuesta (response)
    // Puedes implementar tu lógica de respuesta aquí
    response(res, 200, { data: 'Borrado exitoso' });
  } catch (error) {
    console.error(`Error al borrar contenido de: ${error.message}`);
    // Asegúrate de definir correctamente la función de respuesta (response)
    // Puedes implementar tu lógica de respuesta aquí
    response(res, 500, { error: 'Error interno del servidor' });
  }
}

async function openVector(req, res) {
  const { path, vector = [2, 2] } = req.body

  
  // Split the path into an array of segments
  const pathSegments = path.split('/')
  const uri =
    pathSegments[0] +
    '/' +
    pathSegments[1] +
    '/' +
    pathSegments[2] +
    '/' +
    pathSegments[3]
  const name = pathSegments[4]
  const fileName = pathSegments[5]

  console.log('ee', name)

  try {
    const db = await lancedb.connect(uri)
    const tbl = await db.openTable(name)

    const query = await tbl
      .search(vector)
      // .select(['message'])
      // .search('.pdf')
      .where(
        `(
        message = '${fileName}'
      )`
      )
      // .limit(1zz)
      .execute()

      // console.log('mess', query)

    response(res, 200, { data: query })
  } catch (error) {
    response(res, 200, { error })
  }
}

async function getVector(req, res) {
  
  const { id, name } = req.params
  const { workspaceId, projectId } = decodeVector(id)

  const uri = 'data/vector/' + workspaceId + '/' + projectId

  const db = await lancedb.connect(uri)
  const tbl = await db.openTable(name)

  const query = await tbl.search([100, 100]).limit(99).execute()

  //   console.log('tbl', tbl)
  //   const query = await tbl
  //     .search(Array(1536).fill(1.2))
  //     .metricType('cosine')
  //     .limit(10)
  //     .execute()

  response(res, 200, { data: query })

  // const results_2 = await tbl
  //   .search(Array(1536).fill(1.2))
  //   .metricType('cosine')
  //   .limit(10)
  //   .execute()

  //   tbl.search([100, 102])
  //  .where(`(
  //       (label IN [10, 20])
  //       AND
  //       (note.email IS NOT NULL)
  //   ) OR NOT note.created
  //  `)

  // const results_2 = await table
  //   .search(Array(1536).fill(1.2))
  //   .where("id != '1141'")
  //   .execute()

  // const results_3 = await table
  // .search(Array(1536).fill(1.2))
  // .select(["id"])
  // .execute()
}

async function getAllVector(req, res) {
  const db = await lancedb.connect('data/vector')

  const tables = await db.tableNames()
  console.log('t', tables)

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

async function indexVector(req, res) {
  // const vectordb = require('vectordb')
  // const db = await vectordb.connect('data/sample-lancedb')

  // let data = []
  // for (let i = 0; i < 10_000; i++) {
  //   data.push({
  //     vector: Array(1536).fill(i),
  //     id: `${i}`,
  //     content: '',
  //     longId: `${i}`
  //   })
  // }
  // const table = await db.createTable('my_vectors', data)
  // await table.createIndex({
  //   type: 'ivf_pq',
  //   column: 'vector',
  //   num_partitions: 256,
  //   num_sub_vectors: 96
  // })

  response(res, 200, { data: 200 })
}


// const blobToBase64 = (blob) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result.split(',')[1]);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

const loadVector = async (req, res) => {
  const { id, name } = req.params
  const { workspaceId, projectId } = decodeVector(id)

  const { 
    file,
    vector = [2, 2]
  } = req.body
  // const file = req.file

  const uri = 'data/vector/' + workspaceId + '/' + projectId

  try {
    let type
    if (name === 'record') {
      type = 'record'
    } else {
      type = file.type
    }

    const db = await lancedb.connect(uri)
    const tbl = await db.openTable(name).catch((err) => {
      return 404
    })
    // .catch( (error) => {
    //   return 404
    // })
    // const blobContent = await blobToBase64(file);
    
    const message = [
      {
        currentDate: new Date().toISOString(),
        message: file.name,
        type,
        data: file.base64Content,
        vector
      }
    ]
    console.log('m', message)

    // not exist table
    if (tbl === 404) {
      await db.createTable(name, message)
    } else {
      await tbl.add(message)
    }

    const path = uri + '/' + name + '/' + file.name

    response(res, 200, { 
        uri: path,
        vector 
    })
  } catch (error) {
    console.error(`Errors al upload la tabla ${name}: ${error.message}`)
    response(res, 200, { error })
  }
}

// const loadVector = async (req, res) => {
//   const { id, name } = req.params
//   const file = req.file
//   const fileBuffer = file.buffer

//   console.log('f9le', file)

//   function chunkText(text, chunkSize) {
//     const chunks = []
//     for (let i = 0; i < text.length; i += chunkSize) {
//       chunks.push(text.slice(i, i + chunkSize))
//     }
//     return chunks
//   }

//   const chunkSize = 4000 // Tamaño del chunk, puedes ajustarlo según tus necesidades

//   const pdfText = await pdf(fileBuffer)
//     .then((data) => {
//       return data.text
//     })
//     .catch((error) => {
//       console.error('Error al cargar el PDF:', error)
//     })

//   try {
//     let allGeneratedTokens = ''

//     const chunks = chunkText(pdfText, chunkSize)
//     // Procesa cada chunk de forma secuencial
//     for (const chunk of chunks) {
//       const response = await fetch('https://api.openai.com/v1/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${KEY_OPENAI}`
//         },
//         body: JSON.stringify({
//           model: 'text-davinci-002',
//           prompt: chunk,
//           max_tokens: 50
//         })
//       })

//       if (!response.ok) {
//         throw new Error(`Error de HTTP! Estado: ${response.status}`)
//       }

//       const responseData = await response.json()
//       console.log('resp', responseData)
//       const generatedTokens = responseData.choices[0].text
//       // Acumula los tokens generados
//       allGeneratedTokens += generatedTokens
//     }

//     console.log('dddd')

//     const { workspaceId, projectId } = decodeVector(id)

//     const uri = 'data/vector/' + workspaceId + '/' + projectId

//     const db = await lancedb.connect(uri)
//     // const tbl = await db.openTable(name)

//     const tableSchema = {
//       type: 'object',
//       properties: {
//         currentDate: { type: 'string' },
//         message: { type: 'string' },
//         type: { type: 'string' },
//         data: { type: 'string' }
//       },
//       required: ['currentDate', 'message', 'type']
//     }

//     const tbl = await db.openTable(name, { schema: tableSchema })

//     const message = [
//       {
//         currentDate: new Date().toISOString(),
//         message: file.originalname,
//         type: 'application/pdf',
//         data: JSON.stringify({
//           pdfText,
//           allGeneratedTokens
//         }),
//         vector: [1.3, 1.4]
//         // _distance: 19463.6484375
//       }
//     ]
//     console.log('aaaa', message)

//     await tbl.add(message)

//     // console.log('d', document)

//     response(res, 200, { data: message })
//   } catch (error) {
//     console.error(`Errors al eliminar la tabla ${name}: ${error.message}`)

//     response(res, 200, { error })
//   }
// }

module.exports = {
  loadVector: catchedAsync(loadVector),
  openVector: catchedAsync(openVector),
  addVector: catchedAsync(addVector),
  deleteVector: catchedAsync(deleteVector),
  removeVector: catchedAsync(removeVector),
  removeAllVector: catchedAsync(removeAllVector),
  getVector: catchedAsync(getVector),
  getAllVector: catchedAsync(getAllVector),
  indexVector: catchedAsync(indexVector),
  updateVector: catchedAsync(updateVector)
}
