import React, { useEffect, useState } from 'react'
import { Route, Routes, Outlet, useParams, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'

import './index.module.css'


import { AddonFlow } from '@addon/Flow'
import { AddonEditor } from '@addon/Editor'

import {
  iniVector,
  fetchsVectorAddon
} from '@/actions/addon';




const Addon = ({

}) => {
  const dispatch = useDispatch()

  const [isEditor, setIsEditor] = useState({})

  const { addonId, templateId } = useParams();

  console.log('ree', addonId, templateId)

  useEffect(() => {

    const fetchItem = async () => {
      console.log('templateid', templateId)
      // setIsEditor(true)

      //
      let id = iniVector({
        path0: 'addon',
        path1: addonId,
        path2: templateId
      })

      const resp = await dispatch(fetchsVectorAddon({
        id: id,
        name: 'templates'
      }))

      if (resp.payload.length > 0) {
        console.log('resp', resp)
        // setNodes((prevNodes) =>
        //   prevNodes.map((node) =>
        //     node.id === resp.payload[0].id
        //       ? { ...node, data: { ...node.data, components: JSON.parse(resp.payload[0].components) } }
        //       : node
        //   )
        // );
      }
    }


    if (templateId) {
      fetchItem()
    }
  }, [templateId])


  useEffect(() => {
    if (isEditor.id) {
      
      const newUrl = `/${'es'}/app/addon/${addonId}/${isEditor.id}`;
      window.history.pushState({}, '', newUrl);

    }
  }, [isEditor])

  // <Routes>
  //   <Route path="/*" element={<Outlet />}>
  //     <Route path=":id" element={<AddonFlow/>} />
  //     <Route path=":id/editor/:page" element={<AddonEditor/>} />
  //   </Route>
  // </Routes>

  return (
    <div>
      {isEditor.id ? (
        <AddonEditor addonId={addonId} template={isEditor} setTemplate={setIsEditor} />
      ) : (
        <AddonFlow setIsEditor={setIsEditor} />
      )}

    </div>
  )
}

export default Addon
