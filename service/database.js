const { Sequelize } = require('sequelize')
const config = require('./config.json')
const { readdirSync } = require('fs')
const path = require('path')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: console.log
  }
)

const basename = path.basename(__filename)
const modelDefiners = []
readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })
// console.log(sequelize)
modelDefiners.forEach((model) => model(sequelize))
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1]
])
sequelize.models = Object.fromEntries(capsEntries)

module.exports = {
  ...sequelize.models,
  db: sequelize
}
