

import styles from './Component.module.css'



import {
    setOpenMenuRight,
    setOpenChatBot,
    setOpenModal
} from '@/actions/iam'


// import {
//     addMessage
// } from '@/actions/chatbot'


// import {
//     setOpenMenuRight
// } from '@/slices/iamSlice'


import { useOpenAI } from './openai'

import ReactDOM from 'react-dom';



// import IconCopy from './assets/copy.png'
// import IconDelete from './assets/delete.png'
// import IconMove from './assets/move.png'
// import IconCode from './assets/code.png'
// import IconView from './assets/view.png'
// import IconGPT from './assets/gpt.png'




////

const findInstructionsByKey = (shortcutKey) => {
    const foundKey = keysAlt.find((key) => key.key === shortcutKey);
    return foundKey ? foundKey.instructions : null;
};

export const keysAlt = [{
    title: 'Refresh',
    key: 'alt+a',
    description: `New component`,
    instructions: [
        'Iniciando la generación del nuevo componente...',
        'Analizando patrones de diseño...',
        'Sintiendo la estética del nuevo componente...',
        'Creando la estructura base del componente...',
        'Generando código inteligente...',
        'Aplicando estilos dinámicos...',
        'Optimizando la interfaz...',
        'Simulando la experiencia del usuario...',
        '¡Componente generado con éxito! Refresca para crear uno nuevo.'
    ]
}, {
    title: 'Text',
    key: 'alt+t',
    description: `News texts`,
    instructions: [
        'Iniciando la creación de nuevos textos...',
        'Analizando temas interesantes...',
        'Generando ideas creativas para el texto...',
        'Escribiendo contenido cautivador...',
        'Revisando gramática y estilo...',
        'Optimizando la estructura del texto...',
        'Simulando la experiencia de lectura...',
        '¡Textos generados con éxito! Refresca para crear nuevos.'
    ]
}, {
    title: 'Images',
    key: 'alt+i',
    description: `News images`,
    instructions: [
        'Iniciando la creación de nuevas imágenes...',
        'Explorando conceptos visuales...',
        'Diseñando composiciones atractivas...',
        'Seleccionando colores y estilos...',
        'Generando elementos visuales...',
        'Aplicando efectos especiales...',
        'Optimizando la calidad de las imágenes...',
        'Simulando la experiencia visual...',
        '¡Imágenes generadas con éxito! Refresca para crear nuevas.'
    ]
}, {
    title: 'Form',
    key: 'alt+f',
    description: `Insert form`,
    instructions: [
        'Iniciando la creación de un nuevo formulario...',
        'Diseñando campos y elementos del formulario...',
        'Seleccionando el tipo de entrada para cada campo...',
        'Configurando la disposición y estructura del formulario...',
        'Añadiendo validaciones y lógica de formulario...',
        'Personalizando estilos y colores...',
        'Optimizando la usabilidad del formulario...',
        'Simulando la interacción del usuario con el formulario...',
        '¡Formulario creado con éxito! Refresca para crear uno nuevo.'
    ]
}, {
    title: 'Remove',
    key: 'alt+r',
    description: ` `,
}, {
    title: 'Copy',
    key: 'alt+c',
    description: `Copy component`
}, {
    title: 'Pegar',
    key: 'alt+v',
    description: `Paste component`
}, {
    title: 'Insertar',
    key: 'alt+a',
    description: `Insert component`,
}, {
    title: 'Duplicar',
    key: 'alt+d',
    description: `Duplicate component`,
    instructions: [
        'Iniciando el proceso de duplicación del componente...',
        'Creando una copia exacta con modificaciones de forma y diseño...',
        'Ajustando la posición y estilo de la nueva copia...',
        'Insertando la copia en la interfaz...',
        'Finalizando el proceso de duplicación...',
        '¡Componente duplicado con éxito!',
    ]
}, {
    title: 'Cortar',
    key: 'alt+x',
    description: `Cut component`,
}, {
    title: 'Vector',
    key: 'alt+n',
    description: `Vector component`,
    instructions: [
        'Iniciando la obtención de datos desde la base de datos...',
        'Recuperando un vector dimensionado con información...',
        'Conectando los datos al componente...',
        'Ajustando la visualización según el vector...',
        'Finalizando la conexión de datos...',
        '¡Datos añadidos al componente con éxito!',
    ]
}, {
    title: 'Colores',
    key: 'alt+u',
    description: `Color component`,
    instructions: [
        'Iniciando la selección de colores...',
        'Explorando paletas de colores disponibles...',
        'Seleccionando un color para el componente...',
        'Aplicando el color al componente...',
        'Ajustando estilos y visualización...',
        'Finalizando la adición de color...',
        '¡Color añadido al componente con éxito!',
    ]
}, {
    title: 'Tlweditor',
    key: 'alt+q',
    description: `Paint component`
}, {
    title: 'Editor',
    key: 'alt+t',
    description: `Edit component`
}, {
    title: 'Code',
    key: 'alt+y',
    description: `Code component`
}, {
    title: 'Ajustes',
    key: 'alt+ctrl',
    description: `All actions`
}]



