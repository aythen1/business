import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import styles from '../../Settings/iam/modal.module.css'
import style from './index.module.css'
// import AddTag from '../../Settings/iam/AddTag'
import AddTag from '@/views/app/pages/shared/AddTag'


import { v4 as uuidv4 } from 'uuid';





import {
    setModal
} from '@/slices/iamSlice'

import {
    addAddon,
    deleteAddon
} from '@/actions/addon'




const AddonCustom = ({ addon }) => {

    console.log('adddon', addon?.id || 'not found')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // console.log('adddon', addon)

    const [isNewAddon, setIsNewAddon] = useState(addon?.id ? true : false);
    const [isActive, setIsActive] = useState(false)


    // ---
    const [state, setState] = useState({
        id: addon?.id || uuidv4(),

        tag: addon?.tag || [],
        createdAt: addon?.createdAt || '',

        image: addon?.image || '',
        title: addon?.title || '',
        href: addon?.href || '',
        description: addon?.description || '',

        components: addon?.components || [],
        nodes: addon?.nodes || [],
        edges: addon?.edges || [],

        isavailable: addon?.isavailable || false,
        ispublic: addon?.ispublic || false
    });




    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'title' || property === 'href') {
            // Verificar si ambos campos tienen una longitud mayor a cero
            const isValidTitle = state.title.trim().length > 5;
            const isValidHref = state.href.trim().length > 2; // Cambiado a > 2 para mayor a 3

            setIsActive(isValidTitle && isValidHref);

            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };




    const handleAddAddon = () => {
        if (isActive) {
            const data = {
                // owner: user?.id || '3r3',
                id: state.id,
                isavailable: state.isavailable || true,
                ispublic: state.ispublic || true,
                title: state.title || '',
                href: state.href || '',
                description: state.description || '',
                tags: state.tags || [],

                nodes: state.nodes || [],
                edges: state.edges || [],

                updatedAt: new Date(),
                createdAt: new Date(),
            }

            dispatch(addAddon(data))
            dispatch(setModal(null))
        }
    }


    const handleDeleteAddon = () => {
        dispatch(deleteAddon(state.id))
        dispatch(setModal(null))
    }


    const handleEditAddon = () => {
        navigate(`/${'es'}/app/addon/${state.id}`)
        dispatch(setModal(null))
    }



    // -------------------------------------z
    // -------------------------------------z
    const imgRef = useRef(null);
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(`http://localhost:3001/service/v1/addon/logo/${state.id}`)


    const handleImageError = () => {
        setImageError(true);
    };


    const handleSaveImage = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {

                // Escala la imagen a 400 píxeles
                const scaleFactor = 400 / Math.max(img.width, img.height);
                const scaledWidth = img.width * scaleFactor;
                const scaledHeight = img.height * scaleFactor;

                // Crea un canvas para renderizar la imagen escalada
                const canvas = document.createElement('canvas');
                canvas.width = scaledWidth;
                canvas.height = scaledHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

                const base64Image = canvas.toDataURL('image/jpeg', 0.8);
                // console.log('base62', base64Image)
                setImageSrc(base64Image)
                setImageError(false)

                handleInputChange({
                    target: {
                        name: 'avatar',
                        value: base64Image,
                    },
                });
            };
        };

        reader.readAsDataURL(file);
    };




    return (
        <div className={styles.modal}>
            {!state.id && (
                <div>
                    <h2 className={styles.title} style={{ marginTop: -10 }}>
                        Nuevo Addon
                    </h2>
                </div>
            )}
            <div className={`${styles.maxHeight} ${styles._400}`}>
                <p className={styles.textBold}>
                    Enter the title for addon.
                </p>
                <div className={styles.input}>
                    <input
                        type="text"
                        spellCheck="false"
                        value={state.title}
                        placeholder={'Select title of addon'}
                        onChange={(e) => handleInputChange(e, 'title')}
                    />
                </div>
                <p className={styles.textBold} style={{ marginTop: 8 }}>
                    Enter the href for addon.
                </p>
                <div className={styles.input}>
                    <input
                        type="text"
                        spellCheck="false"
                        value={state.href}
                        placeholder={'Select href of addon'}
                        onChange={(e) => handleInputChange(e, 'href')}
                    />
                </div>
                <div>
                    <AddTag
                        handleInputChange={handleInputChange}
                    />
                </div>
                <h2 className={styles.title}>
                    Enter key value tags
                </h2>
                <p className={styles.text1}>
                    Key value tags helps you organize your users. You can assign up to 10 tags per addons.
                </p>

                <p className={styles.textBold}>
                    Add to an existing group (optional)
                </p>
                <textarea
                    placeholder={'Description Addon..'}
                    spellCheck="false"
                    value={state.description}
                    className={styles.textarea}
                    onChange={(e) => handleInputChange(e, 'description')}
                />
                <div style={{ width: '100%' }}>
                    <div className={`${styles.textBold} ${styles.gird2}`}>
                        Select type public addons.
                        <svg viewBox="0 0 24 24" ><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <div className={styles.checkbox}>
                            <input
                                type="checkbox"
                                name="available"
                                checked={state.isavailable}
                                onChange={(e) => handleInputChange(e.target.name, 'available')}
                            />
                            Available addon applications.
                        </div>
                        <div className={styles.checkbox}>
                            <input
                                type="checkbox"
                                name="public"
                                checked={state.ispublic}
                                onChange={(e) => handleInputChange(e.target.name, 'public')}
                            />
                            Public addon for applications.
                        </div>
                    </div>
                </div>
            </div>
            {isNewAddon ? (
                <div className={styles.button}>
                    <button
                        onClick={() => handleDeleteAddon()}
                        className={styles.delete}
                    >
                        Delete Addon
                    </button>
                    <button
                        onClick={() => handleAddAddon()}
                        className={styles.active}
                    >
                        Save Addon
                    </button>
                </div>
            ) : (
                <div className={styles.button}>
                    <button
                        onClick={() => handleAddAddon()}
                        className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                    >
                        Create a New Addon
                    </button>
                </div>
            )}
        </div>
    )
}



export default AddonCustom