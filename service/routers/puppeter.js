const { Router } = require('express')
const puppeteerRouter = Router()
const { capturaController } = require('./puppeteer.controller')

puppeteerRouter.post('/screenshot', capturaController)

module.exports = puppeteerRouter
