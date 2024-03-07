const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')
const app = express()

const service = require('./service/routers/index')


app.use(cors());

app.use(express.json({ limit: '10mb' }));  // Ajusta el límite según tus necesidades
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(cookieParser())

app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))
app.use(bodyParser.json({ limit: '500mb' }))



app.get('/', (req, res) => {
  return res.status(200).send({ message: 'OK' })
})

app.get('/service/status', (req, res) => {
  return res.status(200).send({ message: 'OK' })
})


app.use('/service/v1', service)


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});