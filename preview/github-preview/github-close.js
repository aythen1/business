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

// Obtener todas las solicitudes de extracción cerradas
async function getClosedPullRequests() {
  try {
    const closedPullRequests = await makeRequest('pulls?state=closed');
    return closedPullRequests;
  } catch (error) {
    console.error('Error al obtener las PR cerradas:', error.message);
  }
}

// Obtener los cambios en una PR específica
async function getPullRequestChanges(prNumber) {
  try {
    const prChanges = await makeRequest(`pulls/${prNumber}/files`);
    console.log(`Cambios en la PR #${prNumber}:`, prChanges);
  } catch (error) {
    console.error(`Error al obtener los cambios en la PR #${prNumber}:`, error.message);
  }
}

// Obtener información sobre las PR cerradas y sus cambios
async function getClosedPullRequestsInfo() {
  try {
    const closedPullRequests = await getClosedPullRequests();
    
    if (closedPullRequests.length === 0) {
      console.log('No hay PR cerradas en este repositorio.');
      return;
    }

    console.log('Solicitudes de extracción cerradas:', closedPullRequests);

    // Obtener los cambios en cada PR cerrada
    for (const pr of closedPullRequests) {
      await getPullRequestChanges(pr.number);
    }
  } catch (error) {
    console.error('Error al obtener información de las PR cerradas:', error.message);
  }
}

// Ejecutar la función principal
getClosedPullRequestsInfo();