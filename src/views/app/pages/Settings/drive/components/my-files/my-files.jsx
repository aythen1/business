"use client";
import style from "./my-files.module.css";
import styles from "../left-panel/left-panel.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Filters,
  renderFolders,
  renderFilesDB,
  renderRecentFiles,
} from "./methods/Methods";
import Chevron from "../../assets/Vector 161 (Stroke).svg";
import ArrowDropDown from "../../assets/arrow-drop-down.svg";
import Info from "../../assets/IconDashboard.svg";
import Star from "../../assets/IconStar.svg";
import Modal from "react-modal";
import ShareFiles from "../shareFiles/shareFiles";
import { useState, useEffect } from "react";
import {
  directoriesDB,
  deleteFolders,
  deleteFiles,
  deleteFolder,
  deleteFile,
  getFile,
  uploadFile,
  obtainFileData,
  moveFile,
  copyFile,
  createNewFolder,
  addFolderLocal,
} from "@/actions/assets";
import {
  deleteItemsInDirectory,
  getFilesInDescendingOrder,
  categoryTitles,
  regexExtensiones,
  iterateElementsToCopy,
  iterateElementsToCut,
  iterateElementsToDuplicate,
  icons,
} from "../../assetsAux";
import { setCurrentFolder } from "@/slices/assetsSlice";

