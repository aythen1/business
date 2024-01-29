export function convertToMegabytes(valueInKilobytes) {
  if (valueInKilobytes < 0.5) {
    return valueInKilobytes + ' KB'
  } else {
    const valueInMegabytes = valueInKilobytes / 1024
    return valueInMegabytes.toFixed(1) + ' MB'
  }
}

export const calculateFolderSize = (directory, directoriesData) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  const itemsInDirectory = directoriesData.filter(
    (item) => item.Key.startsWith(directory) && item.Key !== directory
  )

  // Sumar tamaños de archivos y llamar recursivamente para carpetas
  return itemsInDirectory.reduce((totalSize, item) => {
    if (item.Size) {
      // Si es un archivo, sumar su tamaño
      return totalSize + item.Size
    } else {
      // Si es una carpeta, llamar recursivamente
      return totalSize + calculateFolderSize(item.Key, directoriesData)
    }
  }, 0)
}

export const deleteItemsInDirectory = (
  directory,
  callback,
  directoriesData
) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  const itemsInDirectory = directoriesData.filter(
    (item) => item.Key.startsWith(directory) && item.Key !== directory
  )

  // Eliminar archivos y carpetas y llamar recursivamente para carpetas
  itemsInDirectory.forEach((item) => {
    if (item.Size) {
      // Si es un archivo, eliminarlo
      callback(item.Key)
    } else {
      // Si es una carpeta, llamar recursivamente
      deleteItemsInDirectory(item.Key, callback, directoriesData)
    }
  })
}

export function getFilesInDescendingOrder(directoriesData) {
  // Filtrar elementos que son archivos (Size !== 6)
  const files = directoriesData.filter((item) => item.Size !== 0)

  // Ordenar los archivos en orden cronológico descendente
  const filesInDescendingOrder = files.sort((a, b) => {
    const dateA = new Date(a.LastModified)
    const dateB = new Date(b.LastModified)
    return dateB - dateA
  })
  console.log({ filesInDescendingOrder })
  return filesInDescendingOrder
}
