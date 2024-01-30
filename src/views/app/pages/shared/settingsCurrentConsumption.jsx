import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// import 'chartist/dist/index.css';
import BarChart from './BarChart'



import styles from './settingsCurrentConsumption.module.css'

// import GraphDonut from './assets/GraphDonut.jpeg'




const SettingsCurrentConsumption = () => {
    const navigate = useNavigate()

    const [listPricing, setListPricing] = useState([])
    
    const initialList = [{
        color: 'red',
        title: 'Add user hace 2 segundos...', 
        pricing: '70.99€'
    },{
        color: 'orange',
        title: 'Add shop hace 2 segundos...', 
        pricing: '0.99€'
    },{
        color: 'green',
        title: 'Add employee hace 2 segundos...', 
        pricing: '€70.99'
    },{
        color: 'blue',
        title: 'Token use eye origin...', 
        pricing: '0.99€'
    },{
        color: 'red',
        title: '8 Eyes inserters...', 
        pricing: '0.99€'
    }]

    useEffect( () => {
        setListPricing(initialList)
    }, [])


    // --------------------------------------------------------
    const handleBilling = () => {
        navigate('/es/app/settings/billing')
    }
    
    const handleInvoice = () => {
        navigate('/es/app/settings/contracts')
    }



    return (
        <div className={styles["boxConsumption1"]}>
            <div className={styles["grid2"]}>
                <div className={styles["bar"]}>
                    <BarChart className={styles["image"]} />
                    {/* <img src={GraphDonut}  /> */}
                    <div className={styles["box"]}>
                        <b className={styles["pricing"]}>
                            €0.00
                        </b>
                        <span className={styles["text"]}>
                            excl. taxes
                            with discount
                        </span>
                    </div>
                </div>
                <div className={styles["listPricing"]}>
                    {listPricing.map((item, index) => {
                        const colorStyle = styles[item.color] || {};
                        return (
                            <div
                                key={index}
                                className={styles["pricing"]}
                            >
                                <div className={`${styles["dot"]} ${colorStyle}`}>

                                </div>
                                <p className={styles["content"]}>
                                    {item.title}
                                </p>
                                <span className={styles["pricing"]}>
                                    {item.pricing}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles["footer"]}>
                <div className={styles["buttons"]}>
                    <button onClick={handleBilling}>
                        <svg viewBox="0 0 24 24" ><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>
                        0 Billing
                    </button>
                    <button onClick={handleInvoice}>
                        <svg viewBox="0 0 24 24" ><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"></path></svg>
                        0 Invoice
                    </button>
                </div>
                <div className={styles["updated"]}>
                    <svg viewBox="0 0 24 24" ><path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"></path></svg>
                    Updated 27 minutes ago
                </div>
            </div>
        </div>
    )
}


export default SettingsCurrentConsumption