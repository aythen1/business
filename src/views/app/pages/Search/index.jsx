import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './index.module.css'



import { initialCRM } from './initial.jsx'


import { ModalAddUser, ModalUser } from './modal.jsx'

import {
    setModal
} from '@/slices/iamSlice'


const Search = ({

}) => {

    const dispatch = useDispatch()

    const [initial, setInitial] = useState([])
    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        setInitial(initialCRM)
    }, [])

    useEffect(() => {
        const updateInitial = initialCRM.filter(item => {
            const { title, description, ref, href } = item;
            const searchTermLower = searchTerm.toLowerCase();
            return (
                title.toLowerCase().includes(searchTermLower) ||
                description.toLowerCase().includes(searchTermLower) ||
                ref.toLowerCase().includes(searchTermLower) ||
                href.toLowerCase().includes(searchTermLower)
            );
        });


        setInitial(updateInitial)
    }, [searchTerm])


    const handleSearchTermChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleAddUser = () => {
        dispatch(setModal(<ModalAddUser />))
    }


    return (
        <div className={styles.box}>
            <div className={styles.sectionBox}>
                <div className={styles.containerBox}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <div className={styles.logo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.537 12.625a4.421 4.421 0 0 0 2.684 4.047 10.96 10.96 0 0 1-1.384 2.845c-.834 1.218-1.7 2.432-3.062 2.457-1.34.025-1.77-.794-3.3-.794-1.531 0-2.01.769-3.275.82-1.316.049-2.317-1.318-3.158-2.532-1.72-2.484-3.032-7.017-1.27-10.077A4.9 4.9 0 0 1 8.91 6.884c1.292-.025 2.51.869 3.3.869.789 0 2.27-1.075 3.828-.917a4.67 4.67 0 0 1 3.66 1.984 4.524 4.524 0 0 0-2.16 3.805m-2.52-7.432A4.4 4.4 0 0 0 16.06 2a4.482 4.482 0 0 0-2.945 1.516 4.185 4.185 0 0 0-1.061 3.093 3.708 3.708 0 0 0 2.967-1.416Z" />
                                </svg>
                            </div>
                            <div className={styles.input}>
                                <input
                                    type="text"
                                    spellCheck={false}
                                    onChange={handleSearchTermChange}
                                    value={searchTerm}
                                />
                                <div className={styles.buttons}>
                                    <div>
                                        {true ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                                                <path d="M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9v3a5.006 5.006 0 0 1-5 5h-4a5.006 5.006 0 0 1-5-5V9m7 9v3m-3 0h6M11 3h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        {true ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        {true ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div 
                            className={styles.button}
                            onClick={() => handleAddUser()}
                            >
                                Añadir
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.tab}>
                            <ul>
                                <li className={`${true && styles.active}`}>
                                    All
                                </li>
                                <li>
                                    Images
                                </li>
                                <li>
                                    Videos
                                </li>
                                <li>
                                    News
                                </li>
                                <li>
                                    Books
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                {initial.map((item, index) => (
                                    <li className={styles.item}>
                                        <div className={styles.logo}>
                                            <img src={item.image} />
                                        </div>
                                        <div className={styles.description}>
                                            <span>
                                                {item.href}
                                            </span>
                                            <b>
                                                {item.title}
                                            </b>
                                            <p>
                                                {item.description}
                                            </p>
                                            <div>
                                                {false && <PluginAsk />}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.right}>
                        <div className={styles.top}>
                            <h2>
                                Google Spaces
                            </h2>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.content}>
                            <p>
                                Google Spaces was a mobile app for group discussions and messaging developed
                                by Google. The app was intended to compete with Slack as a content sharing
                                platform where users can create a "space", invite their friends for discussion,
                                and share videos, images, text, and other media. Wikipedia
                            </p>
                            <div className={styles.features}>
                                <div>
                                    <b>
                                        Initial release date:
                                    </b>
                                    <label>
                                        May 16, 2016
                                    </label>
                                </div>
                                <div>
                                    <b>
                                        Developer(s): Google
                                    </b>
                                    <label>
                                        May 16, 2016

                                    </label>
                                </div>

                            </div>
                            <div className={styles.apps}>
                                <b>
                                    People also search for
                                </b>
                                {['', '', ''].map((item, index) => (
                                    <div
                                        key={index}
                                        className={styles.app}
                                    >
                                        <div className={styles.logo}>
                                            Initial
                                        </div>
                                        <div className={styles.content}>
                                            <b>
                                                imaAPKPure
                                            </b>
                                            <p>
                                                APKPure
                                            </p>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                        <label className={styles.feedBack}>
                            Feedback
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )


}


export default Search











const PluginAsk = ({ }) => {
    return (
        <div>
            <ul>
                <li>
                    Responding
                </li>
            </ul>
        </div>
    )
}