import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFiles from "../my-files/my-files";
import { getFilesInDescendingOrder, regexExtensiones } from "../../assetsAux";
import { getRootDirectories } from "@/actions/assets";
import Trash from "../trash/trash";

export const FilesContainer = ({ setIsNew }) => {
  const dispatch = useDispatch();
  const driveId = "1234";

  // Asume que el estado de Redux ya tiene una lista de todos los archivos
  const { directoriesData, category } = useSelector((state) => state.assets);
  const [filteredFiles, setFilteredFiles] = useState([]);

  // Este efecto se dispara solo una vez, para cargar los directorios iniciales
  useEffect(() => {
    dispatch(getRootDirectories({ Prefix: driveId }));
  }, [dispatch, driveId]);

  // Este efecto se encarga de filtrar los archivos cada vez que cambian
  // los archivos en Redux o la categoría seleccionada
  useEffect(() => {
    const filteredFiles = filterFilesByCategory(directoriesData, category);
    setFilteredFiles(filteredFiles);
  }, [directoriesData, category]);

  return category === "trash" ? (
    <Trash driveId={driveId} />
  ) : (
    <MyFiles
      categoryFiles={filteredFiles}
      driveId={driveId}
      setIsNew={setIsNew}
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
