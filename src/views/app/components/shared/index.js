// Obtener el contexto del directorio actual
const context = require.context('./', false, /\.jsx$/);

// Crear un objeto que contendrá todos los componentes
const components = {};

// Importar dinámicamente cada archivo y agregarlo al objeto 'components'
context.keys().forEach(key => {
  const componentName = key.replace(/\.\/|\.jsx/g, ''); // Obtener el nombre del componente
  components[componentName] = context(key).default; // Importar y agregar al objeto
});

// Exportar el objeto 'components'
export default components;