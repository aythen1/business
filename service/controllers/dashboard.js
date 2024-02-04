// https://lancedb.github.io/lancedb/ann_indexes/#projections-select-clause

const { catchedAsync, response } = require('../utils/err')
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

  const options = [
    { field: 'id', operator: '==', value: data.id },
    { field: 'user', operator: '==', value: data.user },
    { field: 'isverified', operator: '==', value: true }
  ];

  const resp = await getVector(path, 'users', [0, 0], options)

  if (resp.length > 0) return resp[0]
  return false
}




// ------------------------------------------------------



const fetchsDashboard = async (req, res) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // console.log('1234 - dashboard', token)
    
    const path = encodeVector(ID)
    const result = await isAuth(token)

    if (result) {
      const data = await getVector(path, 'dashboards')
      // console.log('fetchsDashboard', data)
      if (Array.isArray(data)) {
        return res.status(200).send(data)
      }
    }
    
    return res.status(200).send([])
  }catch(err){
    return res.status(200).send([])
  }
}

const fetchDashboard = async (req, res) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const result = await isAuth(token)
    const path = encodeVector(ID)


    if (result) {
      const data = await getVector(path, 'dashboards')
      if (Array.isArray(data)) {
        return res.status(200).send(data)
      }
    }
    
    return res.status(200).send([])
  }catch(err){
    return res.status(200).send([])
  }
}

const deleteDashboard = async (req, res) => {
  try{
    const { token, id } = req.body

    const result = await isAuth(token)
    const path = encodeVector(ID)
  
    if (!result) {
      return res.status(501).send(arr)
    } else {
      const resp = await deleteVector(path, 'dashboards', id)
  
      console.log('resp', resp)
    }
  
    return res.status(200).send(id)
  }catch(err){
    return res.status(200).send(id)
  }
}




const addDashboard = async (req, res) => {
  try{
    const { token, dashboard } = req.body
    const path = encodeVector(ID)
    const result = await isAuth(token)

    
    if (result) {
      const resp = await addVector(path, 'dashboards', [0, 0], dashboard, { users: result })
      
      return res.status(200).send(resp)
    }else{
      return res.status(501).send('Not verify user')
    }
  }catch(err){
    return res.status(500).send('Not verify user')
  }
}



const updateDashboard = async (req, res) => {
  try{
    const { token, dashboard } = req.body
    const path = encodeVector(ID)
    const result = await isAuth(token)

    console.log('wuijduwjiduwjeji')
    
    if (result) {
      const resp = await updateVector(path, 'dashboards', [0, 0], dashboard)

      console.log('rres', resp)
      
      return res.status(200).send(resp)
    }else{
      return res.status(501).send('Not verify user')
    }
  }catch(err){
    return res.status(500).send('Not verify user')
  }
}





module.exports = {
  fetchsDashboard: catchedAsync(fetchsDashboard),
  fetchDashboard: catchedAsync(fetchDashboard),
  deleteDashboard: catchedAsync(deleteDashboard),
  addDashboard: catchedAsync(addDashboard),
  updateDashboard: catchedAsync(updateDashboard)
}
