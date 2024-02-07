import React, { useEffect, useState } from 'react'
import { Route, Routes, Outlet, useParams } from 'react-router-dom';
// import { useParams } from 'react-o'


// import SettingsIAM from '../Settings/IAM'
// import NotFound from '../pages/404'
// import './index.css'

import { loadComponent } from '@addon/utils'
import { AddonEditor } from '@addon/Editor'
import { AddonCard } from '@addon/Card'




const Addon = ({

}) => {
  const initialRoute = [{
    path: 'user',
    element: loadComponent('./users')
  }]

  return (
    <div >
      <Routes>
        <Route path="/*" element={<Outlet />}>
          <Route path="card" element={<AddonCard />} />
          <Route path=":id" element={<AddonEditor/>} />
          {initialRoute.map((item, index) => (

            <Route key={index} path={item.path + '/*'} element={item.element} />
          ))}

        </Route>
      </Routes>
    </div>
  )
}

export default Addon
