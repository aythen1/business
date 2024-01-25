const { catchedAsync, response } = require("../../utils/err");
const fs = require("fs");
const path = require("path");

const getBack = async (req, res) => {
  try {
    const folderPath = "./docs/endpoints"; // Reemplaza con la ruta de tu carpeta
    const outputPath = "./docs/ini.txt"; // Reemplaza con la ruta donde quieras guardar el archivo ini.txt

    fs.readdir(folderPath, (err, files) => {
      if (err) throw err;

      const mdFiles = files.filter((file) => path.extname(file) === ".md");

      let content = "";

      mdFiles.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        content += `Nueva ruta (${filePath}):\n ${fileContent}\n======================================\n\n`;
      });

      fs.writeFileSync(outputPath, content);

      // response(res, 200, content);
      res.send(content);
    });
  } catch (error) {
    console.error(error);
    response(res, 500, "Error al obtener los archivos");
  }
};



// Define the function to recursively map a folder and its contents
function getFolderMap(folderPath, level = 0) {
  const extensionsNotAllowed = ['.css', '.png'];

  const files = fs.readdirSync(folderPath);
  // Use an array to store the map instead of a string
  let map = [];
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      map.push(`${'-'.repeat(level)} ${file}`);
      map.push(...getFolderMap(filePath, level + 1));
    } else {
      const ext = path.extname(file);
      const fileName = path.basename(file, ext);
      if (ext === '.jsx') {
        map.push(`${'-'.repeat(level)} ${fileName}${ext}`);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const importRegex = /import\s+([\w\d]+)\s+from\s+['"](.+)['"]/g;
        let match;
        while ((match = importRegex.exec(fileContent)) !== null) {
          const componentName = match[1];
          const componentPath = match[2];
          if (componentPath.startsWith('.')) {
            let componentFullPath = path.join(path.dirname(filePath), componentPath);
            console.log('eeee', componentFullPath, ext)

            const extension = path.extname(componentFullPath).toLowerCase();

            if (!path.extname(componentFullPath)) {
              componentFullPath += '.jsx';
            }

            // const componentStats = fs.statSync(componentFullPath);
            // if (componentStats.isFile()) {
            //   map.push(`#${componentName} (${componentFullPath})`);
            // }
            if (!extensionsNotAllowed.includes(extension)) {
              try {
                const componentStats = fs.statSync(componentFullPath);
                if (componentStats.isFile()) {
                  map.push(`#${componentName} (${componentFullPath})`);
                }
              } catch (error) {
                if (error.code === 'ENOENT') {
                  console.error(`El archivo no existe: ${componentFullPath}`);
                } else {
                  // Manejar otros errores si es necesario
                  console.error('Error al obtener estadísticas:', error);
                }
              }
            }


          }
        }
      } else {
        map.push(`${'-'.repeat(level)} ${fileName}${ext}`);
      }
    }
  });
  return map;
}

// Define the function to handle the HTTP GET request
const getFront = (req, res) => {
  // Use an absolute path instead of a relative path
  const folderPath = '../../front/web/apps/next-client/src/app/[lng]/app';
  const folderMap = getFolderMap(folderPath);
  // Send the folder map as the response
  res.send(folderMap.join('\n'));
};

module.exports = {
  getBack: catchedAsync(getBack),
  getFront: catchedAsync(getFront),
};
