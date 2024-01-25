import React, { useEffect, useState } from 'react'
import { Route, Routes, Outlet, useParams } from 'react-router-dom';



/*
 

routes: {
    'path': {
        allowed: [],
        version: '',
        props: {}
        data: {
            'model': {
                reducer: {
                    'name': function()
                },
                required: []
            }

        }
    }
}
*/




// import SettingsIAM from '../Settings/IAM'
// import NotFound from '../pages/404'

// Función para cargar dinámicamente los componentes
import { loadComponent } from '@addon/utils'

const User = ({
  Index
}) => {


//   const initialRoute = [{
//     path: 'iams',
//     element: React.lazy(() => import('./users'))
//   }]

 
const initialRoute = [{
  path: 'insert',
  element:  loadComponent('./users/insert')
}]

  
  return (
    <div >
        <Routes>
            {initialRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
            ))}
        </Routes>
    </div>
  )
}

export default User


