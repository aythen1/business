"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FolderOptions.module.css";
// import { IoTrashOutline, IoSettingsOutline } from "react-icons/io5";
import { obtainFileData, copyFile } from "@/actions/assets";
import { icons } from "../assetsAux";

const FileOptions = ({
  setShowFolderOption,
  handleDeleteFolder,
  folderName,
  directory,
  position,
}) => {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const { x, y } = position;
  const { file } = useSelector((state) => state.assets);
  const handleDuplicateFile = () => {
    const extensionList = Object.keys(icons);
    function addCopyToFileName() {
      // Encontrar la extensión del archivo
      const extension = extensionList.find((ext) =>
        folderName.endsWith("." + ext)
      );

      if (extension) {
        // Si encuentra la extensión, reemplaza la extensión por "-copy" + extensión original
        const newFileName = folderName.replace(
          "." + extension,
          "-copy." + extension
        );

        return directory.Key.replace(folderName, newFileName);
      } else {
        // Si no encuentra una extensión conocida, simplemente agrega "-copy" al final
        return folderName + "-copy";
      }
    }

    dispatch(
      copyFile({
        sourceKey: directory.Key,
        destinationKey: addCopyToFileName(),
        file: directory,
      })
    );
    setShowFolderOption(false);
  };
  const handleCopyFile = (action) => {
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
        className={styles.option}
        onClick={() => window.open(file, "_blank")}
      >
        Ver
      </div>
      <div className={styles.option} onClick={() => handleCopyFile("copy")}>
        Coiar
        {/* <IoSettingsOutline size={17} color="#00f" /> */}
      </div>
      <div className={styles.option} onClick={() => handleCopyFile("cut")}>
        Cortar
        {/* <IoSettingsOutline size={17} color="#00f" /> */}
      </div>
      <div className={styles.option} onClick={handleDuplicateFile}>
        Duplicar
        {/* <IoSettingsOutline size={17} color="#00f" /> */}
      </div>
      <div
        onClick={() => {
          handleDeleteFolder(directory?.Key, directory?.Size);
          setShowFolderOption(false);
        }}
        className={styles.option}
      >
        Borrar Archivo
        {/* <IoTrashOutline size={17} color="#D0342C" /> */}
      </div>
    </div>
  );
};

export default FileOptions;
