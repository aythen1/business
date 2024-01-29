import React, {useEffect, useState } from 'react'
import styles from './billing.module.css'
import { useDispatch, useSelector } from 'react-redux';


import Table from '@/views/app/pages/Settings/table'


import SettingsCurrentConsumption from '../shared/settingsCurrentConsumption'


import stylesModal from '../Settings/iam/modal.module.css'

import {
    fetchsBilling,
    updateBilling
} from '@/actions/iam'


import {
    setModal
} from '@/slices/iamSlice'


const Billing = ({ }) => {
    const dispatch = useDispatch()

    const [isActive, setIsActive] = useState(false)
    const [editContact, setEditContact] = useState(false)


    // ---
    const [state, setState] = useState({
        email: [],
        tags: [],
        group: '',

        corporate: false,
        name: '',
        address1: '',
        address2: '',
        zip: '',
        city: '',
        country: '',
        region: '',
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
        dispatch(setModal(<ModalPopupContact styles={stylesModal} state={state} setEditContact={setEditContact} handleInputChange={handleInputChange}  />))
    }


    useEffect(() => {
        const fetchsItems = async () => {
            const token = localStorage.getItem('token')
            dispatch(fetchsBilling({token}))
        }

        fetchsItems()
    }, [])


    useEffect(() => {
        if(editContact){
            const token = localStorage.getItem('token')

            const data = {
                limit: 0,
                email: '',
                vat: '',
                paymentmethod: 'credit',
                // test: '12345'
                address: {
                    name: 'eeeeaaa',
                    steetaddress1: 'aaaa',
                    // steetaddress2: '',
                    // zip: '',
                    // city: '',
                    // country: '',
                    // region: '',
                }                  
            }

            console.log('data', data)

            dispatch(updateBilling({token, billing: data}))
        }
    }, [editContact])
    



    return (
        <div className={styles.containerBilling}>
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
                            <input type={'info@aythen.com'} />
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
                            <div class={styles.grid2}>
                                <div className={styles.value}>
                                    <input value={'1000'} />
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
                                <input type="radio" />
                                Credit card
                            </div>
                            <div className={styles.sepa}>
                                <input type="radio" />
                                SEPA Direct Debt
                            </div>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <Table />
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
                            <input type={'ESB61077863VAT'} />
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
                        <Table />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Billing






const ModalPopupContact = ({styles, setEditContact, state, handleInputChange}) => {

    const handleClickAccept = () => {
        setEditContact(true)
    }
             return(
            <div className={styles.modal}>
                <h2 className={styles.title}>
                    Editar el nombre de la cuenta 
                </h2>
                <div className={styles.container}>
                    <div className={styles.items}>
                        <input 
                            type="checkbox" 
                            value={state.corporate || false}
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
                            value={state.name}
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
                            value={state.address1}
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
                            value={state.address2}
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
                            value={state.zip}
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
                            value={state.city}
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
                            value={state.country}
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
                            value={state.region}
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