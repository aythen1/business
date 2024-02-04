import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from "./index.module.css";


import SelectFlags from '@/views/app/pages/shared/SelectFlags'


import {
  updateUser,
  verify
} from '@/actions/iam'

export const MenuLeftUser = ({

}) => {
  const { setOpenMenuLeft } = useSelector((state) => state.iam)
  // Estados para almacenar los colores generados

  // const [randomColor1, setRandomColor1] = useState('#ff0000'); // Colores de ejemplo
  // const [randomColor2, setRandomColor2] = useState('#00ff00');
  // const [randomColor3, setRandomColor3] = useState('#0000ff');

  // Función para generar un color aleatorio
  // const generarColorAleatorio = () => {
  //   return '#' + Math.floor(Math.random() * 16777215).toString(16);
  // };

  // Función para cambiar el color del cuadro clicado y el fondo de la página
  // const cambiarColor = (setColor, randomColor) => {
  //   // Generar un nuevo color aleatorio
  //   const nuevoColor = generarColorAleatorio();
  //   // Cambiar el color del cuadro clicado
  //   setColor(nuevoColor);

  //   // Cambiar la variable CSS del fondo de la página
  //   document.documentElement.style.setProperty('--background-container', randomColor);
  // };

  // const handleClickWhite = () => {
  //   // Cambiar a color blanco
  //   document.documentElement.style.setProperty('--background-container', '#ffffff');
  // };
  // // Llamadas a la función para cada caso

  // const handleClick1 = () => cambiarColor(setRandomColor1, randomColor1);
  // const handleClick2 = () => cambiarColor(setRandomColor2, randomColor2);
  // const handleClick3 = () => cambiarColor(setRandomColor3, randomColor3);

  const { user } = useSelector((state) => state.iam);
  const dispatch = useDispatch()

  console.log('uu', user)

  const [selectedAvatar, setSelectedAvatar] = useState(`http://localhost:3001/service/v1/iam/user/${user?.id}`);
  const [inputValues, setInputValues] = useState({
    avatar: user.avatar || '',
    createdat: user.createdat || '',
    language: user.language || '',
    name: user.name || '',
    email: user.email || '',
    address: user.address || '',
    city: user.address || '',
    country: user.country || '',
  });


  // address ---------------------

  useEffect(() => {




    // Verifica si user.address es una cadena JSON válida
    try {
      const parsedAddress = JSON.parse(user.address || '{}');
      // Actualiza los valores en inputValues si las propiedades existen
      setInputValues((prevValues) => ({
        ...prevValues,
        address: parsedAddress.address || '',
        city: parsedAddress.city || '',
        country: parsedAddress.country || '',
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
        const MAX_WIDTH = 100;
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
    console.log('inputValues', inputValues)

    const data = {
      avatar: inputValues.avatar || '',
      createdat: inputValues.createdat || '',
      language: inputValues.language || '',
      name: inputValues.name || '',
      email: inputValues.email || '',
      address: {
        address: inputValues.address || '',
        city: inputValues.city || '',
        country: inputValues.country || '',
      }
    }

    data.address = JSON.stringify(data.address)


    dispatch(updateUser({
      user: data
    }))
  }

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   dispatch(verify(token))
  // }, [])

  // useEffect(() => {
  //   if (user) {

  //     setInputValues((prevValues) => ({
  //       ...prevValues,
  //       user,
  //     }));
  //   }
  // }, [user])


  // language ----------------------------------
  const handleSelectLanguage = (language) => {
    // Haz algo con el idioma seleccionado, por ejemplo, cambiar el idioma de la aplicación
    console.log('Idioma seleccionado:', language);
  };

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
                  <div className={styles["label3"]}>Fecha de creación</div>
                  <input
                    className={styles["placehoder"]}
                    name="createdat"
                    value={inputValues.createdat}
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
                      value={inputValues.language}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={styles["input-content2"]}>
                  <div className={styles["frame-4"]}>
                    <SelectFlags onSelectLanguage={handleSelectLanguage} />
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
                  <div className={styles["label3"]}>Country </div>
                  <input
                    className={styles["placehoder"]}
                    placeholder={'Country'}
                    name="country"
                    value={inputValues.country}
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
                    <div className={styles["_8023456789"]}>8023456789 </div>
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