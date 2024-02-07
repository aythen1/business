// Login.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './index.module.css'

import IconLogo from './assets/IconLogo.svg'

// import { login } from './auth';

import { useTranslation } from 'react-i18next';
import useDarkMode from 'use-dark-mode';


import {
  register
} from '@/actions/iam'




const Register = ({ onLogin }) => {
  const { t } = useTranslation();
  const { lng } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { token, error } = useSelector((state) => state.iam);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  // Estado para controlar el modo oscuro o claro
  const darkMode = useDarkMode(false, {
    storageKey: 'prefered-theme', // Cambiar esto según tus necesidades
    onChange: (value) => {
      const appElement = document.getElementById('app');

      if (value) {
        appElement.classList.remove('light-mode');
        appElement.classList.add('dark-mode');
      } else {
        appElement.classList.remove('dark-mode');
        appElement.classList.add('light-mode');
      }
    }
  });

  const [themeMode, setThemeMode] = useState(() => {
    // Intentar obtener el modo desde localStorage al cargar la aplicación
    const storedMode = localStorage.getItem('darkMode');

    return storedMode ? storedMode : 'light';
  });

  useEffect(() => {
    if (themeMode == 'dark') {
      darkMode.enable()
    } else {
      darkMode.disable()
    }
    // darkMode.toggle();
  }, [themeMode])


  // ------------------------------
  useEffect(() => {
    // alert('detect token' + token)
    // Verificar cambios en el token
    if (token) {
      // El token está vacío, redirige a /es/pp
      // navigate('/es/app');
    }
  }, [token]);
  


  const handleRegister = async () => {
    console.log('13', password)
    if(password == repassword){
      console.log('334')
      dispatch(register({
        user: username, 
        password: password
      }))
    }else{
      alert('Las contraseñas no coinciden')
    }
  };

  const handleClickSignIn = () => {
    navigate(`/${lng}/login`); 
  }


  // ----------------------------------------------

  const [showPassword, setShowPasswords] = useState({});
  
  const handleInputChange = (inputName, value) => {
    setShowPasswords(prevPasswords => ({
      ...prevPasswords,
      [inputName]: value,
    }));
  };

  const handleShowPassword = (inputName) => {
    setShowPasswords(prevPasswords => ({
      ...prevPasswords,
      [inputName]: !prevPasswords[inputName],
    }));
  };



  return (
    <div className={styles["frame-1547755088"]}>
      <div className={styles["frame-15477550881"]}>
      <div className={styles["frame-1342324"]}>
        <img src={IconLogo} />
      </div>
      <div>
        <h2 className={styles["frame-1342"]}>
          Regístrate gratis
        </h2>
        <p className={styles["frame-13421"]}>
          Y accede a tu espacio personal
        </p>
      </div>
      {false && (
        <div className={styles["frame-1547755085"]}>
        <div className={styles["frame-1547755077"]}>
          <div className={styles["rectangle-42020"]}></div>
          <svg
            className={styles["devicon-google"]}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1657_44428)">
              <path
                d="M6.27127 0.592441C4.47279 1.21635 2.92178 2.40055 1.84607 3.9711C0.770355 5.54165 0.226633 7.41577 0.294767 9.31817C0.362901 11.2206 1.0393 13.051 2.22461 14.5406C3.40992 16.0301 5.04167 17.1004 6.88018 17.594C8.37069 17.9786 9.93231 17.9955 11.4308 17.6432C12.7883 17.3383 14.0433 16.6861 15.073 15.7504C16.1447 14.7468 16.9225 13.4701 17.323 12.0576C17.7581 10.5215 17.8356 8.90611 17.5494 7.33541H9.17939V10.8074H14.0267C13.9299 11.3612 13.7223 11.8897 13.4164 12.3614C13.1105 12.8331 12.7125 13.2382 12.2464 13.5524C11.6546 13.9441 10.9873 14.2076 10.2875 14.3259C9.58572 14.4564 8.86588 14.4564 8.16408 14.3259C7.45273 14.179 6.77983 13.8854 6.1883 13.4638C5.23788 12.7911 4.52425 11.8353 4.14924 10.7329C3.76799 9.60985 3.76799 8.39237 4.14924 7.26932C4.41618 6.48212 4.85747 5.76538 5.44018 5.1726C6.10701 4.48177 6.95124 3.98797 7.88024 3.74536C8.80924 3.50275 9.78712 3.52072 10.7066 3.79728C11.4249 4.01768 12.0817 4.40293 12.6247 4.92228C13.1713 4.37853 13.7169 3.83338 14.2616 3.28682C14.5428 2.99291 14.8494 2.71307 15.1264 2.41213C14.2975 1.64083 13.3245 1.04062 12.2633 0.645878C10.3307 -0.055855 8.21608 -0.0747134 6.27127 0.592441Z"
                fill="white"
              />
              <path
                d="M6.26906 0.591171C8.21371 -0.0764365 10.3283 -0.0580745 12.2611 0.643202C13.3225 1.04062 14.295 1.64372 15.1228 2.41789C14.8416 2.71883 14.5448 3.00008 14.258 3.29258C13.7123 3.83726 13.1672 4.38008 12.6225 4.92101C12.0795 4.40166 11.4227 4.01641 10.7044 3.79601C9.78521 3.51848 8.80737 3.49948 7.87812 3.74109C6.94887 3.9827 6.10413 4.4756 5.43656 5.1657C4.85386 5.75849 4.41257 6.47522 4.14562 7.26242L1.23047 5.00539C2.27392 2.93618 4.08058 1.35339 6.26906 0.591171Z"
                fill="#E33629"
              />
              <path
                d="M0.459527 7.2418C0.616099 6.46523 0.876235 5.71319 1.23296 5.00586L4.14812 7.26852C3.76687 8.39157 3.76687 9.60905 4.14812 10.7321C3.17687 11.4821 2.20515 12.2359 1.23296 12.9934C0.340208 11.2163 0.0679325 9.19157 0.459527 7.2418Z"
                fill="#F8BD00"
              />
              <path
                d="M9.18031 7.33398H17.5503C17.8365 8.90468 17.759 10.5201 17.3239 12.0562C16.9235 13.4687 16.1456 14.7454 15.0739 15.749C14.1331 15.0149 13.1881 14.2865 12.2473 13.5524C12.7138 13.2378 13.1119 12.8323 13.4178 12.3601C13.7237 11.8879 13.9311 11.3589 14.0277 10.8046H9.18031C9.17891 9.64867 9.18031 8.49133 9.18031 7.33398Z"
                fill="#587DBD"
              />
              <path
                d="M1.23047 12.9937C2.20266 12.2437 3.17437 11.4899 4.14562 10.7324C4.52139 11.8352 5.23604 12.791 6.1875 13.4634C6.78087 13.8829 7.45523 14.1741 8.1675 14.3184C8.8693 14.4489 9.58914 14.4489 10.2909 14.3184C10.9907 14.2001 11.658 13.9366 12.2498 13.5449C13.1906 14.279 14.1356 15.0074 15.0764 15.7415C14.0469 16.6777 12.7918 17.3304 11.4342 17.6357C9.93573 17.988 8.37411 17.9711 6.88359 17.5865C5.70474 17.2717 4.60361 16.7169 3.64922 15.9566C2.63915 15.1545 1.81411 14.1439 1.23047 12.9937Z"
                fill="#319F43"
              />
            </g>
            <defs>
              <clipPath id="clip0_1657_44428">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={styles["frame-1547755078"]}>
          <div className={styles["rectangle-42021"]}></div>
          <svg
            className={styles["fontisto-facebook"]}
            width="8"
            height="17"
            viewBox="0 0 8 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1657_44436)">
              <path
                d="M8.30733 0.122289V2.81962H6.79733C6.59718 2.79244 6.39387 2.81133 6.20119 2.87501C6.00852 2.93868 5.83099 3.04565 5.68067 3.18866L5.682 3.18725C5.4659 3.50935 5.3639 3.90223 5.394 4.2965V4.29083V6.22175H8.21333L7.84 9.24633H5.398V16.9997H2.45333V9.24562H0V6.22175H2.45333V3.99404C2.42144 3.45599 2.49386 2.91671 2.6661 2.4096C2.83834 1.9025 3.10674 1.43837 3.45467 1.04596L3.45267 1.04808C3.80779 0.690554 4.22756 0.413402 4.68653 0.23344C5.1455 0.0534768 5.63409 -0.0255463 6.12267 0.00116416H6.114C6.87285 -0.0121359 7.63164 0.0316541 8.38467 0.132206L8.30667 0.123706L8.30733 0.122289Z"
                fill="#1771D8"
              />
            </g>
            <defs>
              <clipPath id="clip0_1657_44436">
                <rect width="8" height="17" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={styles["frame-1547755079"]}>
          <div className={styles["rectangle-42022"]}></div>
          <svg
            className={styles["ri-twitter-fill"]}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3611 5.18436C19.6616 5.49382 18.9198 5.69712 18.1602 5.78752C18.9605 5.30823 19.5593 4.55437 19.845 3.66636C19.0934 4.11369 18.2693 4.42719 17.4113 4.59677C16.8343 3.97947 16.0696 3.57007 15.236 3.43222C14.4024 3.29438 13.5466 3.43581 12.8016 3.83452C12.0567 4.23324 11.4643 4.8669 11.1166 5.637C10.769 6.4071 10.6855 7.27049 10.8791 8.09294C9.35464 8.01666 7.86325 7.62061 6.50179 6.93048C5.14034 6.24035 3.93925 5.27159 2.97653 4.08711C2.6358 4.67235 2.45674 5.33765 2.4577 6.01486C2.4577 7.34402 3.13511 8.51827 4.1627 9.20577C3.55404 9.18657 2.95879 9.0222 2.42653 8.72636V8.77311C2.4265 9.65849 2.73273 10.5166 3.29327 11.202C3.85381 11.8873 4.63415 12.3577 5.50195 12.5333C4.93695 12.6865 4.34447 12.7091 3.76945 12.5993C4.01413 13.3614 4.49106 14.0279 5.13345 14.5054C5.77583 14.9829 6.55149 15.2475 7.35178 15.2622C6.55644 15.8869 5.64576 16.3486 4.67182 16.621C3.69788 16.8935 2.6798 16.9712 1.67578 16.8499C3.42819 17.9768 5.46813 18.5751 7.55161 18.5732C14.6044 18.5732 18.4599 12.7313 18.4599 7.66486C18.4599 7.49986 18.4563 7.33302 18.4489 7.16894C19.1992 6.6266 19.8467 5.95395 20.3611 5.18436Z"
              fill="#21A0F8"
            />
          </svg>
        </div>
      </div>
      )}
      
      <div className={styles["frame-1547755084"]}>
        <div className={styles["line-107"]}></div>
        <div className={styles["or"]}>OR </div>
        <div className={styles["line-108"]}></div>
      </div>
      <div className={styles["frame-1547755111"]}>
        <div className={styles["rectangle-42024"]}></div>
        <div className={styles["email-address"]}>
          <input
            type="text"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className={styles["frame-1547755083"]}>
        <div className={styles["frame-1547755082"]}>
          <div className={styles["password"]}>
            <input
              type={showPassword[`password0`] ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <svg
            onClick={() => handleShowPassword(`password0`)}
            className={styles["vector8"]}
            width="22"
            height="19"
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.83 6L14 9.16C14 9.11 14 9.05 14 9C14 8.20435 13.6839 7.44129 13.1213 6.87868C12.5587 6.31607 11.7956 6 11 6C10.94 6 10.89 6 10.83 6ZM6.53 6.8L8.08 8.35C8.03 8.56 8 8.77 8 9C8 9.79565 8.31607 10.5587 8.87868 11.1213C9.44129 11.6839 10.2044 12 11 12C11.22 12 11.44 11.97 11.65 11.92L13.2 13.47C12.53 13.8 11.79 14 11 14C9.67392 14 8.40215 13.4732 7.46447 12.5355C6.52678 11.5979 6 10.3261 6 9C6 8.21 6.2 7.47 6.53 6.8ZM1 1.27L3.28 3.55L3.73 4C2.08 5.3 0.78 7 0 9C1.73 13.39 6 16.5 11 16.5C12.55 16.5 14.03 16.2 15.38 15.66L15.81 16.08L18.73 19L20 17.73L2.27 0M11 4C12.3261 4 13.5979 4.52678 14.5355 5.46447C15.4732 6.40215 16 7.67392 16 9C16 9.64 15.87 10.26 15.64 10.82L18.57 13.75C20.07 12.5 21.27 10.86 22 9C20.27 4.61 16 1.5 11 1.5C9.6 1.5 8.26 1.75 7 2.2L9.17 4.35C9.74 4.13 10.35 4 11 4Z"
              fill="#292A2B"
            />
          </svg>
        </div>
      </div>
      <div className={styles["frame-1547755083"]}>
        <div className={styles["frame-1547755082"]}>
          <div className={styles["password"]}>
            <input
              type={showPassword[`password1`] ? "text" : "password"}
              placeholder="Repetir password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
          </div>
          <svg
            onClick={() => handleShowPassword(`password1`)}
            className={styles["vector8"]}
            width="22"
            height="19"
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.83 6L14 9.16C14 9.11 14 9.05 14 9C14 8.20435 13.6839 7.44129 13.1213 6.87868C12.5587 6.31607 11.7956 6 11 6C10.94 6 10.89 6 10.83 6ZM6.53 6.8L8.08 8.35C8.03 8.56 8 8.77 8 9C8 9.79565 8.31607 10.5587 8.87868 11.1213C9.44129 11.6839 10.2044 12 11 12C11.22 12 11.44 11.97 11.65 11.92L13.2 13.47C12.53 13.8 11.79 14 11 14C9.67392 14 8.40215 13.4732 7.46447 12.5355C6.52678 11.5979 6 10.3261 6 9C6 8.21 6.2 7.47 6.53 6.8ZM1 1.27L3.28 3.55L3.73 4C2.08 5.3 0.78 7 0 9C1.73 13.39 6 16.5 11 16.5C12.55 16.5 14.03 16.2 15.38 15.66L15.81 16.08L18.73 19L20 17.73L2.27 0M11 4C12.3261 4 13.5979 4.52678 14.5355 5.46447C15.4732 6.40215 16 7.67392 16 9C16 9.64 15.87 10.26 15.64 10.82L18.57 13.75C20.07 12.5 21.27 10.86 22 9C20.27 4.61 16 1.5 11 1.5C9.6 1.5 8.26 1.75 7 2.2L9.17 4.35C9.74 4.13 10.35 4 11 4Z"
              fill="#292A2B"
            />
          </svg>
        </div>
      </div>

      <div className={styles["frame-1547755110"]}>
        <div
          onClick={() => handleRegister()}
          className={styles["login"]}
        >
          Register 
        </div>
      </div>
      <div className={styles["frame-1547755080"]}>
        <div className={styles["don-t-have-an-account"]}>Do have an account? </div>
        <div 
          onClick={() => handleClickSignIn()}
          className={styles["sign-up"]}
        >
          Sign in 
        </div>
      </div>
      {error && (
        <div>
          {error}
        </div>
      )}
      </div>
      
    </div>
  );
};

export default Register;