import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser2 } from "@/actions/iam";
import styles from "../left-panel/left-panel.module.css";
import Table from "../../../iam/table";

function ShareFiles({ selectedFolders, setModalIsOpen }) {
  const dispatch = useDispatch();
  const { token, users } = useSelector((state) => state.iam);
  const [stateTable, setStateTable] = useState([]);
  const handleSelectUser = (newId) => {
    setStateTable((prevSelectedUsers) => {
      // Verificar si el usuario ya está seleccionado
      if (prevSelectedUsers.includes(newId)) {
        // Usuario ya seleccionado, lo quitamos del arreglo
        return prevSelectedUsers.filter((id) => id !== newId);
      } else {
        // Usuario no seleccionado, lo añadimos al arreglo
        return [...prevSelectedUsers, newId];
      }
    });
  };
  // useEffect(() => {
  //   if (stateTable.startsWith("edit-item:")) {
  //     const id = stateTable.split(":")[1];
  //     const index = users.findIndex((user) => user.id === id);
  //     const user = users[index];

  //     dispatch(setModal(<PopupModalUser user={user} styles={stylesModal} />));
  //   } else if (stateTable.startsWith("delete-item:")) {
  //     const id = stateTable.split(":")[1];
  //     console.log(stateTable);
  //     dispatch(deleteUser({ id }));
  //   } else if (stateTable.startsWith("checkbox-item")) {
  //     console.log(stateTable);
  //   }
  //   console.log({ stateTable });
  // }, [stateTable]);

  useEffect(() => {
    dispatch(fetchUser2(token));
  }, []);

  return (
    <div
      className={styles.drive_modal_container}
      style={{ width: "auto", overflow: "hidden scroll", height: "500px" }}
    >
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
          <Table
            fetchs={fetchUser2}
            items={users}
            setStateTable={handleSelectUser}
            handleAdd={() =>
              dispatch(setModal(<PopupModalAddUser styles={stylesModal} />))
            }
          >
            <header>Users</header>
            <item filter="checkbox" size="50"></item>
            <item filter="user-email">User</item>
            <item>Is Verified</item>
            <item filter="date" name="upgradedat">
              Last Login
            </item>
            <item filter="date" name="upgradedat">
              Joined On
            </item>
            <item filter="options">Options</item>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ShareFiles;
