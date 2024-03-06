// DynamicRoute.js
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'

import Home from './views/web/home'
import NotFound from './views/pages/NotFound'




const DynamicRoute = () => {
  return (
    <Routes>
      <Route path="/*" element={<Outlet />}>
        {/* Ruta dinámica que carga el componente correspondiente según el path */}
        {/* <Route index element={<h2>Selecciona un componente</h2>} /> */}
        <Route index element={<Home />} />
        <Route path=":componentName" element={<DynamicComponentLoader />} />
        {/* <Route path=":segmentName/:componentName" element={<DynamicComponentLoader />} /> */}
      </Route>
    </Routes>
  );
};

export default DynamicRoute;


import {
  fetchAddon
} from '@/actions/addon'



const DynamicComponentLoader = () => {
  // Obtiene los parámetros de la ruta (nombre del segmento y del componente)
  const dispatch = useDispatch();
  const { id } = useParams();
  // ...restOfPath
  console.log('eekfwojf', id)

  const { addon, vectors } = useSelector((state) => state.addon)

const [html, setHtml] = useState(null);
const [fetchsItemCompleted, setFetchsItemCompleted] = useState(false);




  
useEffect(() => {
  const fetchsItem = async () => {
    await dispatch(fetchAddon(id))
    setFetchsItemCompleted(true);
  }

  if (Object.keys(addon).length === 0) {
    fetchsItem()
  } else {
    setFetchsItemCompleted(true);
  }
}, [])




useEffect(() => {
  console.log('vv', vectors)
  
  if(vectors.length > 0){
    console.log('status active', vectors)
    setHtml(vectors[0].code)
    // dispatch(setStatus('active'))
  }
}, [vectors])




  // console.log('component', componentName);

  // Importa y renderiza el componente correspondiente según los parámetros de la subruta
  try {    
   // useEffect(() => {
    //   console.log('euheudhe ===> ')
    //   const fetchsItem = async () => {
    //     await dispatch(fetchAddon(id))
    //     setFetchsItemCompleted(true);
    //   }
  
    //   if (Object.keys(addon).length === 0) {
    //     fetchsItem()
    //   } else {
    //     setFetchsItemCompleted(true);
    //   }
    // }, [])
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <Component html={html}/>
      </Suspense>
    );
  } catch (error) {
    // Si no se encuentra un componente específico, renderiza el NotFound genérico
    return <NotFound />;
  }
};



const Component = ({html}) => {
  return(
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
