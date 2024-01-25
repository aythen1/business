import styles from "./index.module.css";

import Graph from './Graph'

export const MenuRightGraph = ({ 
  setOpenMenuRight
}) => {
  return (
    <div>
      <div>
        Añadir archivos
        <button 
          onClick={() => setOpenMenuRight('file')}>
          Ficheros
        </button>
      </div>
      <Graph />
    </div>
  );
};

export default MenuRightGraph;