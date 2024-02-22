import { createSlice } from "@reduxjs/toolkit";

import {
  // getAssets,
  directoriesDB,
  getRootDirectories,
  getDirectoriesVersions,
  deleteFolders,
  deleteFolder,
  deleteFile,
  createNewFolder,
  getFile,
  copyFile,
  uploadFile,
  // getIconsByFolder,
  // getIconByQuery
} from "@/actions/assets";
import * as types from "./types";

export const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    // assets: [],
    directoriesData: [],
    directoriesTrash: [],
    fileToCopy: "",
    fileToCut: "",
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
    },
    setSearchFiles(state, actions) {
      state.searchFiles = actions.payload;
    },
    setCurrentFolder(state, actions) {
      console.log({ actions });
      state.currentFolder = actions.payload;
    },
    filterFolder(state, actions) {
      state.directoriesData = state.directoriesData.filter(
        (f) => f.Key !== actions.payload
      );
    },
    pushFolder(state, actions) {
      state.directoriesData = [
        ...state.directoriesData,
        { Key: actions.payload, Size: 6 },
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
        case "copy":
          state.fileToCopy = actions.payload;
          state.fileToCut = "";

          break;
        case "cut":
          state.fileToCut = actions.payload;
          state.fileToCopy = "";

          break;

        default:
          break;
      }
    },
    copyFileLocal(state, actions) {
      state.directoriesData = [...state.directoriesData, actions.payload];
    },
    moveFileLocal(state, actions) {
      state.directoriesData = [...state.directoriesData, actions.payload];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(directoriesDB.fulfilled, (state, action) => {
        const dbKeys = action.payload.map((dbFolder) => dbFolder.Key);
        console.log("dbKeys", dbKeys);
        // Filtrar el array de assets para excluir los elementos con las claves eliminadas
        // state.directoriesData = state.directoriesData.filter((asset) => !dbKeys.includes(asset.Key));
      })

      .addCase(deleteFolders.fulfilled, (state, action) => {
        const deletedKeys = action.payload.map(
          (deletedFolder) => deletedFolder.Key
        );
        // Filtrar el array de assets para excluir los elementos con las claves eliminadas
        state.directoriesData = state.directoriesData.filter(
          (asset) => !deletedKeys.includes(asset.Key)
        );
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
        state.loading = { ...state.loading, [types.DELETE_FILE]: false };
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = { ...state.loading, [types.DELETE_FILE]: false };
        state.error = {
          ...state.error,
          [types.DELETE_FILE]: action.payload,
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
          [types.GET_DIRECTORIES_VERSIONS]: true,
        };
        state.error = { ...state.error, [types.GET_DIRECTORIES_VERSIONS]: "" };
      })
      .addCase(getDirectoriesVersions.fulfilled, (state, action) => {
        state.loading = {
          ...state.loading,
          [types.GET_DIRECTORIES_VERSIONS]: false,
        };
      })
      .addCase(getDirectoriesVersions.rejected, (state, action) => {
        state.loading = {
          ...state.loading,
          [types.GET_DIRECTORIES_VERSIONS]: false,
        };
        state.error = {
          ...state.error,
          [types.GET_DIRECTORIES_VERSIONS]: action.payload,
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
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = { ...state.loading, [types.UPLOAD_FILE]: false };
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
