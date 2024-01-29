const lancedb = require('vectordb')
const err = require('../../utils/err')
const fs = require('fs').promises
const { v4: uuidv4 } = require('uuid');

const { 
    setValueByPath,
    generateSearchString,
    generateGraphSql
 } = require('./sql')


const allSchemas = require('./schema')




const decodeVector = (base64Str) => {
    const str = atob(base64Str)

    const [path0, path1] = str.split('/')
    return { path0, path1 }
}





// async function addVector(id, name, vector = [0, 0], data, overwrite = false) {
//     const { path0, path1 } = decodeVector(id)
//     const uri = 'data/vector/' + path0 + '/' + path1

//     if (!data.id) data.id = uuidv4()
//     data.vector = vector

//     const schemaExists = allSchemas.hasOwnProperty(name);
//     if (!schemaExists) {
//         return "El esquema no existe";
//     }


//     // console.log('rr', allSchemas[name])
//     const validObj = validateAgainstSchema(data, allSchemas[name]);

//     if (!validObj.isValid) {
//         //     data = { ...validObj.data, vector: vector };
//         // } else {
//         // Manejar el caso donde el objeto no es válido según el esquema
//         return {
//             message: 'El objeto no cumple con el esquema',
//             data: data,
//             error: validObj.errors[0]
//         }
//     }

//     try {
//         const db = await lancedb.connect(uri)
//         const tbl = await db.openTable(name);

//         const rs = await tbl.add([data])
//         return data
//     } catch (error) {
//         const db = await lancedb.connect(uri)

//         if (!overwrite) {
//             await db.createTable(name, [data], { writeMode: 'overwrite' })
//             // await db.createTable(name, [data], { schema: tableSchemaUser })
//         } else {
//             await db.createTable(name, [data], {
//                 schema: tableSchemaUser,
//                 writeMode: 'overwrite'
//             })
//         }

//         return data
//     }
// }


const addRelationsToSchema  = (schema) => {
    schema.properties.vector = { 
        type: 'array', 
        items: { type: 'number' } 
    }

    schema.properties.relations = {
        type: 'string',
        default: '{}'
    }

    return schema
}


// Función para agregar identificadores al objeto relations en data
const addRelationsToData = (data, relations) => {
    if (relations) {
      data = {};
      Object.keys(relations).forEach((tableName) => {
        // Convertir el nombre a singular y agregar _id al final
        const key = `${tableName}_id`;
  
        // Verificar si el objeto en el relations tiene la propiedad 'id'
        const idValue = relations[tableName].id || null;
  
        if (idValue) {
          data[key] = idValue;
        }
      });
    }
    return data;
  };




async function addVector(id, name, vector = [0, 0], data, relations) {
    // const schema = (allSchemas[name])
    
    const { path0, path1 } = decodeVector(id)
    const uri = 'data/vector/' + path0 + '/' + path1
    
    const schemaExists = allSchemas.hasOwnProperty(name);
    if (!schemaExists) {
        return "El esquema no existe";
    }
    
    const schema = addRelationsToSchema(allSchemas[name])
    
    try{
        const db = await lancedb.connect(uri);
        const tbl = await db.openTable(name);
    }catch(err){
        const db = await lancedb.connect(uri);
        // const emptyData = data.length ? data[0] : data
        // emptyData.limit = 1001
        
        const emptyData = generateEmptyObjectFromSchema(schema)
        emptyData.vector = vector
        emptyData.id = uuidv4()

        console.log('schema emptyData', emptyData)

        const validObj = validateAgainstSchema(emptyData, schema);
        if (!validObj.isValid) {
            return {
                message: 'El objeto no cumple con el esquema',
                data: emptyData,
                error: validObj.errors[0]
            };
        }

        
        await db.createTable(name, [emptyData], {
            schema: schema,
            writeMode: 'overwrite'
        });
        
        const tbl = await db.openTable(name)
        await tbl.delete(`id = '${emptyData.id}'`)
    }
    

    const db = await lancedb.connect(uri);
    const tbl = await db.openTable(name)

    const processSingleData = async (singleData) => {
        
    
        console.log('d', singleData)

    
        const validObj = validateAgainstSchema(singleData, schema);
        if (!validObj.isValid) {
            return {
                message: 'El objeto no cumple con el esquema',
                data: singleData,
                error: validObj.errors[0]
            };
        }

        try {
            await tbl.add([singleData]);
            // console.log('resultresultresult', result)
            return singleData;
        } catch (error) {
            console.log('error add vector', error)
            return 500;
        }
    };

    const results = []

    const arr = Array.isArray(data) ? data : [data];
    

        // Si data es un array, procesa cada elemento individualmente
        for (const singleData of arr) {
            
            
            const data = generateEmptyObjectFromSchema(schema, singleData)
            if (!data.id) data.id = uuidv4();
            data.vector = vector

            if(relations){
                data.relations = {}
                data.relations = JSON.stringify(addRelationsToData(data.relations, relations))
            }


            const result = await processSingleData(data);
            results.push(result);
        }
    

    // Desconecta después de que el bucle haya terminado
    // await db.disconnect();

    return results;
}



