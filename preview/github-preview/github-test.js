const axios = require('axios');

// Configura tu token de acceso personal de GitHub
const accessToken = 'TU_TOKEN_DE_ACCESO';

// Configura la información del repositorio
const owner = 'nombre_del_propietario';
const repo = 'nombre_del_repositorio';
const prNumber = 'numero_de_pr';

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

// Obtener información sobre los checks de estado de una PR
async function getPRCheckStatus() {
  try {
    const prChecks = await makeRequest(`pulls/${prNumber}/check-runs`);
    console.log(`Checks de estado en la PR #${prNumber}:`, prChecks);
  } catch (error) {
    console.error('Error al obtener información de checks de estado:', error.message);
  }
}

// Obtener información sobre los resultados de las pruebas de una PR
async function getPRTestResults() {
  try {
    const prTests = await makeRequest(`pulls/${prNumber}/check-suites`);
    console.log(`Resultados de pruebas en la PR #${prNumber}:`, prTests);
  } catch (error) {
    console.error('Error al obtener información de resultados de pruebas:', error.message);
  }
}

// Ejecutar las funciones principales
getPRCheckStatus();
getPRTestResults();