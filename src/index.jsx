import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './style.css'
import './global.css'

import { Provider } from 'react-redux';


import store from '@/utils/store';
import generateColors from '@/utils/colors'


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import { createRoot } from 'react-dom/client';

import Admin from './admin';
import Test from './test';

import Search from './views/app/pages/Search'
import DynamicRoute from './DynamicRoute';
import Register from './views/app/auth/register';
import Login from './views/app/auth/login';
import RecoverPassword from './views/app/auth/recover-password';



import App from './views/app'
import NotFound from './views/pages/NotFound'


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
        navigate('/es/app/login')
        setIsAuth(false)
        setIsElement(null)
        window.location.reload();
        return false
      }

      var res = await dispatch(verify({}))


      if (res.error?.message >= 500 && res.error?.message <= 599) {
        navigate('/es/app/login')
        setIsAuth(false)
        setIsElement(null)
        window.location.reload();
        return false
      }

      if (res.payload?.user?.name) {
        document.title = 'AY > ' + res.payload.user.name
      } else {
        document.title = 'AythenDB'
      }

      if (res.payload?.user?.id) {
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = `http://localhost:3001/service/v1/iam/user/${res.payload?.user?.id}`;
        faviconLink.type = 'image/x-icon';

        const head = document.head || document.getElementsByTagName('head')[0];

        const existingFavicon = document.querySelector('link[rel="icon"]');
        if (existingFavicon) {
          head.removeChild(existingFavicon);
        }

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
const defaultLanguage = 'es';

const { pathname } = window.location;
const languageFromPath = pathname.split('/')[1];

if (!languageFromPath || !supportedLanguages.includes(languageFromPath)) {
  window.location.replace(`/${defaultLanguage}${pathname}`);
}


const Layout = () => {
  const [isAuth, setIsAuth] = useState(false)
  const { pathname } = window.location;
  const languageFromPath = pathname.split('/')[1];
  const currentLanguage = languageFromPath && supportedLanguages.includes(languageFromPath)
    ? languageFromPath
    : defaultLanguage;

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);


  // ----------------------------------------------------------
  const [colorsLight, setColorsLight] = useState([])
  const [colorsDark, setColorsDark] = useState([])

  useEffect(() => {
    const color = localStorage.getItem('themeColor')
    if (color) {
      const colors = generateColors(color)

      setColorsLight(colors.light)
      setColorsDark(colors.dark)
    }
  }, [])

  return (
    <div>
      {colorsLight.length > 0 && (
        <style>
          {`
          :root{
            ${colorsLight.map((color, index) => `--color-primary-${index}: ${color};`).join('\n')}
          }
          body.dark-mode{
            ${colorsDark.map((color, index) => `--color-primary-${index}: ${color};`).join('\n')}
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
                  path="/:lng/admin"
                  element={<Admin />}
                />

                <Route
                  path="/:lng/test"
                  element={<Test />}
                />


                <Route
                  path="/:lng/vector/:vectorId"
                  element={<Test />}
                />

                <Route path="/:lng/" element={<Search />} />
                
                <Route
                  path="/:lng/*"
                  element={<DynamicRoute />}
                />

                <Route
                  path="/:lng/app/register"
                  element={isAuth ? <App /> : <Register />}
                />
                <Route
                  path="/:lng/app/login"
                  element={isAuth ? <App /> : <Login />}
                />
                <Route
                  path="/:lng/app/recover-password"
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
