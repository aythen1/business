import React, {useState, useEffect}from 'react'

import styles from './modal.module.css'

const AddTag = ({handleInputChange}) => {
    const [isActive, setIsActive] = useState(true)

    const [isShow, setIsShow] = useState(true)
 

    const handleClickShowAddTags = () => {
        setIsShow(!isShow)
    }

   
    // ---------- 
    const [tags, setTags] = useState([{ key: '', value: '' }]);

    const handleAddTag = () => {
        setTags([...tags, { key: '', value: '' }]);
    };

    const handleKeyChange = (e, index) => {
        const updatedTags = [...tags];
        updatedTags[index].key = e.target.value;
        setTags(updatedTags);
    };

    const handleValueChange = (e, index) => {
        const updatedTags = [...tags];
        updatedTags[index].value = e.target.value;
        setTags(updatedTags);
    };

    const handleRemoveTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);

        handleInputChange(tags, 'tags');

    };

    const handleClickSaveAddTags = () => {
        // setIsShow(true)
        handleInputChange(tags, 'tags');
        setIsShow(true)
    }
    
    const handleClickDeleteAddTags = () => {
        setTags([])
        handleInputChange(tags, 'tags');
        setIsShow(true)
        // dispatch(saveAddTags)
    }

    return (
        <div>
            {isShow ? (
                <div>
                    <div className={styles.labelsTag}>
                        {tags.map((tag, index) => (
                            <label key={index}>
                                {tag.key}: {tag.title}
                            </label>
                        ))}
                    </div>

                    <button 
                        onClick={() => handleClickShowAddTags()}
                        className={styles.addTag}
                    >
                        <svg viewBox="0 0 24 24" ><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
                        Add tag
                    </button>
                </div>
            ):(
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Tags
                </h2>
                <div className={styles.box}>
                    <div className={styles.gird2}>
                        <p className={styles.text}>
                            Key value tags helps you organize your users.
                        </p>
                        <div 
                            className={`${styles.buttonItem} ${isActive ? styles.active : ''}`}
                            style={{marginLeft: 'auto'}}
                        >
                            <button
                                onClick={() => handleClickSaveAddTags()} 
                                className={`${styles.xs} ${styles.save}`}
                            >
                                <  svg viewBox="0 0 24 24" ><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>
                            </button>
                            <button 
                                onClick={() => handleClickDeleteAddTags()}
                                className={`${styles.xs} ${styles.delete}`}
                            >
                                <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z"></path></svg>
                            </button>
                        </div>
                    </div>
                    {tags.map( (tag, index) => (
                        <div  key={index} className={styles.list}>
                            <div className={styles.input}>
                                <label>
                                    Key
                                </label>
                                <input
                                    type="text"
                                    value={tag.key}
                                    onChange={(e) => handleKeyChange(e, index)}
                                    />
                            </div>
                            <div className={styles.input}>
                                <label>
                                    Value
                                </label>
                                <input
                                    type="text"
                                    value={tag.value}
                                    onChange={(e) => handleValueChange(e, index)}
                                    />
                            </div>
                            <div 
                                onClick={() => handleRemoveTag(index)}
                                className={styles.buttonItem}
                            >
                                <button className={styles.deleteButton}>
                                    <svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button 
                            onClick={() => handleAddTag()}
                            className={styles.addTag}
                        >
                            <svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
                            Add Tag
                        </button>
                    </div>
                </div>
            </div>
            )}

        </div>
    )
}

export default AddTag