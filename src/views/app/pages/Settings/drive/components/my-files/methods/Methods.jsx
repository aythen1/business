import {
  convertToMegabytes,
  calculateFolderSize,
  formatLastModified,
  icons,
  regexExtensiones,
} from "../../../assetsAux";

import FolderOptions from "../../FolderOptions";
import FileOptions from "../../FileOptions";
import Folder from "../../../assets/FolderFigma.svg";
import file1 from "../../../assets/File (1).svg";
import Info from "../../../assets/IconDashboard.svg";
import Star from "../../../assets/IconStar.svg";
import StarComponent from "../../../assets/StarComponent";
import PriorityComponent from "../../../assets/PriorityComponent";

import style from "../my-files.module.css";

export const Filters = ({ name, sortOrder, handleSelectFilter }) => {
  return (
    <div
      className={`${style.sortOrder} 
          ${
            sortOrder.name !== name
              ? ""
              : sortOrder.order == "asc"
              ? style.bottom
              : style.top
          }
          `}
      onClick={() => {
        handleSelectFilter(name, sortOrder.order === "asc" ? "dsc" : "asc");
      }}
    >
      <svg
        className={style.top}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 19V5m0 14-4-4m4 4 4-4"
        />
      </svg>
      <svg
        className={style.bottom}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v13m0-13 4 4m-4-4-4 4"
        />
      </svg>
    </div>
  );
};

export const renderFolders = (
  folders,
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
  isTrash,
  handleDrop,
  pending
) => {
  console.log({ pending });
  if (isGettingFolder && folders.length === 0 && empty !== true) {
    return <p className={style.emptyFolderMessage}>Un momento, por favor...</p>;
  }

  if (folders.length === 0) {
    return (
      <div
        className={style.emptyFolderMessage}
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e)}
        onDragStart={handleDragStart}
      >
        Esta carpeta está vacía
      </div>
    );
  }

  return folders.map((directory, index) => {
    const originalFolderName = directory.Key.split("/").filter(Boolean).pop();
    const prefixRegex = /^(Marker\.|Priority\.){1,2}/;
    // usamos la expresión regular para reemplazar los prefijos encontrados por una cadena vacía
    let folderName = originalFolderName.replace(prefixRegex, "");
    // cambio la extensión .json por .ay si existe
    folderName = folderName.replace(/\.json$/, ".ay");
    const isFile = regexExtensiones.test(folderName);
    const fileExtension = folderName.toLowerCase().match(regexExtensiones)?.[1];
    let icon = fileExtension ? icons[fileExtension] : Folder; // usamos el ícono correspondiente o default si no se encuentra
    if (fileExtension === "ay") {
      icon = icons["json"];
    }
    const isMarker = originalFolderName.includes("Marker.") ? true : false;
    const isPriority = originalFolderName.includes("Priority.") ? true : false;

    const size = isFile
      ? convertToMegabytes(directory.Size)
      : convertToMegabytes(calculateFolderSize(directory.Key, categoryFiles));

    const handleContextMenu = (e) => {
      handleFileClick(directory.Key);

      e.preventDefault();
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      setFolderOptions((prevOptions) => {
        const newOptions = { ...prevOptions };
        newOptions[index] = !newOptions[index];
        return newOptions;
      });
    };
    let isDeleting = false;
    let isGlaciering = false;
    let isRestorting = false;

    const filesArray = Array.isArray(pending?.DELETE_FILES)
      ? pending?.DELETE_FILES
      : [];
    const directoriesArray = Array.isArray(pending?.DELETE_DIRECTORY)
      ? pending?.DELETE_DIRECTORY
      : [];

    const glacierArray = Array.isArray(pending?.MAKE_GLACIER)
      ? pending?.MAKE_GLACIER
      : [];
    const restortingArray = Array.isArray(pending?.RESTORE_GLACIER)
      ? pending?.RESTORE_GLACIER
      : [];

    if (restortingArray.length) {
      isRestorting = restortingArray.some((file) => file === directory.Key);
    }
    if (glacierArray.length) {
      isGlaciering = glacierArray.some((file) => file === directory.Key);
    }
    if (filesArray.length || directoriesArray.length) {
      const isInDeleteFiles = filesArray.some(
        (file) => file.Key === directory.Key
      );
      const isInDeleteDirectory = directoriesArray.some(
        (directoryItem) => directoryItem.Key === directory.Key
      );

      // Establece isDeleting a true si alguna condición es verdadera
      isDeleting = isInDeleteFiles || isInDeleteDirectory;
    }

    let previousDirectory = directory.Key.endsWith("/")
      ? directory.Key.slice(0, -1)
      : directory.Key;
    previousDirectory = previousDirectory.split("/");
    previousDirectory.pop();
    let existPreviousDirectory = folders.some(
      (folder) => folder.Key === previousDirectory.join("/") + "/"
    );
    console.log({
      folderName,
      previous: previousDirectory.join("/") + "/",
      folders,
    });
    if (isTrash && existPreviousDirectory) return <></>;
    return (
      <div
        key={index}
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => dropAndUpload(directory.Key, e, isFile)}
        onDragStart={() => handleDragStart(directory, isFile, folderName)}
        onContextMenu={handleContextMenu}
        className={style.drive_folder_container}
      >
        <div
          className={style.drive_clickeable_folder_container}
          onClick={() => {
            if (isDeleting) return; // Si isDeleting es true, no hace nada

            isFile
              ? handleFileClick(directory.Key)
              : handleFolderClick(directory.Key);
          }}
        >
          <div className={style.drive_folder_title_container}>
            <div>
              <input
                type="checkbox"
                className={`${style.input} ${
                  selectedFolders.length > 0 ? "" : style.hidden
                }`}
                checked={selectedFolders.some(
                  (selectedFolder) => selectedFolder.Key === directory.Key
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(directory);
                }}
              />
            </div>
            <img src={icon} style={{ width: 16 }} />
            <p className={style.drive_folder_title}>{folderName}</p>
          </div>
          {isTrash !== true && (
            <div className={style.drive_folder_size_container}>
              <span>{size}</span>
            </div>
          )}
          <div className={style.drive_folder_lastmodified_container}>
            {isTrash
              ? directory.Key
              : formatLastModified(directory.LastModified)}
          </div>
          <span style={{ display: "flex", width: "60px" }}>
            {(isDeleting || isGlaciering || isRestorting) && <p>Espere..</p>}
            {isMarker && <StarComponent color="rgb(187, 164, 0)" />}
            {isPriority && <PriorityComponent color="rgb(187, 164, 0)" />}
            {directory?.StorageStatus === "pending" && <p>Pendiente</p>}
          </span>
        </div>

        {/* <div className={style.fileRightSection}>
            <span
              className={style.fileOption}
              onClick={() => handleToggleFolderOption(index)}
            >
              <img src={Menu} alt="" />
            </span>
          </div> */}

        {folderOptions[index] &&
          isTrash !== true &&
          (isFile ? (
            <FileOptions
              setShowFolderOption={(value) =>
                setFolderOptions((prevOptions) => ({
                  ...prevOptions,
                  [index]: value,
                }))
              }
              handleDeleteFolder={sendFileToTrash}
              folderName={folderName}
              directory={directory}
              position={position}
            />
          ) : (
            <FolderOptions
              setShowFolderOption={(value) =>
                setFolderOptions((prevOptions) => ({
                  ...prevOptions,
                  [index]: value,
                }))
              }
              handleDeleteFolder={clearStorage}
              folderName={folderName}
              directory={directory}
              position={position}
              copyFolder={copyFolder}
              cutFolder={cutFolder}
              duplicateFolder={duplicateFolder}
            />
          ))}
      </div>
    );
  });
};

