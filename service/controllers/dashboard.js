// https://lancedb.github.io/lancedb/ann_indexes/#projections-select-clause

const { catchedAsync, response } = require('../utils/err')
const jwt = require('jsonwebtoken')



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









const fetchsDashboard = async (req, res) => {
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




const updateDashboard = async (req, res) => {
  try{
    const { token, dashboard } = req.body
    const path = encodeVector(ID)
    const payload = await decodeToken(token)
    
    console.log('toke', token, payload)
    if (payload) {
      const resp = await addVector(path, 'dashboards', [0, 0], dashboard, { users: payload })
  
      console.log('resp', resp)
    
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
  updateDashboard: catchedAsync(updateDashboard)
}
