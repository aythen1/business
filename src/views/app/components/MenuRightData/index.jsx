import styles from "./index.module.css";

import Data from './Data'

export const MenuRightData = ({
  setOpenMenuRight
}) => {
  return (
    <div>
      <div>
        Open Graph
        <button onClick={() => setOpenMenuRight('new')}>
          Graph
        </button>
      </div>
      <Data />
    </div>
  );
};

export default MenuRightData;