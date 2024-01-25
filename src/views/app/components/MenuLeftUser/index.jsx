import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from "./index.module.css";


import {
  updateUser,
  verify
} from '@/actions/iam'


export const MenuLeftUser = ({
  setOpenMenuLeft
}) => {
  const { user } = useSelector((state) => state.iam);
  const dispatch = useDispatch()

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [inputValues, setInputValues] = useState({
    avatar: '',
    name: '',
    address: '',
    city: '', 
    web: '',
    category: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const handleAvatarChange = (e) => {
    console.log('2i4i')
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      resizeAndConvertToBase64(file);
    }
  };

  const resizeAndConvertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Resize la imagen a 500px
        const MAX_WIDTH = 500;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convierte la imagen a base64
        const base64 = canvas.toDataURL('image/jpeg');
        setInputValues((prevValues) => ({
          ...prevValues,
          avatar: base64,
        }));
        setSelectedAvatar(base64);
      };
    };
  };


  const handleSaveUser = () => {
    const token = localStorage.getItem('token')
    dispatch(updateUser({
      token, 
      user: inputValues
    }))
  }

  useEffect( () => {
    const token = localStorage.getItem('token')
    dispatch(verify(token))
  }, [])

  useEffect( () => {
    if(user){
      
      setInputValues((prevValues) => ({
        ...prevValues,
        user,
      }));
    }
  }, [user])

  return (
    <div className={styles["frame-1171276727"]}>
      <div 
        className={styles["frame-2087328701"]}
        onDrop={handleAvatarChange}
        onDragOver={(e) => e.preventDefault()}
      >
        <img 
          className={styles["image"]} 
          src={selectedAvatar} 
        />
      </div>
      <div className={styles["frame-2087328700"]}>
        <div className={styles["button-container"]}>
          <div className={styles["component-4"]}>
            <div 
              onClick={() => handleSaveUser()}
              className={styles["label"]}
            >
              Cancel 
            </div>
          </div>
        </div>
        <div className={styles["component-5"]}>
          <div 
            onClick={() => handleSaveUser()}
            className={styles["label2"]}
          >
            Guardar 
          </div>
        </div>
      </div>
      <div className={styles["inner-container"]}>
        <div className={styles["input-container"]}>
          <div className={styles["row"]}>
            <div className={styles["left-col"]}>
              <div className={styles["input"]}>
                <div className={styles["input-content"]}>
                  <div className={styles["label3"]}>Name </div>
                  <input 
                    className={styles["placehoder"]}
                    placeholder={'Name'}
                    name="name"
                    value={inputValues.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles["input"]}>
                <div className={styles["input-content"]}>
                  <div className={styles["label3"]}>Dirección </div>
                  <input 
                    className={styles["placehoder"]}
                    placeholder={'Dirección'}
                    name="address"
                    value={inputValues.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles["input"]}>
                <div className={styles["input-content"]}>
                  <div className={styles["label3"]}>Ciudad </div>
                  <input 
                    className={styles["placehoder"]}
                    placeholder={'Ciudad'}
                    name="city"
                    value={inputValues.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles["input"]}>
                <div className={styles["input-content"]}>
                  <div className={styles["label3"]}>Sitio web </div>
                  <input 
                    className={styles["placehoder"]}
                    placeholder={'Sitio web'}
                    name="web"
                    value={inputValues.web}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles["right-col"]}>
            <div className={styles["input"]}>
              <div className={styles["input-content"]}>
                <div className={styles["label3"]}>Tipo de negocio </div>
                <input 
                    className={styles["placehoder"]}
                    placeholder={'Category'}
                    name="category"
                    value={inputValues.category}
                    onChange={handleInputChange}
                  />
              </div>
            </div>
            <div className={styles["input"]}>
              <div className={styles["input-content"]}>
                <div className={styles["label3"]}>Email </div>
                <input 
                    className={styles["placehoder"]}
                    placeholder={'Email'}
                    name="email"
                    value={inputValues.email}
                    onChange={handleInputChange}
                  />
              </div>
            </div>
            <div className={styles["phone-number-amount"]}>
              <div className={styles["country-code"]}>
                <div className={styles["input-content2"]}>
                  <div className={styles["frame-4"]}>
                    <img className={styles["ng-1"]} src="ng-10.png" />
                    <div className={styles["input-content3"]}>
                      <div className={styles["_234"]}>+234 </div>
                    </div>
                  </div>
                  <div className={styles["iconly-light-arrow-down-2"]}>
                    <div className={styles["iconly-light-arrow-down-22"]}>
                      <svg
                        className={styles["arrow-down-2"]}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.66536 0.666016L4.9987 5.33268L0.332031 0.666016"
                          stroke="#130F26"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["input2"]}>
                <div className={styles["input-content4"]}>
                  <div className={styles["input-content"]}>
                    <div className={styles["phone-number"]}>Phone Number </div>
                    <div className={styles["_8023456789"]}>8023456789 </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLeftUser;