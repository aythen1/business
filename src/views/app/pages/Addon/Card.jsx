import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

// import './Card.css'

import styles from './Card.module.css'

export const AddonCard = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // La función de limpieza se ejecuta al desmontar el componente
        return () => {
            setIsMounted(false);
        };
    }, []);


    // ---------------------------------------------------------------------------------

    const [isActive, setIsActive] = useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
    });
    const [prevScrollTop, setPrevScrollTop] = useState(0);

    const handleScroll = () => {
        const templateElement = document.getElementById('template');
        if (templateElement && inView) {
            const scrollTop = templateElement.scrollTop;

            // Determinar la dirección del scroll
            const scrollDirection = scrollTop > prevScrollTop ? true : false;
            // console.log('Scroll Direction:', scrollDirection);
            setIsActive(scrollDirection)

            // Actualizar el valor del desplazamiento anterior
            setPrevScrollTop(scrollTop);
        }
    };

    useEffect(() => {
        if (inView) {
            const templateElement = document.getElementById('template');
            if (templateElement) {
                templateElement.addEventListener('scroll', handleScroll);
            }
        }

        return () => {
            const templateElement = document.getElementById('template');
            if (templateElement) {
                templateElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [inView]);



    // ---------------------------------------------


    return (
        <div id="template" ref={ref} className={`${styles.template} ${isActive && styles.active} `}>
            <div className={styles.templateA}>
                <div className={styles.title}>
                    <h2 >
                        Qué es un addon?<br />
                        algun addon especial
                    </h2>
                </div>
                <div className={styles.grid2}>
                    <div className={styles.info}>
                        <span>
                            Estos son tus addons disponibles
                        </span>
                        <p>
                            Revolut: para las personas que quieren sacar más
                            partido a su dinero. Regístrate gratis y obtén tu
                            IBAN español.
                        </p>
                        <button>
                            Get Started
                        </button>
                    </div>
                    <div className={styles.card}>
                        <ul className={styles.ul}>
                            <li className={styles.li}>
                                {/* Contenido de tu tarjeta específica */}
                                <div className={styles.credit}>
                                    <div className={styles.bank}>Money Bank</div>
                                    <div className={styles.chip}></div>
                                    <div className={styles.number}>1234 5678 9101 1121</div>
                                    <div className={styles.date}>10/21</div>
                                    <div className={styles.name}>Real Person</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.templateB}>
                <div>
                    <h2>
                        Gasta con cabeza
                    </h2>
                    <p>
                        ¿Tienes que hacer la compra? Añade RevPoints a la cesta. ¿Estás en Japón? Paga en yenes. ¿Crees que compartir es vivir? Prueba la cuenta conjunta. Revolut tiene todo lo que necesitas.
                    </p>
                    <span>
                        Se aplican Términos y Condiciones.
                    </span>
                    <button>
                        Empezar
                    </button>
                </div>
            </div>
            {/* <div className={styles.cardMove}>
                <Cards />
            </div> */}

            {isMounted && (
                <style>
                    {`
            html {
                --hang-time: 20;
                --spin-time: 10;
                --drift-amount: 150;
              }
            #app {
              background-image: url(/assets/background.jpg);
            //   background: red;
              background-size: cover;
              background-position: left;
            }

            [class^="TopBar"] {
              background-color: transparent;
            }

            [class^="Container"] {
              overflow-y: hidden;
              background-color: transparent;
            }

            [class^="Board"] {
              overflow-y: hidden;
              min-height: 100% !important;
              max-width: 100% !important;
              margin: 0px auto !important;
            }
          `}
                </style>
            )}
        </div>

    )
}






const hangTime = 2000;

export const Cards = () => {
    const [state, setState] = useState('out');

    const cardId = 'credit-card'; // Cambia esto al ID de tu tarjeta específica

    const getCard = () => document.getElementById(cardId);

    const nextCard = () => {
        setState('show');
        setTimeout(() => {
            setState('in');
            setTimeout(() => {
                setState('out');
            }, hangTime);
        }, hangTime);
    };

    useEffect(() => {
        const interval = setInterval(() => nextCard(), hangTime * 3); // Cada ciclo tiene 3 estados (out, show, in)
        return () => clearInterval(interval);
    }, []);

    return (
        <ul className={styles.ul}>
            <li id={cardId} data-state={'show'} className={styles.li}>
                {/* Contenido de tu tarjeta específica */}
                <div className={styles.credit}>
                    <h1 className={styles.title}>Money Bank</h1>
                    <div className={styles.chip}></div>
                    <div className={styles.number}>1234 5678 9101 1121</div>
                    <div className={styles.date}>10/21</div>
                    <div className={styles.name}>Real Person</div>
                </div>
            </li>
        </ul>
    );
};