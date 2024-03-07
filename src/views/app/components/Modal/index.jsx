import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Modal.module.css';


import {
  setModal
} from '@/slices/iamSlice'



const Modal = ({  }) => {

  const dispatch = useDispatch()

  const { modal, openModal } = useSelector((state) => state.iam);

  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // openModal(null);
      dispatch(setModal(null))
    }
  };

  const handleCloseButtonClick = () => {
    // openModal(null);
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
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={handleCloseButtonClick}>
          &times;
        </button>
        {modal}
      </div>
    </div>
  );
};

export default Modal;