export default function Page({
  setIsNew,
  categoryFiles,
  driveId,
  setSortOrder,
  sortOrder,
  setFilteredFilesContainer,
}) {
  const dispatch = useDispatch();

  const [showTypeDrive, setShowTypeDrive] = useState("cloud");

  const {
    loading,
    empty,
    fileToCopy,
    folderToCopy,
    folderToCut,
    searchFiles,
    category,
    currentFolder,
    directoriesTrash,
  } = useSelector((state) => state.assets);
  const title = categoryTitles[category] || "Documentos";
  const [currentPath, setCurrentPath] = useState(driveId + "/");
  const [filteredFolders, setFilteredFolders] = useState(categoryFiles);
  const [folderOptions, setFolderOptions] = useState({});
  const [recentFilesOptions, setRecentFilesOptions] = useState({});
  const [isDragginFile, setIsDragginFile] = useState(false);
  const [recentFiles, setRecentFiles] = useState([]);
  const [filters, setFilters] = useState({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const [activeExtensions, setActiveExtensions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [filtersData, setFiltersData] = useState([
    { name: "Filter by:", type: "filter", view: false },
    { name: "Sort by:", type: "sort", view: false },
  ]);
  const isGettingFolder = loading?.GET_ALL_DIRECTORIES === true;

  // / / / / / / / / / / / / / / / / / / / / / F U N C I O N E S / / / / / / / / / / / / / / / / / / / /

  const handleFolderClick = (folderName) => {
    setCurrentPath(folderName);

    if (folderName.endsWith("/")) {
      // Si folderName termina con '/', quítalo antes de navegar
      folderName = folderName.slice(0, -1);
    }
    dispatch(setCurrentFolder(folderName));
  };

  // const handleToggleFolderOption = (index) => {
  //   setFolderOptions((prevOptions) => {
  //     const newOptions = { ...prevOptions };
  //     newOptions[index] = !newOptions[index];
  //     return newOptions;
  //   });
  // };
  const handleSetPrefix = (prefix) => {
    if (selectedFolders.length === 1) {
      const [file] = selectedFolders;
      const { Key, VersionId } = file;

      const originalFileName = Key.split("/").filter(Boolean).pop();
      let newKey;
      const otherPrefix = prefix === "Marker." ? "Priority." : "Marker.";
      const hasPrefix = new RegExp(`\\b${prefix}\\b`).test(originalFileName);
      const hasOtherPrefix = new RegExp(`\\b${otherPrefix}\\b`).test(
        originalFileName
      );

      if (hasPrefix) {
        // Si ya contiene el prefijo, quitarlo
        newKey = Key.replace(prefix, "");
      } else {
        // Si no contiene el prefijo, agregarlo al inicio o después del otro prefijo si este último está presente
        if (hasOtherPrefix) {
          newKey = Key.replace(
            originalFileName,
            originalFileName.replace(
              new RegExp(`^(${otherPrefix})`),
              `$1${prefix}`
            )
          );
        } else {
          newKey = Key.replace(originalFileName, prefix + originalFileName);
        }
      }
      dispatch(
        moveFile({ sourceKey: Key, destinationKey: newKey, file, VersionId })
      );
      setSelectedFolders([]);
    }
  };

  // uso para "Marker."
  const handleSetMarker = () => handleSetPrefix("Marker.");

  // uso para "Priority."
  const handleSetPriority = () => handleSetPrefix("Priority.");

  const handleDeleteDirectory = (path) => {
    dispatch(deleteFolder(path));
  };
  const clearStorage = (path) => {
    deleteItemsInDirectory(path, handleDeleteDirectory, categoryFiles);
    dispatch(deleteFolder(path));
  };
  const copyElement = (sourceKey, destinationKey, file) => {
    dispatch(copyFile({ sourceKey, destinationKey, file }));
  };
  const createFolder = (newPath) => {
    dispatch(createNewFolder(newPath));
    dispatch(addFolderLocal(newPath + "/"));
  };
  const moveElement = (sourceKey, destinationKey, file) => {
    dispatch(moveFile({ sourceKey, destinationKey, file }));
  };
  const copyFolder = (newPath) => {
    const { directoryCopied, folderNameCopied } = folderToCopy;
    iterateElementsToCopy(
      directoryCopied,
      copyElement,
      categoryFiles,
      newPath,
      createFolder,
      folderNameCopied
    );
  };
  const duplicateFolder = (path, folderName) => {
    // Añadir "-copy" al final del nombre de la carpeta principal a duplicar
    let newPath;
    if (path.endsWith("/")) {
      newPath = path.slice(0, -1);
    }
    newPath = `${newPath}-copy`;

    iterateElementsToDuplicate(
      path,
      copyElement,
      categoryFiles,
      newPath,
      createFolder,
      folderName
    );
  };
  const cutFolder = (newPath) => {
    const { directoryCopied, folderNameCopied } = folderToCut;

    iterateElementsToCut(
      directoryCopied,
      moveElement,
      categoryFiles,
      newPath,
      createFolder,
      folderNameCopied,
      handleDeleteDirectory
    );
    dispatch(obtainFileData({ action: "reset" }));
  };
  const sendFileToTrash = (path, Size) => {
    dispatch(deleteFile({ path, VersionId: "", Size }));
  };

  const handleFolderClickBack = (folderName) => {
    if (folderName === driveId + "/") {
      dispatch(setCurrentFolder(folderName));
      setCurrentPath(folderName);
      return;
    }
    const arr = currentPath.split("/");
    const index = arr.indexOf(folderName);
    if (index !== -1) {
      const newPath = arr.slice(0, index + 1);
      setCurrentPath(newPath.join("/") + "/");
      dispatch(setCurrentFolder(newPath.join("/")));
    }
  };
  const handleFileClick = (fileName) => {
    dispatch(getFile({ fileName }));
  };

  const handleCheckboxChange = (directory) => {
    const selectedIndex = selectedFolders.findIndex(
      (selectedId) => selectedId.Key === directory.Key
    );

    if (selectedIndex !== -1) {
      // Si el directorio ya está seleccionado, lo quitamos de la lista
      setSelectedFolders(
        selectedFolders.filter((_, index) => index !== selectedIndex)
      );
    } else {
      // Agregamos el directorio a la lista de seleccionados
      setSelectedFolders([...selectedFolders, directory]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedFolders([]);
    } else {
      const allFolders = filteredFolders.map((item) => item);
      setSelectedFolders(allFolders);
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = async () => {
    await dispatch(deleteFolders(selectedFolders));

    setSelectedFolders([]);
    setSelectAll(false);
  };
  // funcion aux para buscar y agregar elementos coincidentes a arrayToDelete
  const addMatchingElements = (sourceArray, selectedFolder, arrayToDelete) => {
    sourceArray.forEach((element) => {
      if (element.Key === selectedFolder.Key) {
        arrayToDelete.push(element);
      }
    });
  };

  const iterateFilesToDelete = () => {
    let filesToDelete = [];
    let folderToDelete = [];

    selectedFolders.forEach((selectedFolder) => {
      const elementName = selectedFolder.Key.split("/").filter(Boolean).pop();
      const isFile = regexExtensiones.test(elementName);
      // utilizamos la misma función auxiliar para añadir a los arrays correspondientes
      addMatchingElements(
        directoriesTrash.Versions,
        selectedFolder,
        isFile ? filesToDelete : folderToDelete
      );
    });

    // antes del dispatch, modificar cada objeto para que VersionId sea ""
    const modifiedFilesToDelete = filesToDelete.map((item) => ({
      ...item,
      VersionId: "",
    }));
    const modifiedFolderToDelete = folderToDelete.map((item) => ({
      ...item,
      VersionId: "",
    }));
    console.log({ modifiedFilesToDelete, modifiedFolderToDelete });

    // ahora podemos hacer el dispatch con los objetos modificados
    if (modifiedFilesToDelete.length) {
      dispatch(
        deleteFiles({ folders: modifiedFilesToDelete, action: "trash" })
      );
    }
    if (modifiedFolderToDelete.length) {
      dispatch(deleteFolders(modifiedFolderToDelete));
    }
  };

  const handleDB = async () => {
    await dispatch(directoriesDB(selectedFolders));

    // setSelectedFolders([]);
    // setSelectAll(false);
  };

  const handleClickFilter = (name) => {
    setFiltersData((prevFilters) => {
      // verifico si algún filtro está abierto
      const isAnyFilterOpen = prevFilters.some(
        (filter) => filter.name !== name && filter.view
      );

      return prevFilters.map((filter) => {
        if (filter.name === name) {
          // si se clickea el mismo filtro, invertimos su view
          return { ...filter, view: !filter.view };
        } else if (isAnyFilterOpen) {
          // si hay otro filtro abierto, lo cierro
          return { ...filter, view: false };
        }
        return filter; // para los filtros no clickeados, mantengo su estado actual
      });
    });
  };

  const selectAllFilters = () => {
    // Selecciona todas las extensiones disponibles
    const allExtensions = Object.keys(icons).map((extension) =>
      extension.toLowerCase()
    );
    setActiveExtensions(allExtensions);

    // Aquí debes incluir la lógica para aplicar el filtro con todas las extensiones activas
    // Asumiendo que tienes una función similar a setFilteredFolders pero para todos los casos
    applyFilters(allExtensions);
  };

  const clearAllFilters = () => {
    // Limpia todas las extensiones activas
    setActiveExtensions([]);

    // Resetea los filtros a su estado inicial (sin filtros)
    // Deberás adaptar esto a cómo manejas el reseteo de los filtros en tu aplicación
    setFilteredFolders(categoryFiles); // Asumiendo que esto resetea a todos los archivos
    setFilterIsActive(false);
  };

  const applyFilters = (extensions) => {
    // Tu lógica para filtrar archivos basada en las extensiones activas
    // Similar a lo que tienes en handleSelectFilter pero para un conjunto de extensiones
  };

  const handleSelectFilter = (extension, action = "") => {
    setActiveExtensions((prevActiveExtensions) => {
      let newActiveExtensions = [];

      // Acción para "Seleccionar todos"
      if (action === "selectAll") {
        newActiveExtensions = Object.keys(icons).map((ext) =>
          ext.toLowerCase()
        );
      }
      // Acción para "Quitar todos"
      else if (action === "deselectAll") {
        newActiveExtensions = [];
      }
      // Manejo de selección individual
      else {
        const lowerCaseExtension = extension.toLowerCase();
        const isCurrentlyActive =
          prevActiveExtensions.includes(lowerCaseExtension);

        if (isCurrentlyActive) {
          newActiveExtensions = prevActiveExtensions.filter(
            (ext) => ext !== lowerCaseExtension
          );
        } else {
          newActiveExtensions = [...prevActiveExtensions, lowerCaseExtension];
        }
      }

      // Actualiza si hay filtros activos
      setFilterIsActive(newActiveExtensions.length > 0);

      // Filtra basado en las extensiones activas
      filterBasedOnActiveExtensions(newActiveExtensions);

      return newActiveExtensions;
    });
  };

  // Implementa esta función para realizar la filtración
  // Este código es un ejemplo basado en la lógica anteriormente descrita
  const filterBasedOnActiveExtensions = (activeExtensions) => {
    const filtered = categoryFiles.filter((item) => {
      const isFile = !item.Key.endsWith("/");
      if (!isFile && activeExtensions.length > 0) return false;

      const itemExtension = item.Key.split(".").pop().toLowerCase();
      return activeExtensions.includes(itemExtension);
    });

    setFilteredFolders(
      activeExtensions.length > 0
        ? filtered.filter(
            (f) => f.Key.startsWith(currentPath) && f.Key !== currentPath
          )
        : filterFoldersBasedOnSearchAndPath(
            searchFiles,
            categoryFiles,
            currentPath,
            category,
            filterIsActive
          )
    );
  };

  const handleSelectSort = (name, order) => {
    setSortOrder({ name, order });
  };

  // / / / / / / / / / / / / / / / D R A G & D R O P / / / / / / / / / / / / / / / /

  const handleDropFolderTitle = (path) => {
    if (path === "main") {
      console.log("HANDLE DROPP");
      const { directoryCopied, folderNameCopied } = fileToCopy;

      iterateElementsToCut(
        directoryCopied,
        moveElement,
        categoryFiles,
        "1234/",
        createFolder,
        folderNameCopied,
        handleDeleteDirectory
      );
      dispatch(obtainFileData({ action: "reset" }));
    }
  };

  const dropAndUpload = (directory, e, isFile) => {
    if (!isFile && isDragginFile) {
      const { directoryCopied, folderNameCopied, file } = fileToCopy;

      const destinationKey = directory + folderNameCopied;

      dispatch(moveFile({ sourceKey: directoryCopied, destinationKey, file }));

      dispatch(obtainFileData({ action: "reset" }));
    } else if (!isFile) {
      e.preventDefault();
      let path = directory;
      const file = e.dataTransfer.files[0];
      if (path.endsWith("/")) {
        path = directory.slice(0, -1);
      }

      dispatch(uploadFile({ file, path }));
    }
  };
  const handleDragStart = (directory, isFile, folderName) => {
    if (isFile) {
      setIsDragginFile(true);

      dispatch(
        obtainFileData({
          directoryCopied: directory.Key,
          folderNameCopied: folderName,
          file: directory,
          action: "copy",
        })
      );
      dispatch(
        getFile({
          fileName: directory.Key,
        })
      );
      // dispatch(
      //   getElementTag({
      //     type: "image",
      //     tag: "img",
      //     tagName: "img",
      //     rol: "default",
      //   })
      // );
    }
  };

  const handleDropFiles = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto

    const items = e.dataTransfer.items; // Obtener los items arrastrados

    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry(); // Intentar obtener como una entrada del sistema de archivos

      if (item) {
        if (item.isFile) {
          // Si es un archivo, manejar como archivo
          item.file((file) => {
            console.log("Subiendo archivo:", file);
            let currentFolderTrim = currentFolder;
            if (currentFolderTrim.endsWith("/")) {
              currentFolderTrim = currentFolderTrim.slice(0, -1);
            }
            const path = currentFolderTrim === "" ? driveId : currentFolderTrim;
            const pathDepured = path.replace(/\/\/+/g, "/");

            // Ahora 'file' es un objeto File que puedes subir
            dispatch(
              uploadFile({
                file, // Usa 'file' aquí en lugar de 'item'
                pathDepured,
              })
            );
          });
        } else if (item.isDirectory) {
          const directoryReader = item.createReader();

          // Función recursiva para leer las entradas de un directorio
          const readEntries = (reader, callback) => {
            reader.readEntries(
              (entries) => {
                if (entries.length > 0) {
                  callback(entries);
                  readEntries(reader, callback); // Llamar recursivamente hasta que no haya más entradas
                }
              },
              (error) => console.log(error)
            );
          };

          let files = [];

          readEntries(directoryReader, (entries) => {
            entries.forEach((entry) => {
              if (entry.isFile) {
                entry.file((file) => {
                  files.push(file);
                  // Una vez que tienes el archivo, puedes hacer algo con él
                  // Aquí necesitas ajustar la lógica para construir la ruta correcta basada en webkitRelativePath o alguna otra estrategia
                  const folderPathParts = file.webkitRelativePath.split("/");
                  folderPathParts.pop(); // Remover el nombre del archivo para quedarse solo con la ruta de la carpeta

                  const folderPath = folderPathParts.join("/");
                  let path =
                    currentFolder === ""
                      ? driveId + "/" + folderPath
                      : currentFolder + "/" + folderPath;
                  if (path.endsWith("/")) {
                    path = path.slice(0, -1);
                  }
                  const pathDepured = path.replace(/\/\/+/g, "/");

                  dispatch(
                    uploadFile({
                      file,
                      pathDepured,
                    })
                  );
                });
              }
            });
          });

          // Nota: Puede que necesites ajustar el código para manejar la creación de carpetas y el envío de archivos de manera adecuada,
          // ya que este proceso es asíncrono y necesitarás esperar a que todos los archivos sean leídos.
        }
      }
    }
  };

  // const handleDropFiles = () => {
  // };

  const handleFolderInputChange = (event) => {};

  // / / / / / / / / / / / / / / / / / / / u s e E F F E C T / / / / / / / / / / / / / / / / / / / / / / / /

  useEffect(
    () => setRecentFiles(getFilesInDescendingOrder(categoryFiles)),
    [categoryFiles]
  );

  useEffect(() => {
    setSelectedFolders([]);
    const filtered = filterFoldersBasedOnSearchAndPath(
      searchFiles,
      categoryFiles,
      currentPath,
      category
    );
    setFilteredFolders(filtered);
  }, [currentPath, categoryFiles, searchFiles, category]);

  useEffect(() => {
    if (currentFolder === driveId + "/") {
      setCurrentPath(driveId + "/");
    }
  }, [currentFolder]);

  // / / / / / / / / / / / / / / / / R E N D E R / / / / / / / / / / / / / / / / / / / /

  return (
    <div className={style.main_drive_page}>
      <div className={style.drive_header}>
        <div className={style.drive_header_left}>
          <span
            onClick={() => setIsNew("title")}
            className={style.drive_header_left_title_container}
          >
            <p className={style.drive_header_left_title}>{title}</p>
            <img src={ArrowDropDown} />
          </span>
        </div>
        <div className={style.drive_header_right}>
          {filtersData.map((filter, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div
                className={style.drive_header_right_filter}
                onClick={() => handleClickFilter(filter.name)}
              >
                <p className={style.drive_header_right_filter_text}>
                  {filter.name}
                </p>
                <p className={style.drive_header_right_filter_text}>
                  {filter.option}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  alt="Chevron"
                >
                  <path fill="currentColor" d="M12 21l-12-18h24z" />
                </svg>
              </div>
              {filter.view && (
                <ul className={style.drive_options_filter}>
                  {filter.type === "sort" ? (
                    <>
                      <li onClick={() => handleSelectSort("Name", "asc")}>
                        Name
                      </li>
                      <li
                        onClick={() => handleSelectSort("Last modified", "asc")}
                      >
                        Last modified
                      </li>
                      {/* Agrega más opciones de sorteo aquí si es necesario */}
                    </>
                  ) : (
                    <>
                      <li onClick={() => handleSelectFilter(null, "selectAll")}>
                        Seleccionar todos
                      </li>
                      <li
                        onClick={() => handleSelectFilter(null, "deselectAll")}
                      >
                        Quitar todos
                      </li>
                      {Object.entries(icons).map(([iconName, iconPath]) => (
                        <li
                          key={iconName}
                          onClick={() => handleSelectFilter(iconName)}
                        >
                          <img
                            src={iconPath}
                            alt={iconName}
                            style={{ width: "20px", height: "20px" }}
                          />
                          {iconName}
                          {activeExtensions.includes(iconName) && <div>a</div>}
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={style.drive_suggested_main}>
        <div className={style.drive_suggested_header}>
          {showTypeDrive == "cloud" ? (
            <p className={style.drive_suggested_title}>Recent files</p>
          ) : (
            <p className={style.drive_suggested_title}>LanceDB</p>
          )}
          {showTypeDrive == "cloud" ? (
            <button onClick={() => setShowTypeDrive("db")}>View db</button>
          ) : (
            <button onClick={() => setShowTypeDrive("cloud")}>
              View drive
            </button>
          )}
        </div>
        <div className={style.drive_suggested_container}>
          {showTypeDrive == "cloud"
            ? renderRecentFiles(
                recentFiles,
                handleDragStart,
                sendFileToTrash,
                position,
                setPosition,
                recentFilesOptions,
                setRecentFilesOptions
              )
            : renderFilesDB(filteredFolders, handleDragStart)}
        </div>
      </div>
      <div
        className={style.drive_folders_main_container}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDropFiles(e)}
      >
        <div className={style.drive_folders_title_container}>
          <span
            onDrop={() => handleDropFolderTitle("main")}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => handleFolderClickBack(driveId)}
            className={style.drive_folders_title}
          >
            Project
          </span>
          {currentPath
            .split("/")
            .slice(1, -1)
            .map((folder, index) => (
              <div
                key={index}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                }}
              >
                <img src={Chevron} style={{ transform: "rotate(-90deg)" }} />
                <span
                  key={index}
                  onClick={() => handleFolderClickBack(folder)}
                  className={style.drive_folders_title}
                >
                  {folder}
                </span>
                <p>{index !== currentPath.split("/").length && <div></div>}</p>
              </div>
            ))}
        </div>
        <div className={style.drive_folders_container}>
          <div className={style.drive_folders_filters_container}>
            <div className={style.drive_folders_filters_title_container}>
              <input
                className={`${style.input} ${
                  selectedFolders.length > 0 ? "" : style.hidden
                }`}
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
              <p className={style.drive_folders_filters_title}>Name</p>
              <Filters
                name="Name"
                filters={filters}
                sortOrder={sortOrder}
                setFilters={setFilters}
                handleSelectFilter={handleSelectSort}
              />
            </div>
            <div className={style.drive_folder_size_container}>
              <p className={style.drive_folders_filters_title}>Tamaño</p>
              <Filters
                name="Size"
                filters={filters}
                sortOrder={sortOrder}
                setFilters={setFilters}
                handleSelectFilter={handleSelectSort}
              />
            </div>
            <div className={style.drive_folder_lastmodified_container}>
              <p className={style.drive_folders_filters_title}>
                Último modificado
              </p>
              <Filters
                name="Last modified"
                filters={filters}
                sortOrder={sortOrder}
                setFilters={setFilters}
                handleSelectFilter={handleSelectSort}
              />
            </div>
          </div>
          {renderFolders(
            filteredFolders,
            isGettingFolder,
            selectedFolders,
            folderOptions,
            empty,
            categoryFiles,
            position,
            setPosition,
            setFolderOptions,
            sendFileToTrash,
            clearStorage,
            handleFileClick,
            handleFolderClick,
            handleCheckboxChange,
            dropAndUpload,
            handleDragStart,
            copyFolder,
            cutFolder,
            duplicateFolder,
            false
          )}
        </div>
      </div>

      {selectedFolders.length > 0 && (
        <div className={style.drive_banner_data}>
          <div>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
            <p>{selectedFolders.length} items selected</p>
          </div>
          <div>
            {selectedFolders.length < 2 &&
              regexExtensiones.test(selectedFolders[0].Key) && (
                <>
                  <button
                    onClick={handleSetMarker}
                    className={style.buttonDelete}
                    style={{
                      borderColor: selectedFolders[0].Key.includes("Marker.")
                        ? "#bba400"
                        : "grey",
                    }}
                  >
                    <img src={Star} />
                  </button>
                  <button
                    onClick={handleSetPriority}
                    className={style.buttonDelete}
                    style={{
                      borderColor: selectedFolders[0].Key.includes("Priority.")
                        ? "#bba400"
                        : "grey",
                    }}
                  >
                    <img src={Info} />
                  </button>
                </>
              )}
            <button
              onClick={() => {
                setModalIsOpen(true);
              }}
              className={style.buttonDB}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#4F0599">
                <g>
                  <g>
                    <path
                      fill="fillCurrent"
                      d="M12 5.5 14.5 3 17 5.5 14.5 8zm0 9 2.5-2.5 2.5 2.5-2.5 2.5zm-9 0L5.5 12 8 14.5 5.5 17zm0-9L5.5 3 8 5.5 5.5 8z"
                    ></path>
                    <path fill="#A365F6" d="m7 10 3-3 3 3-3 3z"></path>
                  </g>
                </g>
              </svg>
            </button>
            <button
              onClick={iterateFilesToDelete}
              className={style.buttonDelete}
            >
              <svg viewBox="0 0 24 24">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      <Modal
        className={styles.modalContainer}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <ShareFiles
          selectedFolders={selectedFolders}
          setModalIsOpen={setModalIsOpen}
        />
      </Modal>
    </div>
  );
}

function filterFoldersBasedOnSearchAndPath(
  searchFiles,
  categoryFiles,
  currentPath,
  category
) {
  if (searchFiles) {
    return categoryFiles
      .filter(
        (folder) =>
          folder.Key.startsWith(currentPath) &&
          folder.Key.toLowerCase().includes(searchFiles.toLowerCase())
      )
      .sort(
        (a, b) =>
          a.Key.toLowerCase().indexOf(searchFiles.toLowerCase()) -
          b.Key.toLowerCase().indexOf(searchFiles.toLowerCase())
      );
  } else {
    return categoryFiles.filter((folder) =>
      isValidElementForCategory(folder, currentPath, category)
    );
  }
}

function isValidElementForCategory(folder, currentPath, category) {
  const isFolder = folder.Size === 6;
  const folderDepth = folder.Key.split("/").length;
  const currentPathDepth = currentPath.split("/").length;
  console.log({ category });
  let isValidDepth = isFolder
    ? folderDepth === currentPathDepth + 1
    : folderDepth === currentPathDepth;
  if (
    ["recent", "addon", "dashboard", "priority", "featured", "trash"].includes(
      category
    )
  )
    isValidDepth = true;
  return (
    folder.Key.startsWith(currentPath) &&
    folder.Key !== currentPath &&
    isValidDepth
  );
}
