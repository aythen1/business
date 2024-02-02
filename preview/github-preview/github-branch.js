const axios = require('axios');

// Configura tu token de acceso personal de GitHub
const accessToken = 'TU_TOKEN_DE_ACCESO';

// Configura la información del repositorio
const owner = 'nombre_del_propietario';
const repo = 'nombre_del_repositorio';

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

// Obtener la lista de ramas en el repositorio
async function getBranches() {
  try {
    const branches = await makeRequest('branches');
    console.log('Lista de ramas en el repositorio:', branches);
  } catch (error) {
    console.error('Error al obtener la lista de ramas:', error.message);
  }
}

// Ejecutar la función principal
getBranches();