const axios = require('axios');

// Configura tu token de acceso personal de GitHub
const accessToken = 'TU_TOKEN_DE_ACCESO';

// Configura la información del repositorio
const owner = 'nombre_del_propietario';
const repo = 'nombre_del_repositorio';
const authorEmail = 'correo_electronico_del_autor';

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

// Obtener todas las solicitudes de extracción del autor con el correo electrónico específico
async function getPullRequestsByAuthorEmail() {
  try {
    const pullRequests = await makeRequest(`pulls?state=all&creator=${authorEmail}`);
    console.log(`Solicitudes de extracción del autor con correo ${authorEmail}:`, pullRequests);
  } catch (error) {
    console.error('Error al obtener las PR por autor:', error.message);
  }
}

// Ejecutar la función principal
getPullRequestsByAuthorEmail();