const { catchedAsync, response } = require('../utils/err')
const jwt = require('jsonwebtoken')
const { ClientError } = require('../utils/err/errors')

const fs = require('fs').promises
const path = require('path')
// const crypto = require('crypto');


const {
  addonGPT,
  // codeGPT,
  // visionGPT,
  // rpaGPT
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


async function getFolderFromDirectory(directory) {
  try {
    // Read the elements in the directory
    const elements = await fs.readdir(directory);

    // Filter only folders with the .lance extension
    const folders = await Promise.all(
      elements.map(async (element) => {
        const fullPath = path.join(directory, element);
        const stats = await fs.stat(fullPath);

        if (stats.isDirectory() && element.endsWith('.lance')) {
          // Remove the .lance extension and add the name to the list
          return element.slice(0, -('.lance'.length));
        }

        return null;
      })
    );

    // Filter out non-null folders and return the resulting array
    return folders.filter((folder) => folder !== null);
  } catch (error) {
    console.error('Error retrieving folder names:', error);
    return [];
  }
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
    const { id } = req.params
    const pathAddon = encodeVector(ID)

    console.log('wcxwc')
    const options = [
      { field: 'id', operator: '==', value: id },
    ];

    const respAddon = await getVector(pathAddon, 'addons', [0, 0], options)

    console.log('respAddon', respAddon)
    if (respAddon.length == 0) {
      return res.status(404).send('Not exist')
    }

    const addon = respAddon[0]
    const nameAddon = addon.title || 'shared'
    const pathVector = encodeVector(`addon/${nameAddon}`)

    const arr = await getFolderFromDirectory(`data/vector/addon/${nameAddon}`)


    const vectors = []
    for (var i = 0; i < arr.length; i++) {
      const respVector = await getVector(pathVector, arr[i])
      if (respVector.length !== 0) {
        vectors.push(respVector[0])
      }
      // console.log('rrrs', vectors)
    }


    return res.status(200).send({
      addon,
      vectors
    })
  } catch (err) {
    console.log('err', err)
  }


}


const deleteAddon = async (req, res) => {
  try {
    const { id } = req.body
    const path = encodeVector(ID)

    const resp = await deleteVector(path, 'addons', { id })

    return res.status(200).send(id)
  } catch (err) {
    return res.status(200).send(id)
  }
}





const addAddon = async (req, res) => {
  try {
    const { user } = req
    const { addon } = req.body
    const path = encodeVector(ID)
    // const result = await isAuth(token)

    console.log('addndhufuf', addon)

    const resp = await updateVector(path, 'addons', [0, 0], addon, { users: user })

    console.log('resp', resp)

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}



const getVectorAddon = async (req, res) => {
  const { id, name } = req.params

  console.log('path', id, name)
  try {
    const query = await getVector(id, name, [0, 0])
    // const query = await getVector(id, name, [0, 0])
    // console.log('query', query)
    if (!query.length) {
      // response(res, 200, { data: [] })
      return res.status(200).send([])
    }


    return res.status(200).send(query)


  } catch (err) {
    // response(res, 200, { data: [] })
    return res.status(200).send([])
  }
}




const addVectorAddon = async (req, res) => {
  try {
    const { addon, vector } = req.body

    // console.log('=====', addon, vector)
    // console.log(`addon/${addon.id}/${vector.id}`)


    // console.log('==============', addon, vector)
    // const path = encodeVector(`addon/${addon.id}/${vector.id}`)
    const path = encodeVector(`addon/${addon.id}/${vector.id}`)
    // const name = vector.title || 'default'
    // const result = await isAuth(token)

    const resp = await updateVector(path, 'templates', [0, 0], vector, { addons: addon })

    if (resp.error) {
      return res.status(500).send('Error GPT')
    }

    // console.log('reess', resp)
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
    const { token, components } = req.body
    const path = encodeVector(ID)

    console.log('components', components)

    const resp = await addonGPT(token, components)
    // const resp = await updateVector(path, 'addons', [0, 0], addon)
    // const resp = []


    return res.status(200).send(resp)

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

  getVectorAddon: catchedAsync(getVectorAddon),
  addVectorAddon: catchedAsync(addVectorAddon),

  visionAddon: catchedAsync(visionAddon),
  codeAddon: catchedAsync(codeAddon),
  rpaAddon: catchedAsync(rpaAddon),

}