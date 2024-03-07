const fs = require('fs')
const pdfjs = require('pdfjs-dist')
const { ChatOpenAI } = require('langchain/chat_models/openai')

const pdfPath = './docs.pdf'

const data = new Uint8Array(fs.readFileSync(pdfPath))

const loadingTask = pdfjs.getDocument(data)
loadingTask.promise
  .then(async (doc) => {
    const numPages = doc.numPages
    let text = ''

    for (let i = 1; i <= numPages; i++) {
      const page = await doc.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map((item) => item.str).join(' ')
    }

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