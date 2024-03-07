const { catchedAsync, response } = require("../utils/err");
const lancedb = require("vectordb");
const fs = require("fs");
const path = require("path");
const allSchemas = require("../services/lancedb/schema");

const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,

  generateEmptyObjectFromSchema,
  validateAgainstSchema,
} = require("../services/lancedb");

const decodeVector = (base64Str) => {
  const str = atob(base64Str);

  const [workspaceId, projectId] = str.split("/");
  return { workspaceId, projectId };
};

async function _addVector(req, res) {
  const { id, name, data } = req.body;

  // console.log('d', id, name, data)

  const resp = await addVector(id, name, (vector = [0, 0]), data);

  // console.log('resp', resp)
  // response(res, 200, { data: resp })

  return res.status(200).send(resp);
}

async function _updateVector(req, res) {
  const { data } = req.body;

  const { id, name } = req.params;
  // const { workspaceId, projectId } = decodeVector(id)
  // const uri = 'data/vector/' + workspaceId + '/' + projectId

  console.log("update vector", id, name, data);

  // const resp = await addVector(id, name, vector = [0, 0], data)
  const resp = await updateVector(id, name, (vector = [0, 0]), data);
  // const resp = await addVector(id, name, vector = [0, 0], {message: data})
  console.log("resp", resp);

  return res.status(200).send(resp);
  // response(res, 200, { data: resp })
}

const addVectorData = async (req, res) => {
  try {
    const { id, title, data, vector } = req.body;

    // console.log('idddd', id, data, vector)

    // console.log('==============', addon, vector)
    // const path = encodeVector(`addon/${data.title || 'shared'}`)
    // const name = vector.title + '-' + data.title
    // const result = await isAuth(token)

    const resp = await addVector(id, title, [0, 0, 0], data, {
      vectors: vector,
    });
    // console.log('reess', resp)
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send("Not verify user");
  }
};

function _deleteDirSync(directorio) {
  try {
    const archivos = fs.readdirSync(directorio);

    archivos.forEach((archivo) => {
      const rutaArchivo = path.join(directorio, archivo);
      const stats = fs.statSync(rutaArchivo);

      if (stats.isDirectory()) {
        eliminarDirectorioSync(rutaArchivo); // Recursivamente eliminar directorios internos
      } else {
        fs.unlinkSync(rutaArchivo); // Eliminar archivo
      }
    });

    fs.rmdirSync(directorio); // Eliminar el directorio vacío
    console.log(`Directorio ${directorio} eliminado exitosamente.`);
  } catch (err) {
    console.error(`Error al eliminar el directorio ${directorio}: ${err}`);
  }
}

async function _deleteVector(req, res) {
  const { id, name } = req.params;
  const { data } = req.body;
  // console.log('delete', id, name, data)

  const resp = await deleteVector(id, name, data);
  // console.log('rrrrrr', resp)

  return res.status(200).send(data);
  // response(res, 200, { data: 200 })
}

async function _removeVector(req, res) {
  // response(res, 200, { data: 'hello world como estás' })
  const { id, name } = req.params;
  const { workspaceId, projectId } = decodeVector(id);

  const uri =
    "data/vector/" + workspaceId + "/" + projectId + "/" + name + ".lance/";

  try {
    await deleteDirSync(uri);

    console.log(`La tabla ${name} ha sido eliminada.`);
  } catch (error) {
    console.error(`Errors al eliminar la tabla ${name}: ${error.message}`);
  }

  // response(res, 200, { data: 200 })
  return res.status(200).send(200);
}

async function _openVector(req, res) {
  const { path } = req.body;
  const pathSegments = path.split("/");
  const uri = btoa("data/vector/" + pathSegments[2] + "/" + pathSegments[3]);
  const name = pathSegments[4];
  const fileName = pathSegments[5];

  const conditions = [
    {
      field: "message",
      operator: "==",
      value: fileName,
    },
  ];

  const query = await getVector(uri, name, [0, 0], conditions);

  response(res, 200, { data: query });
}

async function _getVector(req, res) {
  const { id, name } = req.params;
  const { data } = req.body;

  try {
    let options = [];

    if (data.title) {
      options = [
        { field: "title", operator: "LIKE", value: `%${data.title}%` },
      ];
    } else if (data.id) {
      options = [{ field: "id", operator: "LIKE", value: `%${data.id}%` }];
    }

    const query = await getVector(id, name, [0, 0], options);
    // const query = await getVector(id, name, [0, 0])

    if (!query.length) {
      // response(res, 200, { data: [] })
      return res.status(200).send([]);
    }

    // response(res, 200, { data: query })
    if (options.length > 0) {
      return res.status(200).send(query[0]);
    } else {
      return res.status(200).send(query);
    }
  } catch (err) {
    // response(res, 200, { data: [] })
    return res.status(200).send([]);
  }
}

