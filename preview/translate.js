require('dotenv').config()
const axios = require('axios')
const fs = require('fs')
const path = require('path')
// const os = require('os')
const archiver = require('archiver')
const KEY_OPENAI = process.env.KEY_OPENAI
const URL_OPENAI = process.env.URL_OPENAI

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

async function translateFile(filePath, targetLanguage) {
  console.log('translateFile - filePath:', filePath) // Verificar el valor de filePath
  console.log('translateFile - targetLanguage:', targetLanguage) // Verificar el valor de targetLanguage

  const fileContents = await readFile(filePath) // Implementa la función "readFile" para leer el contenido del archivo
  // const cambio=JSON.stringify(fileContents)
  const maxTokensPerRequest = 4097
  const chunks = chunkText(fileContents, maxTokensPerRequest)

  const zipFilePath = path.join(__dirname, 'translations.zip')
  const output = fs.createWriteStream(zipFilePath)
  const archive = archiver('zip', {
    zlib: { level: 9 } // Configuración para una alta compresión
  })

  output.on('close', () => {
    console.log(archive.pointer() + ' total bytes')
    console.log('Archivo ZIP generado con éxito')
  })

  archive.on('error', (err) => {
    throw err
  })

  archive.pipe(output)

  for (let i = 0; i < chunks.length; i++) {
    const chunkTranslation = await translateText(chunks[i], targetLanguage)
    const chunkFileName = `chunk_${i}.txt`
    archive.append(chunkTranslation, { name: chunkFileName })
  }

  archive.finalize()

  return zipFilePath
}
async function translateText(text, targetLanguage) {
  console.log('AQUI', targetLanguage)
  try {
    const response = await axios.post(
      `${URL_OPENAI}`,
      {
        prompt: `Translate the following text to ${targetLanguage}: "${text}"`,
        max_tokens: 2097,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      {
        headers: {
          Authorization: `Bearer ${KEY_OPENAI}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].text.trim()
  } catch (error) {
    console.error('Error translating text:', error)
    throw error
  }
}

// Función para dividir el texto en fragmentos más pequeños
function chunkText(text, maxLength) {
  const chunks = []
  let currentChunk = ''

  const textNew = text.replace(/[{}]/g, '')
  const sentences = textNew.split(',') // Puedes ajustar el separador según las características del texto

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim()

    if (currentChunk.length + sentence.length < maxLength) {
      currentChunk += sentence + ','
    } else {
      chunks.push(currentChunk)
      currentChunk = ''
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }

  return chunks
}




// const { translateFile } = require('../../utils/functions/openia-translate')
const testOPENAI = async (req, res) => {
  try {
    // //AQUI VA EL JSON QUE SE QUIERE TRADUCIR
    // const filePath = 'src/server/save/ejemplo.json';
    // const {idiomas} = req.body; // Reemplaza con el código de idioma objetivo

    // const zipFilePath =await translateFile(filePath,idiomas)
    // // res.status(200).send('Archivo traducido con exito')

    const { idiomas } = req.body
    const filePath = 'src/server/save/ejemplo.json' // Asegúrate de proporcionar la ruta correcta del archivo JSON que deseas traducir
    const zipFilePath = await translateFile(filePath, idiomas)
    const zipFileName = 'translations.zip'
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${zipFileName}"`
    )
    res.setHeader('Content-Type', 'application/zip')
    res.sendFile(zipFilePath)
  } catch (error) {
    res.status(400).send('NEW eRRROR')
  }
}

module.exports = {
  testOPENAI
}



// module.exports = {
//   translateFile
// }
