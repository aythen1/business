// Login.js
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './index.module.css'

import IconLogo from './assets/IconLogo'


import { useTranslation } from 'react-i18next';
import useDarkMode from 'use-dark-mode';


import { confirm, login } from '@/actions/iam'


const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const { lng } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, error } = useSelector((state) => state.iam);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  // ---------------------------
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
    const storedMode = localStorage.getItem('darkMode');

    return storedMode ? storedMode : 'light';
  });

  useEffect(() => {
    if (themeMode == 'dark') {
      darkMode.enable()
    } else {
      darkMode.disable()
    }
  }, [themeMode])


  // ------------------------------
  const url = new URL(window.location.href);
  const urlToken = url.searchParams.get('token');

  useEffect(() => {
    if (urlToken) {
      dispatch(confirm({ token: urlToken }));
    }
  }, [urlToken])

  useEffect(() => {
    if (token) {
      navigate('/es/app', { state: { fromToken: true } });
    }
  }, [token]);


  // ---------------------------------
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPasswords] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };


  // Constante para poder visualizar las contraseñas
  const handleShowPassword = (inputName) => {
    setShowPasswords(prevPasswords => ({
      ...prevPasswords,
      [inputName]: !prevPasswords[inputName],
    }));
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Invalid credentials");
      return;
    }

    dispatch(login({ 
      remember: isChecked,
      user: username, 
      password 
    }))
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error)
    }
  }, [error])


  const handleSignUp = () => {
    navigate(`/${lng}/app/register`);
  }


  const handlePassword = () => {
    navigate(`/${lng}/app/recover-password`);
  }


  // -------------------------------------z
  const imgRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const [imageSrc, setImageSrc] = useState(`http://localhost:3001/service/v1/iam/user/${localStorage.id}`)


  const handleImageError = () => {
    setImageError(true);
  };



  return (
    <div className={styles["frame-1547755088"]}>
      <div className={styles["frame-15477550881"]}>
        <div className={styles["frame-1342324"]}>
          {imageError ? (
            <IconLogo />
          ) : (
            <img
              ref={imgRef}
              src={imageSrc}
              className={styles.logo}
              onError={handleImageError}
            />
          )}
        </div>
        <div>
          <h2 className={styles["frame-1342"]}>
            Inicia Sesión o Regístrate
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
        {errorMessage && (
          <div className={styles["error-message"]}>
            {errorMessage}
          </div>
        )}
        <div className={styles["frame-1547755111"]}>
          <div className={styles["rectangle-42024"]}></div>
          <div className={styles["email-address"]}>
            <input
              type="text"
              placeholder="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
        <div className={styles["frame-1547755083"]}>
          <div className={styles["frame-1547755082"]}>
            <div className={styles["password"]}>
              <input
                type={showPassword[`password`] ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <svg
              onClick={() => handleShowPassword("password")}
              className={styles.vector8}
              width="20"
              height="15"
              viewBox="0 0 28 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {showPassword["password"] ? (
                <path d="M28.5 21.8749C28.3858 21.9401 28.2598 21.982 28.1294 21.9984C27.9989 22.0148 27.8665 22.0054 27.7397 21.9705C27.6129 21.9357 27.4943 21.8762 27.3905 21.7955C27.2867 21.7147 27.1999 21.6143 27.135 21.4999L24.76 17.3499C23.3792 18.2835 21.8561 18.9868 20.25 19.4324L20.9837 23.8349C21.0054 23.9645 21.0013 24.0971 20.9717 24.2252C20.942 24.3532 20.8875 24.4741 20.8111 24.581C20.7347 24.6879 20.638 24.7788 20.5265 24.8483C20.415 24.9178 20.2909 24.9647 20.1612 24.9862C20.1079 24.9949 20.054 24.9995 20 24.9999C19.7634 24.9996 19.5346 24.9154 19.3543 24.7623C19.174 24.6092 19.0537 24.3971 19.015 24.1637L18.2937 19.8412C16.7727 20.0529 15.2298 20.0529 13.7087 19.8412L12.9875 24.1637C12.9487 24.3975 12.8281 24.6099 12.6472 24.7631C12.4664 24.9162 12.237 25.0002 12 24.9999C11.9447 24.9997 11.8895 24.9951 11.835 24.9862C11.7054 24.9647 11.5813 24.9178 11.4698 24.8483C11.3583 24.7788 11.2615 24.6879 11.1852 24.581C11.1088 24.4741 11.0542 24.3532 11.0246 24.2252C10.995 24.0971 10.9908 23.9645 11.0125 23.8349L11.75 19.4324C10.1445 18.9854 8.62225 18.2809 7.2425 17.3462L4.875 21.4999C4.74239 21.731 4.52342 21.8999 4.26626 21.9696C4.0091 22.0392 3.73482 22.0038 3.50375 21.8712C3.27268 21.7386 3.10375 21.5196 3.03413 21.2625C2.9645 21.0053 2.99989 20.731 3.1325 20.4999L5.6325 16.1249C4.75437 15.3663 3.94689 14.5295 3.22 13.6249C3.12935 13.5237 3.06027 13.4051 3.01699 13.2763C2.97371 13.1475 2.95713 13.0112 2.96827 12.8758C2.9794 12.7404 3.01802 12.6087 3.08176 12.4887C3.1455 12.3687 3.23302 12.2629 3.33899 12.1779C3.44496 12.0928 3.56714 12.0303 3.69809 11.994C3.82904 11.9578 3.96601 11.9486 4.10063 11.967C4.23524 11.9855 4.36469 12.0311 4.48107 12.1013C4.59744 12.1714 4.69831 12.2645 4.7775 12.3749C6.8525 14.9424 10.4825 17.9999 16 17.9999C21.5175 17.9999 25.1475 14.9387 27.2225 12.3749C27.3008 12.2623 27.4014 12.1669 27.5181 12.0948C27.6349 12.0227 27.7652 11.9754 27.901 11.9558C28.0368 11.9362 28.1751 11.9448 28.3075 11.981C28.4398 12.0172 28.5633 12.0802 28.6702 12.1662C28.7772 12.2521 28.8653 12.3592 28.9291 12.4806C28.9929 12.6021 29.031 12.7354 29.041 12.8722C29.0511 13.0091 29.0329 13.1465 28.9875 13.276C28.9422 13.4055 28.8707 13.5243 28.7775 13.6249C28.0506 14.5295 27.2431 15.3663 26.365 16.1249L28.865 20.4999C28.9321 20.614 28.9759 20.7402 28.9939 20.8713C29.0119 21.0024 29.0036 21.1358 28.9697 21.2637C28.9357 21.3916 28.8767 21.5115 28.7961 21.6164C28.7155 21.7213 28.6148 21.8092 28.5 21.8749Z" fill="#343330" />
              ) : (
                <path d="M6.73999 4.32746C6.65217 4.22847 6.54558 4.14789 6.42639 4.0904C6.3072 4.03291 6.17778 3.99964 6.04564 3.99253C5.91351 3.98542 5.78127 4.00461 5.6566 4.04899C5.53193 4.09336 5.41731 4.16204 5.31938 4.25104C5.22144 4.34003 5.14215 4.44759 5.08609 4.56746C5.03003 4.68732 4.99832 4.81713 4.9928 4.94934C4.98727 5.08156 5.00804 5.21356 5.05391 5.33769C5.09978 5.46181 5.16982 5.5756 5.25999 5.67246L7.66499 8.31871C3.12499 11.105 1.17249 15.4 1.08624 15.595C1.02938 15.7229 1 15.8613 1 16.0012C1 16.1412 1.02938 16.2796 1.08624 16.4075C1.12999 16.5062 2.18874 18.8537 4.54249 21.2075C7.67874 24.3425 11.64 26 16 26C18.2408 26.0127 20.4589 25.5514 22.5087 24.6462L25.2587 27.6725C25.3466 27.7715 25.4531 27.852 25.5723 27.9095C25.6915 27.967 25.8209 28.0003 25.9531 28.0074C26.0852 28.0145 26.2175 27.9953 26.3421 27.9509C26.4668 27.9066 26.5814 27.8379 26.6793 27.7489C26.7773 27.6599 26.8566 27.5523 26.9126 27.4325C26.9687 27.3126 27.0004 27.1828 27.0059 27.0506C27.0115 26.9184 26.9907 26.7864 26.9448 26.6622C26.899 26.5381 26.8289 26.4243 26.7387 26.3275L6.73999 4.32746ZM12.6562 13.8075L17.865 19.5387C17.0806 19.9514 16.1814 20.0918 15.3085 19.938C14.4357 19.7842 13.6386 19.3449 13.0425 18.689C12.4464 18.0331 12.085 17.1978 12.0151 16.3142C11.9452 15.4307 12.1707 14.5489 12.6562 13.8075ZM16 24C12.1525 24 8.79124 22.6012 6.00874 19.8437C4.86663 18.7087 3.89526 17.4139 3.12499 16C3.71124 14.9012 5.58249 11.8262 9.04374 9.82746L11.2937 12.2962C10.4227 13.4118 9.97403 14.7995 10.0272 16.2139C10.0803 17.6283 10.6317 18.9784 11.584 20.0256C12.5363 21.0727 13.8282 21.7495 15.2312 21.9363C16.6343 22.123 18.0582 21.8078 19.2512 21.0462L21.0925 23.0712C19.4675 23.6947 17.7405 24.0096 16 24ZM16.75 12.0712C16.4894 12.0215 16.2593 11.8703 16.1102 11.6509C15.9611 11.4314 15.9053 11.1618 15.955 10.9012C16.0047 10.6406 16.1559 10.4105 16.3753 10.2614C16.5948 10.1123 16.8644 10.0565 17.125 10.1062C18.3995 10.3533 19.56 11.0058 20.4333 11.9663C21.3067 12.9269 21.8462 14.144 21.9712 15.4362C21.9959 15.7003 21.9147 15.9633 21.7455 16.1675C21.5762 16.3717 21.3328 16.5003 21.0687 16.525C21.0375 16.5268 21.0062 16.5268 20.975 16.525C20.725 16.526 20.4838 16.4335 20.2987 16.2655C20.1136 16.0975 19.9981 15.8663 19.975 15.6175C19.8908 14.758 19.5315 13.9486 18.9504 13.3096C18.3694 12.6707 17.5977 12.2364 16.75 12.0712ZM30.91 16.4075C30.8575 16.525 29.5912 19.3287 26.74 21.8825C26.6426 21.9725 26.5282 22.0423 26.4036 22.0877C26.2789 22.1331 26.1465 22.1532 26.014 22.1469C25.8814 22.1407 25.7515 22.1081 25.6317 22.0511C25.5119 21.9941 25.4047 21.9139 25.3162 21.815C25.2277 21.7162 25.1598 21.6007 25.1163 21.4754C25.0729 21.35 25.0549 21.2173 25.0633 21.0849C25.0716 20.9525 25.1063 20.8231 25.1652 20.7042C25.2241 20.5853 25.306 20.4794 25.4062 20.3925C26.8051 19.1357 27.9801 17.6504 28.8812 16C28.1093 14.5847 27.1358 13.2891 25.9912 12.1537C23.2087 9.39871 19.8475 7.99996 16 7.99996C15.1893 7.99897 14.3799 8.06461 13.58 8.19621C13.4499 8.21922 13.3166 8.21622 13.1876 8.18739C13.0587 8.15857 12.9368 8.10448 12.8289 8.02827C12.721 7.95205 12.6293 7.85521 12.559 7.74334C12.4887 7.63147 12.4413 7.50679 12.4196 7.3765C12.3978 7.24621 12.402 7.11289 12.432 6.98424C12.462 6.8556 12.5172 6.73417 12.5945 6.62699C12.6717 6.5198 12.7694 6.42898 12.8819 6.35976C12.9944 6.29054 13.1195 6.2443 13.25 6.22371C14.1589 6.07363 15.0787 5.99879 16 5.99996C20.36 5.99996 24.3212 7.65746 27.4575 10.7937C29.8112 13.1475 30.87 15.4962 30.9137 15.595C30.9706 15.7229 31 15.8613 31 16.0012C31 16.1412 30.9706 16.2796 30.9137 16.4075H30.91Z" fill="#343330" />
              )}
            </svg>
          </div>
        </div>
        <div className={styles["frame-1547755086"]}>
          <div className={styles["checkbox-container"]}>
            <input
              type="checkbox"
              className={styles['checkbox-remember']}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <div className={styles["remember-me"]} >
              Remember me
            </div>
          </div>
          <div
            onClick={() => handlePassword()}
            className={styles["forgot-password"]}
          >
            Forgot password?
          </div>
        </div>
        <div className={styles["frame-1547755110"]}>
          <div
            onClick={() => handleLogin()}
            className={styles["login"]}
            tabIndex="0"
          >
            LOGIN
          </div>
        </div>
        <div className={styles["frame-1547755080"]}>
          <div className={styles["don-t-have-an-account"]}>Don’t have an account? </div>
          <div
            className={styles["sign-up"]}
            onClick={() => handleSignUp()}
          >
            Sign up
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;