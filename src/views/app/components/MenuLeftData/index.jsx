import styles from './index.module.css';
import React, { useState } from 'react';
import Data from './Data'

import { useSelector, useDispatch } from 'react-redux';

const MenuLeftData = ({ 
  setRef,
  components
}) => {
 
  // const {
  //   components
  // } = useSelector((state) => state.component);

  
 



  return (
    <div className={styles.container}>
      {components.map((component, index) => (
        <div key={index} ref={(element) => setRef(index, component)}>
          <Data />
        </div>
      ))}
    </div>
  );
};

export default MenuLeftData;