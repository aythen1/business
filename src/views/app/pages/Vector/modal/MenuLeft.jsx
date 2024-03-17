import React, { useState } from 'react'

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import IconFilePDF from './assets/IconFilePDF'
import IconFileImage from './assets/IconFileImage'
import IconVideoFile from './assets/IconVideoFile'

import IconPR from './assets/IconPR'
import IconMerged from './assets/IconMerged'

import IconFileTable from './assets/IconFileTable'
import IconTable from './assets/IconTable'

import IconFile from './assets/IconFile'

import IconFolder from './assets/IconFolder'
import IconFolderOpen from './assets/IconFolderOpen'
import IconFolderPlus from './assets/IconFolderPlus'
import IconFolderVector from './assets/IconFolderVector'







const MenuLeft = ({ styles }) => {


    const [items, setItems] = useState([
        {
            id: 1,
            title: 'lorem ipsum',
            text: 'Item 1',
            key: '/path/path/'
        }, {
            id: 1,
            title: 'lorem ipsum',
            text: 'Item 1',
            key: '/path/path/'
        }, {
            id: 1,
            title: 'lorem ipsum',
            text: 'Item 1',
            key: '/path/path/'
        }
    ]);


    const moveItem = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];
        setItems((prevItems) => {
            const newItems = [...prevItems];
            newItems.splice(dragIndex, 1);
            newItems.splice(hoverIndex, 0, dragItem);
            return newItems;
        });
    };


    const handleAddItem = () => {
        const newItem = {
            id: items.length + 1,
            text: `Item ${items.length + 1}`,
        };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.boxCode}>
                
                {items.map((item, index) => (
                    <DragItem
                        key={item.id}
                        id={item.id}
                        index={index}
                        styles={styles}
                        item={item}
                        moveItem={moveItem}
                    />
                ))}
                <button
                    onClick={handleAddItem}
                    className={styles.addCode}
                >
                    Añadir Nuevo
                </button>
            </div>
        </DndProvider>
    );
};

export default MenuLeft;








const DragItem = ({ id, index, item, moveItem, styles }) => {
    const ref = React.useRef(null);

    const [state, setState] = useState({
        title: item.title,
        git: true,
        type: 'image',
        status: 'file'
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'ITEM',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const opacity = isDragging ? 0.5 : 1;

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ opacity }}
            className={styles.box}
        >
            {/* |{JSON.stringify(item)}| */}
            <div className={styles.top}>
                <div className={styles.logo}>
                    {state.status == 'file' ? (
                        <IconFolder />
                    ) : state.status == 'folder' ? (
                        <IconFile />
                    ) : state.status == 'folder-open' ? (
                        <IconFolderOpen />
                    ) : state.status == 'folder-plus' ? (
                        <IconFolderPlus />
                    ) : state.status == 'folder-vector' && (
                        <IconFolderVector />
                    )}
                </div>
                <p className={styles.title}>
                    {state.title}
                </p>

                <div className={styles.file}>
                    <IconFileTable />
                    <IconTable />
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.folder}>
                    {state.type == 'image' ? (
                        <IconFileImage />
                    ) : state.type == 'pdf' ? (
                        <IconFilePDF />
                    ) : (
                        <IconVideoFile />
                    )}
                    video
                </div>
                <div className={styles.git}>
                    {state.git ? (
                        <IconMerged />
                    ) : (
                        <IconPR />
                    )}
                    hace 3 días
                </div>
            </div>
        </div>
    );
};