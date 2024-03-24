import React, { useState, useEffect } from 'react'


import styles from './Meet.module.css'


import Icon1 from './assets/icon-1'
import Icon2 from './assets/icon-2'
import Icon3 from './assets/icon-3'



const Meet = () => {

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div>
                    <ConferenceTheme />
                </div>
                <div>
                    <Carousel />
                </div>
            </div>
        </div>
    )

}


export default Meet











const ConferenceTheme = () => {
    return (
        <div>
            <h1 className={styles.title}>
                Seguridad de una conferencia vectorizada
            </h1>
            <p className={styles.text}>
                Una pequeña ventaja: La conferencia vectorizada ofrece una
                experiencia segura y eficiente para la comunicación en línea,
                garantizando la privacidad y la integridad de la información.
            </p>
            <div className={styles.buttons}>
                <button
                    className={styles.button1}
                    onClick={() => {
                        // Lógica para iniciar la llamada
                        alert('Iniciando la llamada...');
                    }}
                >
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z" clipRule="evenodd" />
                    </svg>

                    Iniciar llamada
                </button>
                <div className={styles.inputRoom}>
                    <svg className={styles.svgIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                    </svg>

                    <input
                        type="text"
                        placeholder="AY-0000"
                    />
                    <button
                        className={styles.button2}
                        onClick={() => {
                            // Lógica para entrar a la sala
                            alert('Entrando a la sala...');
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    );
};



const Carousel = () => {
    const data = [
        {
            image: <Icon1 />,
            text: `Genera comparte y haz realidad tu idea en tan solo tres pasos. 
            Imaginate el brainstroming llevado al siguiente nivel.`
        },
        {
            image: <Icon2 />,
            text: `Sesiones interactivas y herramientas colaborativas para compartir 
            conceptos y visiones. Una comunicación siempre fluida.            `
        },
        {
            image: <Icon3 />,
            text: `Conectate con colegas y amigos de todo el mundo y genera ideas innovadoras. 
            Haz realidad tus idead en tiempo récord.`
        }
    ];





    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Cambiar al siguiente elemento del carrusel
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 20000);

        // Limpiar el temporizador al desmontar el componente
        return () => clearInterval(intervalId);
    }, [currentIndex, data.length]);

    const handlePrev = () => {
        // Cambiar al elemento anterior del carrusel
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const handleNext = () => {
        // Cambiar al siguiente elemento del carrusel
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    return (
        <div className={styles.carousel}>
            <div className={styles.image}>
                {data[currentIndex].image}
            </div>
            {/* <img src={data[currentIndex].image} alt={`imagen ${currentIndex + 1}`} /> */}
            <p className={styles.info}>
                {data[currentIndex].text}
            </p>
            <div className={styles.steps}>
                <div className={styles.step} onClick={handlePrev}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                        </svg>
                    </button>
                    Anterior
                </div>
                <div className={styles.step} onClick={handleNext}>
                    Siguiente
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

