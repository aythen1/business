import React, { useState } from 'react';

import styles from './TableRender.module.css'


import IconSettings from '../../DashBoard/assets/IconSettings'


// export const renderModule = ({ items = [], filteredItems, setStateTable}) => {
//     // Lógica para renderizar el módulo según el nombre
//     // Puedes implementar esto según tus necesidades específicas
//     if (items.length == 0) return false
//     switch (tag) {
//         // case 'TicketID':
//         //     return <RenderTicketID items={items} />
//         case 'options':
//             return <RenderOptions items={items} setStateTable={setStateTable} />
//         case 'download':
//             return <RenderDownload items={items} setStateTable={setStateTable} />
//         default:
//             return <RenderDefault name={tag} items={items} setStateTable={setStateTable} />
//     }
// };


export const TableRender = ({ items = [], filteredItems = [], setStateTable }) => {
    const renderCell = (item, filter) => {
        switch (filter.tag) {
            // Puedes agregar más casos según tus necesidades
            case 'options':
                return <RenderOptions item={item} filter={filter.tag} setStateTable={setStateTable} />;
            case 'download':
                return <RenderDownload item={item} filter={filter.tag} setStateTable={setStateTable} />;
            case 'date':
                return <RenderDate item={item} filter={filter.name} setStateTable={setStateTable} />;
            case 'isverified':
                return <RenderIsVerified item={item} filter={filter.tag} setStateTable={setStateTable} />;
            case 'user-email':
                return <RenderUser item={item} filter={filter.tag} setStateTable={setStateTable} />;
            default:
                return <RenderDefault item={item} filter={filter.tag} setStateTable={setStateTable} />;
        }
    };


    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.header}>
                    {filteredItems.map((filter) => (
                        <th key={filter.tag}>{filter.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index} className={styles.cell}>
                        {filteredItems.map((filter) => (
                            <td key={filter.tag}>{renderCell(item, filter)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


// export default TableRender





const RenderDownload = ({ item, filter, setStateTable }) => {
    return (
        <div
            className={styles.buttonDownload}
            onClick={() => setStateTable(`download-file:${item.download}`)}
        >
            <svg viewBox="0 0 24 24" ><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"></path></svg>
        </div>
    );
}


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

const RenderDefault = ({ item, filter, setStateTable }) => {
    return (
        <td
            className={styles.tablename}
            onClick={() => setStateTable(`edit-item:${item.id}`)}
        >
            {/* {name} */}
            {/* {JSON.stringify(item)} */}
            {item[filter] || 'Not found ' + filter}
        </td>
    );
};


const RenderDate = ({ item, filter, setStateTable }) => {
    console.log('filterss', item, filter)
    const formatDate = (dateString) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const date = new Date(dateString);

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    return (
        <div>
            {formatDate(item[filter])}
        </div>
    )
}


const RenderIsVerified = ({ item, filter, setStateTable }) => {
    return (
        <div className={styles.flex}>
            <svg viewBox="0 0 24 24" class="css-i33jq2 e1gt4cfo0"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z"></path></svg>
            Disabled
        </div>
    )
}

const RenderUser = ({ item, filter, setStateTable }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        // Maneja el error de la carga de la imagen
        setImageError(true);
    };

    return (
        <td
            className={styles.renderUser}
            onClick={() => setStateTable(`edit-item:${item.id}`)}
        >
            <div className={styles.dot}></div>
            <div className={styles.avatar}>
                {imageError ? (
                    <div className={styles.initial}>
                        {item.user.charAt(0)}
                    </div>
                ) : (
                    <img src={`/service/v1/user/avatar${item.id}`} onError={handleImageError} />
                )}
            </div>
            <div className={styles.info}>
                <b>
                    {item[filter] || 'Not found ' + filter}
                </b>
                <p>
                    {item[filter] || 'Not found ' + filter}
                </p>
            </div>
        </td>
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