const insertLoading = (hoveredElement, instructionsArray = []) => {
    const keys = generateRandomString(5);

    // Add a class to set position to relative
    hoveredElement.classList.add(`relativeClass-${keys}`);

    const loadingElement = document.createElement('div');
    loadingElement.classList.add(`loadGPT-${keys}`);

    // Add the loading element to the hovered element
    hoveredElement.appendChild(loadingElement);

    let currentIndex = 0;

    const updateInstructions = () => {
        loadingElement.innerHTML = instructionsArray[currentIndex];
        currentIndex = (currentIndex + 1) % instructionsArray.length;

        // Si currentIndex vuelve a ser 0, reinicia el intervalo
        if (currentIndex === 0) {
            clearInterval(intervalId);
            intervalId = setInterval(updateInstructions, 5000);
        }
    };

    // Inicializar con las primeras instrucciones
    updateInstructions();

    // Cambiar las instrucciones cada 5 segundos
    let intervalId = setInterval(updateInstructions, 5000);

    // return {
    //     keys,
    //     stop: () => clearInterval(intervalId), // Para detener el cambio de instrucciones
    // };

    return keys
};



const deleteLoading = (token) => {
    document.querySelectorAll(`.loadGPT-${token}`).forEach((element) => { element.remove() });
    document.querySelectorAll(`.relativeClass-${token}`).forEach(element => element.classList.remove('relativeClass'));
}










export const addButtonsToElement = (element, keys) => {
    const CustomButtons = () => {
        return (
            <div className={styles.notHover}>
                {keys.map((key, index) => {
                    return (
                        <button
                            // className="notHover"
                            key={index}
                            className={styles.button}
                            onClick={(e) => handleComponentDelete(e)}
                        >
                            {key.key}
                            <label>
                                {key.title}
                            </label>
                        </button>
                    )
                })}
            </div>
        );
    };

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'customButtons';
    ReactDOM.render(<CustomButtons />, buttonsDiv);
    element.appendChild(buttonsDiv);
};


export const isLeavingToButtons = (relatedTarget) => (
    relatedTarget && (
        relatedTarget.classList.contains('customButtons') ||
        relatedTarget.closest('.customButtons')
    )
);


export const isAltKeyPressed = () => {
    return window.event ? window.event.altKey : false;
};


export const getSelector = (element) => {
    const selectors = [];
    let targetElement = element;

    const collectSelectors = (el) => {
        const id = el.id;
        if (id) {
            selectors.push(`#${id}`);
        }
        const classNames = Array.from(el.classList).join('.');
        if (classNames) {
            selectors.push(`.${classNames}`);
        }
    };

    collectSelectors(element);
    const selector = selectors.join(' ');

    return selector;
};



export function obtainContent(text, type = 'html') {
    const regexString = '```' + type + '\\s*([\\s\\S]*?)```';
    const regex = new RegExp(regexString);
    const match = text.match(regex);

    if (match && match[1]) {
        return match[1].trim();
    } else {
        // If no code block is found, return the entire text
        return text.trim();
    }
}


