

function generateSchemaFromObject(obj) {
  const schema = {
    type: 'object',
    properties: {},
    required: ['id']
  };

  for (const key in obj) {
    const value = obj[key];
    const type = Array.isArray(value) ? 'array' : typeof value;

    // Añade la propiedad al esquema
    schema.properties[key] = { type };

    // Establece el valor predeterminado para arrays y objetos solo en el primer nivel
    if (type === 'array') {
      schema.properties[key].default = [];
      if (value.length > 0) {
        const arrayItemType = typeof value[0] === 'object' ? 'object' : typeof value[0];
        schema.properties[key].items = { type: arrayItemType };
        if (arrayItemType === 'object') {
          schema.properties[key].items.default = {};
        }
      }
    }

    if (type === 'object') {
      schema.properties[key].default = {};
    }

    // Si el valor es null, se considera opcional en el esquema
    if (value === null) {
      schema.properties[key].type = ['null', 'string']; // Cambiar 'string' al tipo que prefieras
      delete schema.properties[key].items; // Elimina 'items' si el valor es nulo
    }
  }

  return schema;
}








function generateGraphSql(options) {

  const regex = /query\s*{\s*([\s\S]*?)\s*}/;
  const match = options.match(regex);
  // options = options.replace(/\bquery\s*{[^{}]*}/, '');
  // Dividimos las líneas
  const lines = match[1].split('\n').map(line => line.trim()).filter(Boolean);

  let index = -1;
  const tables = []

  function parseTable(line) {
    const match = line.match(/(\w+)\(([^)]*)\)/);
    if (match) {
      const [, table, configStr] = match;

      // Obtener el nombre y los parámetros
      const name = table;
      const config = {};

      if (configStr) {
        configStr.split(',').forEach(item => {
          const [key, value] = item.trim().split(':').map(item => item.trim());
          config[key] = value;
        });
      }

      return { name, config };
    }

    return null;
  }
  // Función para analizar un bloque
  function parseBlock(lines) {
    while (lines.length > 0) {
      const line = lines.shift();

      if (line.includes('{')) {
        // Comienza un nuevo bloque, llamamos recursivamente
        const tag = parseTable(line)
        index++

        tables[index] = {
          table: tag.name,
          variable: ['id'],
          limit: parseInt(tag.config.limit) || 20,
          // filter: tag.config.id ? `${tag.name}_id == '${tag.config.id}'` : null
          filter: tag.config.id ? `id == '${tag.config.id}'` : null
        }

      } else if (line.includes('}')) {
        // Fin del bloque actual
      } else {
        tables[index]?.variable.push(line)
      }
    }
  }

  // Llamamos a la función inicial
  parseBlock(lines);
  return tables;
}




// [conditions]

// [{
//   table: 'users', conition: 'and', filter: '',
//   table: 'title', conition: 'and', filter: '',
// }]
// => sql


function generateSearchString(conditionsData) {
  // Verifica que haya al menos una condición
  if ((Array.isArray(conditionsData) && conditionsData.length === 0)) {
    return ''
    throw new Error('Se requiere al menos una condición.');
  } else if ((typeof conditionsData === 'object') && !conditionsData.length) {
    const conditionsStrings = Object.entries(conditionsData).map(([field, value]) => {
      // Convierte el valor a una cadena SQL segura (puedes ajustar según tu necesidad)
      const sqlSafeValue = typeof value === 'string' ? `'1${value}'` : value;
      // return `(relations->>'${field}' = ${sqlSafeValue})`;
      // return `relations = '{"user_id":"94290674-d2dc-4be1-9d51-edb171e56491"}'`;
      return `relations LIKE '%"${field}":"${value}"%'`;

    });

    // "(relations->>'user_id' = '1234')"

    const queryString = conditionsStrings.join(' AND ');

    return queryString;

    return ''
    throw new Error('Se requiere al menos una condición.');
  } else if (!(typeof conditionsData === 'object')) {
    // console.log(conditionsData, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    return ''
    throw new Error('Se requiere al menos una condición.');
  }



  // Mapea las condiciones y operadores lógicos a sus respectivas representaciones de cadena
  const conditionsStrings = conditionsData.map((item) => {
    // Verifica si el valor es undefined
    if (item.value === undefined) {
      return { error: `El valor para '${item.field}' está undefined.` }; // Devuelve un mensaje de error
    }

    if (item.conditions) {
      // Si hay un subconjunto de condiciones, genera recursivamente su cadena
      return `(${generateSearchString(item.conditions)})`;
    } else {
      // Si es una condición individual, convierte a cadena
      const value = typeof item.value === 'string' ? `'${item.value}'` : item.value;
      return `${item.field} ${item.operator} ${value}`;
    }
  });

  // Verifica si alguna condición devolvió un mensaje de error
  const errorCondition = conditionsStrings.find((item) => item && item.error);
  if (errorCondition) {
    return errorCondition; // Devuelve el mensaje de error
  }

  // Combina todas las condiciones en una cadena
  const searchString = `${conditionsStrings.join(` ${conditionsData.logicalOperator || 'AND'} `)}`;

  return searchString;
}







module.exports = {
  generateSchemaFromObject: generateSchemaFromObject,
  generateGraphSql: generateGraphSql,
  generateSearchString: generateSearchString
}