
import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'




import Component from './Component';

import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";


import VectorIni from './VectorIni'


import {
  setModal
} from '@/slices/iamSlice'


import {
  fetchAddon
} from '@/actions/addon'


import {
  setStatus
} from '@/slices/addonSlice'


// import DOMPurify from 'dompurify';
// import "@tldraw/tldraw/tldraw.css";
// import { htmlExample1 } from './html/example-1'

function obtainContent(texto, type = 'html') {
  const regexString = '```' + type + '\\s*([\\s\\S]*?)```';
  const regex = new RegExp(regexString);
  const coincidencia = texto.match(regex);

  if (coincidencia && coincidencia[1]) {
    return coincidencia[1].trim();
  } else {
    return null;
  }
}



export const AddonEditor = ({

}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()


  const { addon, vectors } = useSelector((state) => state.addon)
  const [fetchsItemCompleted, setFetchsItemCompleted] = useState(false);


  
  
  useEffect(() => {
    console.log('addong', addon, id)
    const fetchsItem = async () => {
      await dispatch(fetchAddon(id))
      setFetchsItemCompleted(true);
    }

    if (addon && id) {
      fetchsItem()
    } else {
      setFetchsItemCompleted(true);
    }
  }, [])
  
  

  useEffect(() => {
    console.log('vv', vectors)
    
    if(vectors.length > 0){
      console.log('status active')
      dispatch(setStatus('active'))
    }
    
    
  }, [vectors])
  
  
    useEffect(() => {
      if (fetchsItemCompleted) {
        if (Object.keys(addon).length > 0) {
          console.log('exist loading')
        }else{
          navigate(`/${'es'}/app/settings/home`)
        }
      }
  
    }, [addon, fetchsItemCompleted])



  return (
    <div>
      {vectors.length > 0 ? (
        <>
          {vectors.map((vector, index) => (
            <Component
              key={index}
              component={vector}
            />
          ))}
        </>
      ) : (
        <VectorIni setModal={setModal} vector={''} />
      )}

    </div>
  )

};
























