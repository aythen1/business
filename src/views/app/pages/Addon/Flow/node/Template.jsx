
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';


import { useOpenAI } from '../../openai'


import { useDrag, useDrop } from 'react-dnd';

import { DndProvider } from "react-dnd";

import { HTML5Backend } from 'react-dnd-html5-backend';


// import styles from '../Settings/iam/modal.module.css'
import styles from './Template.module.css'

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




import AddTag from '@/views/app/pages/shared/AddTag'
import { useNavigate } from 'react-router-dom';
import { useEdges } from 'reactflow';



const initialDescription =
    `1. Header: Las 4 anclas de esta landingpage.
2. Formulario: Teléfono, nombre, términos.
3. Newsletter: Poner tu email.
4. About Us: Un carousel con una foto y un texto.`




const Template = ({
    template,
    addTemplate,
    listComponents,
    setListComponents,
    setInternalUpdate,
    setTitle,
    onEditor
}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()




    // const {
    //     addon
    // } = useSelector((state) => state.addon)
    // console.log('template', template)

    const textareaRef = useRef(null);

    // const [isNewVector, setIsNewVector] = useState(vector?.id ? true : false);
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const [isImage, setIsImage] = useState(true)


    const [state, setState] = useState({
        id: template?.id || '',
        version: template?.version || '0',
        title: template?.title || '',
        description: template?.description || initialDescription,
        components: template?.code || [],
        updatedAt: template?.updatedAt || new Date(),
        createdAt: template?.createdAt || new Date(),
    });


    useEffect(() => {
        console.log('remplate', template)
    }, [template])


    // useEffect(() => {
    //     if (code) {
    //         setIsLoading(false)
    //         handleInputChange(code, 'code')
    //         setPanel('leftBottom')
    //     }
    // }, [code])





    // ---------------------------------------------------------------

    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'title') {
            // Verificar si el texto tiene una longitud mayor a cero
            const isValidText = value.trim().length > 0;

            setIsActive(listComponents.length > 0 && isValidText);

            setState((prevState) => ({
                ...prevState,
                [property]: isValidText ? value : '',
            }));

            setTitle(value)
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };


    const loadImage = (img, errorHandler) => {
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => {
                // Llama a la función de manejo de error
                errorHandler();
                // Resuelve la promesa con un valor que indique que hubo un error
                resolve(null);
            };
        });
    };


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


            // Esperar a que todas las imágenes se carguen
            // await Promise.all(imagePromises)

            try {
                // Agregar el componente envuelto al cuerpo del documento
                document.body.appendChild(wrappedComponent);
                wrappedComponent.appendChild(tempDiv);

                // Esperar antes de capturar la imagen
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Convertir el componente en una imagen
                const image = await domtoimage.toPng(wrappedComponent);

                // Hacer algo con la imagen (en este caso, imprimir en la consola)
                console.log('image', image);


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


        console.log('payload', resp)

        let updatedListComponents = listComponents.map((component, index) => ({
            ...component,
            code: resp.payload[index]
        }));

        setListComponents(updatedListComponents)

        await obtainImage(updatedListComponents)


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
    }, [state.description]);


    //
    // const posPanel = (pos) => {
    //     setPanel(pos)
    // }




    // useEffect(() => {
    //     if (template.components) {
    //         let updatedComponents = template.components.map((component, index) => {
    //             return {
    //                 id: 1,
    //                 text: component,
    //                 image: '',
    //                 code: ''
    //             }
    //         })
    //         setListComponents(updatedComponents)
    //     }

    // }, [template.components])
    // [

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


    const handleClickAddComponent = async () => {
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
        console.log('ad template')
        addTemplate()
    }



    // -------------------------------------------------

    const [searchComponent, setSearchComponent] = useState('');


    let filteredComponent = dataComponents.filter(item =>
        item.href.toLowerCase().includes(searchComponent.toLowerCase()) ||
        item.title.toLowerCase().includes(searchComponent.toLowerCase()) ||
        item.description.toLowerCase().includes(searchComponent.toLowerCase())
    );


    // ------------------------------------------------

    const handleMagicTitle = async () => {
        const prompt = generatePrompt(listComponents);
        const generatedTitle = await generateTitle(prompt);

        setState({
            ...state,
            title: generatedTitle,
        });

        calculateRows(generatedTitle)


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


    const handleAddComponent = async (item) => {
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
    const calculateRows = (content) => {
        const rows = content.split('\n').length;
        const calculatedRows = rows > 1 ? rows : 2;
        return calculatedRows;
    };


    // ---------------------------------------------
    const handleClickNoneImage = () => {
        setIsImage(true)
    }

    const handleClickViewImage = () => {
        setIsImage(false)
    }


    // --------------------------------------------
    const handleDoubleClickTemplate = () => {
        onEditor()
        // setIsEditor(true)
        // navigate(`/${'es'}/app/addon/${'ddf97681-ca79-465d-bab2-c1c366dc0d2b'}/${'-'}`)
    }


    // ----------------------------------------------
    useEffect(() => {
        if (state.title.trim().length > 0 && listComponents.length > 0) {
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
                        value={state.title}
                        placeholder={'Enter title of addon'}
                        onChange={(e) => handleInputChange(e, 'title')}
                        className={styles.textArea} // Añade esta clase para aplicar estilos si es necesario
                        rows={calculateRows(state.title)}
                        style={{ minHeight: `${calculateRows(state.title) * 1}em` }}
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
                                        onClick={() => handleAddComponent(item)}
                                    >
                                        <h3>{item.title}</h3>
                                        <img src={item.image} />
                                        {/* -
                                        <p>{item.description}</p> */}
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
                    onDoubleClick={() => handleDoubleClickTemplate()}
                >
                    {listComponents.map((component, index) => (
                        <DraggableComponent
                            id={component.id}
                            key={component.id}
                            index={index}
                            moveComponent={moveComponent}
                            updateComponentText={updateComponentText}
                            deleteComponent={deleteComponent}
                            updateTextareaRef={updateTextareaRef}
                            component={component}
                            isImage={isImage}
                        />
                    ))}
                </div>
                <div className={styles.addComponent}>
                    <button
                        onClick={() => handleClickAddComponent()}
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
    id,
    component,
    index,
    moveComponent,
    updateComponentText,
    deleteComponent,
    updateTextareaRef,
    isImage
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

        // Muestra el menú contextual
        setContextMenuVisible(true);

        // Posiciona el menú en la posición del clic derecho
        setContextMenuPosition({
            top: event.clientY,
            left: event.clientX,
        });
    };

    const handleMouseLeave = () => {
        // Oculta el menú contextual al hacer hover fuera del área
        if (contextMenuVisible) {
            setContextMenuVisible(false);
        }
    };


    return (
        <div
            ref={(node) => drop(drag(node))}
            className={`${styles.draggableComponent} ${isDragging ? styles.dragging : ''}`}
            onContextMenu={handleContextMenu}
        >
            {isImage ? (
                <div>
                    {component.image ? (
                        <div>
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
                    className={styles.contextMenu}
                    onMouseLeave={handleMouseLeave}
                >
                    <ModalContextMenu />
                </div>
            )}
        </div>
    );
};



const ModalContextMenu = () => {
    const handleDuplicate = () => {
        alert(1)
    }

    const handleCopy = () => {
        alert(2)
    }

    const handlePaste = () => {
        alert(3)
    }

    const handleEarse = () => {
        alert(4)
    }

    const handleDelete = () => {
        alert(5)
    }


    return (
        <div >
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
            </ul>
        </div>
    )
}