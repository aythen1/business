const puppeteer = require('puppeteer')
const fs = require('fs').promises
const path = require('path')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const { serviceComponent } = require('../component/services/component.service')

const IMAGES_FOLDER = path.join(__dirname, 'capturas')

fs.mkdir(IMAGES_FOLDER, { recursive: true }).catch(console.error)

const capturaController = async (req, res) => {
  const { id } = req.body

  const components = await serviceComponent.getComponentHtmltree(id)

  if (!components.htmlResult) {
    throw new ClientError('Error Not Found Component', 404)
  }

  const imageUrl = `/screenshot/captura_${Date.now()}.png`

  await puppeteerScreenshot(components)
  response(res, 200, {
    imageUrl,
    html: `${components.htmlResult}  
    `
  })
}

async function puppeteerScreenshot(components) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  console.log(components.width, components.height, 'medidas')
  await page.setContent(`
    ${components.htmlResult}
  `)

  await page.setViewport({
    width: components.width === '100%' ? 1920 : components.width,
    height: components.height === '100vh' ? 1080 : components.height
  })

  await page.waitForTimeout(10000)
  const screenshot = await page.screenshot()

  const fileName = `captura_${Date.now()}.png`
  const filePath = path.join(IMAGES_FOLDER, fileName)
  await fs.writeFile(filePath, screenshot)

  await browser.close()
}

module.exports = { capturaController: catchedAsync(capturaController) }