async function updateVector(id, name, vector = [0, 0], data) {
    const { path0, path1 } = decodeVector(id);
    const uri = 'data/vector/' + path0 + '/' + path1;

    console.log('update vector', data)

    try {
        const schemaExists = allSchemas.hasOwnProperty(name);
        if (!schemaExists) {
            return "El esquema no existe";
        }

        // Valida el objeto 'data' contra el esquema correspondiente
        const validObj = validateAgainstSchema(data, allSchemas[name]);
        if (!validObj) {
            return "El objeto 'data' no cumple con el esquema";
        }

        
        if (!data.id) {
            return "Debe existir el ID";
        }

        const conditions = [
            { field: 'id', operator: '==', value: data.id }
        ];
        
        const searchString = generateSearchString(conditions);
        
        const db = await lancedb.connect(uri);
        const tbl = await db.openTable(name);

        // Busca el usuario que coincida con el nombre y realiza la actualización
        const query = await tbl
            .search(vector)
            .where(searchString)
            .execute();

        if (query.length > 0) {
            // query[0].isverified = true
            query[0].vector = vector
            delete query[0]._distance;

            const updatedRecord = { ...query[0], ...data };

            await tbl.update({ where: searchString, values: updatedRecord })

            const updatedQuery = await tbl
                .search(vector)
                .where(searchString)
                .execute();

            return updatedQuery[0];
        } else {
            // No se encontró ningún usuario para actualizar
            return "Usuario no encontrado";
        }
    } catch (error) {
        return error;
    }
}



const generateEmptyObjectFromSchema = (schema, data = {}) => {
    const emptyObject = {};

    const processProperty = (prop, propSchema, obj) => {
        if (data.hasOwnProperty(prop)) {
            obj[prop] = data[prop];
        } else if (propSchema.hasOwnProperty('default')) {
            obj[prop] = propSchema.default;
        } else {
            if (propSchema.enum) {
                obj[prop] = propSchema.enum[0];
            } else {
                switch (propSchema.type) {
                    case 'string':
                        if (propSchema.format === 'date-time') {
                            obj[prop] = new Date().toISOString();
                        } else {
                            obj[prop] = '';
                        }
                        break;
                    case 'number':
                        obj[prop] = 0;
                        break;
                    case 'object':
                        obj[prop] = generateEmptyObjectFromSchema({ properties: propSchema.properties });
                        break;
                    case 'array':
                        if (prop === 'vector') {
                            obj[prop] = [0, 0];
                        } else {
                            obj[prop] = [];
                        }
                        break;
                }
            }
        }

        // Si la propiedad es un objeto, aplicar JSON.stringify
        if (typeof obj[prop] === 'object' && obj[prop] !== null && !Array.isArray(obj[prop])) {
            obj[prop] = JSON.stringify(obj[prop]);
        }
    };

    const processObjectProperties = (properties, obj) => {
        for (const prop in properties) {
            processProperty(prop, properties[prop], obj);
        }
    };

    for (const prop in schema.properties) {
        processProperty(prop, schema.properties[prop], emptyObject);
    }

    return emptyObject;
};



const validateAgainstSchema = (obj, schema) => {
    const Validator = require('jsonschema').Validator;
    const v = new Validator();
    const result = v.validate(obj, schema);

    return {
        isValid: result.valid,
        data: obj,
        errors: result.errors
    };
};

// const validateAgainstSchema = (input, schema) => {
//     const Validator = require('jsonschema').Validator;
//     const v = new Validator();

//     const validateProperty = (prop, propSchema, obj) => {
//         // Si la propiedad es de tipo objeto y es una cadena JSON, intentar analizarla
//         if (propSchema.type === 'object' && typeof obj[prop] === 'string') {
//             try {
//                 obj[prop] = JSON.parse(obj[prop]);
//             } catch (error) {
//                 // Si falla el análisis, asumir que es un valor no analizable
//                 return;
//             }
//         }

//         // Validar la propiedad según el esquema
//         const result = v.validate(obj[prop], propSchema);
//         if (!result.valid) {
//             throw new Error(`Validation error for property '${prop}': ${result.errors[0].message}`);
//         }
//     };

//     const processProperty = (prop, propSchema, obj) => {
//         if (obj.hasOwnProperty(prop)) {
//             validateProperty(prop, propSchema, obj);

//             // Si la propiedad es un objeto y está en la lista de propiedades a validar recursivamente
//             if (
//                 propSchema.properties &&
//                 propSchema.properties[prop] &&
//                 typeof obj[prop] === 'object' &&
//                 !Array.isArray(obj[prop])
//             ) {
//                 processObjectProperties(propSchema.properties[prop].properties, obj[prop]);
//             }
//         }
//     };

//     const processObjectProperties = (properties, obj) => {
//         for (const prop in properties) {
//             const propSchema = properties[prop];
//             processProperty(prop, propSchema, obj);
//         }
//     };

//     // Validar el objeto
//     try {
//         processObjectProperties(schema.properties, input);
//         return {
//             isValid: true,
//             data: input,
//             errors: []
//         };
//     } catch (error) {
//         return {
//             isValid: false,
//             data: input,
//             errors: [error.message]
//         };
//     }
// };









