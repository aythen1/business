"use client";
import style from "./my-files.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Filters,
  renderFolders,
  renderFilesDB,
  renderRecentFiles,
} from "./methods/Methods";
import Chevron from "../../assets/Vector 161 (Stroke).svg";
import ArrowDropDown from "../../assets/arrow-drop-down.svg";

import { useState, useEffect } from "react";
import {
  directoriesDB,
  deleteFolders,
  deleteFolder,
  deleteFile,
  getFile,
  uploadFile,
  obtainFileData,
  moveFile,
} from "@/actions/assets";
import {
  deleteItemsInDirectory,
  getFilesInDescendingOrder,
  categoryTitles,
} from "../../assetsAux";
import { setCurrentFolder } from "@/slices/assetsSlice";

export default function Page({
  setIsNew,
  categoryFiles,
  driveId,
  setSortOrder,
  sortOrder,
}) {
  const dispatch = useDispatch();

  const [showTypeDrive, setShowTypeDrive] = useState("cloud");

  const { loading, empty, fileToCopy, searchFiles, category } = useSelector(
    (state) => state.assets
  );
  const title = categoryTitles[category] || "Documentos";
  const [currentPath, setCurrentPath] = useState(driveId + "/");
  const [filteredFolders, setFilteredFolders] = useState(categoryFiles);
  const [folderOptions, setFolderOptions] = useState({});
  const [isDragginFile, setIsDragginFile] = useState(false);
  const [recentFiles, setRecentFiles] = useState([]);
  const [filters, setFilters] = useState({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [filtersData, setFiltersData] = useState([
    { name: "Filter by:", option: "All files", view: false },
    { name: "Sort by:", option: "Last viewed", view: false },
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
  const handleDeleteDirectory = (path) => {
    dispatch(deleteFolder(path));
  };
  const clearStorage = (path) => {
    deleteItemsInDirectory(path, handleDeleteDirectory, categoryFiles);
    dispatch(deleteFolder(path));
  };
  const sendFileToTrash = (path) => {
    dispatch(deleteFile({ path, VersionId: "" }));
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

  const handleDB = async () => {
    console.log("selectedFolders", selectedFolders);
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

  const handleSelectFilter = (name, order) => {
    console.log({ name, order });
    setSortOrder({ name, order });
  };

  // / / / / / / / / / / / / / / / D R A G & D R O P / / / / / / / / / / / / / / / /

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const dropAndUpload = (directory, e, isFile) => {
    if (!isFile && isDragginFile) {
      const { directoryCopied, folderNameCopied, file } = fileToCopy;

      const destinationKey = directory + folderNameCopied;

      dispatch(moveFile({ sourceKey: directoryCopied, destinationKey, file }));

      dispatch(obtainFileData(""));
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
        })
      );
      dispatch(
        getFile({
          fileName: directory.Key,
        })
      );
      dispatch(
        getElementTag({
          type: "image",
          tag: "img",
          tagName: "img",
          rol: "default",
        })
      );
    }
  };

  // / / / / / / / / / / / / / / / / / / / u s e E F F E C T / / / / / / / / / / / / / / / / / / / / / / / /

  useEffect(() => {
    setRecentFiles(getFilesInDescendingOrder(categoryFiles));
  }, [categoryFiles]);

  useEffect(() => {
    if (searchFiles !== "" && searchFiles !== undefined) {
      const filtered = categoryFiles.filter(
        (folder) =>
          folder.Key.startsWith(currentPath) &&
          folder.Key !== currentPath &&
          folder.Key.toLowerCase().includes(searchFiles.toLowerCase())
      );

      // Ensure strict order based on the search string
      const sortedFiltered = filtered.sort((a, b) => {
        const indexA = a.Key.toLowerCase().indexOf(searchFiles.toLowerCase());
        const indexB = b.Key.toLowerCase().indexOf(searchFiles.toLowerCase());
        return indexA - indexB;
      });

      setFilteredFolders(sortedFiltered);
    } else {
      // Determina si la entrada es una carpeta basándose en su tamaño.
      const isFolder = (folder) => folder.Size === 6;

      // Calcula la profundidad de la ruta proporcionada.
      const getPathDepth = (path) => path.split("/").length;

      // Verifica si la categoría permite ignorar la validación de profundidad para archivos.
      const categoryIgnoresDepth = (category) => {
        return ["recent", "addon", "dashboard", "priority"].includes(category);
      };

      // Función para validar si un elemento debe ser incluido basado en la categoría y su ruta.
      const isValidElement = (folder) => {
        const folderDepth = getPathDepth(folder.Key);
        const currentPathDepth = getPathDepth(currentPath);
        let isValidDepth;

        if (isFolder(folder)) {
          // Para carpetas, se espera que su profundidad sea exactamente 1 nivel más profundo que la ruta actual.
          isValidDepth = folderDepth === currentPathDepth + 1;
        } else if (categoryIgnoresDepth(category)) {
          // Si la categoría ignora la profundidad, todos los archivos son válidos independientemente de su profundidad.
          isValidDepth = true;
        } else {
          // Para otros casos, la profundidad del archivo debe coincidir con la de la ruta actual.
          isValidDepth = folderDepth === currentPathDepth;
        }

        return (
          folder.Key.startsWith(currentPath) &&
          folder.Key !== currentPath &&
          isValidDepth
        );
      };

      // Filtra los archivos o carpetas según las validaciones definidas.
      const filtered = categoryFiles.filter(isValidElement);
      console.log("filtered", filtered);
      setFilteredFolders(filtered);
    }
  }, [currentPath, categoryFiles, searchFiles]);

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
                <ul className={style.drive_options}>
                  <li onClick={() => handleSelectFilter("Name", "asc")}>
                    Name
                  </li>
                  <li
                    onClick={() => handleSelectFilter("Last modified", "asc")}
                  >
                    Last modified
                  </li>
                  <li
                    onClick={() =>
                      handleSelectFilter("Last modified by me", "asc")
                    }
                  >
                    Last modified by me
                  </li>
                  <li
                    onClick={() =>
                      handleSelectFilter("Last opened by me", "asc")
                    }
                  >
                    Last opened by me
                  </li>
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
            ? renderRecentFiles(recentFiles, handleDragStart)
            : renderFilesDB(filteredFolders, handleDragStart)}
        </div>
      </div>
      <div className={style.drive_folders_main_container}>
        <div className={style.drive_folders_title_container}>
          <span
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
                <p>
                  {index !== currentPath.split("/").length && (
                    // <Image src={Chevron} priority />
                    <div>e</div>
                  )}
                </p>
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
                handleSelectFilter={handleSelectFilter}
              />
            </div>
            <div className={style.drive_folder_size_container}>
              <p className={style.drive_folders_filters_title}>Tamaño</p>
              <Filters
                name="Size"
                filters={filters}
                sortOrder={sortOrder}
                setFilters={setFilters}
                handleSelectFilter={handleSelectFilter}
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
                handleSelectFilter={handleSelectFilter}
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
            handleDragStart
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
            <button onClick={handleDB} className={style.buttonDB}>
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
            <button onClick={handleDelete} className={style.buttonDelete}>
              <svg viewBox="0 0 24 24">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
