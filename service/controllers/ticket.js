const { catchedAsync, response } = require('../utils/err')
const jwt = require('jsonwebtoken')

const fs = require('fs').promises
const path = require('path')





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




const fetchsTicket = async (req, res) => {
  try {
    const path = encodeVector(ID)
    const data = await getVector(path, 'tickets')

    if (Array.isArray(data)) {
      return res.status(200).send(data)
    }

    return res.status(200).send([])
  } catch (err) {
    return res.status(200).send([])
  }
}


const fetchTicket = async (req, res) => {
  try {
    const { id } = req.params
    const pathTicket = encodeVector(ID)

    console.log('wcxwc')
    const options = [
      { field: 'id', operator: '==', value: id },
    ];

    const respTicket = await getVector(pathTicket, 'tickets', [0, 0], options)
    
    if(respTicket.length == 0){
      return res.status(404).send('Not exist')
    }

    const ticket = respTicket[0]
    const nameTicket = ticket.title || 'shared'
    const pathVector = encodeVector(`ticket/${nameTicket}`)

    const arr = await getFolderFromDirectory(`data/vector/ticket/${nameTicket}`)


    const vectors = []
    for(var i = 0; i<arr.length; i++){
      const respVector = await getVector(pathVector, arr[i])
      if(respVector.length !== 0){
        vectors.push(respVector[0])
      }
      // console.log('rrrs', vectors)
    }


    return res.status(200).send({
      ticket,
      vectors
    })
  } catch (err) {
    console.log('err', err)
  }

  
}


const deleteTicket = async (req, res) => {
  try {
    const { id } = req.body
    const path = encodeVector(ID)

    console.log('deleteeeeeee', id)

    const resp = await deleteVector(path, 'tickets', id)


    return res.status(200).send(id)
  } catch (err) {
    return res.status(200).send(id)
  }
}



const addTicket = async (req, res) => {
  try {
    const { user } = req
    const { ticket } = req.body
    const path = encodeVector(ID)
    // const result = await isAuth(token)

    const resp = await addVector(path, 'tickets', [0, 0], ticket, { users: user })

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}




const updateTicket = async (req, res) => {
  try {
    const { ticket } = req.body
    const path = encodeVector(ID)

    console.log('wuijduwjiduwjeji')

    const resp = await updateVector(path, 'tickets', [0, 0], ticket)


    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}







const addVectorTicket = async (req, res) => {
  try {
    const { user } = req
    const { ticket, vector } = req.body
    // console.log('==============', ticket, vector)
    const path = encodeVector(`ticket/${ticket.title || 'shared'}`)
    const name = ticket.title || 'default'
    // const result = await isAuth(token)
    
    const resp = await addVector(path, name, vector, ticket, { users: user })
    
    return res.status(200).send(JSON.parse(resp[0].data))
  
  } catch (err) {
    return res.status(500).send('Not verify user')
  }  
}





const vectorTicket = async (req, res) => {
  try {
    const { user } = req
    const { title, vector } = req.body
    // console.log('==============', ticket, vector)
    const path = encodeVector(`ticket/${title || 'shared'}`)
    const name = title || 'default'
    // const result = await isAuth(token)

    console.log('eeeeeeeeeeeeeeeee', vector)
    
    const resp = await getVector(path, name, vector)

    
    
    const data = resp.map((item) => JSON.parse(item.data));
    
    // console.log('reess', resp)
    return res.status(200).send(data)
  
  } catch (err) {
    return res.status(500).send('Not verify user')
  }  
}







module.exports = {
  fetchsTicket: catchedAsync(fetchsTicket),
  fetchTicket: catchedAsync(fetchTicket),
  deleteTicket: catchedAsync(deleteTicket),
  addTicket: catchedAsync(addTicket),
  updateTicket: catchedAsync(updateTicket),
  
  addVectorTicket: catchedAsync(addVectorTicket),
  vectorTicket: catchedAsync(vectorTicket),

}