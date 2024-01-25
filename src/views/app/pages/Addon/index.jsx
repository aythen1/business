import React, { useEffect, useState } from 'react'
import { Route, Routes, Outlet, useParams } from 'react-router-dom';


import SettingsIAM from '../Settings/IAM'
// import NotFound from '../pages/404'


import { loadComponent } from '@addon/utils'

import Users from './users';

const Templates = ({
  Index
}) => {


  const initialRoute = [{
    path: 'user',
    element: loadComponent('./users')
  }]
 
  return (
    <div >
        <Routes>
              <Route path="" element={<div>Hello world</div>} />
              <Route path="/*" element={<Outlet />}>
                {initialRoute.map((item, index) => (

                <Route key={index} path={item.path + '/*'} element={item.element} />
                ))}
               
                <Route path="iam" element={<SettingsIAM />} />
                {/* <Route element={<NotFound />} /> */}
              </Route>
            </Routes>
    </div>
  )
}

export default Templates
