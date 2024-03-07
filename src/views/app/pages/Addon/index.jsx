import React, { useEffect, useState } from 'react'
import { Route, Routes, Outlet, useParams } from 'react-router-dom';
// import { useParams } from 'react-o'


// import SettingsIAM from '../Settings/IAM'
// import NotFound from '../pages/404'
import './index.module.css'

// import { loadComponent } from '@addon/utils'
// import { AddonCard } from '@addon/Card'
import { AddonFlow } from '@addon/Flow'
import { AddonEditor } from '@addon/Editor'




const Addon = ({

}) => {
  // const initialRoute = [{
  //   path: 'user',
  //   element: loadComponent('./users')
  // }]

  return (
      <Routes>
        <Route path="/*" element={<Outlet />}>
          <Route path=":id" element={<AddonFlow/>} />
          <Route path=":id/editor/:page" element={<AddonEditor/>} />
          {/* <Route path="card" element={<AddonCard />} /> */}
          {/* <Route path="flow" element={<AddonFlow />} /> */}
          {/* {initialRoute.map((item, index) => (
            <Route key={index} path={item.path + '/*'} element={item.element} />
          ))} */}
        </Route>
      </Routes>
  )
}

export default Addon
