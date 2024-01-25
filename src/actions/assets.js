import { createAsyncThunk } from '@reduxjs/toolkit'
import apiBackend from '@/utils/apiBackend'
import {
  setAssets,
  setAssetsVersions,
  filterFolder,
  pushFolder,
  setFile,
  setFileToCopy,
  copyFileLocal
} from '../slices/assetsSlice'

export const getAssets = createAsyncThunk('assets/getAssets', async () => {
  // const formData = new FormData()
  // formData.append('projectId', projectId)
  // formData.append('image', image)
  const { data } = await apiBackend.get(
    '/v1/icon/folder?filderFolder=feather',
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return data.data
})
function buildQueryString(params) {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&')
}
// Obtener todas las carpetas de un directory
export const getRootDirectories = createAsyncThunk(
  'assets/getRootDirectories',
  async ({ Prefix }, { dispatch }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      const query = buildQueryString({
        userId,
        Prefix
      })
      const { data } = await apiBackend.get(`/v1/editor/directories?${query}`)
      dispatch(setAssets(data.data))
      return data.data.body
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Obtener todas las carpetas de un directory
export const getDirectoriesVersions = createAsyncThunk(
  'assets/getDirectoriesVersions',
  async ({ Prefix }, { dispatch }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      const query = buildQueryString({
        userId,
        Prefix
      })
      const { data } = await apiBackend.get(
        `/v1/editor/directories/versions?${query}`
      )
      dispatch(setAssetsVersions(data.data))
      return data.data.body
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Obtener todas las carpetas de un directory
export const getFile = createAsyncThunk(
  'assets/getFile',
  async ({ fileName }, { dispatch }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      const query = buildQueryString({
        userId,
        fileName
      })
      const { data } = await apiBackend.get(`/v1/editor/file?${query}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Crear carpeta
export const createNewFolder = createAsyncThunk(
  'assets/createNewFolder',
  async (name) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      const body = {
        userId,
        name
      }
      const { data } = await apiBackend.post('/v1/editor/new-folder', body)
      return data.data.body
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Crear carpeta
export const uploadFile = createAsyncThunk(
  'assets/uploadFile',
  async ({ file, path }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      const formData = new FormData()
      formData.append('userId', userId)
      formData.append('path', path)
      formData.append('image', file)

      const { data } = await apiBackend.post('/v1/editor/add-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Crear carpeta
export const copyFile = createAsyncThunk(
  'assets/copyFile',
  async ({ sourceKey, destinationKey, file }, { dispatch }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      const body = {
        sourceBucket: userId,
        sourceKey,
        destinationBucket: userId,
        destinationKey,
        userId
      }
      const { data } = await apiBackend.post('/v1/editor/copy-file', body)
      dispatch(copyFileLocal({ ...file, Key: destinationKey }))
      return data.data.body
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Crear carpeta
export const moveFile = createAsyncThunk(
  'assets/copyFile',
  async ({ sourceKey, destinationKey, file }, { dispatch }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      const body = {
        sourceBucket: userId,
        sourceKey,
        destinationBucket: userId,
        destinationKey,
        userId
      }
      const { data } = await apiBackend.post('/v1/editor/copy-file', body)
      dispatch(copyFileLocal({ ...file, Key: destinationKey }))
      dispatch(filterFolder(sourceKey))

      return data.data.body
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Borrar una carpeta en scaleway
export const deleteFolder = createAsyncThunk(
  'assets/deleteFolder',
  async (path, { dispatch }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      const query = buildQueryString({
        userId,
        path
      })
      const { data } = await apiBackend.delete(
        `/v1/editor/delete-folder?${query}`
      )
      dispatch(filterFolder(path))
      return data.data.body
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Borrar un archivo en scaleway
export const deleteFile = createAsyncThunk(
  'assets/deleteFile',
  async ({ path, VersionId }, { dispatch }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).user.id
      console.log({ path, VersionId })
      const query = buildQueryString({
        userId,
        path,
        VersionId
      })
      console.log({ userId, path, VersionId })
      const { data } = await apiBackend.delete(`/v1/editor/file?${query}`)
      dispatch(filterFolder(path))
      return data.data.body
    } catch (error) {
      throw new Error(error)
    }
  }
)
// / / / / / / / / / / / / / / / / / / / ICONS / / / / / / / / / / / / / / / / / / / / / / / /
// Obtener todos los icons de una folder
export const getIconsByFolder = createAsyncThunk(
  'assets/getIconsByFolder',
  async ({ folder }, { dispatch }) => {
    try {
      const { data } = await apiBackend.get(
        `/v1/icon/folder?fileFolder=${folder}`
      )
      return { data: data.data, folder }
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Obtener todas las carpetas de un directory
export const getIconByQuery = createAsyncThunk(
  'assets/getIconByQuery',
  async ({ folder, fileName }, { dispatch }) => {
    const query = buildQueryString({
      folder,
      fileName
    })
    try {
      const { data } = await apiBackend.get(`/v1/icon?${query}`)
      return { data: data.data, folder, fileName }
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Borrar una carpeta en redux
export const deleteFolderLocal = (directory) => (dispatch) => {
  try {
    dispatch(filterFolder(directory))
  } catch (error) {
    console.error('Ha ocurrido un error al eliminar la carpeta:', error)
  }
}
// Agregar una carpeta en redux
export const addFolderLocal = (directory) => (dispatch) => {
  console.log({ directory })
  try {
    dispatch(pushFolder(directory))
  } catch (error) {
    console.error('Ha ocurrido un error al crear la carpeta:', error)
  }
}
// Agregar una carpeta en redux
export const obtainFileData = (directory) => (dispatch) => {
  try {
    dispatch(setFileToCopy(directory))
  } catch (error) {
    console.error('Ha ocurrido un error al crear la carpeta:', error)
  }
}
// Agregar una carpeta en redux
export const duplicateFileLocal = (newFile) => (dispatch) => {
  try {
    dispatch(copyFileLocal(newFile))
  } catch (error) {
    console.error('Ha ocurrido un error al crear la carpeta:', error)
  }
}
// Agregar una carpeta en redux
export const setFileDragging = (src) => (dispatch) => {
  try {
    console.log({ src })
    dispatch(setFile(src))
  } catch (error) {
    console.error('Ha ocurrido un error al crear la carpeta:', error)
  }
}
