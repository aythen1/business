// const conditionsData = [
//     { field: 'user', operator: '==', value: 'carlos' },
//     {
//         logicalOperator: 'OR', conditions: [
//             { field: 'age', operator: '>', value: 18 },
//             { field: 'city', operator: '==', value: 'New York' },
//             {
//                 logicalOperator: 'AND', conditions: [
//                     { field: 'isVerified', operator: '==', value: true },
//                     { field: 'isActive', operator: '==', value: true }
//                 ]
//             }
//         ]
//     }
// ];


// Graphsql lo simula para usarlo en lancedb

// {
//   query{
//     users(id:){
//       title
//       books(limit:4){
//         title,
//         author
//       }
//     }
//   }
// }


function generateGraphSql (options) {
 
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
    if ((Array.isArray(conditionsData) &&  conditionsData.length === 0)) {
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
    }else if (!(typeof conditionsData === 'object')){
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





function setValueByPath(obj, path, value) {
  // Dividir la cadena de la ruta en partes
  const pathParts = path.split('][').join(']').split('[');
  
  // Recorrer las partes de la ruta y acceder al objeto
  let current = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (part !== '') {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
  }

  // Establecer el valor en la última propiedad de la ruta
  const lastPart = pathParts[pathParts.length - 1];
  current[lastPart] = value;
}


module.exports = {
    setValueByPath: setValueByPath,
    generateGraphSql: generateGraphSql,
    generateSearchString: generateSearchString
}