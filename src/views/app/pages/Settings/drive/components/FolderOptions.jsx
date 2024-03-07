"use client";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./FolderOptions.module.css";
// import { IoTrashOutline, IoSettingsOutline } from "react-icons/io5";
import { copyFile, obtainFileData, moveFile } from "@/actions/assets";

const FolderOptions = ({
  setShowFolderOption,
  handleDeleteFolder,
  folderName,
  directory,
  position,
  copyFolder,
  cutFolder,
  duplicateFolder,
}) => {
  const dispatch = useDispatch();
  const { fileToCopy, fileToCut, folderToCopy, folderToCut } = useSelector(
    (state) => state.assets
  );
  const isCopyActive =
    fileToCopy !== "" ||
    fileToCut !== "" ||
    folderToCut !== "" ||
    folderToCopy !== "";
  const componentRef = useRef(null);
  const { x, y } = position;

  const handleCopyFolder = (action) => {
    dispatch(
      obtainFileData({
        directoryCopied: directory.Key,
        folderNameCopied: folderName,
        file: directory,
        action,
      })
    );
    setShowFolderOption(false);
  };
  const handlePaste = () => {
    if (folderToCopy !== "" || folderToCut !== "") {
      handlePasteFolder();
    } else if (fileToCopy !== "" || fileToCut !== "") {
      handlePasteFile();
    }
  };
  const handlePasteFolder = () => {
    if (folderToCut !== "") {
      cutFolder(directory.Key);
      setShowFolderOption(false);
    } else if (folderToCopy !== "") {
      copyFolder(directory.Key);
      setShowFolderOption(false);
    }
  };
  const handlePasteFile = () => {
    if (isCopyActive) {
      if (fileToCopy !== "" && fileToCut === "") {
        const { directoryCopied, folderNameCopied, file } = fileToCopy;
        const destinationKey = directory.Key + folderNameCopied;
        dispatch(
          copyFile({ sourceKey: directoryCopied, destinationKey, file })
        );
        dispatch(obtainFileData(""));
        setShowFolderOption(false);
      } else if (fileToCopy === "" && fileToCut !== "") {
        const { directoryCopied, folderNameCopied, file } = fileToCut;
        const destinationKey = directory.Key + folderNameCopied;
        dispatch(
          moveFile({ sourceKey: directoryCopied, destinationKey, file })
        );
        dispatch(obtainFileData(""));
        setShowFolderOption(false);
      }
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      event.stopPropagation();
      if (componentRef.current && !componentRef.current.contains(event.target))
        setShowFolderOption(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const style = {
    position: "fixed",
    top: `${y}px`,
    left: `${x}px`,
    zIndex: 1000, // Asegúrate de que sea suficientemente alto para estar por encima de otros elementos.
  };
  return (
    <div
      ref={componentRef}
      className={styles.folderOptionsContainer}
      style={style}
    >
      <div
        className={isCopyActive ? styles.option : styles.optionDisabled}
        onClick={handlePaste}
      >
        Paste
        {/* <IoSettingsOutline */}
        {/* size={17}
          color={isCopyActive ? "#00f" : "#525252"}
        /> */}
      </div>
      <div
        className={styles.option}
        onClick={() => handleCopyFolder("copyFolder")}
      >
        Copy
        {/* <IoSettingsOutline size={17} color={"#00f"} /> */}
      </div>
      <div
        className={styles.option}
        onClick={() => handleCopyFolder("cutFolder")}
      >
        Cut
        {/* <IoSettingsOutline size={17} color={"#00f"} /> */}
      </div>
      <div
        className={styles.option}
        onClick={() => {
          duplicateFolder(directory.Key, folderName);
          setShowFolderOption(false);
        }}
      >
        Duplicate
        {/* <IoSettingsOutline size={17} color={"#00f"} /> */}
      </div>
      <div
        onClick={() => {
          handleDeleteFolder(directory?.Key, directory?.Size);
          setShowFolderOption(false);
        }}
        className={styles.option}
      >
        Delete Folder
        {/* <IoTrashOutline size={17} color="#D0342C" /> */}
      </div>
    </div>
  );
};

export default FolderOptions;
