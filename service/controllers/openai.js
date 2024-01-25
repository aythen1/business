const fs = require('fs')
const pdfjs = require('pdfjs-dist')
const { ChatOpenAI } = require('langchain/chat_models/openai')

// Ruta al archivo PDF local
const pdfPath = './docs.pdf'

// Cargar el PDF
const data = new Uint8Array(fs.readFileSync(pdfPath))

// Configurar opciones para pdfjs
const loadingTask = pdfjs.getDocument(data)
loadingTask.promise
  .then(async (doc) => {
    // Obtener el contenido del PDF
    const numPages = doc.numPages
    let text = ''

    for (let i = 1; i <= numPages; i++) {
      const page = await doc.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map((item) => item.str).join(' ')
    }

    // Preguntar algo al modelo de lenguaje
    const model = new ChatOpenAI({})
    const result = await model.invoke({
      text,
      question: '¿Cuál es tu pregunta?'
    })
    console.log(result)
  })
  .catch((err) => console.error(err))


  module.exports = {
    loadingTask
  }