import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, Outlet, useParams, useNavigate, Link } from 'react-router-dom';

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Route, Routes, Outlet, useParams } from 'react-router-dom';
// import { useNavigate  } from 'react-router-dom';


import styles from './index.module.css'

import {
  setDashboard
} from '@/slices/dashboardSlice'


import Home from './home'
import Billing from './billing'
import Contract from './contract'
// import Support from './support'
import Drive from './drive'
import Bank from './bank'
// import Dashboard from '../DashBoard'

import Vector from '../Vector'




const SettingsPath = ({ }) => {
  const { settingsTag } = useParams();

  let content;

  if (settingsTag === 'billing') {
    content = <Billing />;
  } else if (settingsTag === 'contracts') {
    content = <Contract />;
  } else if (settingsTag === 'support') {
    content = <Support />;
  } else if (settingsTag === 'home') {
    content = <Home />;
  } else if (settingsTag === 'vector') {
    content = <Vector />;
  } else if (settingsTag === 'bank') {
    content = <Bank />;
  }else {
    content = <Drive />;
  }

  return content
};




const Settings = ({ }) => {
  const dispatch = useDispatch()
  const { settingsTag } = useParams();


  const navigate = useNavigate();
  const [tag, setTag] = useState(settingsTag || 'drive');


  const selectTag = (value) => {
    setTag(value);

    if (value == 'support') {
      navigate(`/${'es'}/app/support`);
    } else if (value == 'vector') {
      navigate(`/${'es'}/app/vector`);
    } else if (value == 'board') {
      dispatch(setDashboard(null))
      navigate(`/${'es'}/app/settings/${value}`);
    } else {
      // Realiza la navegación según la tag seleccionada
      navigate(`/${'es'}/app/settings/${value}`);
    }
  };


  return (
    <div className={styles["main"]}>
      <div className={styles["headerButtons"]}>
        <button
          onClick={() => selectTag('home')}
          className={tag === 'home' ? styles.selected : ''}
        >
          Home
        </button>
        <button
          className={tag === 'drive' ? styles.selected : ''}
          onClick={() => selectTag('drive')}
        >
          Mis documentos
        </button>
        <button
          className={tag === 'billing' ? styles.selected : ''}
          onClick={() => selectTag('billing')}
        >
          Billing
        </button>
        <button
          className={tag === 'contracts' ? styles.selected : ''}
          onClick={() => selectTag('contracts')}
        >
          Contracts
        </button>
        <button
          style={{ marginLeft: 'auto' }}
          className={tag === 'test' ? styles.selected : ''}
          onClick={() => selectTag('vector')}
        >
          Aythen DB
        </button>
        <button
          className={tag === 'support' ? styles.selected : ''}
          onClick={() => selectTag('support')}
        >
          Support
        </button>
      </div>
      <div>
        <Routes>
          {/* <Route path="hello" element={<Drive />} /> */}
          <Route path="*" element={<SettingsPath />} />
          {/* <Route path="" element={<SettingsPath />} /> */}
        </Routes>
      </div>

    </div>
  )
}

export default Settings