async function _loadVector(req, res) {
  const { id, name } = req.params;
  const { workspaceId, projectId } = decodeVector(id);

  const uri = "data/vector/" + workspaceId + "/" + projectId;
  const file = req.file;
  const path = uri + "/" + name + "/" + file.originalname;

  try {
    let type;
    if (name === "records") {
      type = "record";
    } else {
      type = file.mimetype;
    }

    const db = await lancedb.connect(uri);
    const tbl = await db.openTable(name);

    const message = [
      {
        currentDate: new Date().toISOString(),
        message: file.originalname,
        type,
        data: JSON.stringify(file),
        vector: [0, 0],
      },
    ];

    addVector(id, name, message);

    response(res, 200, { data: path });
  } catch (error) {
    console.error(`Errors al upload la tabla ${name}: ${error.message}`);
    response(res, 200, { error });
  }
}

async function _getAllVector(req, res) {
  const db = await lancedb.connect("data/vector");

  const tables = await db.tableNames();

  const tableInfoArray = await Promise.all(
    tables.map(async (table) => {
      const tbl = await db.openTable(table);
      const count = await tbl.countRows();

      // Crear un objeto con las propiedades deseadas
      return {
        title: table,
        count,
      };
    })
  );

  response(res, 200, { data: tableInfoArray });
}

const addRelationsToSchema = (schema) => {
  schema.properties.vector = {
    type: "array",
    items: { type: "number" },
  };

  schema.properties.relations = {
    type: "string",
    default: "{}",
  };

  return schema;
};

