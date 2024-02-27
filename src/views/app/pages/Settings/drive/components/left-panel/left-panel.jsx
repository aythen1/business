"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
// import { useRouter, useParams } from 'next/navigation'
import { useNavigate, useParams } from "react-router-dom";

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
import Search from "../../assets/search.svg";
import Info from "../../assets/Info.svg";
import Group from "../../assets/Group.svg";
import Star from "../../assets/Star.svg";
import Trash from "../../assets/Trash.svg";
import Time from "../../assets/Time.svg";

import Folder from "../../assets/FolderFigma.svg";
import file1 from "../../assets/File-to-upload.svg";

import MyDocs from "../../assets/MyDocs.svg";
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
    // console.log({ path: currentFolder === "" ? draveId : currentFolder });
    if (file) {
      let currentFolderTrim = currentFolder;
      if (currentFolderTrim.endsWith("/")) {
        currentFolderTrim = currentFolderTrim.slice(0, -1);
      }
      const path = currentFolderTrim === "" ? draveId : currentFolderTrim;
      const pathDepured = path.replace(/\/\/+/g, "/");
      console.log({ pathDepured });
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

      // Si necesitas trabajar con las rutas de las carpetas como un array
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
          <img src={Search} />
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
            dispatch(setCurrentFolder(draveId + "/"));
            handleNavigate("addon");
            dispatch(selectCategory("addon"));
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="css-yaskf e1wwql4e0"
          >
            <g class="Serverless">
              <path
                fill="#A365F6"
                d="M11.59 3.72a.526.526 0 0 0-.96-.422l-4.056 8.02c-.154.288-.064.536.228.536l2.271-.015c.38 0 .38.194.248.684l-.94 3.858c-.13.64.69.863 1.001.287l4.071-8.06a.301.301 0 0 0-.252-.462l-2.36.01a.236.236 0 0 1-.243-.309z"
                class="fillStrong"
              ></path>
              <path
                fill="#4F0599"
                d="M17.5 14.5A1.5 1.5 0 0 1 16 16h-2.616a.3.3 0 0 1-.29-.373l.311-1.248A.5.5 0 0 1 13.89 14h1.61V6h-1.616a.3.3 0 0 1-.29-.373l.311-1.248A.5.5 0 0 1 14.39 4H16a1.5 1.5 0 0 1 1.5 1.5zm-15-9A1.5 1.5 0 0 1 4 4h3.116a.3.3 0 0 1 .29.373l-.31 1.247A.5.5 0 0 1 6.61 6H4.5v8h1.616a.3.3 0 0 1 .29.373l-.311 1.248A.5.5 0 0 1 5.61 16H4a1.5 1.5 0 0 1-1.5-1.5z"
                class="fill"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </g>
          </svg>
          <p className={style.drive_option_text}>Addons</p>
          <label className={style.drive_option_label}>Soon</label>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            handleNavigate("dashboard");
            dispatch(selectCategory("dashboard"));
            dispatch(setCurrentFolder(draveId + "/"));
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="css-yaskf e1wwql4e0"
          >
            <g class="Containers">
              <path
                fill="#4F0599"
                d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm12 0H5v10h10z"
                class="fill"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
              <path
                fill="#A365F6"
                d="M8 7a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1"
                class="fillStrong"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </g>
          </svg>
          <p className={style.drive_option_text}>Dashboards</p>
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
          <img src={Info} />
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
          <img src={Group} />
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
          <img src={Time} />
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
          <img src={Star} />
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="css-yaskf e1wwql4e0"
          >
            <g class="Database">
              <g class="DB">
                <path
                  fill="#A365F6"
                  d="M10.024 12.797c-2.89 0-6-.841-6-2.69h1.444c.084.32 1.612 1.187 4.556 1.187s4.473-.867 4.557-1.196l1.443.01c0 1.848-3.11 2.69-6 2.69Z"
                  class="fillStrong"
                ></path>
                <path
                  fill="#4F0599"
                  d="M16.497 5.532c0-.01.003-.018.003-.028C16.5 3.44 13.13 2.5 10 2.5s-6.5.94-6.5 3.004c0 .02.005.037.006.057v8.952h.003c.018 2.052 3.373 2.987 6.493 2.987 3.114 0 6.461-.932 6.49-2.977h.005zM10 4.5c2.576 0 4.085.65 4.444 1.004-.359.353-1.868 1.003-4.444 1.003-2.576 0-4.085-.65-4.444-1.003C5.915 5.15 7.425 4.5 10 4.5m.002 11c-2.797 0-4.335-.768-4.489-1.003h-.002V7.75c1.242.512 2.895.757 4.489.757 1.595 0 3.25-.246 4.492-.758v6.679c-.207.328-1.734 1.072-4.49 1.072"
                  class="fill"
                ></path>
              </g>
            </g>
          </svg>
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
          <img src={Trash} />
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
