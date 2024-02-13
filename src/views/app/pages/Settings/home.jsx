import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import AddTag from './iam/AddTag'

import stylesModal from './iam/modal.module.css'
import styles from './home.module.css'

import DashBoard from '../DashBoard'

import BackgroundBanner from './assets/backgroundBanner.svg'
import IconDNS from './assets/IconDNS.svg'
import IconInstance from './assets/IconInstance.png'
import ChangelogKubernetes from './assets/changelogKubernetes.webp'
import IconPlus from './assets/IconPlus.svg'


import SettingsCurrentConsumption from '../shared/settingsCurrentConsumption'

import {
    fetchsDefault
} from '@/actions/iam'

import {
    setModal
} from '@/slices/iamSlice'

import {
    fetchsAddon,
    addAddon,
    deleteAddon,
} from '@/actions/addon'


// import {
//     fetchsDashboard
// } from '@/actions/dashboard'






const Home = ({

}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {
        dashboards,
        changelogs,
        news
    } = useSelector((state) => state.iam)

    const [stateTable, setStateTable] = useState('')


    useEffect(() => {
        // console.log('click dashboard', stateTable)
        // if(stateTable.startsWith('edit-item:')){
        //   const id = stateTable.split(':')[1]
        //   const index = users.findIndex(user => user.id === id);
        //   const user = users[index]
        //   console.log('user', user)

        //   dispatch(setModal(<PopupModalUser user={user} styles={stylesModal} />))
        // }else if(stateTable.startsWith('delete-item:')){
        //   const id = stateTable.split(':')[1]
        //   const token = localStorage.getItem('token')
        //   dispatch(deleteUser({token, id}))
        // }
    }, [stateTable])





    const [organization, setOrganization] = useState({
        title: 'Tu interfaz de ojos para tu tienda',
        version: '1.0',
        name: 'Eye Origin',
        description: 'puedes gestionar las ediciones de ojos entre tiendas, clientes y empleados.',
        subtitle: 'Donde quieres vernos',
        createdAt: '',
        updatedAt: ''
    })

    const initial = [];
    const [listAddons, setListAddons] = useState(initial)
    const { addons } = useSelector((state) => state.addon)


    const handleClickAddon = (item) => {
        console.log('handleClickAddon', item)
        navigate(`/${'es'}/app/addon/${item.href}`)
    }

    useEffect(() => {
        const fetchsItem = async () => {
            await dispatch(fetchsAddon())
        }

        fetchsItem()
    }, [])

    useEffect(() => {
        setListAddons(addons)
    }, [addons])


    // ------------------------------------------

    const [indexChangelog, setIndexChangelog] = useState(0)
    const [itemChangelog, setItemChangelog] = useState([])
    const [listChangelogs, setListChangelogs] = useState([])
    const [listNotes, setListNotes] = useState([])

    useEffect(() => {
        if (changelogs.length == 0 || news.length == 0) {
            dispatch(fetchsDefault({}))
        }
    }, [])

    useEffect(() => {
        setListChangelogs(changelogs)
        setItemChangelog(changelogs[indexChangelog])
    }, [changelogs])

    useEffect(() => {
        if (news.length > 0) {
            setListNotes(news)
        }
    }, [news])


    const onPrevChangelogs = () => {
        if (indexChangelog > 0) {
            setItemChangelog(changelogs[indexChangelog - 1]);
            setIndexChangelog(indexChangelog - 1);
        }
    };

    const onNextChangelogs = () => {
        if (indexChangelog < changelogs.length - 1) {
            setItemChangelog(changelogs[indexChangelog + 1]);
            setIndexChangelog(indexChangelog + 1);
        }
    };




    // --------------------------------

    const handleClickBilling = () => {
        navigate('/es/app/settings/billing')
    }


    const handleClickIAM = () => {
        navigate('/es/app/iam')
    }

    const handleClickApplyNow = () => {
        navigate('/es/app/settings/drive')
    }


    const handleToggleChangeLog = (type) => {
        switch (type) {

        }
    }

    const handleClickSupport = () => {
        navigate(`/${'es'}/app/support`)
    }

    const handleModalAddAddon = (addon) => {
        dispatch(setModal(<ModalAddAddon styles={stylesModal} addon={addon} />))
    }

    const handleClickPremium = () => {
        navigate(`/${'es'}/app/addon/card`)
    }




    return (
        <div className={styles["main"]}>
            <div className={styles["headerTab"]}>
                <div className={styles["title"]}>
                    Organization: Aythen
                </div>
                <div className={styles["containerButton"]}>
                    <button onClick={() => handleClickBilling()}>
                        Banca
                    </button>
                    <button onClick={() => handleClickIAM()} className={styles["xs-hidden"]}>
                        <svg viewBox="0 0 16 10" ><path d="M8,0 C9.2886644,0 10.3333334,1.080692 10.3333334,2.41379308 C10.3333334,3.74689425 9.2886644,4.82758617 8,4.82758617 C6.71133558,4.82758617 5.66666666,3.74689425 5.66666666,2.41379308 C5.66666666,1.080692 6.71133558,0 8,0 M3.33333334,1.72413792 C3.70666666,1.72413792 4.05333334,1.82758617 4.35333334,2.01379308 C4.25333334,3 4.53333334,3.97931033 5.10666666,4.74482758 C4.77333334,5.40689658 4.10666666,5.862069 3.33333334,5.862069 C2.22876383,5.862069 1.33333334,4.93576158 1.33333334,3.79310342 C1.33333334,2.65044533 2.22876383,1.72413792 3.33333334,1.72413792 M12.6666666,1.72413792 C13.7712362,1.72413792 14.6666666,2.65044533 14.6666666,3.79310342 C14.6666666,4.93576158 13.7712362,5.862069 12.6666666,5.862069 C11.8933334,5.862069 11.2266666,5.40689658 10.8933334,4.74482758 C11.4666666,3.97931033 11.7466666,3 11.6466666,2.01379308 C11.9466666,1.82758617 12.2933334,1.72413792 12.6666666,1.72413792 M3.66666666,8.79310342 C3.66666666,7.36551725 5.60666666,6.20689658 8,6.20689658 C10.3933334,6.20689658 12.3333334,7.36551725 12.3333334,8.79310342 L12.3333334,10 L3.66666666,10 L3.66666666,8.79310342 M0,10 L0,8.96551725 C0,8.00689658 1.26,7.2 2.96666666,6.96551725 C2.57333334,7.43448275 2.33333334,8.08275858 2.33333334,8.79310342 L2.33333334,10 L0,10 M16,10 L13.6666666,10 L13.6666666,8.79310342 C13.6666666,8.08275858 13.4266666,7.43448275 13.0333334,6.96551725 C14.74,7.2 16,8.00689658 16,8.96551725 L16,10 Z"></path></svg>
                        Identificación y acceso de manager (IAM)
                    </button>
                    <button onClick={() => handleClickIAM()} className={styles["lg-hidden"]}>
                        <svg viewBox="0 0 16 10" ><path d="M8,0 C9.2886644,0 10.3333334,1.080692 10.3333334,2.41379308 C10.3333334,3.74689425 9.2886644,4.82758617 8,4.82758617 C6.71133558,4.82758617 5.66666666,3.74689425 5.66666666,2.41379308 C5.66666666,1.080692 6.71133558,0 8,0 M3.33333334,1.72413792 C3.70666666,1.72413792 4.05333334,1.82758617 4.35333334,2.01379308 C4.25333334,3 4.53333334,3.97931033 5.10666666,4.74482758 C4.77333334,5.40689658 4.10666666,5.862069 3.33333334,5.862069 C2.22876383,5.862069 1.33333334,4.93576158 1.33333334,3.79310342 C1.33333334,2.65044533 2.22876383,1.72413792 3.33333334,1.72413792 M12.6666666,1.72413792 C13.7712362,1.72413792 14.6666666,2.65044533 14.6666666,3.79310342 C14.6666666,4.93576158 13.7712362,5.862069 12.6666666,5.862069 C11.8933334,5.862069 11.2266666,5.40689658 10.8933334,4.74482758 C11.4666666,3.97931033 11.7466666,3 11.6466666,2.01379308 C11.9466666,1.82758617 12.2933334,1.72413792 12.6666666,1.72413792 M3.66666666,8.79310342 C3.66666666,7.36551725 5.60666666,6.20689658 8,6.20689658 C10.3933334,6.20689658 12.3333334,7.36551725 12.3333334,8.79310342 L12.3333334,10 L3.66666666,10 L3.66666666,8.79310342 M0,10 L0,8.96551725 C0,8.00689658 1.26,7.2 2.96666666,6.96551725 C2.57333334,7.43448275 2.33333334,8.08275858 2.33333334,8.79310342 L2.33333334,10 L0,10 M16,10 L13.6666666,10 L13.6666666,8.79310342 C13.6666666,8.08275858 13.4266666,7.43448275 13.0333334,6.96551725 C14.74,7.2 16,8.00689658 16,8.96551725 L16,10 Z"></path></svg>
                        Acceso (IAM)
                    </button>
                </div>
            </div>
            <div>
                <div className={styles["containerBanner"]}>
                    <h2 className={styles["title"]}>
                        Obtén tu base de DB vector gratis <br />
                    </h2>
                    <p className={styles["paragraph"]}>
                        Hasta x2000 veces más rápido que una base de datos convencional, con una capacidad de 10.000 por un millon de
                        vectores guardado en un pendrive, con ay-cloud puedes generar pivots para calcular datos tan fácil como
                        usar [ 1, 2, 3, ..].
                    </p>
                    <button
                        onClick={() => handleClickApplyNow()}
                        className={styles["applyNow"]}
                    >
                        Apply now
                    </button>
                    <img className={styles["backgroundBanner"]} src={BackgroundBanner} />
                </div>
            </div>
            <div className={styles["gird2"]}>
                <div >
                    <div className={styles["ul2"]} style={{ marginBottom: 12 }}>
                        <h2 className={styles["title"]}>
                            + Add-ons
                            <label>
                                Pro
                            </label>
                        </h2>
                        <div className={styles["buttonsPrev"]}>
                            <button onClick={() => onPrevChangelogs()}>
                                <svg viewBox="0 0 16 16" className="css-133lu9h e1gt4cfo0"><path d="M5.3 8.7a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.4 1.4L7.42 8l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4Z"></path></svg>
                            </button>
                            <button onClick={() => onNextChangelogs()}>
                                <svg viewBox="0 0 16 16" className="css-133lu9h e1gt4cfo0"><path d="M10.7071 7.29289C11.0976 7.68342 11.0976 8.31658 10.7071 8.70711L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L8.58579 8L5.29289 4.70711C4.90237 4.31658 4.90237 3.68342 5.29289 3.29289C5.68342 2.90237 6.31658 2.90237 6.70711 3.29289L10.7071 7.29289Z"></path></svg>
                            </button>
                        </div>
                    </div>
                    {listAddons.length > 0 && (
                        <div className={styles["ul2"]} style={{ gridColumn: 'span 2' }}>
                            <div>
                                <div
                                    className={styles["li2"]}
                                    onClick={() => handleModalAddAddon()}
                                >
                                    <div>
                                        <div className={styles["IconPlus"]}>
                                            <img src={IconPlus} />
                                        </div>
                                        Añadir nuevo
                                    </div>
                                    <b className={styles["LabelNew"]}>
                                        New
                                    </b>
                                </div>
                            </div>
                            <div>
                                {listAddons.map((item, index) => (
                                    <div
                                        key={index}
                                        className={styles["li2"]}
                                        onClick={() => handleClickAddon(item)}
                                    >
                                        <div>

                                            <img src={IconInstance} />
                                            {item.title}
                                        </div>
                                        <b onClick={(e) => {
                                            e.stopPropagation()
                                            handleModalAddAddon(item)
                                        }}>
                                            sets
                                        </b>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {listAddons.length == 0 && (
                        <div className={styles["noneAddon"]}>
                            <p>
                                Crea tus Addons para crear componentes vectoriales en los
                                cuales representar
                            </p>
                            <label>
                                No existe ningun addon quieres crearlo
                            </label>
                            <div className={styles["buttons"]}>
                                <button
                                    onClick={() => handleModalAddAddon()}
                                >
                                    New Addon
                                </button>
                                <button
                                    className={styles["buttonPremium"]}
                                    onClick={() => handleClickPremium()}
                                >
                                    Premium Addon
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles["containerConsumption"]}>
                    <h2 className={styles["title"]}>
                        Vectors DB
                    </h2>
                    <div className={styles["boxConsumption"]}>
                        <SettingsCurrentConsumption />
                    </div>
                </div>
            </div>
            <div className={styles["box"]}>
                <DashBoard />
            </div>
            <div className={styles["containerTrid"]}>
                <div className={styles["containerChangelog"]}>
                    <div className={styles["title"]}>
                        <h2>
                            Actualizaciones
                        </h2>
                        <a onClick={() => handleClickSupport()}>
                            Ver más
                            <svg viewBox="0 0 24 24" className={styles.svg} >
                                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                            </svg>
                        </a>
                    </div>
                    <div className={styles["boxChangelog"]}>
                        <div
                            className={styles["buttonsPrev"]}
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 10
                            }}
                        >
                            <button onClick={() => onPrevChangelogs()}>
                                <svg viewBox="0 0 16 16" className="css-133lu9h e1gt4cfo0"><path d="M5.3 8.7a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.4 1.4L7.42 8l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4Z"></path></svg>
                            </button>
                            <button onClick={() => onNextChangelogs()}>
                                <svg viewBox="0 0 16 16" className="css-133lu9h e1gt4cfo0"><path d="M10.7071 7.29289C11.0976 7.68342 11.0976 8.31658 10.7071 8.70711L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L8.58579 8L5.29289 4.70711C4.90237 4.31658 4.90237 3.68342 5.29289 3.29289C5.68342 2.90237 6.31658 2.90237 6.70711 3.29289L10.7071 7.29289Z"></path></svg>
                            </button>
                        </div>
                        <Changelog item={itemChangelog} onClick={handleClickSupport}/>

                    </div>
                </div>
                <div className={styles["containerNews"]}>
                    <div className={styles["title"]}>
                        <h2>
                            Notas
                        </h2>
                        <a onClick={() => handleClickSupport()}>
                            Ver más
                            <svg viewBox="0 0 24 24" className={styles.svg} >
                                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                            </svg>
                        </a>
                    </div>
                    <div className={styles["boxNews"]}>
                        <News items={listNotes} />
                    </div>
                </div>
                <div className={styles["containerKey"]}>
                    <div className={styles["boxKey"]}>

                        <div className={styles["icon"]}>
                            <svg viewBox="0 0 16 16"><path d="M4.364 9.333c-.804 0-1.455-.671-1.455-1.5 0-.828.651-1.5 1.455-1.5.803 0 1.454.672 1.454 1.5 0 .829-.651 1.5-1.454 1.5zm4.109-3c-.597-1.747-2.211-3-4.11-3C1.954 3.333 0 5.348 0 7.833c0 2.486 1.954 4.5 4.364 4.5 1.898 0 3.512-1.252 4.109-3h3.163v3h2.91v-3H16v-3H8.473z"></path></svg>
                        </div>
                        <b className={styles["text"]}>
                            {organization?.title || 'Not found'}
                            {!organization?.subtitle && 'power by Aythen'}

                        </b>
                        <p className={styles["paragraph"]}>
                            En {organization?.name || '-'} usamos {organization?.description || '-'}
                            <br />
                            {!organization?.subtitle && 'Necesitas hacerte premium.'}
                        </p>
                        <a className={styles["share"]}>
                            <svg viewBox="0 0 24 24"><path d="M15 5l-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"></path></svg>
                            <span>

                                {organization?.subtitle || 'Hazte premium ahora'}
                            </span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home













const News = ({ items }) => {
    const navigate = useNavigate()

    const onClickSupport = () => {
        navigate('/es/app/support')
    }

    return (
        <div>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={styles["items"]}
                >
                    <div className={styles["info"]}>
                        <span className={styles["date"]}>
                            {item?.date || 'Thu Dec 21 2023'}
                        </span>
                        <b>
                            {item?.title || 'Quantization, a game-changer for cloud-based machine learning efficiency - Part 1'}
                        </b>
                        <p>
                            {item?.description || `What is quantization? And how can it make such a big difference to machine
                    learning efficiency? Find out in part 1 of our series`}
                        </p>
                    </div>
                    <button
                        onClick={() => onClickSupport()}
                        className={styles["button"]}
                    >
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </button>
                </div>
            ))}
        </div>
    )
}




const Changelog = ({ item, onClick}) => {
    return (
        <div>
            <img src={ChangelogKubernetes} className={styles["image"]} />
            <div className={styles["labelContainer"]}>
                <label>
                    {item?.type || 'Kubernetes'}
                </label>
            </div>
            <div className={styles["info"]}>
                <b>
                    {item?.title || 'Proxy Registry is now available!'}
                </b>
                <p>
                    {item?.description || `🚀 Kubernetes Kapsule now benefits from a proxy registry in all regions,
                                caching required system images for new clusters and new nodes. This addition
                                eliminates rate limiting from the official container registries used to pull
                                system`}
                </p>
            </div>
            <div 
            className={styles["share"]}
            onClick={() =>  onClick()}
            >
                <a>
                    <svg viewBox="0 0 24 24"><path d="M15 5l-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"></path></svg>
                    {item?.next || 'View changes'}
                </a>
                <div>
                    {item?.count || '1/5'}
                </div>
            </div>
        </div>
    )
}




const ModalAddAddon = ({ styles, addon }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [isNewAddon, setIsNewAddon] = useState(addon?.id ? true : false);
    const [isActive, setIsActive] = useState(false)


    // ---
    const [state, setState] = useState({
        id: addon?.id || '',

        tag: addon?.tag || [],
        createdAt: addon?.createdAt || '',

        image: addon?.image || '',
        title: addon?.title || '',
        href: addon?.href || '',
        description: addon?.description || '',

        components: addon?.components || [],

        available: addon?.available || false,
        public: addon?.public || false
    });




    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'title') {
            // Verificar si el texto tiene una longitud mayor a cero
            const isValidText = value.trim().length > 0;

            setIsActive(isValidText);

            setState((prevState) => ({
                ...prevState,
                [property]: isValidText ? [value.trim()] : [],  // Asegura que el valor sea un array
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };




    const handleAddAddon = () => {
        const data = {
            // owner: user?.id || '3r3',
            available: true,
            public: true,

            title: 'hello',
            href: 'hello',
            description: '33r',
            tags: state.tags || [],

            updatedAt: new Date(),
            createdAt: new Date(),
        }

        dispatch(addAddon(data))
        dispatch(setModal(null))
    }


    const handleDeleteAddon = () => {
        dispatch(deleteAddon(state.id))
    }


    const handleEditAddon = () => {
        navigate(`/${'es'}/app/addon/${state.id}`)
        dispatch(setModal(null))
    }



    // -------------------------------------z
    const imgRef = useRef(null);

    const [imageError, setImageError] = useState(false);

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
                setImageError(false);

                if (imgRef.current) {
                    const imgElement = imgRef.current;

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

                    // Actualiza el src y el estilo de la imagen principal
                    imgElement.src = base64Image;
                    imgElement.width = scaledWidth;
                    imgElement.height = scaledHeight;
                }


            };
        };

        reader.readAsDataURL(file);
    };


    return (
        <div className={styles.modal}>
            {state.id ? (
                <div className={styles.gird2}>
                    <h2 className={styles.title} style={{ marginTop: -10 }}>
                        Moficiar Addon {state.title}
                    </h2>
                    <div>
                        <button onClick={() => handleEditAddon()}>
                            edit
                        </button>
                        creado hace 2s - user12345
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className={styles.title} style={{ marginTop: -10 }}>
                        Nuevo Addon
                    </h2>
                </div>
            )}
            <div className={styles.gird2} style={{ gap: 20 }}>
                <div
                    onClick={handleSaveImage}
                    className={styles.logo}
                >
                    {imageError ? (
                        <div
                            className={styles.initial}
                        >
                            {state?.title.charAt(0) || 'A'}
                        </div>
                    ) : (
                        <img
                            ref={imgRef}
                            src={`http://localhost:3001/service/v1/addon/logo/${state.id}`}
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
                <div style={{ width: '100%' }}>
                    <p className={styles.textBold}>
                        Enter the title for addon.
                    </p>
                    <div className={styles.input}>
                        <input
                            type="text"
                            spellCheck="false"
                            value={state.title}
                            placeholder={'Select title of addon'}
                            onChange={(e) => handleInputChange(e, 'title')}
                        />
                    </div>
                    <p className={styles.textBold} style={{ marginTop: 8 }}>
                        Enter the href for addon.
                    </p>
                    <div className={styles.input}>
                        <input
                            type="text"
                            spellCheck="false"
                            value={state.href}
                            placeholder={'Select href of addon'}
                            onChange={(e) => handleInputChange(e, 'href')}
                        />
                    </div>
                </div>
            </div>
            <p className={styles.textBold}>
                Add to an existing group (optional)
            </p>
            <textarea
                placeholder={'Description Addon..'}
                spellCheck="false"
                value={state.description}
                className={styles.textarea}
                onChange={(e) => handleInputChange(e, 'description')}
            />
            <div className={`${styles.textBold} ${styles.gird2}`}>
                Select type public or available addons.
                <svg viewBox="0 0 24 24" ><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
            </div>
            <div>
                <div className={styles.checkbox}>
                    <input
                        type="checkbox"
                        name="available"
                        checked={state.available}
                        onChange={(e) => handleInputChange(e.target.name, 'available')}
                    />
                    Available addon for applications.
                </div>
                <div className={styles.checkbox}>
                    <input
                        type="checkbox"
                        name="public"
                        checked={state.public}
                        onChange={(e) => handleInputChange(e.target.name, 'public')}
                    />
                    Public addon for applications.
                </div>
            </div>
            <h2 className={styles.title}>
                Enter key value tags
            </h2>
            <p className={styles.text1}>
                Key value tags helps you organize your users. You can assign up to 10 tags per addons.
            </p>
            <div>
                <AddTag
                    handleInputChange={handleInputChange}
                />
            </div>
            {isNewAddon ? (
                <div className={styles.button}>
                    <button
                        onClick={() => handleAddAddon()}
                        className={styles.active}
                    >
                        Save Addon
                    </button>
                    <button
                        onClick={() => handleDeleteAddon()}
                        className={styles.delete}
                    >
                        Delete Addon
                    </button>
                </div>
            ) : (
                <div className={styles.button}>
                    <button
                        onClick={() => handleAddAddon()}
                        className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                    >
                        Create a New Addon
                    </button>
                </div>
            )}
        </div>
    )
}
