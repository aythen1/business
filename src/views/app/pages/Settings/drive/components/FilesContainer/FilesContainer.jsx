import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFiles from "../my-files/my-files";
import {
  getFilesInDescendingOrder,
  regexExtensiones,
  convertToMegabytes,
  calculateFolderSize,
} from "../../assetsAux";
import { getRootDirectories } from "@/actions/assets";
import Trash from "../trash/trash";

export const FilesContainer = ({ setIsNew }) => {
  const dispatch = useDispatch();
  const driveId = "1234";

  // Asume que el estado de Redux ya tiene una lista de todos los archivos
  const { directoriesData, category } = useSelector((state) => state.assets);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [sortOrder, setSortOrder] = useState({ by: "", order: "" });

  // Este efecto se dispara solo una vez, para cargar los directorios iniciales
  useEffect(() => {
    dispatch(getRootDirectories({ Prefix: driveId }));
  }, [dispatch, driveId]);

  // Este efecto se encarga de filtrar los archivos cada vez que cambian
  // los archivos en Redux o la categoría seleccionada
  useEffect(() => {
    let sortedFilteredFiles = filterFilesByCategory(directoriesData, category);
    sortedFilteredFiles = sortFiles(sortedFilteredFiles, sortOrder);
    console.log({ sortedFilteredFiles });
    setFilteredFiles(sortedFilteredFiles);
  }, [directoriesData, category, sortOrder]);

  return category === "trash" ? (
    <Trash driveId={driveId} />
  ) : (
    <MyFiles
      categoryFiles={filteredFiles}
      driveId={driveId}
      setIsNew={setIsNew}
      setSortOrder={setSortOrder}
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
        console.log("folderName", folderName);
        // Verifica si folderName termina en '.png'
        return folderName.toLowerCase().endsWith(".ay");
      });

    case "dashboard":
      return files.filter((file) => file.isShared);
    case "priority":
      return files.filter((file) => file.isPriority);
    case "shared":
      return files.filter((file) => file.isShared);
    case "recent":
      return getFilesInDescendingOrder(files).filter((file) =>
        regexExtensiones.test(file.Key.split("/").filter(Boolean).pop())
      );
    case "featured":
      return files.filter((file) => file.isShared);
    case "glaciar":
      return files.filter((file) => file.isShared);
    case "trash":
      return files.filter((file) => file.isShared);
    // Añade más casos según tus categorías
    default:
      return files; // Por defecto, devuelve todos los archivos si no hay filtro
  }
};

const sortFiles = (files, sortOrder) => {
  // Crea una copia del array antes de ordenarlo para evitar modificar el original
  let sortedFiles = [...files];

  switch (sortOrder.by) {
    case "Name":
      sortedFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? a.Key.localeCompare(b.Key)
          : b.Key.localeCompare(a.Key)
      );
      break;
    case "Size":
      sortedFiles.sort((a, b) => {
        const aFolderName = a.Key.split("/").filter(Boolean).pop();
        const aIsFile = regexExtensiones.test(aFolderName);
        const aSize = aIsFile
          ? convertToMegabytes(a.Size)
          : convertToMegabytes(calculateFolderSize(a.Key, sortedFiles));
        const bFolderName = b.Key.split("/").filter(Boolean).pop();
        const bIsFile = regexExtensiones.test(bFolderName);
        const bSize = bIsFile
          ? convertToMegabytes(a.Size)
          : convertToMegabytes(calculateFolderSize(b.Key, sortedFiles));

        return sortOrder.order === "asc" ? aSize - bSize : bSize - aSize;
      });
      break;
    case "Last modified":
      sortedFiles.sort((a, b) =>
        sortOrder.order === "asc"
          ? new Date(a.LastModified) - new Date(b.LastModified)
          : new Date(b.LastModified) - new Date(a.LastModified)
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
