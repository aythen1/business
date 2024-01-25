import React, { useState } from 'react';

import styles from './table.module.css'


import IconSettings from '../../DashBoard/assets/IconSettings'

const RenderTicketID = ({ items }) => {
    return (
        <div>
            {items && items.map((item, index) => (
                <div key={index}>
                    ticket ID render aquí va
                    <b>
                        {item}
                    </b>
                </div>
            ))}
        </div>
    );
};

const RenderDefault = ({ name, items, setStateTable }) => {
    return (
        <div>
            <b>
                {name}
            </b>
            {items && items.map((item, index) => (
                <div 
                    key={index}
                    onClick={() => setStateTable(`edit-item:${item.id}`)}
                >
                        {/* {name} */}
                        {/* {JSON.stringify(item)} */}
                        {item[name] || 'Not found ' + name}
                </div>
            ))}
        </div>
    );
};

const RenderOptions = ({ name, items, setStateTable }) => {

    const [visiblePopupSettings, setVisiblePopupSettings] = useState({})

    const togglePopupSettings = (instanceIndex) => {
        setVisiblePopupSettings((prevVisiblePopups) => ({
            ...prevVisiblePopups,
            [instanceIndex]: !prevVisiblePopups[instanceIndex]
        }))
    }

    const closePopup = (instanceIndex) => {
        setVisiblePopupSettings((prevVisiblePopups) => ({
            ...prevVisiblePopups,
            [instanceIndex]: false
        }))
    }

    return (
        <div>
            <div>
                &nbsp;
            </div>
            {items && items.map((item, index) => (
                <div key={index}>
                    <div className={styles.instanceSettings}>
                        <button
                            className={styles.button}
                            // onClick={handlePopupSettings}
                            onClick={() => togglePopupSettings(index)}
                        >
                            <IconSettings width={'30'} height={'30'} />
                        </button>
                        {visiblePopupSettings[index] && (
                            <ul
                                className={styles.popupSettings}
                                onMouseLeave={() => closePopup(index)}
                            >
                                <li onClick={() => setStateTable(`edit-item:${item.id}`)}>
                                    Edit Item
                                </li>
                                <li onClick={() => setStateTable(`delete-item:${item.id}`)}>
                                    Delete Item
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const renderModule = ({tag, items = [], setStateTable}) => {
    // Lógica para renderizar el módulo según el nombre
    // Puedes implementar esto según tus necesidades específicas
    if (items.length == 0) return false

    switch (tag) {
        // case 'TicketID':
        //     return <RenderTicketID items={items} />
        case 'options':
            return <RenderOptions items={items} setStateTable={setStateTable} />
        default:
            return <RenderDefault name={tag} items={items} setStateTable={setStateTable} />
    }
};