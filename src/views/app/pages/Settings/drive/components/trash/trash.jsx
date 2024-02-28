import style from "../my-files/my-files.module.css";

import Folder from "../../assets/FolderFigma.svg";
import Menu from "../../assets/Menu-figma.svg";
import file1 from "../../assets/File (1).svg";
import Chevron from "../../assets/Vector 161 (Stroke).svg";
import ArrowUpWard from "../../assets/arrow-upward.svg";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDirectoriesVersions,
  directoriesDB,
  deleteFolders,
  deleteFolder,
  deleteFile,
  getFile,
  uploadFile,
  obtainFileData,
  moveFile,
} from "@/actions/assets";
import FolderOptions from "../FolderOptions";
import FileTrashOptions from "../FileTrashOptions";

export default function Trash({ driveId }) {
  const dispatch = useDispatch();

  const { directoriesTrash, loading, searchFiles } = useSelector(
    (state) => state.assets
  );
  const isGettingFolder = loading?.GET_DIRECTORIES_VERSIONS === true;

  const [currentPath, setCurrentPath] = useState(driveId + "/");
  const [filteredFolders, setFilteredFolders] = useState([]);
  const [folderOptions, setFolderOptions] = useState({});

  // / / / / / / / / / / /    F U N C T I O N S    / / / / / / / / / / / / / / / / /

  const handleFolderClick = (folderName) => {
    setCurrentPath(folderName);
  };

  const handleToggleFolderOption = (index) => {
    setFolderOptions((prevOptions) => {
      const newOptions = { ...prevOptions };
      newOptions[index] = !newOptions[index];
      return newOptions;
    });
  };
  // const handleRestoreFolder = (path) => {
  //   dispatch(deleteFolder(path))
  // }
  const handleDeleteFile = (path) => {
    directoriesTrash?.Versions?.forEach((element) => {
      if (element.Key === path)
        dispatch(deleteFile({ path, VersionId: element.VersionId }));
    });
    directoriesTrash?.DeleteMarkers?.forEach((element) => {
      if (element.Key === path)
        dispatch(deleteFile({ path, VersionId: element.VersionId }));
    });
  };
  const handleRestoreFile = (path, VersionId) => {
    dispatch(deleteFile({ path, VersionId }));
  };
  const handleFolderClickBack = (folderName) => {
    if (folderName === driveId + "/") {
      setCurrentPath(folderName);
      return;
    }
    const arr = currentPath.split("/");
    const index = arr.indexOf(folderName);
    if (index !== -1) {
      const newPath = arr.slice(0, index + 1);
      setCurrentPath(newPath.join("/") + "/");
    }
  };

  // / / / / / / / / / / / /    M E T O D O S    / / / / / / / / / / / / / / / / /

  const renderFolders = (folders) => {
    if (isGettingFolder && folders?.length === 0) {
      return (
        <p className={style.emptyFolderMessage}>Un momento, por favor...</p>
      );
    }
    if (folders?.length === 0) {
      return (
        <p className={style.emptyFolderMessage}>Esta carpeta está vacía</p>
      );
    }
    return folders?.map((directory, index) => {
      const folderName = directory.Key.split("/").filter(Boolean).pop();
      const isFile = /\.(png|jpg|txt|jfif)$/i.test(folderName);

      return (
        <div key={index} className={style.drive_folder_container}>
          <div
            onClick={() =>
              !isFile
                ? handleFolderClick(directory.Key)
                : handleRestoreFile(directory.Key, directory.VersionId)
            }
            className={style.drive_clickeable_folder_container}
          >
            <div className={style.drive_folder_title_container}>
              <img src={isFile ? file1 : Folder} />
              <p className={style.drive_folder_title}>{folderName}</p>
            </div>

            <div className={style.drive_folder_lastmodified_container}>1d</div>
          </div>
          <div className={style.fileRightSection}>
            <span
              className={style.fileOption}
              onClick={() => handleToggleFolderOption(index)}
            >
              <img priority src={Menu} alt="" />
            </span>
          </div>
          {folderOptions[index] &&
            (isFile ? (
              <FileTrashOptions
                setShowFolderOption={(value) =>
                  setFolderOptions((prevOptions) => ({
                    ...prevOptions,
                    [index]: value,
                  }))
                }
                handleDeleteFile={handleDeleteFile}
                handleRestoreFile={handleRestoreFile}
                folderName={folderName}
                directory={directory}
              />
            ) : (
              <FolderOptions
                setShowFolderOption={(value) =>
                  setFolderOptions((prevOptions) => ({
                    ...prevOptions,
                    [index]: value,
                  }))
                }
                handleDeleteFolder={handleRestoreFile}
                folderName={folderName}
                directory={directory.Key}
              />
            ))}
        </div>
      );
    });
  };

  // / / / / / / / / / / /    U S E E F F E C T    / / / / / / / / / / / / / / / / /
  useEffect(() => {
    if (searchFiles !== "" && searchFiles !== undefined) {
      const filtered = directoriesTrash?.DeleteMarkers?.filter(
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
      // Reset filteredFolders when uploadSearch is empty
      setFilteredFolders(
        directoriesTrash?.DeleteMarkers?.filter(
          (folder) =>
            folder.Key.startsWith(currentPath) &&
            folder.Key !== currentPath &&
            (folder.Size === 0
              ? folder.Key.split("/").length ===
                currentPath.split("/").length + 1
              : folder.Key.split("/").length === currentPath.split("/").length)
        )
      );
    }
  }, [currentPath, directoriesTrash, searchFiles]);

  useEffect(() => {
    dispatch(getDirectoriesVersions({ Prefix: driveId }));
  }, []);

  return (
    <div className={style.main_drive_page}>
      <div className={style.drive_header}>
        <div className={style.drive_header_left}>
          <span className={style.drive_header_left_title_container}>
            <p className={style.drive_header_left_title}>
              Papelera de reciclaje
            </p>
          </span>
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
                <img
                  src={Chevron}
                  style={{ transform: "rotate(-90deg)" }}
                  priority
                />
                <span
                  key={index}
                  onClick={() => handleFolderClickBack(folder)}
                  className={style.drive_folders_title}
                >
                  {folder}
                </span>
              </div>
            ))}
        </div>
        <div className={style.drive_folders_container}>
          <div className={style.drive_folders_filters_container}>
            <div className={style.drive_folders_filters_title_container}>
              <p className={style.drive_folders_filters_title}>Name</p>
              <img src={ArrowUpWard} priority />
            </div>
            <div className={style.drive_folder_size_container}>
              <p className={style.drive_folders_filters_title}>Tamaño</p>
              <img src={ArrowUpWard} priority />
            </div>
            <div className={style.drive_folder_lastmodified_container}>
              <p className={style.drive_folders_filters_title}>
                Último modificado
              </p>
              <img src={ArrowUpWard} priority />
            </div>
          </div>
          {renderFolders(filteredFolders)}
        </div>
      </div>
    </div>
  );
}
