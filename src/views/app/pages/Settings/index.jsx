import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, useParams, useNavigate, Link } from 'react-router-dom';

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Route, Routes, Outlet, useParams } from 'react-router-dom';
// import { useNavigate  } from 'react-router-dom';


import styles from './index.module.css'



import Home from './home'
import Billing from './billing'
import Contract from './contract'
import Support from './support'





const SettingsPath = () => {
  const { settingsTag } = useParams();

  let content;

  if (settingsTag === 'billing') {
    content = <Billing />;
  } else if (settingsTag === 'contracts') {
    content = <Contract />;
  } else if (settingsTag === 'support') {
    content = <Support />;
  } else {
    content = <Home />;
  }

  return content
};




const Settings = ({ }) => {
    const { settingsTag } = useParams();


    const navigate = useNavigate();
    const [tag, setTag] = useState(settingsTag || 'home');

  
    const selectTag = (value) => {
      setTag(value);
      // Realiza la navegación según la tag seleccionada
      navigate(`/${'es'}/app/settings/${value}`);
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
                    className={tag === 'support' ? styles.selected : ''}
                    onClick={() => selectTag('support')}
                >
                    Support
                </button>
            </div>
            <div>
                <Routes>
                  <Route path="" element={<SettingsPath />} />
                </Routes>
            </div>
            
        </div>
    )
}

export default Settings