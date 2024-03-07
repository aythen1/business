
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import {
    codeAddon
} from '@/actions/addon'

import styles from './index.module.css'



const AddonVersion = ({ addon }) => {
    function organizeVersions(inputList) {
        const organizedVersions = [];

        inputList.forEach(({ title, version, createdAt, code }) => {
            const [majorVersion, minorVersion] = version.split('.');

            // Buscar el índice de la versión principal en el array
            const majorVersionIndex = organizedVersions.findIndex(item => item.version === majorVersion);

            if (minorVersion) {
                if (majorVersionIndex === -1) {
                    // Si la versión principal no está en el array, agrégala con la subversión
                    organizedVersions.push({
                        version: majorVersion,
                        versions: [{ title, version, createdAt, code }],
                    });
                } else {
                    // Si la versión principal ya está en el array, añade la subversión
                    organizedVersions[majorVersionIndex].versions.push({ title, version, createdAt, code });
                }
            } else {
                // Si es una versión principal sin subversión, agrégala directamente al array
                organizedVersions.push({
                    version: majorVersion,
                    title,
                    version,
                    createdAt,
                    code,
                    versions: [],
                });
            }
        });

        return organizedVersions;
    }



    const initialVersion = [{
        title: 'hello world',
        version: '0',
        createdAt: new Date(),
        code: '<button>test button</button>'
    }, {
        title: 'hello world',
        version: '0.1',
        createdAt: new Date(),
        code: '<button>test button</button>'
    }, {
        title: 'hello world',
        version: '1',
        createdAt: new Date(),
        code: '<button>test button</button>'
    }, {
        title: 'hello world',
        version: '1.1',
        createdAt: new Date(),
        code: '<button>test button</button>'
    }]

    const organizedVersions = organizeVersions(initialVersion);

    console.log('organizedVersions', organizedVersions)

    const [listVersion, setListVersion] = useState(organizedVersions)

    
    
    

    return (
        <div className={styles.modal}>
            
            <div className={styles.search}>
                <div className={styles.input}>
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                    <input
                        placeholder={`Buscar version..`}
                    />
                </div>
            </div>
            <div className={styles.subheader}>
                <b>
                    Editing 1 venue 2 rooms.
                </b>
                <a>
                    Select all
                </a>
            </div>
            <div className={styles.list}>
                {listVersion.map((item, index) => (
                    <div className={styles.options}>
                        <div className={styles.arrow}>
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4 4 4-4" />
                            </svg>
                        </div>
                        <FilterItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}



export default AddonVersion



const FilterItem = ({ item }) => {
    const dispatch = useDispatch()

    const [isChecked, setIsChecked] = useState(false);
    const [codeVisible, setCodeVisible] = useState(false);
    const [currentCode, setCurrentCode] = useState('');
    const [messageCodeAddon, setMessageCodeAddon] = useState('')

    const handleTextareaChange = (event) => {
        setMessageCodeAddon(event.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setCodeVisible(false); 
    };

    const handleOpenCode = (code) => {
        setCurrentCode(code);
        setCodeVisible(!codeVisible);
    };

    const handleSelectCode = (code) => {

    }

    const handleCodeAddon = () => {
        dispatch(codeAddon({
            code: currentCode,
            user: messageCodeAddon
        }))
    }

    return (
        <div className={styles.filters}>
            <div className={styles.title}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                {item.title}
            </div>
            {isChecked && (
                <div>
                    {item.versions.map((versionItem, index) => (
                        <div key={index}>
                            <div
                                className={styles.filter}
                                onClick={() => handleOpenCode(versionItem.code)}
                            >
                                <input
                                    type="checkbox"
                                    onClick={() => handleSelectCode(versionItem)}
                                />
                                Super room
                                {isChecked ? (
                                    <svg
                                        ariaHidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m16.2 19 4.8-7-4.8-7H3l4.8 7L3 19h13.2Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className=""
                                        ariaHidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M3 4a1 1 0 0 0-.8 1.6L6.6 12l-4.4 6.4A1 1 0 0 0 3 20h13.2c.3 0 .6-.2.8-.4l4.8-7a1 1 0 0 0 0-1.2l-4.8-7a1 1 0 0 0-.8-.4H3Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                            {codeVisible && (
                                <div className={styles.codeVisible}>
                                    <div className={styles.code}>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: currentCode }}
                                        />
                                    </div>
                                    <div className={styles.chat}>
                                        <textarea
                                            placeholder={'Escribe'}
                                            spellCheck="false"
                                            value={messageCodeAddon}
                                            onChange={handleTextareaChange}
                                        />
                                    </div>
                                    <button
                                        className={styles.new}
                                        onClick={() => handleCodeAddon()}
                                    >
                                        Añadir nuevo
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
