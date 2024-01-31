import styles from "./index.module.css";

import Graph from './Graph'


import {
  setOpenMenuRight,
} from '@/actions/iam'



export const MenuRightGraph = ({ 
  
}) => {
  return (
    <div>
      <div>
        Añadir archivos
        <button 
          onClick={() => setOpenMenuRight('data')}>
          Ficheros
        </button>
      </div>
      <Graph />
    </div>
  );
};

export default MenuRightGraph;