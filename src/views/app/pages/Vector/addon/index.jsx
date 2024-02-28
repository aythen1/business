
import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'


import components from '@components'


import styles from './index.module.css'

const VectorAddon = ({

}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <components.SearchList
        icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z" />
                        </svg>`}
        data={['Apple', 'Banana', 'Cherry', 'Apricot', 'Strawberry']}
      />
      <div className={styles.listContainer}>
        {['', ''].map((item, index) => (
          <div
            key={index}
            className={styles.box}
          >
            <div className={styles.image}>
              Not found
            </div>
            <b className={styles.title}>
              Hello world
            </b>
            <p className={styles.text}>
              Lorem ipsum dolorem epsum
            </p>
            <div className={styles.info}>
              <label>
                2kb
              </label>
              <span>
                hace 4 días
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )

};


export default VectorAddon
























