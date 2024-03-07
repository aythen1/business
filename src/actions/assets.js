import { createAsyncThunk } from "@reduxjs/toolkit";
import apiBackend from "@/utils/apiBackend";
import { getCurrentDateFormatted } from "../views/app/pages/Settings/drive/assetsAux";
import {
  setAssets,
  setAssetsVersions,
  filterFolder,
  pushFolder,
  setFile,
  setCategory,
  setFileToCopy,
  copyFileLocal,
} from "@/slices/assetsSlice";

function buildQueryString(params) {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");
}

// Obtener todas las carpetas de un directory
export const getRootDirectories = createAsyncThunk(
  "assets/getRootDirectories",
  async ({ Prefix }, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const query = buildQueryString({
        userId,
        Prefix,
      });
      const { data } = await apiBackend.get(`/assets/directories?${query}`);
      dispatch(setAssets(data.data));
      return data.data.body;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Obtener todas las carpetas de un directory
export const getDirectoriesVersions = createAsyncThunk(
  "assets/getDirectoriesVersions",
  async ({ Prefix }, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const query = buildQueryString({
        userId,
        Prefix,
      });
      const { data } = await apiBackend.get(
        `/assets/directories/versions?${query}`
      );
      dispatch(setAssetsVersions(data.data));
      return data.data.body;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Obtener todas las carpetas de un directory
export const getFile = createAsyncThunk(
  "assets/getFile",
  async ({ fileName }, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const query = buildQueryString({
        userId,
        fileName,
      });
      const { data } = await apiBackend.get(`/assets/file?${query}`);
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Crear carpeta
export const createNewFolder = createAsyncThunk(
  "assets/createNewFolder",
  async (name) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const body = {
        userId,
        name,
      };
      const { data } = await apiBackend.post("/assets/new-folder", body);
      return data.data.body;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Crear carpeta
export const uploadFile = createAsyncThunk(
  "assets/uploadFile",
  async ({ file, pathDepured }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("path", pathDepured);
      formData.append("image", file);
      const { data } = await apiBackend.post("/assets/add-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const fileData = {
        Key: data.data.Key,
        Location: data?.data?.Location || "",
        VersionId: data?.data?.VersionId || "",
        LastModified: getCurrentDateFormatted(),
        Size: file.size,
        IsLatest: true,
      };
      return fileData;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Crear carpeta
export const copyFile = createAsyncThunk(
  "assets/copyFile",
  async ({ sourceKey, destinationKey, file }, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const body = {
        sourceBucket: userId,
        sourceKey,
        destinationBucket: userId,
        destinationKey,
        userId,
      };
      const { data } = await apiBackend.post("/assets/copy-file", body);
      dispatch(
        copyFileLocal({
          ...file,
          Key: destinationKey,
          LastModified: getCurrentDateFormatted(),
        })
      );
      return data.data.body;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Crear carpeta
export const moveFile = createAsyncThunk(
  "assets/copyFile",
  async ({ sourceKey, destinationKey, file, VersionId }, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const body = {
        sourceBucket: userId,
        sourceKey,
        destinationBucket: userId,
        destinationKey,
        userId,
        VersionId,
      };
      dispatch(filterFolder(sourceKey));
      dispatch(
        copyFileLocal({
          ...file,
          Key: destinationKey,
          LastModified: getCurrentDateFormatted(),
        })
      );
      const { data } = await apiBackend.post("/assets/move-file", body);

      return data.data.body;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Borrar una carpeta en scaleway
export const deleteFolder = createAsyncThunk(
  "assets/deleteFolder",
  async (path, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const query = buildQueryString({
        userId,
        path,
      });
      const { data } = await apiBackend.delete(
        `/assets/delete-folder?${query}`
      );
      dispatch(filterFolder(path));
      return data.data.body;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Borrar un archivo en scaleway
export const deleteFile = createAsyncThunk(
  "assets/deleteFile",
  async ({ path, VersionId, Size, act }, { dispatch }) => {
    console.log("SOY DELETE FILE");
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const query = buildQueryString({
        userId,
        path,
        VersionId,
      });
      const { data } = await apiBackend.delete(`/assets/file?${query}`);
      // dispatch(filterFolder(path));
      const objectData = { Key: path, VersionId, Size, act };

      return objectData;
    } catch (error) {
      throw new Error(error);
    }
  }
);
// Borrar un archivo en scaleway
export const deleteFiles = createAsyncThunk(
  "assets/deleteFiles",
  async ({ folders, action }, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const body = { folders, userId };
      const { data } = await apiBackend.put(`/assets/files`, body);
      // dispatch(filterFolder(path));
      const objectData = { folders, act: action };

      return objectData;
    } catch (error) {
      throw new Error(error);
    }
  }
);
// Borrar un archivo en scaleway
export const deletePermanentFile = createAsyncThunk(
  "assets/deleteFile",
  async ({ path, VersionId }, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      const query = buildQueryString({
        userId,
        path,
        VersionId,
      });
      const { data } = await apiBackend.delete(`/assets/file?${query}`);
      dispatch(filterFolder(path));
      return data.data.body;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Borrar un conjunto de archivos en Scaleway
export const deleteFolders = createAsyncThunk(
  "assets/deleteFolders",
  async (folders, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      console.log(folders);
      const { data } = await apiBackend.put(`/assets/delete-folders`, {
        id: userId,
        folders,
      });
      // dispatch(filterFolder(path))
      return folders;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Enviar un conjunto de datos en Scaleway
export const directoriesDB = createAsyncThunk(
  "assets/directoriesDB",
  async (folders, { dispatch }) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user')).user.id
      const userId = "1234";
      // const query = buildQueryString({
      //   userId,
      //   folders
      // })
      const { data } = await apiBackend.post(`/assets/directories-db`, {
        id: userId,
        folders,
      });

      // dispatch(filterFolder(path))
      return folders;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Borrar una carpeta en redux
export const deleteFolderLocal = (directory) => (dispatch) => {
  try {
    dispatch(filterFolder(directory));
  } catch (error) {
    console.error("Ha ocurrido un error al eliminar la carpeta:", error);
  }
};

// Agregar una carpeta en redux
export const addFolderLocal = (Key) => (dispatch) => {
  const data = { LastModified: getCurrentDateFormatted(), Key, IsLatest: true };
  try {
    dispatch(pushFolder(data));
  } catch (error) {
    console.error("Ha ocurrido un error al crear la carpeta:", error);
  }
};

// Agregar una carpeta en redux
export const obtainFileData = (directory) => (dispatch) => {
  try {
    dispatch(setFileToCopy(directory));
  } catch (error) {
    console.error("Ha ocurrido un error al crear la carpeta:", error);
  }
};

// Agregar una carpeta en redux
export const duplicateFileLocal = (newFile) => (dispatch) => {
  try {
    dispatch(copyFileLocal(newFile));
  } catch (error) {
    console.error("Ha ocurrido un error al crear la carpeta:", error);
  }
};

// Agregar una carpeta en redux
export const setFileDragging = (src) => (dispatch) => {
  try {
    dispatch(setFile(src));
  } catch (error) {
    console.error("Ha ocurrido un error al crear la carpeta:", error);
  }
};

// Agregar una carpeta en redux
export const selectCategory = (category) => (dispatch) => {
  try {
    dispatch(setCategory(category));
  } catch (error) {
    console.error("Ha ocurrido un error al seleccionar una categoria:", error);
  }
};
