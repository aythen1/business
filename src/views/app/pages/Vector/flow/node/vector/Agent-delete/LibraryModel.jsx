import React, { useState, useEffect } from 'react'

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import MonacoEditor from './MonacoEditor'

import styles from './LibraryModel.module.css'


const ItemTypes = {
    LIST_ITEM: 'listItem',
  };

const LibraryModel = ({ }) => {

    const [dimensions, setDimensions] = useState([])
    const [dependencies, setDependencies] = useState([])
    const [codes, setCodes] = useState([])



    // -----------------------------------------------------------
    const [searchQuery, setSearchQuery] = useState('');
    // const [searchResults, setSearchResults] = useState([]);
    let searchTimeout;


    const handleSearch = async () => {
        // node
        // const results = await fetch(`https://registry.npmjs.org/-/v1/search?text=${searchQuery}`)
        //     .then(response => response.json());

        // console.log('results', results)
        // setDependencies(results.objects || []);

        // python hacerla desde el backend
        const response = await fetch(`https://pypi.org/pypi?&o=json&q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();

        console.log('data', data)
    };

    const delayedSearch = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch();
        }, 2000); // 2000 milisegundos = 2 segundos
    };

    const handleInstall = (packageName) => {
        // Lógica para instalar la dependencia
        // Podrías utilizar un servidor Node.js con npm-install-package para manejar esto
        // Ejemplo básico:
        fetch('/api/install', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ packageName }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    onInstall(packageName);
                } else {
                    console.error('Error al instalar la dependencia');
                }
            });
    };
    // -----------------------------------------------------------
    const [items, setItems] = useState([
        { id: 1, text: 'Item 1', children: [] },
        { id: 2, text: 'Item 2', children: [] },
        { id: 3, text: 'Item 3', children: [] },
      ]);
    
      const findItem = (id, items) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === id) {
            return { item: items[i], index: i };
          }
    
          if (items[i].children.length > 0) {
            const result = findItem(id, items[i].children);
            if (result) {
              return result;
            }
          }
        }
    
        return null;
      };
    
      const moveItem = (dragIndex, hoverIndex, dragDepth, hoverDepth) => {
        const dragItem = findItem(items[dragIndex].id, items);
        const hoverItem = findItem(items[hoverIndex].id, items);
    
        if (dragItem && hoverItem) {
          const updatedItems = update(items, {
            $splice: [
              [dragItem.index, 1],
              [hoverItem.index, 0, dragItem.item],
            ],
          });
    
          setItems(updatedItems);
        }
      };
    
      const handleAddChild = (parentIndex, newItemText) => {
        const newItem = { id: Date.now(), text: newItemText, children: [] };
        const updatedItems = update(items, {
          [parentIndex]: {
            children: {
              $push: [newItem],
            },
          },
        });
    
        setItems(updatedItems);
      };
    
      const handleDeleteItem = (index, depth) => {
        const updatedItems = update(items, {
          [index]: {
            children: {
              $set: [],
            },
          },
        });
    
        setItems(updatedItems);
      };


      
    // -----------------------------------------------------------

    const handleAddCode = () => {
        const newCode = {
            title: 'hello world',
            description: 'lorem ipsum',
            dimension: [0, 0, 0, 0],
            code: '<div>hello putting</div>'
        };

        // Concatena el nuevo código a la lista existente (prevCodes)
        setCodes(prevCodes => prevCodes.concat(newCode));
    };
    // -----------------------------------------------------------

    // -----------------------------------------------------------

    // -----------------------------------------------------------



    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    Title lorem ipsum
                </h2>
                <p className={styles.description}>
                    Lorem ipsum dolor eterum
                </p>
                <div className={styles.collaborators}>
                    <div>A</div>
                </div>
            </div>
            <div className={styles.notification}>
                En library Model vamos a poder crear tiempos para leer toda esa información
                y ordernar en código, dimension y version todo el model.
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                </svg>
            </div>
            <div className={styles.container}>
                <div>
                    <DndProvider backend={HTML5Backend}>
                        <div>
                            <ul>
                                {items.map((item, index) => (
                                    <ListItem
                                        key={item.id}
                                        id={item.id}
                                        text={item.text}
                                        index={index}
                                        moveItem={moveItem}
                                        onAddChild={handleAddChild}
                                        onDelete={handleDeleteItem}
                                        children={item.children}
                                        depth={0}
                                        dragIndex={dragIndex}
                                        dragDepth={dragDepth}
                                    />
                                ))}
                            </ul>
                            <button onClick={() => handleAddItem(0, 'Nuevo Item')}>Añadir Item</button>
                        </div>
                    </DndProvider>
                </div>
                <div>
                    <div className={styles.search}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                        <input
                            type="text"
                        />
                        <ul>
                            {dimensions.map((dimension, index) => (
                                <li key={index}>
                                    Este es el vector
                                    20kb
                                    Usar
                                    delete
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ul>
                        <li>
                            Titulo
                            Codigo uno
                            Hace 12 días
                        </li>
                    </ul>
                </div>
                <div>
                    {codes.length > 0 ? (
                        <div>
                            <ul>
                                {codes.map((code, index) => (
                                    <li>
                                        <MonacoEditor />
                                    </li>
                                ))}
                            </ul>
                            <div
                                className={styles.addCode}
                                onClick={() => handleAddCode()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z" />
                                </svg>
                                Add code
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noneCodev}>
                            <b>
                                No hay código
                            </b>
                            <p>
                                Lorem ipsum dolor et durum
                            </p>
                            <div>
                                <button>
                                    Buscar códigos
                                </button>
                                <button
                                    onClick={() => handleAddCode()}
                                >
                                    Añadir código
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <div className={styles.search}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    delayedSearch();
                                }}
                            />
                            <ul>
                                <li>
                                    hello
                                </li>
                            </ul>
                        </div>
                        <ul>
                            {dependencies.map((dependency, index) => (
                                <li key={index}>
                                    {dependency.flags.insecure}
                                    {dependency.flags.unstable}

                                    {dependency.package.date}
                                    {dependency.package.version}
                                    {dependency.package.name}
                                    {dependency.package.description}
                                    {dependency.package.keywords.map((keyword, index) => (
                                        <div>
                                            {keyword}
                                        </div>
                                    ))}

                                    {dependency.package.links.bugs}
                                    {dependency.package.links.homepage}
                                    {dependency.package.links.npm}
                                    {dependency.package.links.repository}

                                    {dependency.package.links.publisher.email}
                                    {dependency.package.links.publisher.username}

                                    {dependency.package.links.maintainers.map((maintainer, index) => (
                                        <div>
                                            {maintainer.email}
                                            {maintainer.username}
                                        </div>
                                    ))}

                                    {dependency.score.final}
                                    {dependency.score.detail.maintenance}
                                    {dependency.score.detail.popularity}
                                    {dependency.score.detail.quality}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LibraryModel














const ListItem = ({ id, text, index, moveItem, onAddChild, onDelete, children, depth, path }) => {
    const ref = useRef(null);
  
    const [, drop] = useDrop({
      accept: ItemTypes.LIST_ITEM,
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }
  
        const dragIndex = item.index;
        const hoverIndex = index;
  
        if (dragIndex === hoverIndex) {
          return;
        }
  
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
  
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
  
        moveItem(dragIndex, hoverIndex, item.depth, depth);
        item.index = hoverIndex;
        item.depth = depth;
      },
    });
  
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.LIST_ITEM,
      item: { id, index, depth, path },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const handleAddChild = () => {
      const newItemText = prompt('Enter the text for the new child item:');
      if (newItemText) {
        onAddChild(index, newItemText);
      }
    };
  
    const handleDeleteItem = () => {
      onDelete(index, depth);
    };
  
    drag(drop(ref));
  
    return (
      <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div style={{ marginLeft: depth * 20, padding: '5px', border: '1px solid #ddd' }}>
          {text}
          <button onClick={handleAddChild}>Add Child</button>
          <button onClick={handleDeleteItem}>Delete</button>
        </div>
        {children && (
          <div style={{ marginLeft: 20 }}>
            {children.map((child, childIndex) => (
              <ListItem
                key={child.id}
                id={child.id}
                text={child.text}
                index={childIndex}
                moveItem={moveItem}
                onAddChild={onAddChild}
                onDelete={onDelete}
                children={child.children}
                depth={depth + 1}
                path={`${path}.${childIndex}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };