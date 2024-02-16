"use client";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./FolderOptions.module.css";
import { IoTrashOutline, IoSettingsOutline } from "react-icons/io5";
import { copyFile, obtainFileData } from "@/actions/assets";

const FolderOptions = ({
  setShowFolderOption,
  handleDeleteFolder,
  folderName,
  directory,
  position,
}) => {
  const dispatch = useDispatch();
  const { fileToCopy } = useSelector((state) => state.assets);
  const isCopyActive = fileToCopy !== "";
  const componentRef = useRef(null);
  const { x, y } = position;

  const handlePasteFile = () => {
    if (isCopyActive) {
      const { directoryCopied, folderNameCopied, file } = fileToCopy;
      const destinationKey = directory + folderNameCopied;
      dispatch(copyFile({ sourceKey: directoryCopied, destinationKey, file }));
      dispatch(obtainFileData(""));
      setShowFolderOption(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
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
        onClick={handlePasteFile}
      >
        Paste
        <IoSettingsOutline
          size={17}
          color={isCopyActive ? "#00f" : "#525252"}
        />
      </div>
      <div
        onClick={() => {
          handleDeleteFolder(directory);
          setShowFolderOption(false);
        }}
        className={styles.option}
      >
        Delete Folder
        <IoTrashOutline size={17} color="#D0342C" />
      </div>
    </div>
  );
};

export default FolderOptions;
