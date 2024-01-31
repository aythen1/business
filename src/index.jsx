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

// import Web from './views/web'
import DynamicRoute from './DynamicRoute';
import Register from './views/app/auth/register';
import Login from './views/app/auth/login';
import RecoverPassword from './views/app/auth/recover-password';


import App from './views/app'
import Dashboard from './views/app/pages/DashBoard'
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
          if(!token) {
            navigate('/es/login')
            setIsElement(null)
            return false
          }
          var res = await dispatch(verify(token))

          if (res.error?.message >= 500 && res.error?.message <= 599) {
            navigate('/es/login')
            setIsElement(null)
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
  const [ isAuth, setIsAuth] = useState(false)
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
  
  return (
    <I18nextProvider i18n={i18n}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <BrowserRouter>
          <Routes>
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
                path="/:lng/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/:lng/app/*"
                element={<ProtectedRoute element={<App />} setIsAuth={setIsAuth}  />}
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
  );
};

root.render(<Layout />);
