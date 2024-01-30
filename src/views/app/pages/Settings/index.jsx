import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, useParams, useNavigate, Link } from 'react-router-dom';

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Route, Routes, Outlet, useParams } from 'react-router-dom';
// import { useNavigate  } from 'react-router-dom';


import styles from './index.module.css'



import Home from './home'
import Billing from './billing'
import Contract from './contract'
// import Support from './support'
import Drive from './drive'





const SettingsPath = () => {
  const { settingsTag } = useParams();

  console.log('edwdw', settingsTag)
  let content;

  if (settingsTag === 'billing') {
    content = <Billing />;
  } else if (settingsTag === 'contracts') {
    content = <Contract />;
  } else if (settingsTag === 'support') {
    content = <Support />;
  } else if (settingsTag === 'drive') {
    content = <Drive />;
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

      if(value == 'support'){
        navigate(`/${'es'}/app/${value}`);
      }else{
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
                    Drive
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
                  {/* <Route path="hello" element={<Drive />} /> */}
                  <Route path="*" element={<SettingsPath />} />
                  {/* <Route path="" element={<SettingsPath />} /> */}
                </Routes>
            </div>
            
        </div>
    )
}

export default Settings