const getGraphVector = async (uri, conditions, _vector) => {
    const dbs = generateGraphSql(conditions)

    

    // console.log('result', dbs)

    let vector = _vector
    let current = []
    let data = {}

    let filter = null
    
    for(var i = 0;i<dbs.length;i++){

        try {

        const db = await lancedb.connect(uri)
        const name = dbs[i].table
        const variable = dbs[i].variable
        
        filter = dbs[i].filter ? dbs[i].filter : filter 
        
        current.push(name)

        const tbl = await db.openTable(name)

        const query = await tbl
                .search([0,0])
                .where(filter)
                .execute()
                
        const resp = variable.reduce((obj, key) => ({ ...obj, [key]: query[0][key] }), {});
    
        vector = query[0].vector
        filter = `relations LIKE '%"${name}_id":"${resp.id}"%'`

        if(Object.keys(data).length === 0){
            // console.log('query', resp)
            // when not exist
            data = resp
        }else{
            //when exist

            path = current.slice(1).join('.');


            console.log('path', data, path, resp)

            eval(`data.${path} = resp`);

            // data[path][name] = resp
            // console.log('query', resp)
        }

    }catch(err){
        console.log('er', err)
    }

    }


    return data
}



async function getVector(id, name, vector = [0, 0], conditions = []) {
    const { path0, path1 } = decodeVector(id)
    const uri = 'data/vector/' + path0 + '/' + path1

    // const regex = /^.*"(?:\\.|[^"\\])*".*{.*}$/;
    const regex = /query\s*{\s*([\s\S]*?)\s*}/;
    if(regex.test(name)){
        console.log('=================', name)
        const resp = await getGraphVector(uri, name, vector)
        return resp
    }


    try {
        const db = await lancedb.connect(uri)
        const tbl = await db.openTable(name)

        const searchQuery = generateSearchString(conditions);

        console.log('searchQuery', searchQuery)

        if(searchQuery.error){
            return searchQuery
        }
        

        const query = await tbl
            .search(vector)
            .where(searchQuery)
            .execute()
        return query
    } catch (error) {
        return error
    }
}


async function getFile(path, vector = [2, 2]) {
    const pathSegments = path.split('/')
    const uri =
        pathSegments[0] +
        '/' +
        pathSegments[1] +
        '/' +
        pathSegments[2] +
        '/' +
        pathSegments[3]

    const name = pathSegments[4]
    const fileName = pathSegments[5]

    try {
        const db = await lancedb.connect(uri)
        const tbl = await db.openTable(name)

        const query = await tbl
            .search(vector)
            .where(
                `(
        message = '${fileName}'
      )`
            )
            .execute()
        return query
    } catch (error) {
        return error
    }
}



async function deleteVector(id, name, data) {
    const { path0, path1 } = decodeVector(id)
    const uri = 'data/vector/' + path0 + '/' + path1

    const db = await lancedb.connect(uri)
    const tbl = await db.openTable(name)
    //   await tbl.delete()
    console.log('deletevector', data)
    await tbl.delete(`id = '${data}'`)

    // const con = await lancedb.connect('./.lancedb')
    // const data = [
    //   { id: 1, vector: [1, 2] },
    //   { id: 2, vector: [3, 4] },
    //   { id: 3, vector: [5, 6] }
    // ]
    // const tbl = await con.createTable('my_table', data)
    // await tbl.delete('id = 2')
    // await tbl.countRows() // Returns 2

    // const to_remove = [1, 5]
    // await tbl.delete(`id IN (${to_remove.join(',')})`)7
    return 200
}


async function removeVector(id, name) {
    const { path0, path1 } = decodeVector(id)

    const uri =
        'data/vector/' + path0 + '/' + path1 + '/' + name + '.lance/'

    //   const tablePath = path.join(uri, `${name}.ldb`)

    try {
        // Verificar si la tabla existe antes de intentar eliminarla
        // await fs.access(uri)

        // Eliminar la tabla
        // await fs.removeSync(uri)

        await removePathname(uri)

        console.log(`La tabla ${name} ha sido eliminada.`)
    } catch (error) {
        console.error(`Errors al eliminar la tabla ${name}: ${error.message}`)
    }

    response(res, 200, { data: 200 })
}



function removePathname(path) {
    try {
        const folder = fs.readdirSync(path)

        folder.forEach((file) => {
            const pathname = path.join(path, file)
            const stats = fs.statSync(pathname)

            if (stats.isDirectory()) {
                eliminarDirectorioSync(pathname) // Recursivamente eliminar directorios internos
            } else {
                fs.unlinkSync(pathname) // Eliminar archivo
            }
        })

        fs.rmdirSync(path) // Eliminar el directorio vacío
        //   console.log(`Directorio ${directorio} eliminado exitosamente.`)
    } catch (err) {
        //   console.error(`Error al eliminar el directorio ${directorio}: ${err}`)
    }
}






module.exports = {
    addVector,
    updateVector,
    getVector,
    deleteVector,
    removeVector,
}