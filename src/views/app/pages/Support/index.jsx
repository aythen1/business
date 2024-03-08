import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';


import {
    initialTopics,
    initialStatus,
    initialQuery
} from './assets/initial'


import {
    setModal
} from '@/slices/iamSlice'


import BackgroundVector from './assets/background-vector'


const Support = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');
    const [listFilteredQuery, setListFilteredQuery] = useState([]);

    const [listQuery, setListQuery] = useState([])
    const [listTopics, setListTopics] = useState([])
    const [listStatus, setListStatus] = useState([])

    // ------------------------------------------------------------
    useEffect(() => {
        setListQuery(initialQuery)

        setListTopics(initialTopics)
        setListStatus(initialStatus)
    }, [])

    // ------------------------------------------------------------
    const handleManageTicket = () => {
        navigate(`/es/app/support/tickets`)
    }

    // ------------------------------------------------------------
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Filtrar la lista cuando el input no está vacío
        if (value.trim() !== '') {
            const filteredList = listQuery.filter(query =>
                (query.title && query.title.toLowerCase().includes(value.toLowerCase())) ||
                (query.subtitle && query.subtitle.toLowerCase().includes(value.toLowerCase()))
            );
            setListFilteredQuery(filteredList);
        } else {
            setListFilteredQuery([]);
        }
    };


    const handleClickTopic = () => {
        dispatch(setModal(<ModalSupport />))
    }





    return (
        <div className={styles.container}>
            <div className={styles.containerQuery}>
                <h2 className={styles.title}>
                    How can we help you?
                </h2>
                <div className={styles.input}>
                    <input
                        placeholder={`Search by keyword, product, subject..`}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
                {inputValue !== '' && (
                    <div className={styles.containerBoxQuery}>
                        <div className={styles.boxQuery}>
                            {listFilteredQuery.map((query, index) => (
                                <div>
                                    <span>
                                        {query.title}
                                    </span>
                                    <b>
                                        {query.subtitle}
                                    </b>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className={styles.background}>
                    <BackgroundVector />
                </div>
            </div>
            <div className={styles.containerPopular}>
                <h2 className={styles.title}>
                    Popular topics
                </h2>
                <div className={styles.boxPopular}>
                    {listTopics.map((topic, index) => (
                        <div
                            key={index}
                            className={styles.box}
                            onClick={() => handleClickTopic()}
                        >
                            <div>
                                {<topic.icon />}
                                {topic.title}
                            </div>
                            <button onClick={() => navigate(topic.href)}>
                                <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.containerTrid}>
                <div className={styles.boxStatus}>
                    <h2 className={styles.titleHead}>
                        Status
                    </h2>
                    <div className={styles.box}>
                        {listStatus.map((item, index) => {
                            return (
                                <div className={styles.item}>
                                    <div>
                                        <span>
                                            Jan 8, 2024
                                        </span>
                                        <div className={styles.title}>
                                            <div className={styles.dot}>

                                            </div>
                                            <b>
                                                [AMS|WAW2/ASM3] Debian Aws console lerem
                                            </b>
                                        </div>
                                    </div>
                                    <button>
                                        <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.boxContact}>
                    <h2 className={styles.titleHead}>
                        Contact us
                    </h2>
                    <div className={styles.box}>
                        <div className={styles.item}>
                            <b>
                                Open a support ticket
                            </b>
                            <span>
                                Get direct assistence from our team.
                            </span>
                        </div>
                        <div
                            className={styles.item}
                            onClick={() => handleManageTicket()}
                        >
                            <b>
                                Manage tickets
                                <label>
                                    2
                                </label>
                            </b>
                            <span>
                                Manage ticket, abuse reports and your support plan.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.boxGoing}>
                    <h2 className={styles.titleHead}>
                        Going further
                    </h2>
                    <div className={styles.box}>
                        <div className={styles.item}>
                            <div>
                                <b>
                                    Join our Slack Community
                                </b>
                                <span>
                                    Get in touch with tech enthisiasts and make the most a Scaleway.
                                </span>
                            </div>
                            <button>
                                <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>

                            </button>
                        </div>
                        <div className={styles.item}>
                            <div>
                                <b>
                                    Request a feature
                                </b>
                                <span>
                                    Let us kenow whic features you
                                    would like as to develop
                                </span>
                            </div>
                            <button>
                                <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <ul className={styles.footerUl}>
                    <li>
                        Blog
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        Pricing
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        Careers
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        Privacy
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        Cookies
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                    <li>
                        API
                        <svg viewBox="0 0 24 24" ><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Support
















const ModalSupport = ({ }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClickDeny = () => {
        dispatch(setModal(null))
    }

    const handleClickTicket = () => {
        navigate(`/${'es'}/settings/ticket`)
    }


    // ----------------------------------------------------------------
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(initialTopics);


    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filteredData = initialTopics.filter((item) => {
            return (
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.some(
                    (desc) =>
                        desc.title.toLowerCase().includes(searchTerm) ||
                        desc.text.toLowerCase().includes(searchTerm)
                )
            );
        });

        setFilteredData(filteredData);
    };


    return (
        <div className={styles.modal}>
            <div className={styles.search}>
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <input
                    type="text"
                    spellCheck="false"
                    placeholder={'Search support..'}
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className={styles.list}>
                {filteredData.map((topic, index) => (
                    <div
                        key={index}
                        className={styles.topic}
                    >
                        <b className={styles.title}>
                            {topic.title}
                        </b>
                        <div className={styles.grid2}>
                            {topic.description.map((description, index) => (
                                <div className={styles.item}>
                                    <b className={styles.subtitle}>
                                        {description.title}
                                    </b>
                                    <p className={styles.text}>
                                        {description.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttons}>
                <button
                    className={styles.deny}
                    onClick={() => handleClickDeny()}
                >
                    Cancelar
                </button>
                <button
                    className={styles.create}
                    onClick={() => handleClickTicket()}
                >
                    Crear Ticket
                </button>
            </div>
        </div>
    )
}