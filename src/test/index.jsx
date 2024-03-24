import React, { useState, useEffect, useRef } from 'react'
import Heatmap from 'heatmap.js';


const HeadMap = ({ }) => {
    const [data, setData] = useState([]);
    const heatmapRef = useRef(null);
    const heatmapInstanceRef = useRef(null);
    const clickValuePercentage = 1; // 100%
    const mouseMoveValuePercentage = 0.1; // 10%

    useEffect(() => {

        const color0 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-0').trim()
        const color1 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-1').trim()
        const color2 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-2').trim()
        const color3 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-3').trim()
        const color4 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-4').trim()
        heatmapInstanceRef.current = Heatmap.create({
            container: heatmapRef.current,
            radius: 25,
            gradient: {
                // Define tu propia paleta de colores
                '.2': 'blue',
                '.4': color3,
                '.6': color2,
                '.8': color1,
                '.95': color0
            }
            // Otras opciones personalizadas según necesites
        });

        return () => {
            heatmapInstanceRef.current.remove();
        };
    }, []);

    useEffect(() => {
        if (heatmapInstanceRef.current) {
            heatmapInstanceRef.current.setData({
                max: 1,
                data: data
            });
        }
    }, [data]);

    const handleCanvasMouseMove = (event) => {
        const rect = heatmapRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const value = mouseMoveValuePercentage;

        setData(prevData => [...prevData, { x, y, value }]);
    };

    const handleCanvasClick = (event) => {
        const rect = heatmapRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const value = clickValuePercentage;

        setData(prevData => [...prevData, { x, y, value }]);
    };



    return (
        <div>
            headmap

            <div
                ref={heatmapRef}
                style={{ width: '100%', height: '400px', position: 'relative' }}
                onMouseMove={handleCanvasMouseMove}
                onClick={handleCanvasClick}
            />
            <button onClick={() => setData([])}>Clear Data</button>
            <Settings />
        </div>
    )
}

export default HeadMap




const Settings = () => {
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    function getBrowserDeviceInfo() {
        const userAgent = navigator.userAgent;
        const deviceType = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent) ? 'Mobile' : 'Desktop';
        const browser = (function () {
            const ua = userAgent.toLowerCase();
            const match = /(edge)\/([\w.]+)/.exec(ua) ||
                /(opr)[\/]([\w.]+)/.exec(ua) ||
                /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(firefox)[ \/]([\w.]+)/.exec(ua) ||
                /(safari)[ \/]([\w.]+)/.exec(ua) ||
                /(msie|trident)[ :]?([\w.]+)/.exec(ua) ||
                [];
            return { name: match[1] || '', version: match[2] || '0' };
        })();
        return { deviceType, browser };
    }

    // Function to get the country of the visitor
    function getCountry() {
        return fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                return {
                    ip: data.ip,
                    population: data.country_population,
                    country_name: data.country_name,
                    country: data.country,
                    region: data.region,
                    city: data.city,
                    postalCode: data.postal
                };
            })
            .catch(error => {
                console.error('Error getting country:', error);
                return null;
            });
    }

    function getUserEnvironmentInfo() {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const language = navigator.language;
        const platform = navigator.platform;
        const connectionType = navigator.connection ? navigator.connection.effectiveType : 'Unknown';

        const cookiesEnabled = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
        return { screenWidth, screenHeight, connectionType, language, platform, cookiesEnabled };
    }



    // Function to register session duration, country, and traffic source
    function registerSession(country, trafficSource, startTime) {
        window.addEventListener('beforeunload', () => {
            const endTime = new Date();
            const durationInSeconds = Math.round((endTime.getTime() - startTime.getTime()) / 1000); // Duration in seconds

            // Here you would send the session data to your analytics system or tracking service
            console.log(`Session duration in ${country} from ${trafficSource}: ${durationInSeconds} seconds`);
        });
    }

    // Get the country, traffic source, and register session on page load
    useEffect(() => {

        const fetchItem = async () => {
            const startTime = new Date();
            const trafficSource = document.referrer;

            const { deviceType, browser } = getBrowserDeviceInfo();
            const { screenWidth, screenHeight, connectionType, language, platform, cookiesEnabled } = getUserEnvironmentInfo();
            const currentTime = getCurrentTime();
            const { ip, population, country_name, country, region, city, postalCode } = await getCountry()

            console.log(`IP: ${ip}`);
            console.log(`Population: ${population}`);
            console.log(`Country Name: ${country_name}`);
            console.log(`Country: ${country}`);
            console.log(`Region: ${region}`);
            console.log(`City: ${city}`);
            console.log(`Postal Code: ${postalCode}`);

            console.log(`Devie Type: ${deviceType}`);
            console.log(`Connection Type: ${connectionType}`);
            console.log(`Browser:`, browser);
            console.log(`Current Time: ${currentTime}`);
            console.log(`Traffic Source: ${trafficSource}`);
            console.log(`Screen Resolution: ${screenWidth}x${screenHeight}`);
            console.log(`Language: ${language}`);
            console.log(`Platform: ${platform}`);
            console.log(`Cookies: ${cookiesEnabled}`);
        }


        fetchItem()
    }, [])


    return (
        <div>
            <ul>
                <li>
                    Sesiones de pagina con mapas de calor
                    Pudes rastrear los cursores de cada sesión para así entender la cantidad de
                    tráfico que interactúa con el contenido.
                </li>
                <li>
                    Duración de la sesión
                    Cuanto tiempo pasan los usuarios en una página, una sesión más larga puede indicar
                    un mayor interés en el producto.
                </li>
                <li>
                    Eventos de interacción
                    Rastraer eventos específicos como clics, zooms, movimientos podría darte una comprensión
                    más detallada del comportamiento del usuario.
                </li>
                <li>
                    Páginas vistas
                    Seguir el número de páginas vistas por sesión te ayuda a ver cómo los usuarios navegan
                    a través de tu sitio web
                </li>
                <li>
                    Tasa de rebote
                    Puede indicar si el usuario encuentra contenido relevante y útil, una tasa baja de rebote
                    podría indicar un mayor interés
                </li>
                <li>
                    Conversiones
                    Si tienes objetivos como (completar un formulario, realizar una compra, etc..) puedes rastrear
                    cuántas conversiones  ocurren para ver el impacto.
                </li>
                <li>
                    Segmentación de usuario
                    Puedes comprender cómo diferentes grupos interactúan, puedes segmentar por zonas geograficas,
                    navegación, fuentes de tráfico, etc..
                </li>
            </ul>
        </div>
    )
}