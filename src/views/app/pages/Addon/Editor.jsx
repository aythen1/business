
import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, Outlet, useParams } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux'


import { default as AY } from './Component';

import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";


import VectorIni from './VectorIni'


import {
  setModal
} from '@/slices/iamSlice'


import {
  fetchAddon
} from '@/actions/addon'


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

  const { id } = useParams()


  const { vectors } = useSelector((state) => state.addon)


  // const addon = [{
  //   data: [],
  //   rpa: [],
  //   version: 0,
  //   description: ''
  // }]


  useEffect(() => {
    const fetchsItem = async () => {
      dispatch(fetchAddon(id))
    }

    fetchsItem()
  }, [])


  useEffect(() => {
    console.log('cc', vectors)

  }, [vectors])



  return (
    <div>
      {vectors.length > 0 ? (
        <div>
          {vectors.map((vector, index) => {
            <AY
              key={index}
              component={vector}
            />
          })}
        </div>
      ) : (
          <VectorIni />
      )}

    </div>
  )

};
























