import React, { useEffect, useState } from 'react'
import styles from './billing.module.css'
import { useDispatch, useSelector } from 'react-redux';


import Table from '@/views/app/pages/Settings/iam/table'
import SettingsCurrentConsumption from '../shared/settingsCurrentConsumption'
import ModalInvoice from './Invoice/index'

import stylesModal from '../Settings/iam/modal.module.css'

import {
    fetchsBilling,
    updateBilling,

    fetchsInvoice,

    sendMail
} from '@/actions/iam'


import {
    setModal
} from '@/slices/iamSlice'
import { useTranslation } from 'react-i18next';


const Billing = ({ }) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const [isActive, setIsActive] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const [stateTable, setStateTable] = useState('')

    const { billing, invoices } = useSelector((state) => state.iam)


    // ---
    const [state, setState] = useState({
        id: null,
        corporate: false,
        name: '',
        address1: '',
        address2: '',
        zip: '',
        city: '',
        country: '',
        region: '',

        limit: 0,
        token: '',
        email: '',
        vat: '',
        paymentmethod: ''
    });


    useEffect(() => {
        if (billing) {
            console.log('billing', billing)
            const address = JSON.parse(billing?.billings?.address || "{}")

            setState({
                id: billing.billings?.id || null,
                type: billing.billings?.type || '',
                name: billing.billings?.name || '',
                email: billing.billings?.email || '',
                limit: billing.billings?.limit || 0,
                iban: billing.billings?.iban || '',
                currency: billing.billings?.currency || '',
                vat: billing.billings?.vat || '',
                paymentmethod: billing.billings?.paymentmethod || 'credit',

                address1: address.address1 || '',
                address2: address.address2 || '',
                zip: address.zip || '',
                city: address.city || '',
                country: address.country || '',
                region: address.region || '',
            })
        }
    }, [billing])



    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'email') {
            const emailArray = value.split(',').map(email => email.trim());
            const isValidEmail = emailArray.some(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

            setIsActive(isValidEmail);

            setState((prevState) => ({
                ...prevState,
                [property]: isValidEmail ? emailArray : [value],
            }));
        } else {

            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };


    const handleClickEdit = () => {
        dispatch(setModal(<ModalPopupContact styles={stylesModal} state={state} setState={setState} setEditContact={setEditContact} />))
    }


    useEffect(() => {
        const fetchsItems = async () => {
            console.log('111')
            dispatch(fetchsBilling({}))
        }

        fetchsItems()
    }, [])


    useEffect(() => {
        if (editContact) {
            const data = {
                id: state.id || null,
                type: state.typ || '',
                name: state.name || '',
                email: state.email || '',
                limit: state.limit || 0,
                iban: state.iban || '',
                currency: state.currency || '',
                vat: state.vat || '',
                paymentmethod: state.paymentmethod || 'credit',
                address: {
                    steetaddress1: state.address1 || '',
                    steetaddress2: state.address2 || '',
                    zip: state.zip || '',
                    city: state.city || '',
                    country: state.country || '',
                    region: state.region || '',
                }
            }

            dispatch(updateBilling({ billing: data }))
        }
    }, [editContact])






    // -------------------------------------------------
    const handleAddInvoice = () => {
        dispatch(setModal(<ModalInvoice />))
    }



    const sendEmail = () => {
        dispatch(sendMail({
            email: 'invite-friends'
        }))
    }


    // -------------------------------------------------
    useEffect(() => {
        if (stateTable.startsWith('download-file:')) {
            const id = stateTable.split(':')[1].trim()
            console.log('id', id)
            alert(id)
        }
    }, [stateTable])


    // ---------------------
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            const section = document.getElementById(hash);

            if (hash == 'invoice' && section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);






    return (
        <div className={styles.containerBilling}>
            {false && (
                <div style={{ gridColumn: 'span 2' }}>
                    <Invoice />
                </div>
            )}
            <div className={styles.containerInformation}>
                <h2 className={styles.title}>
                    {t('billing.t1')}
                </h2>
                {state?.name ? (
                    <div className={styles.boxInformation}>
                        <div>
                            <h2 className={styles.title}>
                                {state?.name}
                            </h2>
                            <div className={styles.description}>
                                <div className={styles.descriptionOne}>
                                    {state?.address1}<br />
                                    {state?.zip} {state?.city} <br />
                                    {state?.region} <br />
                                    {state?.country} <br /> <br />
                                </div>
                                <div>
                                    {state.type}<br />
                                    {t('billing.t2')} {state.currency}<br />
                                    {state.iban}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleClickEdit()}
                            className={styles.button}
                        >
                            {t('billing.t3')}
                        </button>
                    </div>
                ) : (
                    <div className={styles.boxInformation}>
                        <div>

                            <p>
                                {t('billing.t4')}
                            </p>
                            <button
                                onClick={() => handleClickEdit()}
                                className={styles.button}
                            >
                                {t('billing.t5')}
                            </button>
                        </div>

                    </div>
                )}
            </div>

            <div className={styles.containerConsumption}>
                <h2 className={styles.title}>
                    {t('billing.t6')}
                </h2>
                <div className={styles.boxConsumption}>
                    <SettingsCurrentConsumption />
                </div>
            </div>

            <div className={styles.containerContact}>
                <h2 className={styles.title}>
                    {t('billing.t7')}
                </h2>
                <div className={styles.boxContact}>
                    <span className={styles.text}>
                        {t('billing.t8')}
                    </span>
                    <div className={styles.grid2}>
                        <div className={styles.input}>
                            <label>
                                {t('billing.t9')}
                            </label>
                            <input
                                type='text'
                                placeholder={'placeholder@demo.com'}
                                value={state.email}
                                onChange={(e) => handleInputChange(e, 'email')}
                            />
                        </div>
                        <div className={styles.button}>
                            <button
                                onClick={() => handleClickEdit()}
                            >
                                {t('billing.t10')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerContact}>
                <h2 className={styles.title}>
                    {t('billing.t12')}
                </h2>
                <div className={styles.boxContact}>
                    <span className={styles.text}>
                        {t('billing.t13')}
                    </span>
                    <div className={styles.grid2}>
                        <div className={styles.input}>
                            <label>
                                {t('billing.t14')}
                            </label>
                            <input
                                type='text'
                                placeholder={'sk-***'}
                                value={state.token}
                                onChange={(e) => handleInputChange(e, 'token')}
                            />
                        </div>
                        <div className={styles.button}>
                            <button
                                onClick={() => handleClickEdit()}
                            >
                                {t('billing.t15')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerAlerts}>
                <h2 className={styles.title}>
                    {t('billing.t16')}
                </h2>
                <div className={styles.boxAlerts}>
                    <div className={styles.alert}>
                        <div>
                            {t('billing.t17')}
                        </div>
                        <p className={styles.text}>
                            wrrecv
                        </p>
                    </div>
                    <div className={styles.inputContainer}>
                        <div className={styles.toggle}>
                            {t('billing.t18')}
                        </div>
                        <div className={styles.input}>
                            <label className={styles.label}>
                                {t('billing.t19')}
                            </label>
                            <div className={styles.grid2}>
                                <div className={styles.value}>
                                    <input
                                        placeholder={'1000'}
                                        value={state.limit}
                                        onChange={(e) => handleInputChange(e, 'limit')}
                                    />
                                </div>
                                <div className={styles.current}>
                                    <input value={'€'} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <button 
                                className={styles.buttonStyle}
                                onClick={() => handleClickEdit()}
                            >
                                <svg className={styles.icon} viewBox="0 0 24 24">
                                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                                </svg>
                                {t('billing.t20')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerVat}>
                <h2 className={styles.title}>
                    {t('billing.t21')}

                </h2>
                <div className={styles.boxContact}>
                    <span className={styles.text}>
                        {t('billing.t22')}

                    </span>
                    <div className={styles.grid2}>
                        <div className={styles.input}>
                            <label>
                                VAT
                            </label>
                            <input
                                type='text'
                                placeholder={'ESB61077863VAT'}
                                value={state.vat}
                                onChange={(e) => handleInputChange(e, 'vat')}
                            />
                        </div>
                        <div className={styles.button}>
                            <button
                                // onClick={() => sendEmail()}
                                onClick={() => handleClickEdit()}
                            >
                                {t('billing.t23')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerPayment}>
                <h2 className={styles.title}>
                    {t('billing.t24')}
                </h2>
                <div className={styles.boxPayment}>
                    <p className={styles.text}>
                        {t('billing.t25')}
                    </p>
                    <div className={styles.form}>
                        <p className={styles.text}>
                            {t('billing.t26')}
                        </p>
                        <div className={styles.input}>
                            <div className={styles.credit}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'card'}
                                    onChange={(e) => handleInputChange('card', 'paymentmethod')}
                                />
                                Credit card
                            </div>
                            <div className={styles.sepa}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                SEPA Direct Debt
                            </div>
                        </div>
                    </div>
                    <div className={styles.table}>
                        falta tabla
                    </div>
                </div>
            </div>
            <div className={styles.containerNotification}>
                <h2 className={styles.title}>
                    {t('billing.t27')}
                </h2>
                <div className={styles.boxNotification}>
                    <p className={styles.text}>
                        {t('billing.t28')}
                    </p>
                    <div className={styles.form}>
                        <div className={styles.input}>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'card'}
                                    onChange={(e) => handleInputChange('card', 'paymentmethod')}
                                />
                                {t('billing.t30')}
                            </div>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                {t('billing.t31')}
                            </div>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                {t('billing.t32')}
                            </div>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                {t('billing.t33')}
                            </div>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                {t('billing.t34')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="invoice" className={styles.containerInvoices}>
                <h2 className={styles.title}>
                    {t('billing.t34')}
                </h2>
                <div className={styles.boxInvoices}>
                    <p className={styles.text}>
                        {t('billing.t35')}
                    </p>
                    <div className={styles.table}>
                        <Table
                            fetchs={fetchsInvoice}
                            items={invoices}
                            setStateTable={setStateTable}
                            handleAdd={handleAddInvoice}
                        >
                            <header>
                                {t('billing.t36')}
                            </header>
                            <item>
                                {t('billing.t37')}
                            </item>
                            <item>
                                {t('billing.t38')}
                            </item>
                            <item>
                                {t('billing.t39')}
                            </item>
                            <item>
                                {t('billing.t40')}
                            </item>
                            <item>
                                {t('billing.t41')}
                            </item>
                            <item>
                                {t('billing.t42')}
                            </item>
                            <item>
                                {t('billing.t43')}
                            </item>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing






const ModalPopupContact = ({ styles, setEditContact, state, setState }) => {
    const { t } = useTranslation()

    const [input, setInput] = useState(state)
    const [isActive, setIsActive] = useState(state.name.length > 5)

    const handleClickAccept = () => {
        setState(input)
        console.log('statee', input)
        setEditContact(true)
    }


    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === "name") {
            if (value.length > 5) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        }



        setInput((prevState) => ({
            ...prevState,
            [property]: value,
        }));
    };



    return (
        <div className={styles.modal}>
            <h2 className={styles.title}>
                {t('billing.x1')}
            </h2>
            <div className={styles.container}>
                <div className={styles.items}>
                    <input
                        type="checkbox"
                        spellCheck="false"
                        value={input.corporate || false}
                        onChange={(e) => handleInputChange(e, 'corporate')}
                    />
                    <b>
                        {t('billing.x2')}
                    </b>
                </div>
                <div className={styles.input}>
                    <label>
                        {t('billing.x3')}
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={t('billing.x3')}
                        value={input.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        {t('billing.x4')}
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={t('billing.x4')}
                        value={input.address1}
                        onChange={(e) => handleInputChange(e, 'address1')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        {t('billing.x5')}
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={t('billing.x5')}
                        value={input.address2}
                        onChange={(e) => handleInputChange(e, 'address2')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        {t('billing.x6')}
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={t('billing.x6')}
                        value={input.zip}
                        onChange={(e) => handleInputChange(e, 'zip')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        {t('billin7.x1')}
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={t('billing.x7')}
                        value={input.city}
                        onChange={(e) => handleInputChange(e, 'city')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        {t('billing.x8')}
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={t('billing.x8')}
                        value={input.country}
                        onChange={(e) => handleInputChange(e, 'country')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        {t('billing.x9')}
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={t('billing.x9')}
                        value={input.region}
                        onChange={(e) => handleInputChange(e, 'region')}
                    />
                </div>
                <div
                    onClick={() => handleClickAccept()}
                    className={styles.button}
                >
                    <button
                        className={`${isActive && styles.active}`}
                    >
                        {t('billing.x10')}
                    </button>
                </div>
            </div>
        </div>
    )
}