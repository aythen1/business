const { catchedAsync, response } = require('../utils/err')

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






// ------------------------------------------------------
const fetchsDashboard = async (req, res) => {
  try {
    const path = encodeVector(ID)

    const data = await getVector(path, 'dashboards')
    if (Array.isArray(data)) {
      return res.status(200).send(data)
    }


    return res.status(200).send([])
  } catch (err) {
    return res.status(200).send([])
  }
}

const fetchDashboard = async (req, res) => {
  try {
    const path = encodeVector(ID)

    const data = await getVector(path, 'dashboards')
    if (Array.isArray(data)) {
      return res.status(200).send(data)
    }

    return res.status(200).send([])
  } catch (err) {
    return res.status(200).send([])
  }
}

const deleteDashboard = async (req, res) => {
  try {
    const { id } = req.body

    const path = encodeVector(ID)

    const resp = await deleteVector(path, 'dashboards', id)


    return res.status(200).send(id)
  } catch (err) {
    return res.status(200).send(id)
  }
}




const addDashboard = async (req, res) => {
  try {
    const { user } = req
    const { dashboard } = req.body
    const path = encodeVector(ID)

    const resp = await addVector(path, 'dashboards', [0, 0], dashboard, { users: user })

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}



const updateDashboard = async (req, res) => {
  try {
    const { dashboard } = req.body
    const path = encodeVector(ID)

    const resp = await updateVector(path, 'dashboards', [0, 0], dashboard)

  } catch (err) {
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
