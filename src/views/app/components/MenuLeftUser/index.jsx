import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from "./index.module.css";


import SelectFlags from '@/views/app/pages/shared/SelectFlags'


import {
  setOpenMenuLeft,
  updateUser,
} from '@/actions/iam'

export const MenuLeftUser = ({

}) => {


  const { user } = useSelector((state) => state.iam);
  const dispatch = useDispatch()



  // const [selectedAvatar, setSelectedAvatar] = useState(`http://localhost:3001/service/v1/iam/user/${user?.id}`);
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
      // Maneja el error si user.address no es una cadena JSON válida
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

  };




  // ----------------------------------------------------

  const generarColorAleatorio = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  const handleColorClick = (index) => {
    const updatedColors = [...colores];
    updatedColors[index] = generarColorAleatorio();
    setColores(updatedColors);
  }

  const [colores, setColores] = useState([
    generarColorAleatorio(),
    generarColorAleatorio(),
    generarColorAleatorio(),
    generarColorAleatorio(),
  ]);



  // 
  // -------------------------------------z
  const imgRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  // const [imageLoadAttempted, setImageLoadAttempted] = useState(false);
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
        // setImageError(false);
        // if (imgRef.current) {

        // Escala la imagen a 400 píxeles
        const scaleFactor = 400 / Math.max(img.width, img.height);
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;

        // Crea un canvas para renderizar la imagen escalada
        const canvas = document.createElement('canvas');
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        // Obtiene el contenido base64 del canvas
        const base64Image = canvas.toDataURL('image/jpeg', 0.8);
        // console.log('base62', base64Image)
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
          accept="image/*"
        />
      </div>
      <div className={styles["frame-2087328700"]}>
        <div className={styles["button-container"]}>
          <div className={styles["component-4"]}>
            <div
              onClick={() => handleCloseUser()}
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
                    {/* <img className={styles["ng-1"]} src="ng-10.png" /> */}
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
                    {/* <img className={styles["ng-1"]} src="ng-10.png" /> */}
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
      {/* <div className={styles["horizontal-color-containers"]}>
      <div className={styles["color-container"]} style={{ background: 'var(--default)', border: '1px solid #000' }} onClick={handleClickWhite}></div>
      <div className={styles["color-container"]} style={{ background: randomColor1 }} onClick={() => handleClick1()}></div>
      <div className={styles["color-container"]} style={{ background: randomColor2 }} onClick={() => handleClick2()}></div>
      <div className={styles["color-container"]} style={{ background: randomColor3 }} onClick={() => handleClick3()}></div>
    </div> */}

      <div className={styles["horizontal-color-containers"]}>
        {colores.map((color, index) => (
          <div
            key={index}
            className={styles["color-container"]}
            style={{ border: '1px solid color', backgroundColor: color }}
            onClick={() => handleColorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MenuLeftUser;