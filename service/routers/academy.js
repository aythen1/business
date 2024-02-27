// server.js

const express = require('express');
const cors = require('cors');

const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = 3002;

app.use(cors());



// Middleware para habilitar el manejo de JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Controlador para leer el contenido del archivo
app.post('/api/test/', async (req, res) => {
    try {
        const { jsx, css, js } = req.body;

        const jsxContent = await readFileContent(jsx);
        const cssContent = await readFileContent(css);
        const jsContent = await readFileContent(js);
    
        const result = {
          jsx: jsxContent,
          css: cssContent,
          js: jsContent,
        };
    
        res.status(200).json(result);
      } catch (error) {
        console.error('Error al leer los archivos:', error);
        res.status(500).send('Error interno del servidor');
      }
});

async function readFileContent(filePath) {
    try {
    // Ruta al archivo en el servidor
    const ini = '../../src/academy/test'

      const fullPath = path.resolve(__dirname, ini + filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      return content;
    } catch (error) {
      console.error(`Error al leer el archivo ${filePath}:`, error);
      return null;
    }
  }
  

// Controlador para modificar el contenido del archivo
app.put('/api/test', async (req, res) => {
    try {
      const { paths, content } = req.body;

      console.log('e11234')
  
      // Verificar que paths y content estén presentes en la solicitud
      if (!paths || !content) {
        res.status(400).send('Solicitud malformada: se requieren paths y contenido');
        return;
      }
  
      // Iterar sobre cada par de path y contenido y realizar la escritura
      const writePromises = paths.map(async (filePath, index) => {
        const fullPath = path.resolve(__dirname, `../../src/academy/test/${filePath}`);
        await fs.writeFile(fullPath, content[index], 'utf-8');
      });
  
      // Esperar a que todas las escrituras se completen antes de responder
      await Promise.all(writePromises);
  
      res.status(200).send('Cambios guardados con éxito');
    } catch (error) {
      console.error('Error al modificar el archivo:', error);
      res.status(500).send('Error interno del servidor');
    }
  });




// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});