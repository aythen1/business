const axios = require('axios');

// Configura tu token de acceso personal de GitHub
const accessToken = 'TU_TOKEN_DE_ACCESO';

// Configura la información del repositorio
const owner = 'nombre_del_propietario';
const repo = 'nombre_del_repositorio';
const collaborator = 'nombre_del_colaborador'; // Reemplaza con el nombre del colaborador

// Función para realizar solicitudes a la API de GitHub con autenticación
async function makeRequest(endpoint) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
    throw error;
  }
}

// Obtener todos los commits de un colaborador en el repositorio
async function getCommitsByCollaborator() {
  try {
    const commits = await makeRequest(`commits?author=${collaborator}`);
    console.log(`Commits de ${collaborator} en el repositorio:`);
    console.log(commits);
  } catch (error) {
    console.error('Error al obtener commits del colaborador:', error.message);
  }
}

// Ejecutar la función principal
getCommitsByCollaborator();