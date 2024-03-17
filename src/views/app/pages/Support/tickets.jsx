import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import styles from './tickets.module.css'

import stylesModal from '../Settings/iam/modal.module.css'
import Table from '../Settings/iam/table'


import components from '@components'


import {
    addTicket,
    fetchsTicket,
} from '@/actions/ticket'

import {
    setModal
} from '@/slices/iamSlice'

const Tickets = () => {
    const organization = {
        title: 'Lite',
        plan: 'Free',
        time: 'Available 24/7',
        type: 'Online',
        custom0: 'Technical Account Manager'
    }
    
    
    
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { tickets } = useSelector((state) => state.ticket)

    const [stateTable, setStateTable] = useState(null)
    const [tag, setTag] = useState('open')



    useEffect(() => {
        console.log('stateTabel', stateTable)
        if(stateTable){
            if(stateTable.startsWith('view-ticket:')){
                const id = stateTable.split(':')[1]
                navigate(`/es/app/support/ticket/${id}`)
            }

        }
    }, [stateTable])



    const handleModalTicket = (ticket) => {
        dispatch(setModal(<PopupModalAddTicket styles={stylesModal} ticket={ticket} />))
    }


    const component = ({...props}) => {
        return <ComponentTable {...props} />
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <div>
                    <button 
                        className={`${tag !== 'open' && styles.desactive}`}
                        onClick={() => setTag('open')}
                    >
                        Ticket Abiertos
                    </button>
                    <button 
                        className={`${tag !== 'closed' && styles.desactive}`}
                        onClick={() => setTag('closed')}
                    >
                        Tickets Cerrados
                    </button>
                </div>
                <button 
                    className={styles['create']}
                    onClick={() => handleModalTicket()}
                >
                    + Crear ticket
                </button>
            </div>
            <div className={styles.header}>
                <div className={styles.banner}>
                    <div className={styles.icon}>
                        <svg viewBox="0 0 64 64" >
                            <g clipPath="url(#b)">
                                <g >
                                    <path fill="var(--color-primary-4)" d="M0 16C0 7.163 7.163 0 16 0h32c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48z" ></path>
                                </g>
                                <g>
                                    <path fill="var(--color-primary-0)" d="M32.355 5C25.923 5 20.71 10.214 20.71 16.645c0 3.218 1.306 6.132 3.415 8.239l-3.991 6.912a1 1 0 0 0 1.17 1.452l3.977-1.271.888 4.08a1 1 0 0 0 1.843.287l3.962-6.862 3.961 6.862a1 1 0 0 0 1.843-.288l.888-4.08 3.977 1.272a1 1 0 0 0 1.17-1.452l-3.722-6.447a11.619 11.619 0 0 0 3.91-8.704C44 10.214 38.785 5 32.354 5ZM22.71 16.645A9.645 9.645 0 0 1 32.355 7a9.645 9.645 0 0 1 5.841 17.321 1 1 0 0 0-.26 1.295l2.852 4.94-2.56-.82a1 1 0 0 0-1.283.74l-.571 2.628-3.534-6.122a1 1 0 0 0-1.732 0l-3.535 6.122-.571-2.627a1 1 0 0 0-1.282-.74l-2.56.819 3.095-5.361a1 1 0 0 0-.212-1.256 9.62 9.62 0 0 1-3.333-7.294m9.702 4.48a4.813 4.813 0 1 0 0-9.625 4.813 4.813 0 0 0 0 9.625" clipRule="evenodd" fillRule="evenodd"></path>
                                    <path fill="var(--color-primary-0)" d="M48.5 9.134a1 1 0 0 0 1 1.732l2.598-1.5a1 1 0 1 0-1-1.732zm1.232 8.366a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1M19.395 50.563l-1.723-6.577a15.4 15.4 0 0 1 2.181-1.105c1.226-.503 2.61-.88 3.923-.88 1.331 0 2.992.385 4.579.905a29.842 29.842 0 0 1 3.794 1.537.975.975 0 0 0 .088.039l6.748 2.595c.208.08.355.267.382.488a.844.844 0 0 1 0 .268.18.18 0 0 1-.012.037c-.473.49-1.598 1.143-3.108.778-2.227-.539-4.563-1.804-5.71-2.505a1 1 0 0 0-1.043 1.707c1.205.736 3.753 2.13 6.283 2.742 2.335.565 4.16-.442 5.023-1.34.592-.614.617-1.413.552-1.935a2.597 2.597 0 0 0-.116-.508 41.618 41.618 0 0 0 3.528-.637c2.187-.496 4.566-1.243 6.35-2.336.352-.172.75-.317 1.082-.317.154 0 .264.032.35.082.08.048.202.15.324.395.123.246.137.413.128.521a.785.785 0 0 1-.141.366c-.183.276-.457.488-.764.724l-.055.043-13.399 7.379a7.359 7.359 0 0 1-1.99.41c-.891.061-1.836-.033-2.654-.41-2.04-.942-5.54-2.477-7.054-3.136-.9-.439-3.021-.906-5.461-.034-.94.335-1.615.56-2.085.704m24.926-6.342a38.471 38.471 0 0 1-5.108.8L33 42.633a31.946 31.946 0 0 0-4.022-1.626C27.324 40.464 25.424 40 23.776 40c-1.666 0-3.32.472-4.682 1.03a17.46 17.46 0 0 0-2.31 1.156 4.001 4.001 0 0 0-4.17-1.375l-2.872.77a1 1 0 0 0-.708 1.224l3.526 13.158a1 1 0 0 0 1.225.707l2.873-.77a4.001 4.001 0 0 0 2.927-3.306l.174-.051a49.19 49.19 0 0 0 2.393-.8c1.926-.689 3.5-.259 3.92-.048a.97.97 0 0 0 .05.023c1.502.653 5.008 2.19 7.035 3.126 1.22.564 2.53.666 3.629.59 1.1-.076 2.064-.335 2.65-.569a.857.857 0 0 0 .11-.053l13.525-7.448a.954.954 0 0 0 .131-.086l.092-.07c.285-.215.847-.641 1.231-1.222.23-.347.42-.78.465-1.293.046-.52-.063-1.055-.331-1.592-.27-.539-.639-.952-1.096-1.222a2.658 2.658 0 0 0-1.367-.36c-.83 0-1.592.336-2.015.547a1.02 1.02 0 0 0-.079.044c-1.505.932-3.647 1.627-5.78 2.111Zm-33.096-.967 3.008 11.226 1.907-.511a2 2 0 0 0 1.415-2.45l-1.973-7.362a2 2 0 0 0-2.45-1.414l-1.907.51ZM48.135 24.5a1 1 0 0 0 .365 1.366l2.598 1.5a1 1 0 0 0 1-1.732l-2.598-1.5a1 1 0 0 0-1.366.366Zm-34.367-8a1 1 0 1 1 0 2h-3a1 1 0 0 1 0-2zm2.598-6A1 1 0 0 0 16 9.134l-2.598-1.5a1 1 0 0 0-1 1.732l2.598 1.5a1 1 0 0 0 1.366-.366M16 25.866a1 1 0 0 0-1-1.732l-2.598 1.5a1 1 0 0 0 1 1.732z" clipRule="evenodd" fillRule="evenodd"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className={styles.item}>
                        <b>
                            Plan Actual
                        </b>
                        <label className={styles.plan}>
                            { organization.title || 'Lite' }
                        </label>
                        <p>
                            { organization.plan || 'Free' }
                        </p>
                    </div>
                    <div className={styles.item}>
                        <b>
                            Disponibilidad de tickets
                        </b>
                        <p>
                            { organization.time || 'Available 24/7' }
                        </p>
                    </div>
                    <div className={styles.item}>
                        <b>
                            { organization.type || 'Online' }
                        </b>
                        <label className={styles.label}>
                            Soporte de PLAN LITE
                        </label>
                    </div>
                    <div className={styles.item}>
                        <b>
                            { organization.time || 'Technical Account Manager' }
                        </b>
                        <label className={styles.label}>
                        Soporte de PLAN LITE
                        </label>
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <Table
                    fetchs={fetchsTicket}
                    items={tickets}
                    setStateTable={setStateTable}
                >
                    <header>
                        Ticket
                    </header>
                    <item>
                        Ticket Id
                    </item>
                    <item>
                        Subject
                    </item>
                    <item size="100">
                        Created by
                    </item>
                    <item size="100">
                        Last updated
                    </item>
                    <item size="100">
                        Status
                    </item>
                    <item component={component}>
                        Customer
                    </item>
                </Table>
            </div>
        </div>
    )
}

