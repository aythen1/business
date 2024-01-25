// DynamicRoute.js
import React, { lazy, Suspense } from 'react';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';

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

const DynamicComponentLoader = () => {
  // Obtiene los parámetros de la ruta (nombre del segmento y del componente)
  const { segmentName, componentName } = useParams();

  console.log('segment', segmentName);
  console.log('component', componentName);

  // Importa y renderiza el componente correspondiente según los parámetros de la subruta
  try {
    const DynamicComponent = lazy(() =>
      import(`./views/${'web'}/${componentName}.jsx`)
      // import(`./views/${segmentName}/${componentName}.jsx`)
    );
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <DynamicComponent />
      </Suspense>
    );
  } catch (error) {
    // Si no se encuentra un componente específico, renderiza el NotFound genérico
    return <NotFound />;
  }
};

export default DynamicRoute;