"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
// import { useRouter, useParams } from 'next/navigation'
import { useNavigate, useParams } from "react-router-dom";
import jsonPivot from "../../../../../../../utils/addon.json";
// import { updateUser } from '../../../../../../store/redux/actions/user.js'
import {
  createNewFolder,
  addFolderLocal,
  uploadFile,
  selectCategory,
  moveFile,
} from "@/actions/assets";
import { setCurrentFolder } from "@/slices/assetsSlice";
import { getCurrentDateFormatted } from "../../assetsAux";

import style from "./left-panel.module.css";
// import Image from 'next/image'
// import Chevron from '../../../../../../../assets/Vector 161 (Stroke).svg'
import IconGroup from "../../assets/IconGroup.svg";
// import IconSearch from "../../assets/search.svg";
// import Info from "../../assets/Info.svg";
import IconStar from "../../assets/IconStar.svg";
import IconGlaciar from "../../assets/IconGlaciar.svg";
import IconTrash from "../../assets/IconTrash.svg";
import IconTime from "../../assets/IconTime.svg";

import Folder from "../../assets/FolderFigma.svg";
import file1 from "../../assets/File-to-upload.svg";

import MyDocs from "../../assets/MyDocs.svg";
import IconAddon from "../../assets/IconAddon.svg";
import IconPriority from "../../assets/IconDashboard.svg";

import { setSearchFiles } from "@/slices/assetsSlice";
import Modal from "react-modal";
// import { listMvps } from './listMvps';
// import { useNavigate } from 'react-router-dom'

// import stylesModal from './stylesModal'

import { listMvps } from "./listMvps";

import { setModal } from "@/slices/iamSlice";

import ModalLanceDb from "./ModalLanceDb";

