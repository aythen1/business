export function convertToMegabytes(valueInKilobytes) {
  if (valueInKilobytes < 0.5) {
    return valueInKilobytes + ' KB'
  } else {
    const valueInMegabytes = valueInKilobytes / 1024
    return valueInMegabytes.toFixed(1) + ' MB'
  }
}

export const calculateFolderSize = (directory, directoriesData) => {
  const itemsInDirectory = directoriesData.filter(
    (item) => item.Key.startsWith(directory) && item.Key !== directory
  )

  return itemsInDirectory.reduce((totalSize, item) => {
    if (item.Size) {
      return totalSize + item.Size
    } else {
      return totalSize + calculateFolderSize(item.Key, directoriesData)
    }
  }, 0)
}

export const deleteItemsInDirectory = (
  directory,
  callback,
  directoriesData
) => {
  const itemsInDirectory = directoriesData.filter(
    (item) => item.Key.startsWith(directory) && item.Key !== directory
  )

  itemsInDirectory.forEach((item) => {
    if (item.Size) {
      callback(item.Key)
    } else {
      deleteItemsInDirectory(item.Key, callback, directoriesData)
    }
  })
}

export function getFilesInDescendingOrder(directoriesData) {
  const files = directoriesData.filter((item) => item.Size !== 0)

  const filesInDescendingOrder = files.sort((a, b) => {
    const dateA = new Date(a.LastModified)
    const dateB = new Date(b.LastModified)
    return dateB - dateA
  })
  console.log({ filesInDescendingOrder })
  return filesInDescendingOrder
}
