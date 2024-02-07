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
<<<<<<< HEAD

import { subscribe } from '../../components/eventHandler';
=======
import Dashboard from '../DashBoard'

>>>>>>> a403771b0cc6752b6083fab0ffa3c9942f1114b2



const SettingsPath = ({}) => {
  const { settingsTag } = useParams();

  let content;

  if (settingsTag === 'billing') {
    content = <Billing />;
  } else if (settingsTag === 'contracts') {
    content = <Contract />;
  } else if (settingsTag === 'board') {
    content = <Dashboard />;
  } else if (settingsTag === 'support') {
    content = <Support />;
  } else if (settingsTag === 'home') {
    content = <Home />;
  } else {
    content = <Drive />;
  }

  return content
};




const Settings = ({  }) => {
    const dispatch = useDispatch()
    const { settingsTag } = useParams();


    const navigate = useNavigate();
    const [tag, setTag] = useState(settingsTag || 'drive');

  
    const selectTag = (value) => {
      setTag(value);

      if(value == 'support'){
        navigate(`/${'es'}/app/${value}`);
      }else if(value == 'board'){
        dispatch(setDashboard(null))
        navigate(`/${'es'}/app/settings/${value}`);
      }else{
        // Realiza la navegación según la tag seleccionada
        navigate(`/${'es'}/app/settings/${value}`);
      }
    };

  const [selectedColor, setSelectedColor] = useState('#0000ff');
  useEffect(() => {
    const subscription = subscribe('colorChanged', (color) => {
      setSelectedColor(color);
    });

    return () => {
      subscription(); // Cleanup subscription on component unmount
    };
  }, []);

    return (
        <div className={styles["main"]}>
            <div className={styles["headerButtons"]}>
                <button 
                    onClick={() => selectTag('home')}
                    className={tag === 'home' ? styles.selected : ''}
                    style={{ backgroundColor: selectedColor }}>
                    Home
                </button>
                <button 
                    className={tag === 'drive' ? styles.selected : ''}
                    onClick={() => selectTag('drive')}
                >
                    Drive
                </button>
                <button 
                    className={tag === 'board' ? styles.selected : ''}
                    onClick={() => selectTag('board')}
                >
                    Dashboards
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
                  <Route path="*" element={<SettingsPath  />} />
                  {/* <Route path="" element={<SettingsPath />} /> */}
                </Routes>
            </div>
            
        </div>
    )
}

export default Settings