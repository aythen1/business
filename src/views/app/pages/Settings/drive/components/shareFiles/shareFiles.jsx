import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/actions/iam";
import styles from "../left-panel/left-panel.module.css";

function ShareFiles({ selectedFolders, setModalIsOpen }) {
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log("soy share files");
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div className={styles.drive_modal_container}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ borderBottom: "1px solid #c6c6c6" }}
          className={styles.drive_modal_title_container}
        >
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            Cancelar
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShareFiles;
