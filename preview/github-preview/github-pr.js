// Obtener los cambios en una PR específica
async function getPullRequestChanges(prNumber) {
    try {
      const prChanges = await makeRequest(`pulls/${prNumber}/files`);
  
      console.log(`Cambios en la PR #${prNumber}:`);
  
      for (const file of prChanges) {
        console.log(`Archivo: ${file.filename}`);
        console.log(`Cambios: ${file.changes}`);
        console.log('Añadidos:', file.additions);
        console.log('Eliminados:', file.deletions);
        console.log('Total:', file.changes);
        console.log('-------------------------------------');
      }
    } catch (error) {
      console.error(`Error al obtener los cambios en la PR #${prNumber}:`, error.message);
    }
  }