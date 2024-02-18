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
  handleDragStart
) => {
  if (isGettingFolder && folders.length === 0 && empty !== true) {
    return <p className={style.emptyFolderMessage}>Un momento, por favor...</p>;
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      dispatch(
        uploadFile({
          file,
          // path: currentFolder === '' ? id : currentFolder
          path: "",
        })
      );
    }
    // setNewPopup(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  if (folders.length === 0) {
    return (
      <div
        className={style.emptyFolderMessage}
        draggable
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
      >
        Esta carpeta está vacía
      </div>
    );
  }

  return folders.map((directory, index) => {
    const folderName = directory.Key.split("/").filter(Boolean).pop();
    const isFile = regexExtensiones.test(folderName);
    const fileExtension = folderName.toLowerCase().match(regexExtensiones)?.[1];
    const icon = fileExtension ? icons[fileExtension] : Folder; // usamos el ícono correspondiente o default si no se encuentra
    const size = isFile
      ? convertToMegabytes(directory.Size)
      : convertToMegabytes(calculateFolderSize(directory.Key, categoryFiles));

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
        key={index}
        draggable
        onDragOver={handleDragOver}
        onDrop={(e) => dropAndUpload(directory.Key, e, isFile)}
        onDragStart={() => handleDragStart(directory, isFile, folderName)}
        onContextMenu={handleContextMenu}
        className={style.drive_folder_container}
      >
        <div
          className={style.drive_clickeable_folder_container}
          onClick={() => {
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
          <div className={style.drive_folder_size_container}>
            <span>{size}</span>
          </div>
          <div className={style.drive_folder_lastmodified_container}>
            {formatLastModified(directory.LastModified)}
          </div>
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
              directory={directory.Key}
              position={position}
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
  setFolderOptions
) => {
  // filtramos primero para obtener solo archivos
  const filesOnly = recentFilesFiltered.filter((file) => {
    const fileName = file.Key.split("/").filter(Boolean).pop();
    return regexExtensiones.test(fileName); // Retorna true si el archivo cumple con el regex de extensiones, indicando que es un archivo.
  });

  // trabajamos solo con los primeros 3 archivos
  return filesOnly.slice(0, 3).map((file, index) => {
    const fileName = file.Key.split("/").filter(Boolean).pop();
    const fileExtension = fileName.toLowerCase().match(regexExtensiones)?.[1];
    const icon = fileExtension ? icons[fileExtension] : file1; // usamos el ícono correspondiente o default si no se encuentra
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
        onDragStart={() => handleDragStart(file.Key, true)}
        draggable
        onContextMenu={handleContextMenu}
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
