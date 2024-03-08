import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from 'use-dark-mode';

import generateColors from '@/utils/colors'



import styles from "./index.module.css";

import TopBar from './components/TopBar';
import MenuLeftUser from './components/MenuLeftUser';
import MenuLeftData from './components/MenuLeftData';
import MenuRightData from './components/MenuRightData';
import MenuRightGraph from './components/MenuRightGraph';
import MenuRightComponent from './components/MenuRightComponent';

import ChatBot from './components/ChatBot';
import Modal from './components/Modal';
import NotFound from '../pages/NotFound'

import DashBoard from './pages/DashBoard'

import Support from './pages/Support'

import Ticket from './pages/Support/ticket'
import Tickets from './pages/Support/tickets'


import Settings from './pages/Settings'
import SettingsIAM from './pages/Settings/iam'

import Addon from './pages/Addon'
import GPTs from './pages/OpenAi'
import LangChain from './pages/LangChain'
import Vector from './pages/Vector'



import {
  setOpenMenuLeft,
  setOpenMenuRight,
  setOpenChatBot,
} from '@/actions/iam'



export const App = ({ }) => {
  const darkMode = useDarkMode(false, {
    storageKey: 'prefered-theme', 
    onChange: (value) => {
      const appElement = document.getElementById('app');

      if (value) {
        appElement.classList.remove('light-mode');
        appElement.classList.add('dark-mode');
      } else {
        appElement.classList.remove('dark-mode');
        appElement.classList.add('light-mode');
      }
    }
  });


  const dispatch = useDispatch();
  const [selectedComponent, setSelectedComponent] = useState(null)

  const {
    themeColor,
    openMenuLeft,
    openMenuRight,
    openChatBot
  } = useSelector((state) => state.iam)


  const [themeMode, setThemeMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');

    return storedMode ? storedMode : 'light';
  });


  useEffect(() => {
    if (themeMode == 'dark') {
      localStorage.setItem('darkMode', 'dark')
      darkMode.enable()
    } else {
      localStorage.setItem('darkMode', 'light')
      darkMode.disable()
    }
  }, [themeMode])




  const _selectedComponent = (index) => {
    setSelectedComponent(index)
    if (index) {
      dispatch(setOpenMenuLeft('data'))
      scrollToComponent(index)
    } else {
      dispatch(setOpenMenuLeft(null))
    }

    dispatch(setOpenMenuRight(null))
    dispatch(setOpenChatBot(null))

  }



  const componentRefs = useRef([]);


  const setRef = (index, component) => {
    componentRefs.current[index] = component;
  };


  const scrollToComponent = (index) => {
    if (componentRefs[index]) {
      componentRefs[index].scrollIntoView({ behavior: 'smooth' });
    }
  };



  const [colorsLight, setColorsLight] = useState([])
  const [colorsDark, setColorsDark] = useState([])

  useEffect(() => {
    const color = localStorage.getItem('themeColor')
    if (color) {
      const colors = generateColors(color)
      setColorsLight(colors.light)
      setColorsDark(colors.dark)
    }
  }, [themeColor])


  return (
    <div>
      {themeColor && (
        <style>
          {`
          :root {
            ${colorsLight.map((color, index) => `--color-primary-${index}: ${color};`).join('\n')}
          }
          body.dark-mode {
            ${colorsDark.map((color, index) => `--color-primary-${index}: ${color};`).join('\n')}
          }
        `}
        </style>
      )}
      <Modal />
      <div
        className={styles["TopBar"]}
        onClick={() => {
          dispatch(setOpenChatBot(null))
          // dispatch(setOpenMenuRight(null))
          dispatch(setOpenMenuLeft(null))
          // _selectedComponent(null)
        }}
      >
        <TopBar
          themeMode={themeMode}
          setThemeMode={setThemeMode}
        />
      </div>
      <div className={styles["Container"]}>
        <div
          className={styles["Board"]}
          onClick={() => _selectedComponent(null)}
        >
          <Routes>
            <Route path="board/*" element={<DashBoard />} />
            <Route path="/*" element={<Outlet />}>
              <Route path="iam" element={<SettingsIAM />} />

              <Route path="" element={<Settings />} />
              <Route path="settings/:settingsTag/*" element={<Settings />} />

              <Route path="vector" element={<Vector />} />
              <Route path="vector/:vectorId" element={<Vector />} />

              <Route path="support" element={<Support />} />
              <Route path="support/tickets" element={<Tickets />} />
              <Route path="support/ticket/:ticketId" element={<Ticket />} />

              <Route path="addon/:addonId" element={<Addon />} />
              <Route path="addon/:addonId/:templateId" element={<Addon />} />
              <Route path="gpt" element={<GPTs />} />
              <Route path="langchain" element={<LangChain />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
        {openMenuLeft && (
          <div
            className={styles["MenuLeft"]}
            style={{ display: 'block' }}
          >
            {openMenuLeft == 'user' ? (
              <div className={styles["MenuLeftUser"]}>
                <MenuLeftUser />
              </div>
            ) : (
              <div className={styles["MenuLeftData"]}>
                <MenuLeftData setRef={setRef} />
              </div>
            )}
          </div>
        )}
        {openMenuRight && (
          <div>
            {openMenuRight == 'graph' ? (
              <div className={styles["MenuRightGraph"]}
                style={{ display: 'block' }}
              >
                <MenuRightGraph />
              </div>
            ) : openMenuRight == 'data' ? (
              <div className={styles["MenuRightData"]}
                style={{ display: 'block' }}
              >
                <MenuRightData />
              </div>
            ) : openMenuRight == 'component' && (
              <div className={styles["MenuRightComponent"]}>
                <MenuRightComponent />
              </div>
            )}
          </div>
        )}
      </div>
      {openChatBot && (
        <div className={styles["ChatBot"]}>
          <ChatBot />
        </div>
      )}
    </div>
  );
};

export default App;



