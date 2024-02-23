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
  const { directoriesData, directoriesTrash, category } = useSelector(
    (state) => state.assets
  );
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [sortOrder, setSortOrder] = useState({ name: "", order: "" });

  // Este efecto se dispara solo una vez, para cargar los directorios iniciales
  useEffect(() => {
    dispatch(getRootDirectories({ Prefix: driveId }));
    dispatch(getDirectoriesVersions({ Prefix: driveId }));
  }, [dispatch, driveId]);

  // Este efecto se encarga de filtrar los archivos cada vez que cambian
  // los archivos en Redux o la categoría seleccionada
  useEffect(() => {
    let sortedFilteredFiles = filterFilesByCategory(
      category === "trash " ? directoriesTrash?.DeleteMarkers : directoriesData,
      category
    );
    sortedFilteredFiles = sortFiles(sortedFilteredFiles, sortOrder);
    setFilteredFiles(sortedFilteredFiles);
  }, [directoriesData, category, sortOrder]);

  return category === "trash" ? (
    <Trash
      categoryFiles={filteredFiles}
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
    />
  );
};

// Función para filtrar archivos por categoría
const filterFilesByCategory = (files, category) => {
  // Aquí va la lógica de filtrado basada en la categoría
  // Esto dependerá de cómo estén estructurados tus datos y qué significa cada categoría
  // Por ejemplo, esto es un pseudocódigo:
  switch (category) {
    case "document":
      return files;
    case "addon":
      return files.filter((file) => {
        const folderName = file.Key.split("/").filter(Boolean).pop();
        // Verifica si folderName termina en '.png'
        return folderName.toLowerCase().endsWith(".ay");
      });

    case "dashboard":
      return files.filter((file) => file.isShared);
    case "priority":
      return files.filter((file) => {
        const originalFolderName = file.Key.split("/").filter(Boolean).pop();
        const isPriority = originalFolderName.includes("Priority.")
          ? true
          : false;
        return isPriority;
      });
    case "featured":
      return files.filter((file) => {
        const originalFolderName = file.Key.split("/").filter(Boolean).pop();
        const isMarker = originalFolderName.includes("Marker.") ? true : false;
        return isMarker;
      });
    case "shared":
      return files.filter((file) => file.isShared);
    case "recent":
      return getFilesInDescendingOrder(files).filter((file) =>
        regexExtensiones.test(file.Key.split("/").filter(Boolean).pop())
      );
    case "glaciar":
      return files.filter((file) => file.isShared);
    case "trash":
      return files;
    // Añade más casos según tus categorías
    default:
      return files; // Por defecto, devuelve todos los archivos si no hay filtro
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
  switch (sortOrder.name) {
    case "Name":
      sortedFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? a.Key.localeCompare(b.Key)
          : b.Key.localeCompare(a.Key)
      );
      break;
    case "Size":
      sortedFiles.sort((a, b) => {
        const aSize = getSizeInMegabytes(a, sortedFiles);
        const bSize = getSizeInMegabytes(b, sortedFiles);
        // No es necesario loguear cada vez, pero si deseas hacerlo para depuración, puedes hacerlo fuera de esta función
        return sortOrder.order === "asc" ? aSize - bSize : bSize - aSize;
      });
      break;
    case "Last modified":
      sortedFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? new Date(b.LastModified) - new Date(a.LastModified)
          : new Date(a.LastModified) - new Date(b.LastModified)
      );
      break;
    case "Last modified by me":
      // Asume que tienes una forma de determinar 'LastModifiedByMe'
      sortedFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? new Date(a.LastModifiedByMe) - new Date(b.LastModifiedByMe)
          : new Date(b.LastModifiedByMe) - new Date(a.LastModifiedByMe)
      );
      break;
    case "Last opened by me":
      // Asume que tienes una forma de determinar 'LastOpenedByMe'
      sortedFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? new Date(a.LastOpenedByMe) - new Date(b.LastOpenedByMe)
          : new Date(b.LastOpenedByMe) - new Date(a.LastOpenedByMe)
      );
      break;
    default:
      // No hace falta ordenar si no se reconoce el criterio, pero devolvemos la copia para consistencia
      break;
  }

  return sortedFiles; // Retorna el array ordenado (o no, dependiendo del caso)
};
