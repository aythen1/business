import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom';
import './index.module.css'


import { AddonFlow } from '@addon/Flow'
import { AddonEditor } from '@addon/Editor'




const Addon = ({

}) => {
  return (
      <Routes>
        <Route path="/*" element={<Outlet />}>
          <Route path=":id" element={<AddonFlow/>} />
          <Route path=":id/editor/:page" element={<AddonEditor/>} />
        </Route>
      </Routes>
  )
}

export default Addon
