const fs = require('fs');
const path = require('path');

const schemasDir = path.join(__dirname, 'schemas');
const allSchemas = {};

fs.readdirSync(schemasDir).forEach(file => {
  if (path.extname(file) === '.js') {
    const schemaName = path.basename(file, '.js');
    const schemaModule = require(path.join(schemasDir, file));

    allSchemas[schemaName] = schemaModule;
  }
});

module.exports = allSchemas;