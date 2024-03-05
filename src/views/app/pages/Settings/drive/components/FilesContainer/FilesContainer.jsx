import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFiles from "../my-files/my-files";
import {
  getFilesInDescendingOrder,
  regexExtensiones,
  convertToMegabytes,
  calculateFolderSize,
} from "../../assetsAux";
import { getRootDirectories, getDirectoriesVersions } from "@/actions/assets";
import Trash from "../trash/trash";

export const FilesContainer = ({ setIsNew }) => {
  const dispatch = useDispatch();
  const driveId = "1234";

  // Asume que el estado de Redux ya tiene una lista de todos los archivos
  const { directoriesTrash, category } = useSelector((state) => state.assets);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [sortOrder, setSortOrder] = useState({ name: "", order: "" });

  // Este efecto se dispara solo una vez, para cargar los directorios iniciales
  useEffect(() => {
    // dispatch(getRootDirectories({ Prefix: driveId }));
    dispatch(getDirectoriesVersions({ Prefix: driveId }));
  }, [dispatch, driveId]);

  // Este efecto se encarga de filtrar los archivos cada vez que cambian
  // los archivos en Redux o la categoría seleccionada
  useEffect(() => {
    let sortedFilteredFiles = filterFilesByCategory(directoriesTrash, category);
    sortedFilteredFiles = sortFiles(sortedFilteredFiles, sortOrder);
    setFilteredFiles(sortedFilteredFiles);
  }, [directoriesTrash, category, sortOrder]);

  return category === "trash" ? (
    <Trash
      categoryFiles={filteredFiles}
      setFilteredFilesContainer={setFilteredFiles}
      directoriesTrash={directoriesTrash}
      driveId={driveId}
      setIsNew={setIsNew}
      setSortOrder={setSortOrder}
      sortOrder={sortOrder}
    />
  ) : (
    <MyFiles
      categoryFiles={filteredFiles}
      driveId={driveId}
      setIsNew={setIsNew}
      setSortOrder={setSortOrder}
      sortOrder={sortOrder}
      setFilteredFilesContainer={setFilteredFiles}
    />
  );
};

// Función para filtrar archivos por categoría
const filterFilesByCategory = (directoriesTrash, category) => {
  // Aquí va la lógica de filtrado basada en la categoría
  // Esto dependerá de cómo estén estructurados tus datos y qué significa cada categoría
  // Por ejemplo, esto es un pseudocódigo:
  const { Versions, DeleteMarkers } = directoriesTrash;

  switch (category) {
    case "document":
      return Versions;
    case "addon":
      return Versions.filter((file) => {
        const folderName = file.Key.split("/").filter(Boolean).pop();
        // Verifica si folderName termina en '.png'
        return folderName.toLowerCase().endsWith(".json");
      });

    case "dashboard":
      return Versions.filter((file) => file.isShared);
    case "priority":
      return Versions.filter((file) => {
        const originalFolderName = file.Key.split("/").filter(Boolean).pop();
        const isPriority = originalFolderName.includes("Priority.")
          ? true
          : false;
        return isPriority;
      });
    case "featured":
      return Versions.filter((file) => {
        const originalFolderName = file.Key.split("/").filter(Boolean).pop();
        const isMarker = originalFolderName.includes("Marker.") ? true : false;
        return isMarker;
      });
    case "shared":
      return Versions.filter((file) => file.isShared);
    case "recent":
      return getFilesInDescendingOrder(Versions).filter((file) =>
        regexExtensiones.test(file.Key.split("/").filter(Boolean).pop())
      );
    case "glaciar":
      return Versions.filter((file) => file.isShared);
    case "trash":
      return DeleteMarkers;
    // Añade más casos según tus categorías
    default:
      return Versions; // Por defecto, devuelve todos los archivos si no hay filtro
  }
};

const sortFiles = (files, sortOrder) => {
  // Crea una copia del array antes de ordenarlo para evitar modificar el original
  let sortedFiles = [...files];
  const getSizeInMegabytes = (file, sortedFiles) => {
    const folderName = file.Key.split("/").filter(Boolean).pop();
    const isFile = regexExtensiones.test(folderName);
    return isFile
      ? convertToMegabytes(file.Size)
      : convertToMegabytes(calculateFolderSize(file.Key, sortedFiles));
  };
  const sortedFilteredFiles = sortedFiles.filter(
    (file) => file.IsLatest === true
  );
  switch (sortOrder.name) {
    case "Name":
      sortedFilteredFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? a.Key.localeCompare(b.Key)
          : b.Key.localeCompare(a.Key)
      );
      break;
    case "Size":
      sortedFilteredFiles.sort((a, b) => {
        const aSize = getSizeInMegabytes(a, sortedFilteredFiles);
        const bSize = getSizeInMegabytes(b, sortedFilteredFiles);
        // No es necesario loguear cada vez, pero si deseas hacerlo para depuración, puedes hacerlo fuera de esta función
        return sortOrder.order === "asc" ? aSize - bSize : bSize - aSize;
      });
      break;
    case "Last modified":
      sortedFilteredFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? new Date(b.LastModified) - new Date(a.LastModified)
          : new Date(a.LastModified) - new Date(b.LastModified)
      );
      break;
    case "Last modified by me":
      // Asume que tienes una forma de determinar 'LastModifiedByMe'
      sortedFilteredFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? new Date(a.LastModifiedByMe) - new Date(b.LastModifiedByMe)
          : new Date(b.LastModifiedByMe) - new Date(a.LastModifiedByMe)
      );
      break;
    case "Last opened by me":
      // Asume que tienes una forma de determinar 'LastOpenedByMe'
      sortedFilteredFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? new Date(a.LastOpenedByMe) - new Date(b.LastOpenedByMe)
          : new Date(b.LastOpenedByMe) - new Date(a.LastOpenedByMe)
      );
      break;
    default:
      // No hace falta ordenar si no se reconoce el criterio, pero devolvemos la copia para consistencia
      break;
  }

  return sortedFilteredFiles; // Retorna el array ordenado (o no, dependiendo del caso)
};
