const { catchedAsync, response } = require('../utils/err')

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
      const elements = await fs.readdir(directory);

      const folders = await Promise.all(
          elements.map(async (element) => {
              const fullPath = path.join(directory, element);
              const stats = await fs.stat(fullPath);
              
              if (stats.isDirectory() && element.endsWith('.lance')) {
                  return element.slice(0, -('.lance'.length));
              }
              
              return null;
          })
      );

      return folders.filter((folder) => folder !== null);
  } catch (error) {
      console.error('Error retrieving folder names:', error);
      return [];
  }
}




const fetchsChatbot = async (req, res) => {
  try {
    const path = encodeVector(ID)
    const data = await getVector(path, 'chatbots')

    if (Array.isArray(data)) {
      return res.status(200).send(data)
    }

    return res.status(200).send([])
  } catch (err) {
    return res.status(200).send([])
  }
}


const fetchChatbot = async (req, res) => {
  try {
    console.log('ediemdimeidr')
    const { user } = req
    const { id } = req.params

    const pathChatbot = encodeVector(`${user.id}/${id}`)

    console.log('iiii', user, id, pathChatbot)


    const resp = await getVector(pathChatbot, 'chatbots', [0, 0])
    
    console.log('resp', resp)
    if(!resp.length || resp.length == 0){
      return res.status(200).send([])
    }
    
    return res.status(200).send(resp)
  } catch (err) {
    console.log('err', err)
    return res.status(200).send([])
  }

  
}


const deleteChatbot = async (req, res) => {
  try {
    const { id } = req.body
    const path = encodeVector(ID)


    const resp = await deleteVector(path, 'chatbots', id)


    return res.status(200).send(id)
  } catch (err) {
    return res.status(200).send(id)
  }
}



const addChatbot = async (req, res) => {
  try {
    const { user } = req
    const { chatbot } = req.body
    const path = encodeVector(ID)


    const resp = await addVector(path, 'chatbots', [0, 0], chatbot, { users: user })

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}




const updateChatbot = async (req, res) => {
  try {
    const { chatbot } = req.body
    const path = encodeVector(ID)

    const resp = await updateVector(path, 'chatbots', [0, 0], chatbot)


    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}







const addVectorChatbot = async (req, res) => {
  try {
    const { user } = req
    const { chatbot, vector } = req.body
    const path = encodeVector(`ticket/${chatbot.title || 'shared'}`)
    const name = chatbot.title || 'default'
    
    const resp = await addVector(path, name, vector, chatbot, { users: user })
    
    return res.status(200).send(JSON.parse(resp[0].data))
  
  } catch (err) {
    return res.status(500).send('Not verify user')
  }  
}





const vectorChatbot = async (req, res) => {
  try {
    const { user } = req
    const { title, vector } = req.body
    const path = encodeVector(`chatbot/${title || 'shared'}`)
    const name = title || 'default'
    const resp = await getVector(path, name, vector)
    
    const data = resp.map((item) => JSON.parse(item.data));
    
    return res.status(200).send(data)
  
  } catch (err) {
    return res.status(500).send('Not verify user')
  }  
}







module.exports = {
  fetchsChatbot: catchedAsync(fetchsChatbot),
  fetchChatbot: catchedAsync(fetchChatbot),
  deleteChatbot: catchedAsync(deleteChatbot),
  addChatbot: catchedAsync(addChatbot),
  updateChatbot: catchedAsync(updateChatbot),
  
  addVectorChatbot: catchedAsync(addVectorChatbot),
  vectorChatbot: catchedAsync(vectorChatbot),

}