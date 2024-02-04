const { catchedAsync, response } = require('../utils/err')
const jwt = require('jsonwebtoken')
const { ClientError } = require('../utils/err/errors')

// const crypto = require('crypto');


const {
  codeGPT,
  visionGPT,
  rpaGPT
} = require('../services/gpt')





const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,
} = require('../services/lancedb')




const ID = 'test/test'


const encodeVector = (id) => {
  const str = `${id}`
  const base64Str = btoa(str)
  return base64Str
}





const fetchsAddon = async (req, res) => {
  try {
    const path = encodeVector(ID)
    const data = await getVector(path, 'addons')

    if (Array.isArray(data)) {
      return res.status(200).send(data)
    }

    return res.status(200).send([])
  } catch (err) {
    return res.status(200).send([])
  }
}


const fetchAddon = async (req, res) => {
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


const deleteAddon = async (req, res) => {
  try {
    const { id } = req.body
    const path = encodeVector(ID)

    console.log('deleteeeeeee', id)

    const resp = await deleteVector(path, 'addons', id)


    return res.status(200).send(id)
  } catch (err) {
    return res.status(200).send(id)
  }
}





const addAddon = async (req, res) => {
  try {
    const { user } = req
    const { dashboard } = req.body
    const path = encodeVector(ID)
    // const result = await isAuth(token)

    const resp = await addVector(path, 'addons', [0, 0], dashboard, { users: user })

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}


const updateAddon = async (req, res) => {
  try {
    const { addon } = req.body
    const path = encodeVector(ID)

    console.log('wuijduwjiduwjeji')

    const resp = await updateVector(path, 'addons', [0, 0], addon)


    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}




// -------------------------------------------------------------------------------------------------


const visionAddon = async (req, res) => {
  try {
    const { addon } = req.body
    const path = encodeVector(ID)

    console.log('wuijduwjiduwjeji')

    const resp = await updateVector(path, 'addons', [0, 0], addon)


    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}


const codeAddon = async (req, res) => {
  try {
    const { code } = req.body
    const path = encodeVector(ID)

    console.log('wuijduwjiduwjeji', code)

    const resp = await codeGPT(code)
    console.log('resp', resp)
    // const resp = await updateVector(path, 'addons', [0, 0], addon)
    // const resp = []

    return res.status(200).send(resp[0])

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}


const rpaAddon = async (req, res) => {
  try {
    const { addon } = req.body
    const path = encodeVector(ID)

    console.log('wuijduwjiduwjeji')

    const resp = await updateVector(path, 'addons', [0, 0], addon)


    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}


module.exports = {
  fetchsAddon: catchedAsync(fetchsAddon),
  fetchAddon: catchedAsync(fetchAddon),
  deleteAddon: catchedAsync(deleteAddon),
  addAddon: catchedAsync(addAddon),
  updateAddon: catchedAsync(updateAddon),
  
  visionAddon: catchedAsync(visionAddon),
  codeAddon: catchedAsync(codeAddon),
  rpaAddon: catchedAsync(rpaAddon),

}