export default Tickets




const ComponentTable = (props) => {
    const handleViewTicket = () => {
        props.setStateTable(`view-ticket:${props.item.id}`)
    }

    return (
        <div className={styles.view}>
            <div 
                className={styles.button}
                onClick={() => handleViewTicket()}
            >
                <svg viewBox="0 0 24 24" ><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>
            </div>
        </div>
    )
}
















// -----------------------------------------------------------
const PopupModalAddTicket = ({ styles, ticket }) => {
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)


    // ---
    const [state, setState] = useState({
        bearer: ticket?.bearer || '',
        subject: ticket?.subject || '',
        message: ticket?.message || '',
        product: ticket?.product || '',
        status: ticket?.status || '',
        updatedAt: ticket?.updatedAt || new Date(),
        createdAt: ticket?.createdAt || new Date(),
    });


    const handleInputChange = (e, property) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }

        if (property === 'subject' || property === 'message') {
            const isValidText = value.trim().length > 0;
        
            setIsActive(
                (property === 'message' && state.subject.length > 1 && state.message.length > 99) ||
                (property === 'subject' && state.subject.length > 1 && state.message.length > 5)
            );
        
            setState((prevState) => ({
                ...prevState,
                [property]: isValidText ? value.trim() : '',
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [property]: value,
            }));
        }
    };




    const handleAddTicket = () => {
        const data = {
            bearer: state.bearer || '',
            subject: state.subject || '',
            product: state.product || '',
            status: state.status || 300,
            message: state.message || '',
            updatedAt: new Date(),
            createdAt: state.createdAt || new Date(),
        }

        dispatch(addTicket(data))
        dispatch(setModal(null))
    }



    // ----------------------------------------------
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
      const newText = e.target.value;
      setText(newText);
    };
  
    const usedCharacters = text.length;

    return (
        <div className={styles.modal}>
            <h2 className={styles.title} style={{ marginTop: -10 }}>
                Nuevo Ticket
            </h2>
            <p className={styles.text1}>
                Crea un nuevo ticket relacionado con el producto que quieras comentar para tus usuarios puedan
                ayudarte, además añade tags para filtrar los tickets.
            </p>
            <p className={styles.textBold}>
                Añade un nombre a ticket
            </p>
            <div className={styles.input}>
                <input
                    type="text"
                    spellCheck="false"
                    placeholder={'Escribe el nombre de tu ticket'}
                    value={state.subject}
                    onChange={(e) => handleInputChange(e, 'subject')}
                />
            </div>
            <div className={styles.gird2}>
                <div>
                    <components.SearchList
                            title="Añadir uno de tus productos" 
                            data={['Apple', 'Banana', 'Cherry', 'Apricot', 'Strawberry']}
                        />
                </div>
                <div>
                    <components.SearchList
                        title="Añadir un estado" 
                        data={['Apple', 'Banana', 'Cherry', 'Apricot', 'Strawberry']}
                    />
                </div>
            </div>
            <p className={styles.textBold}>
                Añade la pregunta 
                ({usedCharacters})
                100
                caracteres mínimo.
            </p>
            <textarea
                spellCheck="false"
                placeholder={'Empezar a escribir..'}
                className={styles.textarea}
                value={state.message}
                onChange={(e) => {
                    handleTextChange(e)
                    handleInputChange(e, 'message')
                }}
            />
            <div className={styles.button}>
                <button
                    onClick={() => handleAddTicket()}
                    className={`${styles.desactive} ${isActive ? styles.active : ''}`}
                >
                    Crear un Nuevo Ticket
                </button>
            </div>
        </div>
    )
}