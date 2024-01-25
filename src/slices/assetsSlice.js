import { createSlice } from '@reduxjs/toolkit'

import {
  getAssets,
  getRootDirectories,
  getDirectoriesVersions,
  deleteFolder,
  deleteFile,
  createNewFolder,
  getFile,
  copyFile,
  uploadFile,
  getIconsByFolder,
  getIconByQuery
} from '../actions/assets'
import * as types from './types'

export const assetsSlice = createSlice({
  name: 'assets',
  initialState: {
    assets: [],
    directoriesData: [],
    directoriesTrash: [],
    fileToCopy: '',
    file: null,
    empty: null,
    cutOrCopy: '',
    currentFolder: '',
    searchFiles: '',
    iconFolder: {
      feather: [],
      fontawesome: [],
      IcoMoon: [],
      materialIcons: [],
      typicons: []
    },
    iconFolderData: {
      feather: [],
      fontawesome: [],
      IcoMoon: [],
      materialIcons: [],
      typicons: []
    },
    loading: {},
    error: {}
  },
  reducers: {
    setAssets(state, actions) {
      const contents = actions.payload.map((item) => item.Key)
      state.assets = contents
      state.directoriesData = actions.payload
      actions.payload.length === 0
        ? (state.empty = true)
        : (state.empty = false)
    },
    setAssetsVersions(state, actions) {
      state.directoriesTrash = actions.payload
    },
    setSearchFiles(state, actions) {
      state.searchFiles = actions.payload
    },
    setCurrentFolder(state, actions) {
      console.log({ actions })
      state.currentFolder = actions.payload
    },
    filterFolder(state, actions) {
      state.directoriesData = state.directoriesData.filter(
        (f) => f.Key !== actions.payload
      )
    },
    pushFolder(state, actions) {
      state.directoriesData = [
        ...state.directoriesData,
        { Key: actions.payload, Size: 6 }
      ]
      state.empty = false
    },
    setFile(state, actions) {
      state.file = actions.payload
    },
    setFileToCopy(state, actions) {
      state.fileToCopy = actions.payload
    },
    copyFileLocal(state, actions) {
      state.directoriesData = [...state.directoriesData, actions.payload]
    },
    moveFileLocal(state, actions) {
      state.directoriesData = [...state.directoriesData, actions.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssets.pending, (state) => {
        // state.loading = { ...state.loading, [types.GET_ALL_COMPONENTS]: true }
        // state.error = { ...state.error, [types.GET_ALL_COMPONENTS]: '' }
        state.assets = ['pendent']
      })
      .addCase(getAssets.fulfilled, (state, action) => {
        // state.loading = { ...state.loading, [types.CLONE_COMPONENT]: false }
        state.assets = action.payload
        state.assets = ['full']
      })
      .addCase(getAssets.rejected, (state, action) => {
        // state.loading = { ...state.loading, [types.GET_ALL_COMPONENTS]: false }
        // state.error = {
        //     ...state.error,
        //     [types.GET_ALL_COMPONENTS]: action.payload
        // }
        state.assets = ['error']
      })
      .addCase(deleteFolder.pending, (state) => {
        state.loading = { ...state.loading, [types.DELETE_DIRECTORY]: true }
        state.error = { ...state.error, [types.DELETE_DIRECTORY]: '' }
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_DIRECTORY]: false }
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_DIRECTORY]: false }
        state.error = {
          ...state.error,
          [types.DELETE_DIRECTORY]: action.payload
        }
      })
      .addCase(deleteFile.pending, (state) => {
        state.loading = { ...state.loading, [types.DELETE_FILE]: true }
        state.error = { ...state.error, [types.DELETE_FILE]: '' }
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_FILE]: false }
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_FILE]: false }
        state.error = {
          ...state.error,
          [types.DELETE_FILE]: action.payload
        }
      })
      .addCase(getRootDirectories.pending, (state) => {
        state.loading = { ...state.loading, [types.GET_ALL_DIRECTORIES]: true }
        state.error = { ...state.error, [types.GET_ALL_DIRECTORIES]: '' }
      })
      .addCase(getRootDirectories.fulfilled, (state, action) => {
        state.loading = { ...state.loading, [types.GET_ALL_DIRECTORIES]: false }
      })
      .addCase(getRootDirectories.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.GET_ALL_DIRECTORIES]: false }
        state.error = {
          ...state.error,
          [types.GET_ALL_DIRECTORIES]: action.payload
        }
      })
      .addCase(getDirectoriesVersions.pending, (state) => {
        state.loading = {
          ...state.loading,
          [types.GET_DIRECTORIES_VERSIONS]: true
        }
        state.error = { ...state.error, [types.GET_DIRECTORIES_VERSIONS]: '' }
      })
      .addCase(getDirectoriesVersions.fulfilled, (state, action) => {
        state.loading = {
          ...state.loading,
          [types.GET_DIRECTORIES_VERSIONS]: false
        }
      })
      .addCase(getDirectoriesVersions.rejected, (state, action) => {
        state.loading = {
          ...state.loading,
          [types.GET_DIRECTORIES_VERSIONS]: false
        }
        state.error = {
          ...state.error,
          [types.GET_DIRECTORIES_VERSIONS]: action.payload
        }
      })
      .addCase(createNewFolder.pending, (state) => {
        state.loading = { ...state.loading, [types.UPDATE_DIRECTORY]: true }
        state.error = { ...state.error, [types.UPDATE_DIRECTORY]: '' }
      })
      .addCase(createNewFolder.fulfilled, (state, action) => {
        state.loading = { ...state.loading, [types.UPDATE_DIRECTORY]: false }
      })
      .addCase(createNewFolder.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.UPDATE_DIRECTORY]: false }
        state.error = {
          ...state.error,
          [types.UPDATE_DIRECTORY]: action.payload
        }
      })
      .addCase(getFile.pending, (state) => {
        state.loading = { ...state.loading, [types.GET_FILE]: true }
        state.error = { ...state.error, [types.GET_FILE]: '' }
      })
      .addCase(getFile.fulfilled, (state, actions) => {
        state.loading = { ...state.loading, [types.GET_FILE]: false }
        state.file = actions.payload
      })
      .addCase(getFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.GET_FILE]: false }
        state.error = {
          ...state.error,
          [types.GET_FILE]: action.payload
        }
      })
      .addCase(copyFile.pending, (state) => {
        state.loading = { ...state.loading, [types.COPY_FILE]: true }
        state.error = { ...state.error, [types.COPY_FILE]: '' }
      })
      .addCase(copyFile.fulfilled, (state) => {
        state.loading = { ...state.loading, [types.COPY_FILE]: false }
      })
      .addCase(copyFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.COPY_FILE]: false }
        state.error = {
          ...state.error,
          [types.COPY_FILE]: action.payload
        }
      })
      .addCase(uploadFile.pending, (state) => {
        state.loading = { ...state.loading, [types.UPLOAD_FILE]: true }
        state.error = { ...state.error, [types.UPLOAD_FILE]: '' }
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = { ...state.loading, [types.UPLOAD_FILE]: false }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.UPLOAD_FILE]: false }
        state.error = {
          ...state.error,
          [types.UPLOAD_FILE]: action.payload
        }
      })
      .addCase(getIconsByFolder.pending, (state) => {
        state.loading = { ...state.loading, [types.SET_ICONS]: true }
        state.error = { ...state.error, [types.SET_ICONS]: '' }
      })
      .addCase(getIconsByFolder.fulfilled, (state, action) => {
        const { data, folder } = action.payload
        state.loading = { ...state.loading, [types.SET_ICONS]: false }
        const iconsObj = data.map((icon) => ({ name: icon, svg: '' }))
        state.iconFolder[folder] = data
        state.iconFolderData[folder] = iconsObj
      })
      .addCase(getIconsByFolder.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.SET_ICONS]: false }
        state.error = {
          ...state.error,
          [types.SET_ICONS]: action.payload
        }
      })
      .addCase(getIconByQuery.pending, (state) => {
        state.loading = { ...state.loading, [types.SET_ICON]: true }
        state.error = { ...state.error, [types.SET_ICON]: '' }
      })
      .addCase(getIconByQuery.fulfilled, (state, action) => {
        const { data, folder, fileName } = action.payload
        state.loading = { ...state.loading, [types.SET_ICON]: false }

        // Verificar si el icono ya existe en el estado
        const iconExists = state.iconFolderData[folder].some(
          (icon) => icon.name === fileName && icon.svg !== ''
        )
        if (!iconExists) {
          // Si el icono no existe, agregarlo al estado
          state.iconFolderData = {
            ...state.iconFolderData,
            [folder]: state.iconFolderData[folder].map((icon) => {
              if (icon.name === fileName) {
                // Si encontramos el icono con el nombre especificado, actualizamos su propiedad svg
                return { ...icon, svg: data }
              }
              // Si no es el icono que estamos buscando, mantenemos el objeto sin cambios
              return icon
            })
          }
        }
      })

      .addCase(getIconByQuery.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.SET_ICON]: false }
        state.error = {
          ...state.error,
          [types.SET_ICON]: action.payload
        }
      })
  }
})

export const {
  setAssets,
  setAssetsVersions,
  filterFolder,
  pushFolder,
  setFile,
  setFileToCopy,
  copyFileLocal,
  moveFileLocal,
  setSearchFiles,
  setCurrentFolder
} = assetsSlice.actions
export default assetsSlice.reducer
