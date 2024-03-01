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
} from "@/actions/assets";
import style from "./left-panel.module.css";
// import Image from 'next/image'
// import Chevron from '../../../../../../../assets/Vector 161 (Stroke).svg'
import IconGroup from "../../assets/IconGroup.svg";
import Search from "../../assets/search.svg";
// import Info from "../../assets/Info.svg";
import IconStar from "../../assets/IconStar.svg";
import IconGlaciar from "../../assets/IconGlaciar.svg";
import IconTrash from "../../assets/IconTrash.svg";
import IconTime from "../../assets/IconTime.svg";

import Folder from "../../assets/FolderFigma.svg";
import file1 from "../../assets/File-to-upload.svg";

import MyDocs from "../../assets/MyDocs.svg";
import IconAddon from "../../assets/IconAddon.svg";
import IconPriority from '../../assets/IconDashboard.svg'

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

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.persistedReducer.user)
  // const user = JSON.parse(localStorage.getItem('user')).user
  const { currentFolder, loading, searchFiles } = useSelector(
    (state) => state.assets
  );
  const [nameFolder, setNameFolder] = useState("");
  const [newPopup, setNewPopup] = useState(isNew || false);
  const [newSubPopup, setSubNewPopup] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isCreatingFolder = loading?.UPDATE_DIRECTORY === true;

  // ------------------------------------
  useEffect(() => {
    // setNewPopup(newPopup)
    console.log("new", newPopup);
    if (newPopup == "title") {
    } else if (newPopup == "lancedb") {
      // alert(11)
      dispatch(setModal(<ModalLanceDb />));
    }
  }, [newPopup]);

  const handleCreateNewFolder = async () => {
    if (!nameFolder.trim()) {
      return;
    }

    const folderPath =
      currentFolder === ""
        ? `${driveId}/${nameFolder}`
        : `${currentFolder}/${nameFolder}`;
    // Puedes verificar si ya existe una carpeta con ese nombre aquí
    // y modificar newFolderName en consecuencia, por ejemplo, añadiendo un número

    await dispatch(createNewFolder(folderPath));
    console.log("listo");
    dispatch(addFolderLocal(folderPath + "/"));
    // Limpiar el estado después de crear la carpeta
    setModalIsOpen(false);
    setNameFolder("");
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      dispatch(
        uploadFile({
          file,
          path: currentFolder === "" ? draveId : currentFolder,
        })
      );
    }
    setNewPopup(false);
  };
  const handleNavigate = (path) => {
    // router.push(`/${lng}/workspace/${id}/drive/${driveId}/${path}`)
    navigate(`/${lng}/app/settings/drive/${path}`);
  };

  const handleClickMvp = () => {
    setSubNewPopup(true);
  };

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
          <div className={style.drive_create_new_option}>
            <img src={file1} width={25} height={25} />

            <p>Subir carpeta</p>
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
            }}
          >
            Mis documentos
          </p>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            handleNavigate("addon");
            dispatch(selectCategory("addon"));
          }}
        >
          <img src={IconAddon} />
          <p className={style.drive_option_text}>Addons</p>
          <label className={style.drive_option_label}>Soon</label>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            handleNavigate("priority");
            dispatch(selectCategory("priority"));
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
          }}
        >
          <img src={IconTime} />
          <p className={style.drive_option_text}>Recientes</p>
        </div>
        <div
          className={style.drive_option}
          onClick={() => {
            handleNavigate("featured");
            dispatch(selectCategory("featured"));
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
