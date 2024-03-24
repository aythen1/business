import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BarChart } from '@/views/graphs/render'

import styles from './settingsCurrentConsumption.module.css'


import {
    fetchsBillingExpenses
} from '@/actions/iam'



const SettingsCurrentConsumption = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const value = {
        series: [20, 10, 30, 40],
        label: ['1', '2']
    }


    const {
        expenses
    } = useSelector((state) => state.iam)


    const [listPricing, setListPricing] = useState([])



    useEffect(() => {
        const fetchItem = async () => {
            dispatch(fetchsBillingExpenses({}))
        }

        fetchItem()
    }, [])


    useEffect(() => {
        if(expenses){
            const initialList = [{
                color: 'var(--color-primary-0)',
                title: 'Plantillas creadas',
                pricing: expenses.templates
            }, {
                color: 'var(--color-primary-2)',
                title: 'Componentes creados',
                pricing: expenses.components
            }, {
                color: 'var(--color-primary-1)',
                title: 'Almacen obtenido',
                pricing: expenses.storage
            }, {
                color: 'var(--color-primary-0)',
                title: 'Vectores usados',
                pricing: expenses.vectors
            }, {
                color: 'var(--color-primary-3)',
                title: 'Tokens consumidos',
                pricing: expenses.tokens
            }]

            setListPricing(initialList)
        }

    }, [expenses])


    // --------------------------------------------------------
    const handleBilling = () => {
        navigate(`/${'es'}/app/settings/billing`)
    }

    const handleInvoice = () => {
        navigate(`/${'es'}/app/settings/billing#invoice`)
    }



    return (
        <div className={styles["boxConsumption1"]}>
            <div className={styles["grid2"]}>
                <div className={styles["bar"]}>
                    <BarChart className={styles["image"]} value={value} />
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
                        // const colorStyle = styles[item.color] || {};
                        return (
                            <div
                                key={index}
                                className={styles["pricing"]}
                            >
                                <div
                                    className={styles["dot"]}
                                    style={{background: item.color}}
                                />

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