export const renderFilesDB = (folders, handleDragStart) => {
  return folders.slice(0, 3).map((file, index) => {
    const fileName = file.Key.split("/").filter(Boolean).pop();
    const size = convertToMegabytes(file.Size);
    return (
      <div
        className={style.drive_suggestion_container}
        key={index + "files"}
        onDragStart={() => handleDragStart(file.Key, true)}
        draggable
      >
        <div className={style.icon}>
          <div className={style.file}>
            <div className={style.vector}>
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
            </div>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.title}>
            <div className={style.readmeRm}>{fileName}</div>
          </div>
          <div className={style.progress}>
            <div className={style.bar} />
            <div className={style.loader1}>{size}</div>
          </div>
        </div>
      </div>
    );
  });
};

export const renderRecentFiles = (
  recentFilesFiltered,
  handleDragStart,
  sendFileToTrash,
  position,
  setPosition,
  folderOptions,
  setFolderOptions,
  handleDropFiles
) => {
  // filtramos primero para obtener solo archivos
  const filesOnly = recentFilesFiltered.filter((file) => {
    const fileName = file.Key.split("/").filter(Boolean).pop();
    return regexExtensiones.test(fileName); // Retorna true si el archivo cumple con el regex de extensiones, indicando que es un archivo.
  });

  // trabajamos solo con los primeros 3 archivos
  return filesOnly.slice(0, 5).map((file, index) => {
    const originalFolderName = file.Key.split("/").filter(Boolean).pop();
    const prefixRegex = /^(Marker\.|Priority\.){1,2}/;
    // utilizamos la expresión regular para reemplazar los prefijos encontrados por una cadena vacía.
    let fileName = originalFolderName.replace(prefixRegex, "");
    fileName = fileName.replace(/\.json$/, ".ay");

    const fileExtension = fileName.toLowerCase().match(regexExtensiones)?.[1];
    let icon = fileExtension ? icons[fileExtension] : file1; // usamos el ícono correspondiente o default si no se encuentra
    if (fileExtension === "ay") {
      icon = icons["json"];
    }
    const size = convertToMegabytes(file.Size);
    const handleContextMenu = (e) => {
      e.preventDefault();
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      setFolderOptions((prevOptions) => {
        const newOptions = { ...prevOptions };
        newOptions[index] = !newOptions[index];
        return newOptions;
      });
      // Aquí podrías también establecer el estado para la posición del menú si es necesario
    };

    return (
      <div
        className={style.drive_suggestion_container}
        key={index + "recent"}
        onDragStart={() => handleDragStart(file, true, originalFolderName)}
        draggable
        onContextMenu={handleContextMenu}
        onDrop={handleDropFiles}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className={style.icon}>
          <div className={style.file}>
            <div className={style.vector}>
              <img
                src={icon}
                width={25}
                height={25}
                alt={fileExtension || "default"}
              />
            </div>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.title}>
            <div className={style.readmeRm}>{fileName}</div>
            <div className={style.kb}>{size}</div>
          </div>
        </div>
        {folderOptions[index] && (
          <FileOptions
            setShowFolderOption={(value) =>
              setFolderOptions((prevOptions) => ({
                ...prevOptions,
                [index]: value,
              }))
            }
            handleDeleteFolder={sendFileToTrash}
            folderName={fileName}
            directory={file}
            position={position}
          />
        )}
      </div>
    );
  });
};
