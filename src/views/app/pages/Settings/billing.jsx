import React, { useEffect, useState } from 'react'
import styles from './billing.module.css'
import { useDispatch, useSelector } from 'react-redux';


import Table from '@/views/app/pages/Settings/iam/table'
import SettingsCurrentConsumption from '../shared/settingsCurrentConsumption'
import Invoice from './Invoice/index'

import stylesModal from '../Settings/iam/modal.module.css'

import {
    fetchsBilling,
    updateBilling,

    addInvoice,
    fetchsInvoice,
} from '@/actions/iam'


import {
    setModal
} from '@/slices/iamSlice'


const Billing = ({ }) => {
    const dispatch = useDispatch()

    const [isActive, setIsActive] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const [stateTable, setStateTable] = useState('')

    const { invoices } = useSelector((state) => state.iam)


    // ---
    const [state, setState] = useState({
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


    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'email') {
            // Dividir los correos electrónicos por comas y quitar los espacios en blanco
            const emailArray = value.split(',').map(email => email.trim());

            // Verificar si al menos hay un correo electrónico válido
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





    const organization = {
        name: 'Aythen',
        currency: 'eur',
        iban: 'ESB61077863',
        type: 'professional account',
        address: {
            mame: 'Pasaje Barcelona',
            num: 'n8 local 2',
            zip: '08130',
            city: 'Santa Perpetua de Mogoda',
            province: 'Barcelona',
            country: 'SPAIN'
        }
    }



    const handleClickEdit = () => {
        dispatch(setModal(<ModalPopupContact styles={stylesModal} state={state} setState={setState} setEditContact={setEditContact} />))
    }


    useEffect(() => {
        const fetchsItems = async () => {
            dispatch(fetchsBilling())
        }

        fetchsItems()
    }, [])


    useEffect(() => {
        if (editContact) {
            const data = {
                name: state.name || '',
                limit: state.limit || 0,
                email: state.email || '',
                vat: state.vat || '',
                paymentmethod: state.paymentmethod || '',
                // test: '12345'
                address: {
                    steetaddress1: state.address1 || '',
                    steetaddress2: state.address2 || '',
                    zip: state.zip || '',
                    city: state.city || '',
                    country: state.country || '',
                    region: state.region || '',
                }
            }

            console.log('data', data)

            dispatch(updateBilling({billing: data }))
        }
    }, [editContact])






    // -------------------------------------------------
    const handleAddInvoice = () => {
        // alert(1)
        const item = {
            invoiceDate: new Date()
        }

        dispatch(addInvoice(item))
    }


    useEffect(() => {
      console.log('stateTable', stateTable)

      if(stateTable.startsWith('download-file:')){
        const id = stateTable.split(':')[1].trim()
        console.log('id', id)
        alert(id)
      }
    }, [stateTable])
    






    return (
        <div className={styles.containerBilling}>
            {false && (
            <div style={{gridColumn: 'span 2'}}>
               <Invoice />
            </div>
            )}
            <div className={styles.containerInformation}>
                <h2 className={styles.title}>
                    Información de Cuenta
                </h2>
                <div className={styles.boxInformation}>
                    <div>
                        <h2 className={styles.title}>
                            {organization?.name}
                        </h2>
                        <div className={styles.description}>
                            <div className={styles.descriptionOne}>
                                {organization?.address?.mame}, {organization?.address?.num}<br />
                                {organization?.address?.zip} {organization?.address?.city} <br />
                                {organization?.address?.province} <br />
                                {organization?.address?.country} <br /> <br />
                            </div>
                            <div>
                                {organization.type}<br />
                                Currency {organization.currency}<br />
                                {organization.iban}
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
                        {/* <Table /> */}
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
                            <button >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.containerInvoices}>
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

    const handleClickAccept = () => {
        setState(input)
        setEditContact(true)
    }


    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
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
                        placeholder={'Region'}
                        value={input.region}
                        onChange={(e) => handleInputChange(e, 'region')}
                    />
                </div>


                <div
                    onClick={() => handleClickAccept()}
                    className={styles.button}
                >
                    <button>
                        Confirm changes
                    </button>
                </div>
            </div>
        </div>
    )
}