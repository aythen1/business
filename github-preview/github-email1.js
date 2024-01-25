const axios = require('axios');

// Configura tu token de acceso personal de GitHub
const accessToken = 'TU_TOKEN_DE_ACCESO';

// Dirección de correo electrónico del colaborador que deseas buscar
const userEmail = 'correo_electronico_del_colaborador';

// Función para realizar solicitudes a la API de GitHub con autenticación
async function makeRequest(endpoint) {
  try {
    const response = await axios.get(`https://api.github.com/${endpoint}`, {
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

// Buscar usuarios por dirección de correo electrónico
async function searchUserByEmail() {
  try {
    const searchResults = await makeRequest(`search/users?q=${userEmail}+in:email`);
    
    if (searchResults.items.length > 0) {
      const foundUser = searchResults.items[0];
      console.log(`Usuario encontrado por correo electrónico ${userEmail}:`, foundUser);
    } else {
      console.log(`No se encontró ningún usuario con el correo electrónico ${userEmail}.`);
    }
  } catch (error) {
    console.error('Error al buscar usuario por correo electrónico:', error.message);
  }
}

// Ejecutar la función principal
searchUserByEmail();