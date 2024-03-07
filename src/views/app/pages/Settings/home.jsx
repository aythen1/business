import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';


import 'intro.js/introjs.css';
import { Steps, Hints } from 'intro.js-react';


// import stylesModal from './iam/modal.module.css'
import styles from './home.module.css'

import ModalAddon from '../Addon/Vector'
import DashBoard from '../DashBoard'

import BackgroundBanner from './assets/backgroundBanner.jsx'
import IconDNS from './assets/IconDNS.svg'
import ChangelogKubernetes from './assets/changelogKubernetes.webp'

import IconInstance from './assets/IconInstance'
import IconPlus from './assets/IconPlus'


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

import {
    setAddon
} from '@/slices/addonSlice'

// import {
//     fetchsDashboard
// } from '@/actions/dashboard'

import {
    iniVector,
    addVector,
    fetchsVector,
} from '@/actions/vector'






const Home = ({

}) => {
    const { t } = useTranslation();



    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {
        user,
        dashboards,
        changelogs,
        news
    } = useSelector((state) => state.iam)

    const {
        vectors,
    } = useSelector((state) => state.vector)

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


    // -----------------------------------
    const ADDONS_PER_PAGE = 6;
    const { addons } = useSelector((state) => state.addon)
    const [pageAddons, setPageAddons] = useState(1)
    const [listAddons, setListAddons] = useState([])
    const [filteredAddons, setFilteredAddons] = useState([])


    const handleClickAddon = async (item) => {
        // console.log('handleClickAddon', item)
        await dispatch(setAddon(item))
        navigate(`/${'es'}/app/addon/${item.id}`)
    }


    useEffect(() => {
        const fetchItems = async () => {
            await dispatch(fetchsAddon());
        };

        fetchItems();
    }, [dispatch]);

    useEffect(() => {
        setListAddons(addons);
    }, [addons]);

    useEffect(() => {
        const startIndex = (pageAddons - 1) * ADDONS_PER_PAGE;
        const endIndex = startIndex + ADDONS_PER_PAGE;
        setFilteredAddons(listAddons.slice(startIndex, endIndex));
    }, [pageAddons, listAddons]);

    // Nuevo useEffect para reflejar cambios en addons
    useEffect(() => {
        setListAddons(addons);
    }, [addons]);

    const onPrevAddons = () => {
        if (pageAddons > 1) {
            setPageAddons(pageAddons - 1);
        }
    };

    const onNextAddons = () => {
        const totalPages = Math.ceil(listAddons.length / ADDONS_PER_PAGE);
        if (pageAddons < totalPages) {
            setPageAddons(pageAddons + 1);
        }
    };


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

    const handleClickBank = () => {
        navigate('/es/app/settings/bank')
    }


    const handleClickIAM = () => {
        navigate('/es/app/iam')
    }


    const handleToggleChangeLog = (type) => {
        switch (type) {

        }
    }

    const handleClickSupport = () => {
        navigate(`/${'es'}/app/support`)
    }

    const handleModalAddAddon = (addon) => {
        dispatch(setModal(<ModalAddon modal={'custom'} addon={addon} />))
    }

    const handleClickPremium = () => {
        navigate(`/${'es'}/app/addon/card`)
    }




    // -------------------------------------
    const handleClickFirstAddon = () => {
        if (filteredAddons.length > 0) {
            handleClickAddon(filteredAddons[0])
        }
    }



    // ---------------------- intro
    // Define el conjunto de pasos
    const steps = [
        { element: '#step1', intro: 'Paso 1' },
        { element: '#step2', intro: 'Paso 2' },
        // ... otros pasos
    ];

    // Otras variables necesarias
    const stepsEnabled = false;
    const initialStep = 0;

    // Función que se ejecutará al salir de la introducción
    const onExit = () => {
        // Lógica que se ejecutará al salir de la introducción
    };



    // -------------------------------------------------
    const [listVector, setListVector] = useState([])

    const handleAddVector = () => {
        navigate('/es/app/settings/drive')
    }

    const handleClickVector = () => {
        navigate('/es/app/settings/drive')
    }


    useEffect(() => {
        console.log('eiuceu=======', vectors)
        setListVector(vectors)
    }, [vectors])


    useEffect(() => {
        const fetchsItems = async () => {
            let id = iniVector({
                workspaceId: user.id,
                projectId: 'vector',
            })
            try {
                await dispatch(fetchsVector({
                    id,
                    name: 'vectors'
                }))
            } catch (err) {
                console.log('Err', err)
            }
        }

        if (vectors.length == 0) fetchsItems()
    }, [])




    return (
        <div className={styles["main"]}>
            <div className={styles["headerTab"]}>
                <div className={styles["title"]}>
                    Organization: Aythen
                </div>
                <div id="step1" className={styles["containerButton"]}>
                    <button onClick={() => handleClickBank()}>
                        Banca
                    </button>
                    <button id="step2" onClick={() => handleClickIAM()} className={styles["xs-hidden"]}>
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
                        {t('home')}
                    </p>
                    <div className={styles['buttons']}>
                        <button
                            onClick={() => handleAddVector()}
                            className={styles["applyNow"]}
                        >
                            Add Vector
                        </button>
                        {listVector.map((vector, index) => (
                            <button
                                key={index}
                                onClick={() => handleClickVector(vector)}
                            >
                                {vector?.name || 'Not found'}
                            </button>
                        ))}
                    </div>
                    <BackgroundBanner className={styles["backgroundBanner"]} />
                    {/* <img  src={BackgroundBanner} /> */}
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
                            <button onClick={() => onPrevAddons()}>
                                <svg viewBox="0 0 16 16" className="css-133lu9h e1gt4cfo0"><path d="M5.3 8.7a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.4 1.4L7.42 8l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4Z"></path></svg>
                            </button>
                            <button onClick={() => onNextAddons()}>
                                <svg viewBox="0 0 16 16" className="css-133lu9h e1gt4cfo0"><path d="M10.7071 7.29289C11.0976 7.68342 11.0976 8.31658 10.7071 8.70711L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L8.58579 8L5.29289 4.70711C4.90237 4.31658 4.90237 3.68342 5.29289 3.29289C5.68342 2.90237 6.31658 2.90237 6.70711 3.29289L10.7071 7.29289Z"></path></svg>
                            </button>
                        </div>
                    </div>
                    {filteredAddons.length > 0 && (
                        <div className={styles["ul2"]} style={{ gridColumn: 'span 2' }}>
                            <div>
                                <div
                                    className={styles["li2"]}
                                    onClick={() => handleModalAddAddon()}
                                >
                                    <div>
                                        <div className={styles["IconPlus"]}>
                                            <IconPlus />
                                        </div>
                                        <span>
                                            Añadir nuevo
                                        </span>
                                    </div>
                                    <b className={styles["LabelNew"]}>
                                        New
                                    </b>
                                </div>
                            </div>
                            {filteredAddons.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles["li2"]}
                                    onClick={() => handleClickAddon(item)}
                                >
                                    <div>
                                        <div className={styles['IconAddon']}>
                                            <IconInstance />
                                        </div>
                                        {item.title}
                                    </div>
                                    <button onClick={(e) => {
                                        e.stopPropagation()
                                        handleModalAddAddon(item)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13v-2a1 1 0 0 0-1-1h-.8l-.7-1.7.6-.5a1 1 0 0 0 0-1.5L17.7 5a1 1 0 0 0-1.5 0l-.5.6-1.7-.7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.8l-1.7.7-.5-.6a1 1 0 0 0-1.5 0L5 6.3a1 1 0 0 0 0 1.5l.6.5-.7 1.7H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.8l.7 1.7-.6.5a1 1 0 0 0 0 1.5L6.3 19a1 1 0 0 0 1.5 0l.5-.6 1.7.7v.8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.8l1.7-.7.5.6a1 1 0 0 0 1.5 0l1.4-1.4a1 1 0 0 0 0-1.5l-.6-.5.7-1.7h.8a1 1 0 0 0 1-1Z" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
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
                        <Changelog item={itemChangelog} onClick={handleClickSupport} />

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
                        <a
                            className={styles["share"]}
                            onClick={() => handleClickFirstAddon()}
                        >
                            <svg viewBox="0 0 24 24"><path d="M15 5l-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"></path></svg>
                            <span>

                                {organization?.subtitle || 'Hazte premium ahora'}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={initialStep}
                onExit={onExit}
            />
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




const Changelog = ({ item, onClick }) => {
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
                onClick={() => onClick()}
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