const shareFileVector2 = async (req, res) => {
  const { user1, user2, data } = req.body; // Asumiendo que los IDs de usuario se envían en el cuerpo de la solicitud
  const file = req.file;
  const fileBuffer = file.buffer;
  const base64File = fileBuffer.toString("base64");

  // Generar el nombre del vector
  const vectorName = `shared-${user1}-${user2}`;

  try {
    // Asumiendo que tienes una función que pueda buscar un vector por su nombre
    let vector = await findVectorByName(vectorName);

    if (!vector) {
      // Si no se encuentra el vector, crea uno nuevo
      // Asumiendo que tienes una función para crear un nuevo vector
      vector = await addVector(user1, vectorName, (vector = [0, 0]), data);
      // Agregar lógica para manejar la creación del nuevo vector
    }

    // Ahora, ya sea que el vector existiera o se haya creado uno nuevo, agrega el archivo
    // Asumiendo que tienes una función que agrega archivos a un vector existente
    await addFileToVector(vector, base64File);

    // Envía una respuesta al cliente indicando éxito
    res.status(200).json({ message: "Archivo compartido exitosamente." });
  } catch (error) {
    console.error("Error compartiendo el archivo:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
const shareFileVector = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { workspaceId, projectId } = decodeVector(id);

  const file = req.file;
  const fileBuffer = file.buffer;

  let schema;

  if (
    workspaceId == "chatbot" ||
    workspaceId == "addon" ||
    workspaceId == "ticket"
  ) {
    schema = addRelationsToSchema(allSchemas["vectors"]);
  } else {
    const schemaExists = allSchemas.hasOwnProperty(name);
    if (vector.length == 2 && !schemaExists) {
      return "El esquema no existe";
    } else if (vector.length > 2) {
      if (!data.id) data.id = uuidv4();
      schema = addRelationsToSchema(generateSchemaFromObject(data));
      console.log("vector 3 data vector: ", JSON.stringify(schema));
    } else {
      schema = addRelationsToSchema(allSchemas[name]);
    }
  }

  try {
    const db = await lancedb.connect(uri);
    const tbl = await db.openTable(name);
  } catch (err) {
    const db = await lancedb.connect(uri);
    let emptyData;
    if (vector.length == 2) {
      emptyData = generateEmptyObjectFromSchema(schema);
    } else {
      emptyData = data.length ? data[0] : data;
    }

    emptyData.vector = vector;
    emptyData.id = uuidv4();
    const validObj = validateAgainstSchema(emptyData, schema);
    if (!validObj.isValid) {
      return {
        message: "El objeto no cumple con el esquema",
        data: emptyData,
        error: validObj.errors[0],
      };
    }

    try {
      await db.createTable("shared", [emptyData], {
        schema: schema,
        writeMode: "overwrite",
      });

      const tbl = await db.openTable("shared");
      await tbl.delete(`id = '${emptyData.id}'`);
    } catch (err) {
      console.log("errrr", err);
    }
  }

  // function chunkFile(file, chunkSize) {
  //   const chunks = []
  //   for (let i = 0; i < file.length; i += chunkSize) {
  //     chunks.push(file.slice(i, i + chunkSize))
  //   }
  //   return chunks
  // }
  // const chunkSize = 4000

  // const pdfText = await pdf(fileBuffer)
  //   .then((data) => {
  //     return data.text
  //   })
  //   .catch((error) => {
  //     console.error('Error al cargar el PDF:', error)
  //   })

  // fileBuffer

  try {
    // const chunks = chunkText(pdfText, chunkSize)
    // Procesa cada chunk de forma secuencial
    // for (const chunk of chunks) {
    //   const response = await fetch('https://api.openai.com/v1/completions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${KEY_OPENAI}`
    //     },
    //     body: JSON.stringify({
    //       model: 'text-davinci-002',
    //       prompt: chunk,
    //       max_tokens: 50
    //     })
    //   })

    //   if (!response.ok) {
    //     throw new Error(`Error de HTTP! Estado: ${response.status}`)
    //   }

    //   const responseData = await response.json()
    //   console.log('resp', responseData)
    //   const generatedTokens = responseData.choices[0].text
    //   // Acumula los tokens generados
    //   allGeneratedTokens += generatedTokens
    // }

    console.log("dddd");

    const uri = "data/vector/" + workspaceId + "/" + projectId;
    const db = await lancedb.connect(uri);
    // const tbl = await db.openTable(name)

    // JSON S3 FILEOBJECT
    const tableSchema = {
      type: "object",
      properties: {
        currentDate: { type: "string" },
        message: { type: "string" },
        type: { type: "string" },
        data: { type: "string" },
      },
      required: ["currentDate", "message", "type"],
    };

    const tbl = await db.openTable("shared", { schema: tableSchema });

    const message = [
      {
        currentDate: new Date().toISOString(),
        message: file.originalname,
        type: file.mimetype,
        data: fileBuffer.toString("utf-8"),
        vector: [0, 0],
      },
    ];

    await tbl.add(message);

    response(res, 200, { data: message });
  } catch (error) {
    console.error(`Errors al eliminar la tabla ${name}: ${error.message}`);

    response(res, 200, { error });
  }
};

module.exports = {
  addVector: catchedAsync(_addVector),
  updateVector: catchedAsync(_updateVector),
  addVectorData: catchedAsync(addVectorData),
  shareFileVector: catchedAsync(shareFileVector),

  loadVector: catchedAsync(_loadVector),
  deleteVector: catchedAsync(_deleteVector),
  removeVector: catchedAsync(_removeVector),
  openVector: catchedAsync(_openVector),
  getVector: catchedAsync(_getVector),
  getAllVector: catchedAsync(_getAllVector),
};

// const loadVector = async (req, res) => {
//   const { id, name } = req.params
//   const file = req.file
//   const fileBuffer = file.buffer

//   console.log('f9le', file)

//   function chunkText(text, chunkSize) {
//     const chunks = []
//     for (let i = 0; i < text.length; i += chunkSize) {
//       chunks.push(text.slice(i, i + chunkSize))
//     }
//     return chunks
//   }

//   const chunkSize = 4000 // Tamaño del chunk, puedes ajustarlo según tus necesidades

//   const pdfText = await pdf(fileBuffer)
//     .then((data) => {
//       return data.text
//     })
//     .catch((error) => {
//       console.error('Error al cargar el PDF:', error)
//     })

//   try {
//     let allGeneratedTokens = ''

//     const chunks = chunkText(pdfText, chunkSize)
//     // Procesa cada chunk de forma secuencial
//     for (const chunk of chunks) {
//       const response = await fetch('https://api.openai.com/v1/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${KEY_OPENAI}`
//         },
//         body: JSON.stringify({
//           model: 'text-davinci-002',
//           prompt: chunk,
//           max_tokens: 50
//         })
//       })

//       if (!response.ok) {
//         throw new Error(`Error de HTTP! Estado: ${response.status}`)
//       }

//       const responseData = await response.json()
//       console.log('resp', responseData)
//       const generatedTokens = responseData.choices[0].text
//       // Acumula los tokens generados
//       allGeneratedTokens += generatedTokens
//     }

//     console.log('dddd')

//     const { workspaceId, projectId } = decodeVector(id)

//     const uri = 'data/vector/' + workspaceId + '/' + projectId

//     const db = await lancedb.connect(uri)
//     // const tbl = await db.openTable(name)

//     const tableSchema = {
//       type: 'object',
//       properties: {
//         currentDate: { type: 'string' },
//         message: { type: 'string' },
//         type: { type: 'string' },
//         data: { type: 'string' }
//       },
//       required: ['currentDate', 'message', 'type']
//     }

//     const tbl = await db.openTable(name, { schema: tableSchema })

//     const message = [
//       {
//         currentDate: new Date().toISOString(),
//         message: file.originalname,
//         type: 'application/pdf',
//         data: JSON.stringify({
//           pdfText,
//           allGeneratedTokens
//         }),
//         vector: [1.3, 1.4]
//         // _distance: 19463.6484375
//       }
//     ]
//     console.log('aaaa', message)

//     await tbl.add(message)

//     // console.log('d', document)

//     response(res, 200, { data: message })
//   } catch (error) {
//     console.error(`Errors al eliminar la tabla ${name}: ${error.message}`)

//     response(res, 200, { error })
//   }
// }
