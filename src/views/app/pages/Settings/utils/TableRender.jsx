import React, { useState } from 'react';

import styles from './TableRender.module.css'

import IconSettings from '../../DashBoard/assets/IconSettings'



const Filters = ({ onFilter }) => {
    return (
        <div className={styles.filters}>
            <div onClick={() => onFilter('up')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
                </svg>
            </div>
            <div onClick={() => onFilter('down')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                </svg>
            </div>
        </div>
    )
}



export const TableRender = ({
    items = [],
    filteredItems = [],
    setStateTable,
    onFilter
}) => {

    const [selectedItems, setSelectedItems] = useState({})


    const selectedItem = (id) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id], 
        }));
    };

    const selectAll = () => {
        setSelectedItems((prev) => {
            const allItemIds = items.map(item => item.id);
            const allSelected = allItemIds.every(id => prev[id]);

            const newSelectedItems = allItemIds.reduce((acc, id) => {
                acc[id] = !allSelected;
                return acc;
            }, {});

            return newSelectedItems;
        });
    };

    const renderCell = (item, filter) => {
        if (filter.component) {
            const Component = filter.component
            return <Component item={item} setStateTable={setStateTable} />
        }
        switch (filter.tag) {
            case 'options':
                return <RenderOptions item={item} filter={filter.tag} setStateTable={setStateTable} />;
            case 'checkbox':
                return <RenderCheckbox item={item} filter={filter.tag} setStateTable={setStateTable} selectedItems={selectedItems} selectedItem={selectedItem} />;
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
                        <th key={filter.tag}>
                            {(filter.tag == 'checkbox' || filter.tag == 'options') ? (
                                <div
                                    className={`${styles.inputCheckbox} ${Object.values(selectedItems).some(Boolean) ? styles.active : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={Object.keys(selectedItems).length > 0 && Object.values(selectedItems).every(Boolean)}
                                        onChange={selectAll}
                                    />
                                </div>
                            ) : (
                                <span className={styles.thFilters}>
                                    {filter.title}
                                    <Filters onFilter={onFilter} />
                                </span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index} className={styles.cell}>
                        {filteredItems.map((filter) => (
                            <td key={filter.tag} width={filter.size}>{renderCell(item, filter)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};



const RenderCheckbox = ({ item, filter, setStateTable, selectedItems, selectedItem }) => {
    return (
        <div
            className={`${styles.inputCheckbox} ${Object.values(selectedItems).some(Boolean) ? styles.active : ''}`}
            onClick={() => setStateTable(`checkbox-item:${item[filter] || item.id}`)}
        >
            <input
                type="checkbox"
                checked={selectedItems[item.id] || false}
                onChange={() => selectedItem(item.id)}
            />
        </div>
    );
}

const RenderDownload = ({ item, filter, setStateTable }) => {
    return (
        <div
            className={styles.buttonDownload}
            onClick={() => setStateTable(`download-file:${item[filter] || item.id}`)}
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
            {item[filter] || 'Not found ' + filter}
        </td>
    );
};


const RenderDate = ({ item, filter, setStateTable }) => {
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
            <svg viewBox="0 0 24 24" ><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z"></path></svg>
            Disabled
        </div>
    )
}

const RenderUser = ({ item, filter, setStateTable }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <td
            className={styles.renderUser}
            onClick={() => setStateTable(`edit-item:${item.id}`)}
        >
            <div className={`${styles.dot} ${item.isverified && styles.active}`} />
            <div className={styles.avatar}>
                {imageError ? (
                    <div className={styles.initial}>
                        <span>
                            {item.user?.charAt(0)}
                        </span>
                    </div>
                ) : (
                    <img src={`http://localhost:3001/service/v1/iam/user/${item.id}`} onError={handleImageError} />
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


const RenderOptions = ({ name, item, setStateTable }) => {
    const [visiblePopupSettings, setVisiblePopupSettings] = useState(false);

    const togglePopupSettings = () => {
        setVisiblePopupSettings((prevVisiblePopup) => !prevVisiblePopup);
    };

    const closePopup = () => {
        setVisiblePopupSettings(false);
    };

    return (

        <div className={styles.instanceSettings}>
            <button
                className={styles.button}
                onClick={() => togglePopupSettings()}
            >
                <IconSettings width={'30'} height={'30'} />
            </button>
            {visiblePopupSettings && (
                <ul
                    className={styles.popupSettings}
                    onMouseLeave={() => closePopup()}
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
    );
};






