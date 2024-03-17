import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



import styles from './index.module.css'

import {
  setDashboard
} from '@/slices/dashboardSlice'


import Home from './home'
import Billing from './billing'
import Contract from './contract'
import Drive from './drive'
import Bank from './bank'
import Support from './support'

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
  } else if (settingsTag === 'drive') {
    content = <Drive />;
  } else if (settingsTag === 'vector') {
    content = <Vector />;
  } else if (settingsTag === 'bank') {
    content = <Bank />;
  }else {
    content = <Home />;
  }

  return content
};




const Settings = ({ }) => {
  const { t } = useTranslation();
  const { settingsTag } = useParams();

  const dispatch = useDispatch()
  const navigate = useNavigate();


  const [tag, setTag] = useState(settingsTag || 'home');


  const selectTag = (value) => {
    setTag(value);

    if (value == 'support') {
      navigate(`/${'es'}/app/settings/support`);
    } else if (value == 'vector') {
      navigate(`/${'es'}/app/settings/vector`);
    } else if (value == 'board') {
      dispatch(setDashboard(null))
      navigate(`/${'es'}/app/settings/${value}`);
    } else {
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
          {t('settings.t1')}
        </button>
        <button
          className={tag === 'drive' ? styles.selected : ''}
          onClick={() => selectTag('drive')}
          >
          {t('settings.t2')}
        </button>
        <button
          className={tag === 'billing' ? styles.selected : ''}
          onClick={() => selectTag('billing')}
          >
          {t('settings.t3')}
        </button>
        <button
          className={tag === 'contracts' ? styles.selected : ''}
          onClick={() => selectTag('contracts')}
          >
          {t('settings.t4')}
        </button>
        <button
          style={{ marginLeft: 'auto' }}
          className={tag === 'vector' ? styles.selected : ''}
          onClick={() => selectTag('vector')}
          >
          {t('settings.t5')}
        </button>
        <button
          className={tag === 'support' ? styles.selected : ''}
          onClick={() => selectTag('support')}
          >
          {t('settings.t6')}
        </button>
      </div>
      <div>
        <Routes>
          <Route path="*" element={<SettingsPath />} />
        </Routes>
      </div>

    </div>
  )
}

export default Settings