import { createSlice } from "@reduxjs/toolkit";

import {
  directoriesDB,
  getRootDirectories,
  getDirectoriesVersions,
  deleteFolders,
  deleteFolder,
  deleteFile,
  deleteFiles,
  createNewFolder,
  getFile,
  copyFile,
  uploadFile,
} from "@/actions/assets";
import {} from "../views/app/pages/Settings/drive/assetsAux";
import * as types from "./types";

// Función auxiliar para actualizar el estado de los objetos en directoriesTrash.Versions
const updateVersionsIsLatest = (state, Key, shouldBeIsLatest) => {
  const index = state.directoriesTrash.Versions.findIndex(
    (marker) => marker.Key === Key && marker.IsLatest !== shouldBeIsLatest
  );
  if (index !== -1) {
    state.directoriesTrash.Versions[index].IsLatest = shouldBeIsLatest;
  }
};

// Función auxiliar para filtrar DeleteMarkers por Key
const filterDeleteMarkersByKey = (state, Key) => {
  state.directoriesTrash.DeleteMarkers =
    state.directoriesTrash.DeleteMarkers.filter((f) => f.Key !== Key);
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    directoriesData: [],
    directoriesTrash: { Versions: [], DeleteMarkers: [] },
    fileToCopy: "",
    fileToCut: "",
    folderToCopy: "",
    folderToCut: "",
    file: null,
    empty: null,
    cutOrCopy: "",
    currentFolder: "",
    searchFiles: "",
    category: "",
    loading: {},
    error: {},
  },
  reducers: {
    setAssets(state, actions) {
      const contents = actions.payload.map((item) => item.Key);
      state.assets = contents;
      state.directoriesData = actions.payload;
      actions.payload.length === 0
        ? (state.empty = true)
        : (state.empty = false);
    },
    setAssetsVersions(state, actions) {
      state.directoriesTrash = actions.payload;
      const latestFiles = actions.payload.Versions.filter(
        (f) => f.IsLatest === true
      );
      latestFiles.length === 0 ? (state.empty = true) : (state.empty = false);
    },
    setSearchFiles(state, actions) {
      state.searchFiles = actions.payload;
    },
    setCurrentFolder(state, actions) {
      state.currentFolder = actions.payload;
    },
    filterFolder(state, actions) {
      state.directoriesTrash.Versions = state.directoriesTrash.Versions.filter(
        (f) => f.Key !== actions.payload
      );
    },
    pushFolder(state, actions) {
      const { Key, LastModified, IsLatest } = actions.payload;
      state.directoriesTrash.Versions = [
        ...state.directoriesTrash.Versions,
        { Key, Size: 6, LastModified, IsLatest },
      ];
      state.empty = false;
    },
    setFile(state, actions) {
      state.file = actions.payload;
    },
    setCategory(state, actions) {
      state.category = actions.payload;
    },
    setFileToCopy(state, actions) {
      const { action } = actions.payload;
      switch (action) {
        case "reset":
          state.fileToCopy = "";
          state.fileToCut = "";
          state.folderToCopy = "";
          state.folderToCut = "";

          break;
        case "copy":
          state.fileToCopy = actions.payload;
          state.fileToCut = "";
          state.folderToCopy = "";
          state.folderToCut = "";

          break;
        case "cut":
          state.fileToCut = actions.payload;
          state.fileToCopy = "";
          state.folderToCopy = "";
          state.folderToCut = "";

          break;
        case "copyFolder":
          state.folderToCopy = actions.payload;
          state.folderToCut = "";
          state.fileToCopy = "";
          state.fileToCut = "";

          break;
        case "cutFolder":
          state.folderToCopy = "";
          state.folderToCut = actions.payload;
          state.fileToCut = "";
          state.fileToCopy = "";

          break;

        default:
          break;
      }
    },
    copyFileLocal(state, actions) {
      state.directoriesTrash.Versions = [
        ...state.directoriesTrash.Versions,
        actions.payload,
      ];
    },
    moveFileLocal(state, actions) {
      state.directoriesTrash.Versions = [
        ...state.directoriesTrash.Versions,
        actions.payload,
      ];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(directoriesDB.fulfilled, (state, action) => {
        const dbKeys = action.payload.map((dbFolder) => dbFolder.Key);
        // Filtrar el array de assets para excluir los elementos con las claves eliminadas
        // state.directoriesData = state.directoriesData.filter((asset) => !dbKeys.includes(asset.Key));
      })

      .addCase(deleteFolders.fulfilled, (state, action) => {
        const { payload } = action;

        const deletedKeys = payload.map((deletedFolder) => deletedFolder.Key);

        // Actualizar las propiedades IsLatest de los archivos coincidentes sin filtrarlos fuera
        state.directoriesTrash.Versions.forEach((file) => {
          if (deletedKeys.includes(file.Key)) {
            file.IsLatest = false; // Actualiza IsLatest a false para los archivos coincidentes
          }
        });
        state.directoriesTrash.DeleteMarkers = [
          ...state.directoriesTrash.DeleteMarkers,
          ...payload,
        ];
      })

      .addCase(deleteFolder.pending, (state) => {
        state.loading = { ...state.loading, [types.DELETE_DIRECTORY]: true };
        state.error = { ...state.error, [types.DELETE_DIRECTORY]: "" };
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_DIRECTORY]: false };
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_DIRECTORY]: false };
        state.error = {
          ...state.error,
          [types.DELETE_DIRECTORY]: action.payload,
        };
      })
      .addCase(deleteFile.pending, (state) => {
        state.loading = { ...state.loading, [types.DELETE_FILE]: true };
        state.error = { ...state.error, [types.DELETE_FILE]: "" };
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        const { Key, VersionId } = action.payload;
        state.loading = { ...state.loading, [types.DELETE_FILE]: false };
        const index = state.directoriesTrash.Versions.findIndex(
          (marker) => marker.Key === Key && marker.IsLatest === true
        );
        console.log(index);
        if (index !== -1) {
          // actualizamos la propiedad IsLatest del objeto encontrado
          state.directoriesTrash.Versions[index].IsLatest = false;
          console.log(state.directoriesTrash.Versions[index].IsLatest);
        }

        const deletedObject = { Key, VersionId };
        state.directoriesTrash.DeleteMarkers = [
          ...state.directoriesTrash.DeleteMarkers,
          deletedObject,
        ];
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_FILE]: false };
        state.error = {
          ...state.error,
          [types.DELETE_FILE]: action.payload,
        };
      })
      .addCase(deleteFiles.pending, (state) => {
        state.loading = { ...state.loading, [types.DELETE_FILES]: true };
        state.error = { ...state.error, [types.DELETE_FILES]: "" };
      })
      .addCase(deleteFiles.fulfilled, (state, action) => {
        const { folders, act } = action.payload;
        state.loading = { ...state.loading, [types.DELETE_FILES]: false };

        switch (act) {
          case "restore":
            folders.forEach((f) => {
              const { Key } = f;
              updateVersionsIsLatest(state, Key, true);
              filterDeleteMarkersByKey(state, Key);
            });
            break;
          case "delete":
          case "trash":
            folders.forEach((f) => {
              const { Key, VersionId } = f;
              updateVersionsIsLatest(state, Key, false);

              if (act === "trash") {
                const deletedObject = { Key, VersionId, IsLatest: true };
                console.log({ deletedObject });
                state.directoriesTrash.DeleteMarkers.push(deletedObject);
                console.log(state.directoriesTrash.DeleteMarkers);
              } else {
                filterDeleteMarkersByKey(state, Key);
              }
            });
            break;
          default:
            // Manejar cualquier otro caso si es necesario
            break;
        }
      })
      .addCase(deleteFiles.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_FILES]: false };
        state.error = {
          ...state.error,
          [types.DELETE_FILES]: action.payload,
        };
      })
      .addCase(getRootDirectories.pending, (state) => {
        state.loading = { ...state.loading, [types.GET_ALL_DIRECTORIES]: true };
        state.error = { ...state.error, [types.GET_ALL_DIRECTORIES]: "" };
      })
      .addCase(getRootDirectories.fulfilled, (state, action) => {
        state.loading = {
          ...state.loading,
          [types.GET_ALL_DIRECTORIES]: false,
        };
      })
      .addCase(getRootDirectories.rejected, (state, action) => {
        state.loading = {
          ...state.loading,
          [types.GET_ALL_DIRECTORIES]: false,
        };
        state.error = {
          ...state.error,
          [types.GET_ALL_DIRECTORIES]: action.payload,
        };
      })
      .addCase(getDirectoriesVersions.pending, (state) => {
        state.loading = {
          ...state.loading,
          [types.GET_ALL_DIRECTORIES]: true,
        };
        state.error = { ...state.error, [types.GET_ALL_DIRECTORIES]: "" };
      })
      .addCase(getDirectoriesVersions.fulfilled, (state, action) => {
        state.loading = {
          ...state.loading,
          [types.GET_ALL_DIRECTORIES]: false,
        };
      })
      .addCase(getDirectoriesVersions.rejected, (state, action) => {
        state.loading = {
          ...state.loading,
          [types.GET_ALL_DIRECTORIES]: false,
        };
        state.error = {
          ...state.error,
          [types.GET_ALL_DIRECTORIES]: action.payload,
        };
      })
      .addCase(createNewFolder.pending, (state) => {
        state.loading = { ...state.loading, [types.UPDATE_DIRECTORY]: true };
        state.error = { ...state.error, [types.UPDATE_DIRECTORY]: "" };
      })
      .addCase(createNewFolder.fulfilled, (state, action) => {
        state.loading = { ...state.loading, [types.UPDATE_DIRECTORY]: false };
      })
      .addCase(createNewFolder.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.UPDATE_DIRECTORY]: false };
        state.error = {
          ...state.error,
          [types.UPDATE_DIRECTORY]: action.payload,
        };
      })
      .addCase(getFile.pending, (state) => {
        state.loading = { ...state.loading, [types.GET_FILE]: true };
        state.error = { ...state.error, [types.GET_FILE]: "" };
      })
      .addCase(getFile.fulfilled, (state, actions) => {
        state.loading = { ...state.loading, [types.GET_FILE]: false };
        state.file = actions.payload;
      })
      .addCase(getFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.GET_FILE]: false };
        state.error = {
          ...state.error,
          [types.GET_FILE]: action.payload,
        };
      })
      .addCase(copyFile.pending, (state) => {
        state.loading = { ...state.loading, [types.COPY_FILE]: true };
        state.error = { ...state.error, [types.COPY_FILE]: "" };
      })
      .addCase(copyFile.fulfilled, (state) => {
        state.loading = { ...state.loading, [types.COPY_FILE]: false };
      })
      .addCase(copyFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.COPY_FILE]: false };
        state.error = {
          ...state.error,
          [types.COPY_FILE]: action.payload,
        };
      })
      .addCase(uploadFile.pending, (state) => {
        state.loading = { ...state.loading, [types.UPLOAD_FILE]: true };
        state.error = { ...state.error, [types.UPLOAD_FILE]: "" };
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = { ...state.loading, [types.UPLOAD_FILE]: false };
        state.directoriesTrash.Versions = [
          ...state.directoriesTrash.Versions,
          action.payload,
        ];
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.UPLOAD_FILE]: false };
        state.error = {
          ...state.error,
          [types.UPLOAD_FILE]: action.payload,
        };
      });
  },
});

export const {
  setAssets,
  setAssetsVersions,
  filterFolder,
  pushFolder,
  setFile,
  setFileToCopy,
  copyFileLocal,
  setCategory,
  moveFileLocal,
  setSearchFiles,
  setCurrentFolder,
} = assetsSlice.actions;
export default assetsSlice.reducer;
