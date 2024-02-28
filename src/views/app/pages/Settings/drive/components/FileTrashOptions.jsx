"use client";
import { useEffect, useRef } from "react";
import styles from "./FolderOptions.module.css";
// import { IoTrashOutline, IoSettingsOutline } from 'react-icons/io5'

const FolderOptions = ({
  setShowFolderOption,
  handleDeleteFile,
  handleRestoreFile,
  directory,
}) => {
  const componentRef = useRef(null);

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
  return (
    <div ref={componentRef} className={styles.folderOptionsContainer}>
      <div
        className={styles.option}
        onClick={() => handleRestoreFile(directory.Key, directory?.VersionId)}
      >
        Restore
        {/* <IoSettingsOutline size={17} color="#00f" /> */}
      </div>
      <div
        onClick={() => {
          handleDeleteFile(directory.Key);
          setShowFolderOption(false);
        }}
        className={styles.option}
      >
        Delete
        {/* <IoTrashOutline size={17} color="#D0342C" /> */}
      </div>
    </div>
  );
};

export default FolderOptions;
