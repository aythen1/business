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

// Obtener información sobre el repositorio
async function getRepositoryInfo() {
  try {
    // Obtener información general del repositorio
    const repositoryInfo = await makeRequest('');
    console.log('Información del repositorio:', repositoryInfo);

    // Obtener la lista de colaboradores
    const contributors = await makeRequest('contributors');
    console.log('Colaboradores:', contributors);

    // Obtener la lista de solicitudes de extracción (PR)
    const pullRequests = await makeRequest('pulls');
    console.log('Solicitudes de extracción (PR):', pullRequests);

    // Obtener los cambios en un PR específico (sustituye {PR_NUMBER} por el número de la PR)
    const prNumber = 1; // Cambia esto al número de la PR que desees
    const prChanges = await makeRequest(`pulls/${prNumber}/files`);
    console.log('Cambios en la PR:', prChanges);
  } catch (error) {
    console.error('Error al obtener información del repositorio:', error.message);
  }
}

// Ejecutar la función principal
getRepositoryInfo();