export default function DriveLeftPanel({ isNew, setIsNew }) {
  const params = useParams();
  // const router = useRouter()
  const navigate = useNavigate();

  // const { id, driveId, lng } = params
  const { lng } = params;

  const draveId = "1234";
  // const driveId = id + '1'

  const componentRef = useRef(null);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.persistedReducer.user)
  // const user = JSON.parse(localStorage.getItem('user')).user
  const { currentFolder, loading, searchFiles, fileToCopy } = useSelector(
    (state) => state.assets
  );
  const [nameFolder, setNameFolder] = useState("");
  const [newPopup, setNewPopup] = useState(isNew || false);
  const [newSubPopup, setSubNewPopup] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isCreatingFolder = loading?.UPDATE_DIRECTORY === true;

  // ------------------------------------
  useEffect(() => {
    if (newPopup == "title") {
    } else if (newPopup == "lancedb") {
      dispatch(setModal(<ModalLanceDb />));
    }
  }, [newPopup]);

  const handleCreateNewFolder = async () => {
    if (!nameFolder.trim()) {
      return;
    }

    const folderPath =
      currentFolder === ""
        ? `1234/${nameFolder}`
        : `${currentFolder}/${nameFolder}`;
    const pathDepured = folderPath.replace(/\/\/+/g, "/");
    await dispatch(createNewFolder(pathDepured));
    dispatch(addFolderLocal(pathDepured + "/", getCurrentDateFormatted));
    setModalIsOpen(false);
    setNameFolder("");
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      let currentFolderTrim = currentFolder;
      if (currentFolderTrim.endsWith("/")) {
        currentFolderTrim = currentFolderTrim.slice(0, -1);
      }
      const path = currentFolderTrim === "" ? draveId : currentFolderTrim;
      const pathDepured = path.replace(/\/\/+/g, "/");

      dispatch(
        uploadFile({
          file,
          pathDepured,
        })
      );
    }
    setNewPopup(false);
    event.target.value = "";
  };
  const handleCreateNewMvp = async () => {
    const response = await fetch(jsonPivot);
    const blob = await response.blob();

    // Crear un objeto File a partir del Blob si es necesario
    const file = new File([blob], "addon.json", { type: "application/json" });

    let currentFolderTrim = currentFolder;
    if (currentFolderTrim.endsWith("/")) {
      currentFolderTrim = currentFolderTrim.slice(0, -1);
    }
    const path = currentFolderTrim === "" ? draveId : currentFolderTrim;
    const pathDepured = path.replace(/\/\/+/g, "/");

    dispatch(
      uploadFile({
        file,
        pathDepured,
      })
    );
  };
  const handleFolderInputChange = (event) => {
    const files = event.target.files;
    let foldersPaths = new Set();

    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const folderPathParts = file.webkitRelativePath.split("/");
        folderPathParts.pop();

        const folderPath = folderPathParts.join("/");
        foldersPaths.add(folderPath);
        let path =
          currentFolder === ""
            ? draveId + "/" + folderPath
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

      const foldersPathsArray = Array.from(foldersPaths);
      foldersPathsArray.forEach((folderName) => {
        const folderPath =
          currentFolder === ""
            ? `1234/${folderName}`
            : `${currentFolder}/${folderName}`;
        const pathDepured = folderPath.replace(/\/\/+/g, "/");

        dispatch(createNewFolder(pathDepured));
        const folderPathLocal = pathDepured + "/";
        dispatch(addFolderLocal(folderPathLocal));
      });
    }
    setNewPopup(false);
    event.target.value = "";
  };
  const handleNavigate = (path) => {
    // router.push(`/${lng}/workspace/${id}/drive/${driveId}/${path}`)
    navigate(`/${lng}/app/settings/drive/${path}`);
  };

  const handleClickMvp = () => {
    setSubNewPopup(true);
  };

  const handleSetPrefix = (prefix) => {
    const { directoryCopied, file } = fileToCopy;

    const originalFileName = directoryCopied.split("/").filter(Boolean).pop();
    let newKey;
    const otherPrefix = prefix === "Marker." ? "Priority." : "Marker.";
    const hasPrefix = new RegExp(`\\b${prefix}\\b`).test(originalFileName);
    const hasOtherPrefix = new RegExp(`\\b${otherPrefix}\\b`).test(
      originalFileName
    );

    if (hasPrefix) {
      // si ya contiene el prefijo, no hacemos nada
      return;
    } else {
      // Si no contiene el prefijo, agregarlo al inicio o después del otro prefijo si este último está presente
      if (hasOtherPrefix) {
        newKey = directoryCopied.replace(
          originalFileName,
          originalFileName.replace(
            new RegExp(`^(${otherPrefix})`),
            `$1${prefix}`
          )
        );
      } else {
        newKey = directoryCopied.replace(
          originalFileName,
          prefix + originalFileName
        );
      }
    }
    dispatch(
      moveFile({ sourceKey: directoryCopied, destinationKey: newKey, file })
    );
  };

  // uso para "Marker."
  const handleSetMarker = () => handleSetPrefix("Marker.");

  // uso para "Priority."
  const handleSetPriority = () => handleSetPrefix("Priority.");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target))
        setNewPopup(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();

        const inputElement = document.getElementById("searchFile");
        if (inputElement) {
          inputElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <div className={style.drive_transformers_container}>
        <div className={style.drive_input_container}>
          {/* <img src={Search} /> */}
          <svg
            className={style.search_input}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search documentation"
            id="searchFile"
            className={style.drive_input}
            onChange={(e) => dispatch(setSearchFiles(e.target.value))}
            value={searchFiles}
          />
          <div className={style.drive_shortcut_container}>
            <p className={style.drive_shortcut_text}>Ctrl+F</p>
          </div>
        </div>
      </div>

      <div className={style.drive_create_new_container}>
        <p
          onClick={() => setNewPopup(!newPopup)}
          className={style.drive_create_new}
        >
          + Crear nuevo
        </p>

        <div
          ref={componentRef}
          className={`${style.drive_create_new_popup_container} 
        ${newPopup ? style.show : ""} ${
            newPopup == "title" ? style.title : ""
          }`}
        >
          <div
            onClick={() => {
              setNewPopup(false);
              setModalIsOpen(true);
            }}
            className={style.drive_create_new_option}
          >
            <img src={Folder} width={25} height={25} />

            <p>Nueva carpeta</p>
          </div>
          <div
            onClick={() => {
              setNewPopup("lancedb");
            }}
            className={style.drive_create_new_option}
          >
            <img src={Folder} width={25} height={25} />

            <p>Nuevo lanceDB</p>
          </div>
          <div
            onClick={() => {
              // Abrir el explorador de archivos al hacer clic
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            className={style.drive_create_new_option}
          >
            <img src={file1} width={25} height={25} />
            <p>Subir archivo</p>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
          <div
            onClick={() => {
              if (folderInputRef.current) {
                folderInputRef.current.click();
              }
            }}
            className={style.drive_create_new_option}
          >
            <img src={file1} width={25} height={25} />
            <p>Subir carpeta</p>
            <input
              type="file"
              ref={folderInputRef}
              style={{ display: "none" }}
              webkitdirectory="" // Permite la selección de carpetas en navegadores que soportan webkit
              directory="" // Para estandarización, aunque su soporte puede variar
              multiple // Permite la selección de múltiples archivos
              onChange={handleFolderInputChange}
            />
          </div>

          <div
            onClick={() => handleClickMvp()}
            className={`${style.drive_create_new_option} ${style.drive_mvp_aythen}`}
          >
            <img src={file1} width={25} height={25} />

            <p>20 mvps aythen</p>
            <div
              className={`${style.drive_create_new_popup_container}
            ${newSubPopup ? style.showSubPopup : ""}`}
            >
              <div className={`${style.drive_create_new_subpopup_container}`}>
                {listMvps.map((item, index) => (
                  <div
                    onClick={() => handleCreateNewMvp(item)}
                    key={index}
                    className={`${style.drive_create_new_mvp} ${
                      item.lock ? style.active : ""
                    }`}
                  >
                    <img src={item.path} width={28} height={28} />
                    <p>Use {item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.drive_options_container}>
        <div className={style.drive_option}>
          <img src={MyDocs} />
          <p
            className={style.drive_option_text}
            onClick={() => {
              handleNavigate("document");
              dispatch(selectCategory("document"));
              dispatch(setCurrentFolder(draveId + "/"));
            }}
          >
            Mis documentos
          </p>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            dispatch(selectCategory("addon"));
            dispatch(setCurrentFolder(draveId + "/"));
            handleNavigate("addon");
          }}
        >
          <img src={IconAddon} />
          <p className={style.drive_option_text}>Addons</p>
          <label className={style.drive_option_label}>Soon</label>
        </div>
        <div
          onDrop={handleSetPriority}
          onDragOver={(e) => e.preventDefault()}
          className={style.drive_option}
          onClick={() => {
            handleNavigate("priority");
            dispatch(selectCategory("priority"));
            dispatch(setCurrentFolder(draveId + "/"));
          }}
        >
          <img src={IconPriority} />
          <p className={style.drive_option_text}>Prioritarios</p>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            handleNavigate("shared");
            dispatch(selectCategory("shared"));
            dispatch(setCurrentFolder(draveId + "/"));
          }}
        >
          <img src={IconGroup} />
          <p className={style.drive_option_text}>Compartidos</p>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            handleNavigate("recent");
            dispatch(selectCategory("recent"));
            dispatch(setCurrentFolder(draveId + "/"));
          }}
        >
          <img src={IconTime} />
          <p className={style.drive_option_text}>Recientes</p>
        </div>
        <div
          onDrop={handleSetMarker}
          onDragOver={(e) => e.preventDefault()}
          className={style.drive_option}
          onClick={() => {
            handleNavigate("featured");
            dispatch(selectCategory("featured"));
            dispatch(setCurrentFolder(draveId + "/"));
          }}
        >
          <img src={IconStar} />
          <p className={style.drive_option_text}>Destacados</p>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            handleNavigate("glaciar");
            dispatch(selectCategory("glaciar"));
            dispatch(setCurrentFolder(draveId + "/"));
          }}
        >
          <img src={IconGlaciar} />
          <p className={style.drive_option_text}>Glaciar</p>
          <label className={style.drive_option_label}>Soon</label>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            handleNavigate("trash");
            dispatch(selectCategory("trash"));
            dispatch(setCurrentFolder(draveId + "/"));
          }}
        >
          <img src={IconTrash} />
          <p className={style.drive_option_text}>Eliminados</p>
        </div>
      </div>

      <Modal
        className={style.modalContainer}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className={style.drive_modal_container}>
          {isCreatingFolder ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "18px" }}>Un momento...</p>
            </div>
          ) : (
            <>
              <div
                style={{ borderBottom: "1px solid #c6c6c6" }}
                className={style.drive_modal_title_container}
              >
                <p className={style.drive_modal_title}>Nueva carpeta</p>
              </div>
              <div style={{ padding: "10px" }}>
                <div className={style.drive_modal_name_container} tabIndex="0">
                  <input
                    className={style.drive_modal_name}
                    autoFocus
                    value={nameFolder}
                    onChange={(e) => {
                      e.preventDefault();
                      setNameFolder(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={style.drive_modal_buttons_container}>
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={(e) => {
                    setNameFolder("");
                    setModalIsOpen(false);
                  }}
                >
                  Cancelar
                </span>
                <span
                  onClick={handleCreateNewFolder}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  Crear
                </span>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
