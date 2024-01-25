// main.js
const fs = require('fs');
const path = require('path');

// Ruta al directorio de esquemas
const schemasDir = path.join(__dirname, 'schemas');

// Objeto para almacenar todos los esquemas
const allSchemas = {};

// Lee todos los archivos en el directorio de esquemas
fs.readdirSync(schemasDir).forEach(file => {
  // Ignora archivos que no tienen extensión .js
  if (path.extname(file) === '.js') {
    const schemaName = path.basename(file, '.js');
    const schemaModule = require(path.join(schemasDir, file));

    // Asigna el esquema al objeto allSchemas usando el nombre del archivo como clave
    allSchemas[schemaName] = schemaModule;
  }
});

// Exporta el objeto allSchemas
module.exports = allSchemas;