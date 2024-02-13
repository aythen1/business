import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './style.css'
import './global.css'

import { Provider } from 'react-redux';

import store from '@/utils/store';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import { createRoot } from 'react-dom/client';
// import BarChartBorderRadius from './views/BarChartBorderRadius'
// import DoughnutChart from './views/DoughnutChart'

import Test from './test';
// import Web from './views/web'
import DynamicRoute from './DynamicRoute';
import Register from './views/app/auth/register';
import Login from './views/app/auth/login';
import RecoverPassword from './views/app/auth/recover-password';


import App from './views/app'
// import Dashboard from './views/app/pages/DashBoard'
// import Home from './views/app/pivot/components/DashBoard/home'
import NotFound from './views/pages/NotFound'


// import { isAuthenticated } from './views/app/auth/auth';

import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';


import { verify } from '@/actions/iam'

const root = createRoot(document.getElementById("app"));


const ProtectedRoute = ({ element, setIsAuth }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isElement, setIsElement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      var token = localStorage.getItem('token')
      if (!token || token == 'undefined') {
        navigate('/es/login')
        setIsAuth(false)
        setIsElement(null)
        return false
      }

      var res = await dispatch(verify({}))


      if (res.error?.message >= 500 && res.error?.message <= 599) {
        navigate('/es/login')
        setIsAuth(false)
        setIsElement(null)
      }

      if (res.payload?.user?.name) {
        document.title = 'AY > ' + res.payload.user.name
      }

      if (res.payload?.user?.id) {
        // http://localhost:3001/service/v1/iam/user/310afa87-242a-4a33-941c-9e318b2ca24a
        // Crear un nuevo elemento link
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = `http://localhost:3001/service/v1/iam/user/${res.payload?.user?.id}`;
        faviconLink.type = 'image/x-icon';

        // Asegurarse de que haya un head en el documento
        const head = document.head || document.getElementsByTagName('head')[0];

        // Eliminar cualquier favicon existente
        const existingFavicon = document.querySelector('link[rel="icon"]');
        if (existingFavicon) {
          head.removeChild(existingFavicon);
        }

        // Agregar el nuevo favicon al head
        head.appendChild(faviconLink);
      }

      setIsAuth(true)
      setIsElement(element)
    }

    fetchData()
  }, []);



  return isElement
};



// -----------------------
const supportedLanguages = ['es', 'en', 'pt', 'fr'];
const defaultLanguage = 'es'; // Idioma por defecto

const { pathname } = window.location;
const languageFromPath = pathname.split('/')[1];

if (!languageFromPath || !supportedLanguages.includes(languageFromPath)) {
  window.location.replace(`/${defaultLanguage}${pathname}`);
}


const Layout = () => {
  const [isAuth, setIsAuth] = useState(false)
  // const dispatch = useDispatch()
  // Verificar el idioma y redirigir si es necesario
  const { pathname } = window.location;
  const languageFromPath = pathname.split('/')[1];
  const currentLanguage = languageFromPath && supportedLanguages.includes(languageFromPath)
    ? languageFromPath
    : defaultLanguage;

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);


  // useEffect(() => {
  //   const _token = localStorage.getItem('token')
  //   if(_token) setIsAuth = true
  // }, [])

  // ----------------------------------------------------------
  const [colors, setColors] = useState([])

  const generateColors = (startColor, steps = 6) => {
    const colorList = [];
    const startRGB = hexToRgb(startColor);
  
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      const color = interpolateColor([255, 255, 255], startRGB, ratio); // Interpolamos con blanco para suavizar
      colorList.push(rgbToHex(color));
    }
  
    return colorList.reverse();
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  
const rgbToHex = (rgb) => {
  return (
    '#' +
    ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
      .toString(16)
      .slice(1)
  );
};

  const interpolateColor = (startRGB, endRGB, ratio) => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(startRGB[i] + ratio * (endRGB[i] - startRGB[i]));
    }
    return result;
  };  

  useEffect(() => {
    const color = localStorage.getItem('themeColor')
    setColors( generateColors(color) )
  }, [])

  return (
    <div>
      {colors && (
      <style>
        {`
          :root, body.dark-mode {
            ${colors.map((color, index) => `--color-primary-${index}: ${color};`).join('\n')}
          }
        `}
      </style>
      )}

    <I18nextProvider i18n={i18n}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/:lng/vector/:vectorId"
                element={<Test />}
              />

              <Route
                path="/:lng/*"
                element={<DynamicRoute />}
              />

              <Route
                path="/:lng/register"
                element={isAuth ? <App /> : <Register />}
              />
              <Route
                path="/:lng/login"
                element={isAuth ? <App /> : <Login />}
              />
              <Route
                path="/:lng/recover-password"
                element={isAuth ? <App /> : <RecoverPassword />}
              />
              <Route
                path="/:lng/app/*"
                element={<ProtectedRoute element={<App />} setIsAuth={setIsAuth} />}
              />
              <Route
                index
                element={<NotFound />}
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      </DndProvider>
    </I18nextProvider>
    </div>
  );
};

root.render(<Layout />);