export const handleGPT = async ({ prompt = false }) => {
    if (prompt) {
        const messages = [{
            role: 'user',
            content: prompt
        }]

        try {
            const openai = await useOpenAI()
            const stream = await openai.chat.completions.create({
                model: 'gpt-4',
                messages,
                stream: true,
            });

            let accumulatedText = '';
            for await (const part of stream) {
                const text = part.choices[0]?.delta?.content || ''
                accumulatedText += text

            }

            return accumulatedText

        } catch (err) {
            console.log('err', err)
        }
    }

    // return data
}




const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}




export const handleRefresh = async (hoveredElement) => {
    // Implementa lógica para refrescar el componente
    console.log('Refreshing component...');

    const tokenItem = insertLoading(hoveredElement, findInstructionsByKey('alt+a'))

    document.querySelectorAll('.customButtons').forEach((buttonsDiv) => { buttonsDiv.remove() });
    document.querySelectorAll('.selectedComponent').forEach(element => element.classList.remove('selectedComponent'));
    const prompt =
        `Quiero que transformes este GPT manteniendo su esencia pero con algun cambio
\n${hoveredElement.outerHTML}`

    console.log('========', prompt)
    const content = await handleGPT({ prompt })
    const code = obtainContent(content)

    hoveredElement.outerHTML = code;

    // Remove the relativeClass
    deleteLoading(tokenItem)
};




export const handleChangeTexts = async (hoveredElement) => {
    // Implementa lógica para cambiar textos
    console.log('Changing texts...');

    const tokenItem = insertLoading(hoveredElement, findInstructionsByKey('alt+t'))

    document.querySelectorAll('.customButtons').forEach((buttonsDiv) => { buttonsDiv.remove() });
    document.querySelectorAll('.selectedComponent').forEach(element => element.classList.remove('selectedComponent'));
    const prompt =
        `Modifica los textos del siguiente código y deja el estilo y la estructura igual:
\n${hoveredElement.outerHTML}`

    console.log('========', prompt)
    const content = await handleGPT({ prompt })
    const code = obtainContent(content)


    hoveredElement.outerHTML = code;

    // Remove the relativeClass
    deleteLoading(tokenItem)
};

export const handleChangeImages = async (hoveredElement) => {
    // Implementa lógica para cambiar las imagenes
    console.log('Changing images...');

    const tokenItem = insertLoading(hoveredElement, findInstructionsByKey('alt+i'))

    document.querySelectorAll('.customButtons').forEach((buttonsDiv) => { buttonsDiv.remove() });
    document.querySelectorAll('.selectedComponent').forEach(element => element.classList.remove('selectedComponent'));
    const prompt =
        `Modifica las imagenes ñaadiendo algunas parecidas:
\n${hoveredElement.outerHTML}`

    console.log('========', prompt)
    const content = await handleGPT({ prompt })
    const code = obtainContent(content)


    hoveredElement.outerHTML = code;

    // Remove the relativeClass
    deleteLoading(tokenItem)
};


export const handleAddForm = async (hoveredElement) => {
    // Add formulario
    console.log('Añadir formulario...');

    // Add a class to set position to relative
    const tokenItem = insertLoading(hoveredElement, findInstructionsByKey('alt+f'))


    document.querySelectorAll('.customButtons').forEach((buttonsDiv) => { buttonsDiv.remove() });
    document.querySelectorAll('.selectedComponent').forEach(element => element.classList.remove('selectedComponent'));
    const prompt =
        `Añade un formulario en este código, si ya existe expandelo con nuevas preguntas:
    \n${hoveredElement.outerHTML}`

    const content = await handleGPT({ prompt })
    const code = obtainContent(content)

    hoveredElement.outerHTML = code;

    // Remove the relativeClass
    deleteLoading(tokenItem)
};


export const handleDeleteComponent = async (hoveredElement) => {
    // Borrar componente
    console.log('Delete componente...');



    if (hoveredElement) {
        hoveredElement.remove();
    }

};



