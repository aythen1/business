
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useCallback } from 'react';

import { useGraph } from '../index';


import { useOpenAI } from '../../openai'


import { useDrag, useDrop } from 'react-dnd';

// import { DndProvider } from "react-dnd";

// import { HTML5Backend } from 'react-dnd-html5-backend';


// import styles from '../Settings/iam/modal.module.css'
import styles from './Template.module.css'
import stylesLoader from './loader.module.css'

import domtoimage from 'dom-to-image';


import { dataComponents } from './components'



import {
    addVectorAddon,
    addAddon,
    codeAddon
} from '@/actions/addon'


import {
    setCode
} from '@/slices/addonSlice'




// import AddTag from '@/views/app/pages/shared/AddTag'
// import { useNavigate } from 'react-router-dom';
// import { useEdges } from 'reactflow';


const Template = ({
    setTemplate,
    template,
    addTemplate,
    listComponents,
    setListComponents,
    setInternalUpdate,
    setTitle,
    onEditor,
    setCenter
}) => {
    const textareaRefTitle = useRef(null);

    const dispatch = useDispatch()
    // const navigate = useNavigate()


    const textareaRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const [isImage, setIsImage] = useState(true)


    // const [state, setState] = useState({
    //     id: template?.id || '',
    //     version: template?.version || '0',
    //     title: template?.title || '',
    //     description: template?.description || initialDescription,
    //     components: template?.code || [],
    //     updatedAt: template?.updatedAt || new Date(),
    //     createdAt: template?.createdAt || new Date(),
    // });



    // ---------------------------------------------------------------
    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'title') {
            const isValidText = value.trim().length > 0;

            setIsActive(listComponents.length > 0 && isValidText);

            setTemplate((prevState) => ({
                ...prevState,
                [property]: isValidText ? value : '',
            }));

            setTitle(value)
            updateTextareaHeight()
        } else {
            setTemplate((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };


    // const loadImage = (img, errorHandler) => {
    //     return new Promise((resolve, reject) => {
    //         img.onload = () => resolve(img);
    //         img.onerror = () => {
    //             errorHandler();
    //             resolve(null);
    //         };
    //     });
    // };


    const notFoundDiv = document.createElement('div');
    notFoundDiv.textContent = 'Not Found Resource';

    const obtainImage = async (components) => {
        for (let i = 0; i < components.length; i++) {
            let component = components[i].code;
            console.log('component', component)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = component;
            // Crear un div temporal
            const wrappedComponent = document.createElement('div');

            // Obtener todas las imágenes dentro de tempDiv
            const images = tempDiv.querySelectorAll('img');
            const imagePromises = [];


            // Agregar el componente envuelto al cuerpo del documento
            document.body.appendChild(wrappedComponent);
            wrappedComponent.appendChild(tempDiv);

            // Eliminar todas las imágenes del DOM
            images.forEach((img) => {
                img.remove();
            });


            try {
                // Agregar el componente envuelto al cuerpo del documento
                document.body.appendChild(wrappedComponent);
                wrappedComponent.appendChild(tempDiv);

                await new Promise(resolve => setTimeout(resolve, 2000));

                const image = await domtoimage.toPng(wrappedComponent);
                // Esperar un tiempo antes de pasar al siguiente componente
                await new Promise(resolve => setTimeout(resolve, 2000));

                setListComponents(prevList => prevList.map(obj =>
                    obj.id === i + 1 ? {
                        ...obj,
                        image
                    } : obj
                ));

            } catch (error) {
                console.error('Error al convertir a imagen:', error);
            } finally {
            }
        }

        return components
    };


    const handleGenerateTemplate = async () => {
        setIsLoading(true)
        const resp = await dispatch(codeAddon({
            components: listComponents
        }))

        // console.log('resp', resp)
        setInternalUpdate(true)

        resp.payload.map((item, index) => {
            setListComponents(prevListComponents => {
                const updatedList = [...prevListComponents]; // Clonamos la lista original
                updatedList[item.id - 1] = {
                    ...updatedList[item.id - 1], // Mantenemos los valores anteriores del componente
                    code: resp.payload[index].code // Actualizamos el código del componente en el índice específico
                };
                return updatedList;
            });


        })

        // let updatedListComponents = listComponents.map((component, index) => ({
        //     ...component,
        //     code: resp.payload[index]
        // }));

        // setListComponents(updatedListComponents)

        // await obtainImage(updatedListComponents)
        setIsLoading(false)
    }

    // const handleAddVector = async () => {
    //     dispatch(addVectorAddon({
    //         addon,
    //         vector: state,
    //     }))
    //     dispatch(setModal(null))
    // }

    const handleDeleteVector = () => {
        dispatch(setCode(null))
    }


    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Restablecer la altura para recalcular
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [template.description]);




    const moveComponent = (fromIndex, toIndex) => {
        const newComponents = [...listComponents];
        const [removed] = newComponents.splice(fromIndex, 1);
        newComponents.splice(toIndex, 0, removed);
        setInternalUpdate(false)
        setListComponents(newComponents);

    };

    const updateComponentText = (id, newText) => {
        const updatedComponents = listComponents.map((component) =>
            component.id === id ? { ...component, text: newText } : component
        );
        setInternalUpdate(false)
        setListComponents(updatedComponents);

    };


    const handleAddComponent = async () => {
        const randomIndex = Math.floor(Math.random() * dataComponents.length);
        const randomComponent = dataComponents[randomIndex];

        const image = await new Promise((resolve, reject) => {
            fetch(randomComponent.image)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Data = reader.result.split(',')[1];
                        const base64WithHeader = `data:image/png;base64,${base64Data}`;
                        resolve(base64WithHeader);
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(error => {
                    reject(error);
                });
        });

        setInternalUpdate(true)
        await setListComponents(prevList => [
            ...prevList,
            {
                id: prevList.length + 1,
                text: randomComponent.description,
                code: '',
                image
            }
        ]);



    };


    const updateTextareaRef = (id, ref) => {
        setListComponents((prevList) => {
            const updatedList = prevList.map((component) =>
                component.id === id && component.textareaRef !== ref
                    ? { ...component, textareaRef: ref }
                    : component
            );

            if (!arraysAreEqual(prevList, updatedList)) {
                return updatedList;
            }

            return prevList;
        });
    };

    // Función para comparar dos arreglos
    const arraysAreEqual = (arr1, arr2) => {
        return arr1.length === arr2.length && arr1.every((item, index) => item === arr2[index]);
    };
    const deleteComponent = (id) => {
        // Filtra los componentes para excluir el que tiene el ID proporcionado
        const updatedComponents = listComponents.filter((component) => component.id !== id);

        // Actualiza el estado listComponents
        setListComponents(updatedComponents);

        // Enfoca el último carácter del textarea anterior si existen más componentes
        const previousIndex = listComponents.findIndex((component) => component.id === id) - 1;
        if (previousIndex >= 0) {
            setTimeout(() => {
                const previousTextareaRef = listComponents[previousIndex].textareaRef;
                if (previousTextareaRef && previousTextareaRef.current) {
                    previousTextareaRef.current.focus();
                    // Coloca el cursor al final del texto
                    const length = previousTextareaRef.current.value.length;
                    previousTextareaRef.current.setSelectionRange(length, length);
                }
            }, 0);
        }
    };


    const handleAddTemplate = () => {
        addTemplate()
    }



    // -------------------------------------------------
    const [searchComponent, setSearchComponent] = useState('');
    const [filteredComponent, setFilteredComponent] = useState([])

    useEffect(() => {
        if (searchComponent) {
            let updatedComponent = dataComponents.filter(item =>
                item.href.toLowerCase().includes(searchComponent.toLowerCase()) ||
                item.title.toLowerCase().includes(searchComponent.toLowerCase()) ||
                item.description.toLowerCase().includes(searchComponent.toLowerCase())
            );

            // const currentNode = nodes.find(n => n.id === node.id);
            console.log('template', template)
            // console.log('updatedComponent', updatedComponent)
            // const currentNode = nodes.find(node => node.id === template.id);
            setCenter(template.position?.x + 100, template.position?.y + 150, { zoom: 1.6, duration: 500 })
            // onEditor()

            setFilteredComponent(updatedComponent)
        }
    }, [searchComponent])



    // ------------------------------------------------
    const handleMagicTitle = async () => {
        const prompt = generatePrompt(listComponents);
        const generatedTitle = await generateTitle(prompt);

        setState({
            ...state,
            title: generatedTitle,
        });

        // calculateRows(generatedTitle)
        updateTextareaHeight()

        if (generatedTitle.trim().length > 0 && listComponents.length > 0) {
            setIsActive(true)
        }
    };

    // Función para generar el prompt con los textos de listComponents
    const generatePrompt = (components) => {
        const texts = components.map((component) => component.text);
        const prompt = `Generate a title based on the following texts:\n\n${texts.join('\n')}\n\nTitle (without quotation marks): `;
        return prompt;
    };

    // Función que utiliza OpenAI para generar el título
    const generateTitle = async (prompt) => {
        const openai = await useOpenAI();
        const resp = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
        });

        const response = resp.choices[0].message.content;
        return response;
    };


    const handleInsertComponent = async (item) => {
        setSearchComponent('')

        const image = await new Promise((resolve, reject) => {
            fetch(item.image)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Data = reader.result.split(',')[1];
                        const base64WithHeader = `data:image/png;base64,${base64Data}`;
                        resolve(base64WithHeader);
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(error => {
                    reject(error);
                });
        });


        setListComponents(prevList => [
            ...prevList,
            {
                id: prevList.length + 1,
                text: item.description,
                code: '',
                image
            }
        ]);
    }

    //
    // const calculateRows = (content) => {
    //     // const rows = content.split('\n').length;
    //     // console.log('rows', rows)
    //     // const calculatedRows = rows > 1 ? rows : 1;
    //     // return calculatedRows;

    //     const lineHeight = 33; // Line-height en píxeles
    //     const minHeight = 33; // Altura mínima de una fila en píxeles
    //     const fontSize = 28; // Tamaño de la fuente en píxeles

    //     // Calcula la altura total del contenido multiplicando el número de líneas por la altura de línea
    //     const totalHeight = content.split('\n').length * lineHeight;

    //     // Calcula el número de filas basado en la altura total del contenido y el tamaño de la fuente
    //     const calculatedRows = Math.max(Math.ceil(totalHeight / fontSize), minHeight / lineHeight);

    //     return calculatedRows;
    // };
    const updateTextareaHeight = () => {
        if (textareaRefTitle.current) {
            const { current } = textareaRefTitle;
            current.style.height = 'auto'; // Resetea la altura a auto para recalcularla correctamente
            current.style.height = `${current.scrollHeight}px`; // Establece la altura según el contenido
        }
    };



    // ---------------------------------------------
    const handleClickNoneImage = () => {
        setIsImage(true)
    }

    const handleClickViewImage = () => {
        setIsImage(false)
    }

    const handleDoubleClickTemplate = (id) => {
        let offset = 0;

        for (let i = 0; i <= id; i++) {
            const element = document.getElementById(`component-${i}`);
            if (element) {
                const height = element.offsetHeight;
                offset += height
            }
        }

        onEditor(offset)
    }


    // ----------------------------------------------
    useEffect(() => {
        if (template.title?.trim().length > 0 && listComponents.length > 0) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [listComponents])



    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className={`custom-drag-handle ${styles.customDragHandle}`} />
                <div className={styles.input}>
                    <textarea
                        spellCheck="false"
                        value={template.title}
                        placeholder={'Title of addon'}
                        onChange={(e) => handleInputChange(e, 'title')}
                        className={styles.textArea}
                        ref={textareaRefTitle}
                    // style={{height: '20px'}}
                    // Añade esta clase para aplicar estilos si es necesario
                    // rows={calculateRows(state.title)}
                    // style={{ minHeight: `${calculateRows(state.title) * 1}em` }}
                    />
                    <button
                        className={styles.addMagicTitle}
                        onClick={() => handleMagicTitle()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.9 9.7 20 6.6 17.4 4 4 17.4 6.6 20 16.9 9.7Zm0 0L14.3 7M6 7v2m0 0v2m0-2H4m2 0h2m7 7v2m0 0v2m0-2h-2m2 0h2M8 4h0v0h0v0Zm2 2h0v0h0v0Zm2-2h0v0h0v0Zm8 8h0v0h0v0Zm-2 2h0v0h0v0Zm2 2h0v0h0v0Z" />
                        </svg>
                    </button>
                </div>
                <div className={styles.search}>
                    <div className={styles.inputSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                        <input
                            spellCheck="false"
                            type="text"
                            placeholder="Buscar componentes..."
                            value={searchComponent}
                            onChange={(e) => setSearchComponent(e.target.value)}
                        />
                        <button
                            className={styles.addTemplate}
                            onClick={() => handleAddTemplate()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                        </button>
                        {isImage ? (
                            <button
                                className={styles.addImage}
                                onClick={() => handleClickViewImage()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                className={styles.addImage}
                                onClick={() => handleClickNoneImage()}
                            >
                                <svg fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    {searchComponent && filteredComponent.length > 0 && (
                        <div className={styles.scroll}>
                            <ul>
                                {filteredComponent.slice(0, 10).map((item, index) => (
                                    <li
                                        key={index}
                                        class={styles.addComponent}
                                        onClick={() => handleInsertComponent(item)}
                                    >
                                        <h3>{item.title}</h3>
                                        <img src={item.image} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {isLoading ? (
                    <div className={styles.bar}>
                        <div className={styles.progress}></div>
                    </div>
                ) : (
                    <div>
                        {false ? (
                            <div className={styles.button}>
                                <button
                                    className={styles.active}
                                    onClick={() => handleNewAddon()}
                                    style={{
                                        minWidth: 45,
                                        width: 45,
                                        padding: 4
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#4F0599"><g><g><path fill="fillCurrent" d="M12 5.5 14.5 3 17 5.5 14.5 8zm0 9 2.5-2.5 2.5 2.5-2.5 2.5zm-9 0L5.5 12 8 14.5 5.5 17zm0-9L5.5 3 8 5.5 5.5 8z"></path><path fill="#A365F6" d="m7 10 3-3 3 3-3 3z"></path></g></g></svg>
                                </button>
                                <button
                                    onClick={() => handleDeleteVector()}
                                    className={styles.delete}
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <div className={styles.button}>
                                <button
                                    onClick={() => handleGenerateTemplate()}
                                    className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                                >
                                    Generate Template
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <div
                    className={styles.items}
                // onDoubleClick={() => handleDoubleClickTemplate()}
                >
                    {listComponents.map((component, index) => (
                        <DraggableComponent
                            templateId={template.id}
                            id={component.id}
                            key={component.id}
                            index={index}
                            listComponents={listComponents}
                            setListComponents={setListComponents}
                            doubleClick={handleDoubleClickTemplate}
                            moveComponent={moveComponent}
                            updateComponentText={updateComponentText}
                            deleteComponent={deleteComponent}
                            updateTextareaRef={updateTextareaRef}
                            component={component}
                            isImage={isImage}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
                <div className={styles.addComponent}>
                    <button
                        onClick={() => handleAddComponent()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        Random Component
                    </button>
                </div>

            </div>
        </div>
    )
}



export default Template














const DraggableComponent = ({
    templateId,
    id,
    component,
    index,
    moveComponent,
    updateComponentText,
    deleteComponent,
    updateTextareaRef,
    isImage,
    isLoading,
    doubleClick,
    listComponents,
    setListComponents,
}) => {
    const textareaRef = useRef(null);

    const [textareaHeight, setTextareaHeight] = useState('auto');
    const [isDragging, drag] = useDrag({
        type: 'card',
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: 'card',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveComponent(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const memoizedUpdateTextareaRef = useCallback(
        (id, ref) => updateTextareaRef(id, ref),
        [updateTextareaRef]
    );

    const memoizedDeleteComponent = useCallback(() => {
        deleteComponent(id);
    }, [deleteComponent, id]);

    useEffect(() => {
        memoizedUpdateTextareaRef(id, textareaRef);

        if (textareaRef.current) {
            const initialHeight = textareaRef.current.scrollHeight;
            setTextareaHeight(`${initialHeight}px`);
        }
    }, [id, textareaRef, memoizedUpdateTextareaRef]);

    useEffect(() => {
        if (textareaRef.current && !component.text) {
            memoizedDeleteComponent();
        }
    }, [component.text, memoizedDeleteComponent]);

    const handleTextChange = (e) => {
        updateComponentText(id, e.target.value);
        setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    };


    // 
    const [contextMenuPosition, setContextMenuPosition] = useState(false);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    const handleContextMenu = (event) => {
        event.preventDefault();

        setContextMenuVisible(true);
        setContextMenuPosition({
            top: event.clientY,
            left: event.clientX,
        });
    };

    const handleMouseLeave = () => {
        if (contextMenuVisible) {
            setContextMenuVisible(false);
        }
    };

    // ----------------------------------------------
    const [randomLoader, setRandomLoader] = useState('');

    useEffect(() => {
        const loaders = [
            'loader29', 
            'loader33', 
            'loader34', 
            'loader35', 
            'loader36', 
            'loader39', 
            'loader40', 
            'loader41', 
            'loader42', 
            'loader43', 
            'loader44'];
        const randomIndex = Math.floor(Math.random() * loaders.length);
        setRandomLoader(loaders[randomIndex]);
    }, []);

    return (
        <div
            id={`component-${index}`}
            ref={(node) => drop(drag(node))}
            className={`${styles.draggableComponent} ${isDragging ? styles.dragging : ''}`}
            onContextMenu={handleContextMenu}
            onDoubleClick={() => doubleClick(index)}
        >
            {isImage ? (
                <div>
                    {component.code ? (
                        <div className={styles.templateComponent}>
                            <div dangerouslySetInnerHTML={{ __html: component.code }} />
                        </div>
                    ) : component.image ? (
                        <div
                        className={`${isLoading && styles.loading}`}
                        >
                            {isLoading && (
                                <div className={stylesLoader.loading}>
                                    <div className={stylesLoader[randomLoader]} />
                                </div>
                            )}
                            <img src={component.image} alt="Component Image" />
                        </div>
                    ) : (
                        <div className={styles.noneImage}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M13 10c0-.6.4-1 1-1a1 1 0 1 1 0 2 1 1 0 0 1-1-1Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12c0 .6-.2 1-.6 1.4a1 1 0 0 1-.9.6H4a2 2 0 0 1-2-2V6Zm6.9 12 3.8-5.4-4-4.3a1 1 0 0 0-1.5.1L4 13V6h16v10l-3.3-3.7a1 1 0 0 0-1.5.1l-4 5.6H8.9Z" clipRule="evenodd" />
                            </svg>
                            <span>
                                NOT IMAGE FOUND
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                <textarea
                    ref={textareaRef}
                    spellCheck="false"
                    defaultValue={component.text}
                    style={{ height: textareaHeight }}
                    className={styles.textarea}
                    onChange={handleTextChange}
                />
            )}
            {contextMenuVisible && (
                <div
                    onMouseLeave={handleMouseLeave}
                >
                    <ModalContextMenu
                        index={index}
                        templateId={templateId}
                        contextMenuPosition={contextMenuPosition}
                        setContextMenuVisible={setContextMenuVisible}
                        listComponents={listComponents}
                        setListComponents={setListComponents}
                    />
                </div>
            )}
        </div>
    );
};



const ModalContextMenu = ({
    index,
    templateId,
    contextMenuPosition,
    setContextMenuVisible,
    listComponents,
    setListComponents
}) => {

    const {
        nodes,
        setNodes,
    } = useGraph();

    const [position, setPosition] = useState({})

    useEffect(() => {
        console.log('eee', index, contextMenuPosition)

        let offset = 0;

        for (let i = 0; i < index; i++) {
            const element = document.getElementById(`component-${i}`);
            if (element) {
                const height = element.offsetHeight;
                offset += height
            }
        }

        setPosition({
            y: offset,
            x: contextMenuPosition.x
        })

        console.log('offset', offset)

    }, [])


    const handleDuplicate = () => {
        const duplicatedComponent = { ...listComponents[index] };

        const newListComponents = [
            ...listComponents.slice(0, index + 1), // Componentes antes del duplicado
            duplicatedComponent, // Componente duplicado
            ...listComponents.slice(index + 1) // Componentes después del duplicado
        ];

        setListComponents(newListComponents);
        setContextMenuVisible(false);
    }

    const handleCopy = () => {
        const componentToCopy = listComponents[index];

        // Convierte el componente a JSON y copia al portapapeles
        const jsonString = JSON.stringify(componentToCopy);
        navigator.clipboard.writeText(jsonString)
        setContextMenuVisible(false);
    }

    const handlePaste = () => {

        navigator.clipboard.readText()
            .then((pastedText) => {
                try {
                    const parsedComponent = JSON.parse(pastedText);
                    const newListComponents = [...listComponents];
                    newListComponents[index] = parsedComponent;
                    setListComponents(newListComponents);

                    setContextMenuVisible(false);
                } catch (error) {
                    console.error('Error al analizar el componente pegado:', error);
                }
            })

        setContextMenuVisible(false);
    }

    const handleEarse = () => {
        const updatedComponents = listComponents.filter((_, i) => i !== index);

        setListComponents(updatedComponents);
        setContextMenuVisible(false);
    }

    const handleDelete = () => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== templateId));
        setContextMenuVisible(false);
    }


    const handleDuplicateTemplate = () => {
        // Encontrar el nodo correspondiente a templateId
        const templateNode = nodes.find(node => node.id === templateId);

        console.log('templateNode', templateNode)
        if (templateNode) {
            // Copiar el nodo
            const duplicatedNode = { ...templateNode };

            // Asignar un nuevo ID al nodo duplicado para evitar duplicados
            duplicatedNode.id = uuidv4()

            // Agregar el nodo duplicado al estado de nodes
            setNodes(prevNodes => [...prevNodes, duplicatedNode]);
        }
    }


    return (
        <div
            className={styles.contextMenu}
            style={{
                top: position.y,
                left: position.x
            }}
        >
            <ul>
                <li onClick={() => handleDuplicate()} >
                    Duplicar
                </li>
                <li onClick={() => handleCopy()}>
                    Copiar
                </li>
                <li onClick={() => handlePaste()}>
                    Pegar
                </li>
                <li onClick={() => handleEarse()}>
                    Borrar Component
                </li>
                <li onClick={() => handleDelete()}>
                    Eliminar template
                </li>
                <li onClick={() => handleDuplicateTemplate()}>
                    Duplicar template
                </li>
            </ul>
        </div>
    )
}