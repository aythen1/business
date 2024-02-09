export function convertToMegabytes(valueInKilobytes) {
  if (valueInKilobytes < 0.5) {
    return valueInKilobytes + " KB";
  } else {
    const valueInMegabytes = valueInKilobytes / 1024;
    return valueInMegabytes.toFixed(1) + " MB";
  }
}

export const calculateFolderSize = (directory, directoriesData) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  const itemsInDirectory = directoriesData.filter(
    (item) => item.Key.startsWith(directory) && item.Key !== directory
  );

  // Sumar tamaños de archivos y llamar recursivamente para carpetas
  return itemsInDirectory.reduce((totalSize, item) => {
    if (item.Size) {
      // Si es un archivo, sumar su tamaño
      return totalSize + item.Size;
    } else {
      // Si es una carpeta, llamar recursivamente
      return totalSize + calculateFolderSize(item.Key, directoriesData);
    }
  }, 0);
};

export const deleteItemsInDirectory = (
  directory,
  callback,
  directoriesData
) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  const itemsInDirectory = directoriesData.filter(
    (item) => item.Key.startsWith(directory) && item.Key !== directory
  );

  // Eliminar archivos y carpetas y llamar recursivamente para carpetas
  itemsInDirectory.forEach((item) => {
    if (item.Size) {
      // Si es un archivo, eliminarlo
      callback(item.Key);
    } else {
      // Si es una carpeta, llamar recursivamente
      deleteItemsInDirectory(item.Key, callback, directoriesData);
    }
  });
};

export function getFilesInDescendingOrder(directoriesData) {
  // Filtrar elementos que son archivos (Size !== 6)
  const files = directoriesData.filter((item) => item.Size !== 0);

  // Ordenar los archivos en orden cronológico descendente
  const filesInDescendingOrder = files.sort((a, b) => {
    const dateA = new Date(a.LastModified);
    const dateB = new Date(b.LastModified);
    return dateB - dateA;
  });
  console.log({ filesInDescendingOrder });
  return filesInDescendingOrder;
}

export function formatLastModified(lastModified) {
  const now = new Date();
  const modifiedDate = new Date(lastModified);
  const diffMinutes = Math.floor((now - modifiedDate) / (1000 * 60));
  const diffDays = Math.floor(diffMinutes / (60 * 24));

  if (diffMinutes < 1) return "less than a minute";
  if (diffMinutes < 5) return "5min";
  if (diffMinutes < 15) return "15min";
  if (diffMinutes < 30) return "30min";
  if (diffMinutes < 60) return "1h";
  if (diffDays < 1 && now.getDate() === modifiedDate.getDate()) return "today";
  if (diffDays === 1) return "1 day";
  if (diffDays === 2) return "2 days";
  if (diffDays === 3) return "3 days";
  if (diffDays === 4) return "4 days";
  if (diffDays > 4 && diffDays < 8) return "last week";
  if (diffDays >= 8 && diffDays < 15) return "2 weeks";
  if (diffDays >= 15 && diffDays < 23) return "3 weeks";
  if (diffDays >= 23 && diffDays < 32) return "1 month";
  if (diffDays >= 32 && diffDays < 60) return "2 month";
  if (diffDays >= 60 && diffDays < 90) return "3 month";

  return modifiedDate.toLocaleDateString(); // esto va a devolver la fecha en formato local
}