export const handleCopyComponent = async (hoveredElement) => {
    // Copiar componente
    console.log('Copy component...');

    const customButtonsElement = hoveredElement.querySelector('.customButtons');
    if (customButtonsElement) {
        customButtonsElement.remove();
    }

    const outerHtml = hoveredElement.outerHTML;

    // Crear un elemento de texto temporal para copiar al portapapeles
    const tempElement = document.createElement('textarea');
    tempElement.value = outerHtml;
    document.body.appendChild(tempElement);

    // Seleccionar y copiar al portapapeles
    tempElement.select();
    document.execCommand('copy');

    // Eliminar el elemento temporal
    document.body.removeChild(tempElement);

};



export const handlePasteComponent = async (hoveredElement) => {
    // Paste component
    console.log('Paste component...');
    const clipboardData = await navigator.clipboard.readText();

    console.log('clipboardData', clipboardData)

    hoveredElement.outerHTML = clipboardData
};




export const handleInsertComponent = async (dispatch) => {
    // Open menurightmodel insert component
    console.log('Abrir el menuright...');

    dispatch(setOpenMenuRight('component'))
};




export const handleDuplicateComponent = async (hoveredElement) => {
    // Añadir elc omponente después
    console.log('Duplicar component...');

    // Add a class to set position to relative
    const tokenItem = insertLoading(hoveredElement, findInstructionsByKey('alt+d'))


    document.querySelectorAll('.customButtons').forEach((buttonsDiv) => { buttonsDiv.remove() });
    document.querySelectorAll('.selectedComponent').forEach(element => element.classList.remove('selectedComponent'));
    const prompt =
        `Te voy a dar un componente en html y tailwind quiero que crees una version más moderna y parecida a la que te voy a dar:
    \n${hoveredElement.outerHTML}`

    console.log('========', prompt)
    const content = await handleGPT({ prompt })
    const code = obtainContent(content)


    hoveredElement.outerHTML = hoveredElement.outerHTML + code;

    // Remove the relativeClass
    deleteLoading(tokenItem)
};





export const handleCutComponent = async (hoveredElement) => {
    // Cortar el componente dejarlo como seleccionado, con clipoard al poderlo pegar
    console.log('Cut component...');
};




export const handleDataVector = async (hoveredElement) => {
    // Poder seleccionar el vector que tengas abierto
    console.log('Open Data Vector...');
};




export const handleColorPrimary = async (hoveredElement) => {
    // Añadir el color al componente seleccionado
    console.log('Change color component...');


    // Añadir elc omponente después
    console.log('Duplicar component...');

    // Add a class to set position to relative
    const tokenItem = insertLoading(hoveredElement, findInstructionsByKey('alt+c'))


    document.querySelectorAll('.customButtons').forEach((buttonsDiv) => { buttonsDiv.remove() });
    document.querySelectorAll('.selectedComponent').forEach(element => element.classList.remove('selectedComponent'));
    const prompt =
        `Te voy a dar un componente en html y tailwind quiero que crees una version más moderna y parecida a la que te voy a dar:
    \n${hoveredElement.outerHTML}`

    console.log('========', prompt)
    const content = await handleGPT({ prompt })
    const code = obtainContent(content)


    hoveredElement.outerHTML = hoveredElement.outerHTML + code;

    // Remove the relativeClass
    deleteLoading(tokenItem)

};




export const handleViewEditor = async (dispatch, Modal, data) => {
    // Crear un png y pasarlo a tlwdrl
    console.log('Open Editor Visual...');

    // dispatch(setOpenModal(<Modal />))
    dispatch(setOpenModal(<Modal image={data} />))
};




export const handlChatEditor = async (dispatch, Modal, data) => {
    // Implementa lógica para cambiar form
    console.log('Add to chat...');

    // dispatch(setOpenChatBot(true))
    dispatch(setOpenModal(<Modal image={data} />))
  };




export const handleCodeEditor = async (dispatch, Modal, hoveredElement) => {
    // Añadir el codigo del item en un editor y que puedas abrirlo
    console.log('Changing Code Editor...');

    console.log('ee', hoveredElement)

    dispatch(setOpenModal(<Modal hoveredElement={hoveredElement} />))
};



export const handleSettingsComponent = async () => {
    // Abrir el menu de ajustes
    console.log('Open settings...');
    // dispatch(setModal(<Modal />))
};