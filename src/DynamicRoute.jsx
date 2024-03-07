import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'

import Home from './views/web/home'
import NotFound from './views/pages/NotFound'




const DynamicRoute = () => {
  return (
    <Routes>
      <Route path="/*" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path=":componentName" element={<DynamicComponentLoader />} />
      </Route>
    </Routes>
  );
};

export default DynamicRoute;


import {
  fetchAddon
} from '@/actions/addon'



const DynamicComponentLoader = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

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
  }
}, [vectors])


  try {    
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <Component html={html}/>
      </Suspense>
    );
  } catch (error) {
    return <NotFound />;
  }
};



const Component = ({html}) => {
  return(
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
