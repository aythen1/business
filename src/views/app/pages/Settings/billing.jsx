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


const Billing = ({ }) => {
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
        email: '',
        vat: '',
        paymentmethod: ''
    });


    useEffect(() => {
        if (billing) {
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
            email: 'new-account'
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
                    Información de Cuenta
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
                                    Currency {state.currency}<br />
                                    {state.iban}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleClickEdit()}
                            className={styles.button}
                        >
                            Editar
                        </button>
                    </div>
                ) : (
                    <div className={styles.boxInformation}>
                        <div>

                            <p>
                                Rellena los datos de usuario para verificar tu cuenta y poder entrar en las aplicaciones
                                con tus credenciales.
                            </p>
                            <button
                                onClick={() => handleClickEdit()}
                                className={styles.button}
                            >
                                Insertar información
                            </button>
                        </div>

                    </div>
                )}
            </div>

            <div className={styles.containerConsumption}>
                <h2 className={styles.title}>
                    VectorDB
                </h2>
                <div className={styles.boxConsumption}>
                    <SettingsCurrentConsumption />
                </div>
            </div>

            <div className={styles.containerContact}>
                <h2 className={styles.title}>
                    Email de contacto
                </h2>
                <div className={styles.boxContact}>
                    <span className={styles.text}>
                        You can add a billing contact if you want invoices to be sent to a specific address each month.
                    </span>
                    <div className={styles.grid2}>
                        <div className={styles.input}>
                            <label>
                                Billing email
                            </label>
                            <input
                                type='text'
                                placeholder={'placeholder@demo.com'}
                                value={state.email}
                                onChange={(e) => handleInputChange(e, 'email')}
                            />
                        </div>
                        <div className={styles.button}>
                            <button >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerContact}>
                <h2 className={styles.title}>
                    Token de GPT
                </h2>
                <div className={styles.boxContact}>
                    <span className={styles.text}>
                        You can create a GPT token to uniquely identify and authenticate your API requests.
                    </span>
                    <div className={styles.grid2}>
                        <div className={styles.input}>
                            <label>
                                Token
                            </label>
                            <input
                                type='text'
                                placeholder={'sk-***'}
                                value={state.email}
                                onChange={(e) => handleInputChange(e, 'email')}
                            />
                        </div>
                        <div className={styles.button}>
                            <button >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerAlerts}>
                <h2 className={styles.title}>
                    Límite de banca
                </h2>
                <div className={styles.boxAlerts}>
                    <div className={styles.alert}>
                        <div>
                            Billing alerts only provide a rough estimate of what may be charged to your monthly invoice. Additional costs
                            related to your usage before.
                        </div>
                        <p className={styles.text}>

                        </p>
                    </div>
                    <div className={styles.inputContainer}>
                        <div className={styles.toggle}>
                            Set bulling alerts at
                        </div>
                        <div className={styles.input}>
                            <label className={styles.label}>
                                Monthly Billing
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
                    </div>
                    <div className={styles.button}>
                        <button className={styles.buttonStyle}>
                            <svg className={styles.icon} viewBox="0 0 24 24">
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                            </svg>
                            Create billing alert
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.containerVat}>
                <h2 className={styles.title}>
                    VAT identification number
                </h2>
                <div className={styles.boxContact}>
                    <span className={styles.text}>
                        Enter your VAT ID number to remove VAT from your monthly bill. Why do we need your VAT number?
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
                            <button onClick={() => sendEmail()}>
                                Save (send email)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerPayment}>
                <h2 className={styles.title}>
                    Métodos de pago
                </h2>
                <div className={styles.boxPayment}>
                    <p className={styles.text}>
                        Add and select your preferred payment method. When will I be charged?
                    </p>
                    <div className={styles.form}>
                        <p className={styles.text}>
                            Select your default payment method:
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
                    Notificaciones de cuenta
                </h2>
                <div className={styles.boxNotification}>
                    <p className={styles.text}>
                        Select and configure your notification preferences. When will notifications be sent to you?
                    </p>
                    <div className={styles.form}>
                        <div className={styles.input}>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'card'}
                                    onChange={(e) => handleInputChange('card', 'paymentmethod')}
                                />
                                Email Notifications
                            </div>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                Daily Reminders
                            </div>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                Special Event Notifications:
                            </div>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                Private Message Notifications:
                            </div>
                            <div className={styles.type}>
                                <input
                                    type="radio"
                                    checked={state.paymentmethod === 'sepa'}
                                    onChange={(e) => handleInputChange('sepa', 'paymentmethod')}
                                />
                                App Update Notifications:
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="invoice" className={styles.containerInvoices}>
                <h2 className={styles.title}>
                    Facturas enviadas
                </h2>
                <div className={styles.boxInvoices}>
                    <p className={styles.text}>
                        Your invoices are listed below. Read the billing FAQ
                    </p>
                    <div className={styles.table}>
                        <Table
                            fetchs={fetchsInvoice}
                            items={invoices}
                            setStateTable={setStateTable}
                            handleAdd={handleAddInvoice}
                        >
                            <header>
                                Facturas enviadas
                            </header>
                            <item>
                                Month
                            </item>
                            <item>
                                Year
                            </item>
                            <item>
                                Number
                            </item>
                            <item>
                                Payment method
                            </item>
                            <item>
                                Status
                            </item>
                            <item>
                                Total (Vat incl.)
                            </item>
                            <item>
                                Download
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
    const [input, setInput] = useState(state)
    const [isActive, setIsActive] = useState(state.name.length > 5)

    const handleClickAccept = () => {
        setState(input)
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
                Editar el nombre de la cuenta
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
                        This is a corporate account
                    </b>
                </div>
                <div className={styles.input}>
                    <label>
                        Company name
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={'Company Name'}
                        value={input.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        Street Address
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={'Street Address'}
                        value={input.address1}
                        onChange={(e) => handleInputChange(e, 'address1')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        Street Address 2
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={'Street Address 2'}
                        value={input.address2}
                        onChange={(e) => handleInputChange(e, 'address2')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        Postal Code
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={'Postal Code'}
                        value={input.zip}
                        onChange={(e) => handleInputChange(e, 'zip')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        City
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={'City'}
                        value={input.city}
                        onChange={(e) => handleInputChange(e, 'city')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        Country
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={'Country'}
                        value={input.country}
                        onChange={(e) => handleInputChange(e, 'country')}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        Region
                    </label>
                    <input
                        required
                        type="text"
                        spellCheck="false"
                        placeholder={'Region'}
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
                        Confirm changes
                    </button>
                </div>
            </div>
        </div>
    )
}