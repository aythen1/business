import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Modal.module.css';


import {
  setModal,
  setNotification
} from '@/slices/iamSlice'



export const Modal = ({ }) => {
  const dispatch = useDispatch()

  const { modal, openModal } = useSelector((state) => state.iam);

  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(setModal(null))
    }
  };

  const handleCloseButtonClick = () => {
    dispatch(setModal(null))
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      dispatch(setModal(null));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  if (!openModal) return null;

  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div className={styles.modalContainer}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={handleCloseButtonClick}>
          &times;
        </button>
        {modal}
      </div>
      </div>
    </div>
  );
};














export const Notification = ({ }) => {
  const dispatch = useDispatch()
  const notificationRef = useRef();

  const { openNotification } = useSelector((state) => state.iam);

  const handleOutsideClick = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      dispatch(setNotification(null))
    }
  };




  const handleCloseButtonClick = () => {
    dispatch(setNotification(null))
  };


  // const handleKeyDown = (event) => {
  //   if (event.key === 'Escape') {
  //     dispatch(setNotification(null));
  //   }
  // };


  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);


//   useEffect(() => {
// console.log('wqefor3nuhf', openNotification)
//   }, [openNotification])


const [items, setItems] = useState([{
  type: 'success',
  status: 'deny'
}])


  console.log('opennotification', openNotification)
  if (!openNotification) return null;



  return (
    // <div className={styles.overlay} onClick={handleOutsideClick}>
    <div className={styles.notification} ref={notificationRef}>
      {/* <button className={styles.closeButton} onClick={handleCloseButtonClick}>
          &times;
        </button> */}
      {/* {notification} */}
      <div className={styles.header}>
        Preparing download
        <div className={styles.buttons}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
            </svg>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
            </svg>
          </button>
        </div>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.type == 'zip' ? (
              <div className={styles.labelStatus}>
                <label>
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M10 3v4c0 .6-.4 1-1 1H5m14-4v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Zm-4 1h0v0h0v0Zm-2 2h0v0h0v0Zm2 2h0v0h0v0Zm-2 2h0v0h0v0Zm2 2h0v0h0v0Zm-2 2h0v0h0v0Zm2 2h0v0h0v0Zm-2 2h0v0h0v0Z" />
                  </svg>
                </label>
                Zipping 3 files
              </div>
            ) : item.type == 'load' ? (
              <div className={styles.labelStatus}>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1v-4m5-13v4c0 .6-.4 1-1 1H5m0 6h9m0 0-2-2m2 2-2 2" />
                  </svg>
                </label>
                Loading
              </div>
            ) : item.type == 'add' ? (
              <div className={styles.labelStatus}>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9V4c0-.6-.4-1-1-1H9a1 1 0 0 0-.8.3l-4 4a1 1 0 0 0-.2.6V20c0 .6.4 1 1 1h4M9 3v4c0 .6-.4 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
                  </svg>
                </label>
                Add file
              </div>
            ) : item.type == 'success' && (
              <div className={styles.labelStatus}>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4c0 .6-.4 1-1 1H5m4 6 2 2 4-4m4-8v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z" />
                  </svg>
                </label>
                Subida con éxito
              </div>
            )}

            {item.status == 'pending' ? (
              <button className={styles.buttonStatus}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            ) : item.status == 'deny' ? (
              <button className={styles.buttonStatus}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            ) : item.status == 'verify' && (
              <button className={styles.buttonStatus}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
    // </div>
  );
}