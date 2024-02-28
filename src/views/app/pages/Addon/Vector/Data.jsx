import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import styles from '../../Settings/iam/modal.module.css'
import style from './index.module.css'

const AddonData = ({ addon }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [isNewAddon, setIsNewAddon] = useState(addon?.id ? true : false);
    const [isActive, setIsActive] = useState(false)


    const initialVector = [{
        title: 'name'
    }]

    const [listVector, setListVector] = useState(initialVector)




    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'title') {
            // Verificar si el texto tiene una longitud mayor a cero
            const isValidText = value.trim().length > 0;

            setIsActive(isValidText);

            setState((prevState) => ({
                ...prevState,
                [property]: isValidText ? value.trim() : '',  // Asegura que el valor sea un array
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };




    const handleAddAddon = () => {
        const data = {
            // owner: user?.id || '3r3',
            available: true,
            public: true,

            title: 'hello',
            href: 'hello',
            description: '33r',
            tags: state.tags || [],

            updatedAt: new Date(),
            createdAt: new Date(),
        }

        dispatch(addAddon(data))
        dispatch(setModal(null))
    }


    const handleDeleteAddon = () => {
        dispatch(deleteAddon(state.id))
        dispatch(setModal(null))
    }


    const handleEditAddon = () => {
        navigate(`/${'es'}/app/addon/${state.id}`)
        dispatch(setModal(null))
    }


    // ---
    const [state, setState] = useState({
        id: addon?.id || '',

        tag: addon?.tag || [],
        createdAt: addon?.createdAt || '',

        image: addon?.image || '',
        title: addon?.title || '',
        href: addon?.href || '',
        description: addon?.description || '',

        components: addon?.components || [],

        available: addon?.available || false,
        public: addon?.public || false
    });







    return (
        <div className={styles.modal}>
            <p className={styles.textBold}>
                Add to an existing group (optional)
            </p>
            <textarea
                placeholder={'Description Addon..'}
                spellCheck="false"
                value={state?.description}
                className={styles.textarea}
                onChange={(e) => handleInputChange(e, 'description')}
            />
            <div
                className={style.labelTag}
            >
                {listVector.map((item, index) => (
                    <label>
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 7.2c4.4 0 8-1.2 8-2.6C20 3.2 16.4 2 12 2S4 3.2 4 4.6C4 6 7.6 7.2 12 7.2ZM12 22c5 0 8-1.7 8-2.6V15h-.2a7.8 7.8 0 0 1-1.3.7l-.2.1c-2 .7-4.2 1-6.3 1a19 19 0 0 1-6.3-1h-.2a10.1 10.1 0 0 1-1.3-.7L4 15v4.4c0 1 3 2.6 8 2.6Zm7-14c-.1.2-.3.2-.5.3l-.2.1c-2 .7-4.2 1-6.3 1a19 19 0 0 1-6.3-1h-.2a10.2 10.2 0 0 1-1.3-.7L4 7.6V12c0 1 3 2.6 8 2.6s8-1.7 8-2.6V7.6h-.2a7.8 7.8 0 0 1-.7.5Z"></path></svg>
                        Hello worl
                    </label>
                ))}
            </div>
            <div className={`${styles.textBold} ${styles.gird2}`}>
                Select type public or available addons.
                <svg viewBox="0 0 24 24" ><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
            </div>
            <div>
                <div className={styles.checkbox}>
                    <input
                        type="checkbox"
                        name="available"
                        checked={state?.available}
                        onChange={(e) => handleInputChange(e.target.name, 'available')}
                    />
                    Available addon for applications.
                </div>
                <div className={styles.checkbox}>
                    <input
                        type="checkbox"
                        name="public"
                        checked={state?.public}
                        onChange={(e) => handleInputChange(e.target.name, 'public')}
                    />
                    Public addon for applications.
                </div>
            </div>
        </div>
    )
}



export default AddonData