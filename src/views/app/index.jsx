import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from 'use-dark-mode';


import styles from "./index.module.css";

import TopBar from './components/TopBar';
import MenuLeftUser from './components/MenuLeftUser';
import MenuLeftData from './components/MenuLeftData';
import MenuRightData from './components/MenuRightData';
import MenuRightGraph from './components/MenuRightGraph';
import ChatBot from './components/ChatBot';
import Modal from './components/Modal';
import NotFound from '../pages/NotFound'


// import Pivot from './pivot'
// import Home from './views/web/home'
// import Dashboard from './pivot/components/DashBoard'


import DashBoard from './pages/DashBoard'
import Pivot from './pages/DashBoard/Pivot'

import Settings from './pages/Settings'
import SettingsIAM from './pages/Settings/IAM'
// import SettingsBilling from './pages/Settings/billing'
// import SettingsContract from './pages/Settings/contract'
import Drive from './pages/Drive'
import Addon from './pages/Addon'
import GPTs from './pages/OpenAi'
import LangChain from './pages/LangChain'


// import useDarkMode from 'use-dark-mode';
// import Component from './Dashboard/Component'
// import DragAndDrop from './Component/DragAndDrop';
// import Home from './pivot/components/DashBoard/home'




export const App = ({ }) => {

  // const darkMode = useDarkMode(false);

  const darkMode = useDarkMode(false, {
    storageKey: 'prefered-theme', // Cambiar esto según tus necesidades
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
  const [openMenuRight, setOpenMenuRight] = useState(null)
  const [openChatBot, setOpenChatBot] = useState(null)
  const [openMenuLeft, setOpenMenuLeft] = useState(null)

  const [dashboardId, setDashboardId] = useState(null)

  // Estado para controlar el modo oscuro o claro
  const [themeMode, setThemeMode] = useState(() => {
    // Intentar obtener el modo desde localStorage al cargar la aplicación
    const storedMode = localStorage.getItem('darkMode');

    return storedMode ? storedMode : 'light';
  });

  // Función para cambiar entre modos oscuro y claro
  // const setThemeMode = (theme) => {
  //   setIsDarkMode(theme);
  //   // Guardar la preferencia en localStorage
  //   localStorage.setItem('themeMode', theme);
  // };

  useEffect(() => {
    if (themeMode == 'dark') {
      localStorage.setItem('darkMode', 'dark')
      darkMode.enable()
    } else {
      localStorage.setItem('darkMode', 'light')
      darkMode.disable()
    }
    // darkMode.toggle();
  }, [themeMode])


  // useEffect(() => {
  //   const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   console.log('prefers', prefersDarkMode)
  //   if (prefersDarkMode && !darkMode.value) {
  //     darkMode.enable();
  //   }
  // }, [darkMode]);



  // Efecto secundario para establecer el modo inicial al cargar la aplicación
  useEffect(() => {
    // Obtener la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    // Obtener el valor del parámetro 'dashboard'
    const dashboardParam = urlParams.get('dashboard');

    if (dashboardParam) {
      setDashboardId(dashboardParam)
    }

  }, []);




  useEffect(() => {
    // Ejemplo de cómo dispatch una acción al montar el componente
    const user = { id: 1, name: 'John Doe' };
    // dispatch(setUser(user));

    // También puedes realizar acciones asíncronas utilizando Thunk, Saga, etc.
    // dispatch(fetchUserData());
  }, [dispatch]);


  const {
    component,
    components
  } = useSelector((state) => state.component);


  const _selectedComponent = (index) => {
    setSelectedComponent(index)
    if (index) {
      setOpenMenuLeft('data')
      scrollToComponent(index)
    } else {
      setOpenMenuLeft(null)
    }

    setOpenMenuRight(null)
    setOpenChatBot(null)

  }



  // const [lists, setLists] = useState([])
  const componentRefs = useRef([]);


  // Función para asignar una referencia a un elemento en el índice dado
  const setRef = (index, component) => {
    console.log('set', index)
    componentRefs.current[index] = component;
  };


  // Función para hacer scroll hacia un elemento en el índice dado
  const scrollToComponent = (index) => {
    console.log('cooeoe', componentRefs, index)
    if (componentRefs[index]) {
      componentRefs[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  //



  return (
    <div >
      <Modal />
      <div className={styles["TopBar"]}>
        <TopBar
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          setOpenMenuLeft={setOpenMenuLeft}
          setOpenChatBot={setOpenChatBot}
        />
      </div>
      <div className={styles["Container"]}>
        <div
          onClick={() => {
            setOpenChatBot(null)
            setOpenMenuRight(null)
            _selectedComponent(null)
          }
          }
        >


          <div>
            <Routes>
              <Route path="home" element={<DashBoard />} />
              <Route path="/*" element={<Outlet />}>
                {/* Ruta dinámica que carga el componente correspondiente según el path */}
                <Route path="iam" element={<SettingsIAM />} />

                <Route path="" element={<Settings />} />
                <Route path="settings" element={<Settings />} />
                <Route path="settings/:settingsTag" element={<Settings />} />
                {/* <Route path="billing" element={<SettingsBilling />} /> */}
                {/* <Route path="contract" element={<SettingsContract />} /> */}
                <Route path="addon/*" element={<Addon />} />
                <Route path="addon" element={<Addon />} />
                <Route path="drive/:id" element={<Drive />} />
                <Route path="gpt" element={<GPTs />} />
                <Route path="langchain" element={<LangChain />} />
                <Route path="drive" element={<Drive />} />
                {/* <Route path=":id" element={<Pivot />} /> */}
                <Route path="*" element={<NotFound />} />
                {/* <Route path=":segmentName/:componentName" element={<DynamicComponentLoader />} /> */}
              </Route>
            </Routes>
          </div>


        </div>
        {openMenuLeft && (
          <div
            className={styles["MenuLeft"]}
            style={{ display: 'block' }}
          >
            {openMenuLeft == 'user' ? (
              <MenuLeftUser
                setOpenMenuLeft={setOpenMenuLeft}
              />
            ) : (
              <MenuLeftData
                components={components}
                setRef={setRef}
              />
            )}
            {/* <MenuLeftUser /> */}
          </div>
        )}
        {openMenuRight && (
          <div>
            {openMenuRight == 'new' ? (
              <div className={styles["MenuRightGraph"]}
                style={{ display: 'block' }}
              >
                <MenuRightGraph
                  setOpenMenuRight={setOpenMenuRight}
                />
              </div>
            ) : (
              <div className={styles["MenuRightData"]}
                style={{ display: 'block' }}
              >
                <MenuRightData
                  setOpenMenuRight={setOpenMenuRight}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {openChatBot && (
        <div className={styles["ChatBot"]}>
          <ChatBot setOpenChatBot={setOpenChatBot} />
        </div>
      )}
    </div>
  );
};

export default App;





// DynamicRoute.js



// const DynamicComponentLoader = () => {
//   // Obtiene los parámetros de la ruta (nombre del segmento y del componente)
//   const { segmentName, componentName } = useParams();

//   // Importa y renderiza el componente correspondiente según los parámetros de la subruta
//   try {
//     const DynamicComponent = lazy(() =>
//       import(`./views/${'web'}/${componentName}.jsx`)
//       // import(`./views/${segmentName}/${componentName}.jsx`)
//     );
//     return (
//       <Suspense fallback={<div>Cargando...</div>}>
//         <DynamicComponent />
//       </Suspense>
//     );
//   } catch (error) {
//     // Si no se encuentra un componente específico, renderiza el NotFound genérico
//     return <NotFound />;
//   }
// };

