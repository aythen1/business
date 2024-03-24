import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



import SelectFlags from '@/views/app/pages/shared/SelectFlags'
import styles from "./index.module.css";


import {
  setOpenMenuLeft,
  updateUser,
} from '@/actions/iam'



import { 
  setThemeColor
} from '@/slices/iamSlice'





export const MenuLeftUser = ({

}) => {
  const { user } = useSelector((state) => state.iam);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [inputValues, setInputValues] = useState();

  // address ---------------------
  useEffect(() => {
    try {
      const parsedAddress = JSON.parse(user.address || '{}');
      const parsedPhone = JSON.parse(user.phone || '{}');

      setInputValues((prevValues) => ({
        ...prevValues,
        avatar: user.avatar || '',
        language: user.language || 'es',
        email: user.email || '',

        name: user.name || '',
        user: user.user || '',

        address: parsedAddress.address || '',
        city: parsedAddress.city || '',
        country: parsedAddress.country || '',

        extension: parsedAddress.extension || '',
        phone: parsedAddress.phone || '',

        createdat: user.createdat || '',

      }));


    } catch (error) {
      console.error('Error al analizar la dirección JSON:', error);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };






  const handleSaveUser = () => {
    const data = {
      avatar: inputValues?.avatar || '',
      createdat: inputValues?.createdat || '',
      language: inputValues?.language || '',
      user: inputValues?.user || '',
      name: inputValues?.name || '',
      email: inputValues?.email || '',
      address: {
        address: inputValues?.address || '',
        city: inputValues?.city || '',
        country: inputValues?.country || '',
      },
      phone: {
        extension: inputValues?.extension || '',
        phone: inputValues?.phone || '',
      }
    }

    data.address = JSON.stringify(data.address)
    data.phone = JSON.stringify(data.phone)

    console.log('data', data)
    dispatch(updateUser({
      user: data
    }))
  }


  const handleCloseUser = () => {
    dispatch(setOpenMenuLeft(null))
  }




  // language ----------------------------------
  const handleSelectLanguage = (language) => {
    handleInputChange({
      target: {
        name: 'language',
        value: language.name,
      },
    });

    navigate(`/${language.iso}/app/settings/home`)
    location.reload()

  };




  // ----------------------------------------------------
  const generateColorRandom = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  const themeColor = localStorage.getItem('themeColor')

  console.log('themeColor', themeColor)


  const [colors, setColors] = useState([
    themeColor,
    generateColorRandom(),
    generateColorRandom(),
    generateColorRandom(),
    generateColorRandom(),
  ]);

  const handleColorClick = (index) => {
    if (index === 0) return false;
  
    const color = colors[index];
    localStorage.setItem('themeColor', color);
    dispatch(setThemeColor(color));
  
    setColors(prevColors => {
      return prevColors.map((col, i) => {
        return i === 0 ? color : generateColorRandom();
      });
    });
  };



  // -------------------------------------z
  const imgRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(`http://localhost:3001/service/v1/iam/user/${user?.id}`)


  const handleImageError = () => {
    setImageError(true);
  };


  const handleSaveImage = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const scaleFactor = 400 / Math.max(img.width, img.height);
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;

        const canvas = document.createElement('canvas');
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        const base64Image = canvas.toDataURL('image/jpeg', 0.8);
        setImageSrc(base64Image)
        setImageError(false)

        handleInputChange({
          target: {
            name: 'avatar',
            value: base64Image,
          },
        });
      };
    };

    reader.readAsDataURL(file);
  };


  return (
    <div className={styles["frame-1171276727"]}>
      <div className={styles["frame-2087328700"]}>
        <div className={styles["horizontal-color-containers"]}>
          {colors.map((color, index) => (
            <div
              key={index}
              className={styles["color-container"]}
              style={{ border: '1px solid color', backgroundColor: color }}
              onClick={() => handleColorClick(index)}
            ></div>
          ))}
        </div>
        <div className={styles["frame-2087328710"]}>
          <div className={styles["component-5"]}>
            <div
              onClick={() => handleSaveUser()}
              className={styles["label2"]}
            >
              Guardar
            </div>
          </div>
          <div className={styles["component-4"]}>
            <div
              onClick={() => handleCloseUser()}
              className={styles["label"]}
            >
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </div>
          </div>
        </div>

      </div>
      <div
        className={styles["frame-2087328701"]}
        onClick={handleSaveImage}
        onDrop={handleSaveImage}
        onDragOver={(e) => e.preventDefault()}
      >
        {imageError ? (
          <div
            className={styles.initial}
          >
            <p>
              {user?.user.charAt(0) || 'A'}
            </p>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={imageSrc}
            className={styles.image}
            onError={handleImageError}
          />
        )}
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          // accept="image/*"
          accept="image/jpeg, image/png"
        />
      </div>
      <div className={styles["inner-container"]}>
        <div className={styles["input-container"]}>
          <div className={styles["row"]}>
            <div className={styles["left-col"]}>
              <div className={styles["input"]}>
                <div className={styles["input-content"]}>
                  <div className={styles["label3"]}>Fecha de creación</div>
                  <input
                    className={styles["placehoder"]}
                    name="createdat"
                    spellCheck={'false'}
                    value={inputValues?.createdat}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
              <div className={styles["grid-input-content2"]}>
                <div className={styles["input"]}>
                  <div className={styles["input-content"]}>
                    <div className={styles["label3"]}>Idioma </div>
                    <input
                      className={styles["placehoder"]}
                      name="language"
                      spellCheck={'false'}
                      value={inputValues?.language}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={styles["input-content2"]}>
                  <div className={styles["frame-4"]}>
                    <SelectFlags isLeft="true" onSelectLanguage={handleSelectLanguage} />
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
              <div className={styles["input"]}>
                <div className={styles["input-content"]}>
                  <div className={styles["label3"]}>User </div>
                  <input
                    className={styles["placehoder"]}
                    placeholder={'User'}
                    name="user"
                    spellCheck={'false'}
                    value={inputValues?.user}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles["input"]}>
                <div className={styles["input-content"]}>
                  <div className={styles["label3"]}>Name </div>
                  <input
                    className={styles["placehoder"]}
                    placeholder={'Name'}
                    name="name"
                    spellCheck={'false'}
                    value={inputValues?.name}
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
                    spellCheck={'false'}
                    value={inputValues?.email}
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
                    spellCheck={'false'}
                    value={inputValues?.address}
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
                    spellCheck={'false'}
                    value={inputValues?.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles["input"]}>
                <div className={styles["input-content"]}>
                  <div className={styles["label3"]}>Country </div>
                  <input
                    className={styles["placehoder"]}
                    placeholder={'Country'}
                    name="country"
                    spellCheck={'false'}
                    value={inputValues?.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

            </div>
          </div>
          <div className={styles["right-col"]}>
            <div className={styles["phone-number-amount"]}>
              <div className={styles["country-code"]}>
                <div className={styles["input-content2"]}>
                  <div className={styles["frame-4"]}>
                    <SelectFlags isExtension={true} onSelectLanguage={handleSelectLanguage} />
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
                    <div className={styles["_8023456789"]}>
                      <input
                        className={styles["placehoder"]}
                        placeholder={'1234 1234 1234'}
                        name="phone"
                        spellCheck={'false'}
                        value={inputValues?.phone}
                        onChange={handleInputChange}
                      />
                    </div>
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