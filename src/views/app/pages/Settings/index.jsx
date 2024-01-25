import React, { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import styles from './index.module.css'



import Home from './home'
import Billing from './billing'
import Contract from './contract'
import Support from './support'



const getComponentByTag = (tag) => {
    switch (tag) {
      case 'home':
        return <Home />;
      case 'billing':
        return <Billing />;
      case 'contracts':
        return <Contract />;
      case 'support':
        return <Support />;
      default:
        return <Home />;
    }
  };


const Settings = ({ }) => {
    const { settingsTag } = useParams();

    console.log('ddsettingsTag', settingsTag)

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
                {getComponentByTag(tag)}
            </div>
            
        </div>
    )
}

export default Settings