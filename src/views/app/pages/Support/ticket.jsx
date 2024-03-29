import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import styles from './ticket.module.css'


import {
    vectorTicket,
    addVectorTicket
} from '@/actions/ticket'

import {
    calculateTimeAgo
} from '@/utils'


const esUUID = (variable) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(variable);
}


const Ticket = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { ticketId } = useParams();
    const { messages } = useSelector((state) => state.ticket)

    const [isActive, setIsActive] = useState(false)
    const [message, setMessage] = useState('')



    const handleBackTickets = () => {
        navigate(`/${'es'}/app/support/tickets`)
    }


    const handleInputChange = (e) => {
        const message = e.target.value

        if (message.length > 5) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }

        setMessage(message)
    }

    const openReply = () => {
        if (message.length > 0) {
            const data = {
                title: 'tickethello',
                version: '0',
                description: 'Crear un ticket',
                data: {
                    message: message,
                    date: new Date()
                }
            }

            dispatch(addVectorTicket({
                ticket: data,
                vector: [0, 0]
            }))

            setMessage('')
        }
    }



    const fetchsItems = async () => {
        dispatch(vectorTicket({
            title: 'tickethello',
            vector: [0, 0]
        }))
    }

    useEffect(() => {
        console.log('ticketId', ticketId)
        if(esUUID(ticketId)){
            fetchsItems()
        }else{
            navigate(`/${'es'}/app/support/tickets`)
        }
        
    }, [ticketId])
    

    return (
        <div className={styles.container}>
            <div
                className={styles.subheader}
                onClick={() => handleBackTickets()}
            >
                <svg viewBox="0 0 16 16" ><path d="M5.3 8.7a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.4 1.4L7.42 8l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4Z"></path></svg>
                Back to tickets
            </div>
            <div className={styles.header}>
                <div>
                    <label className={styles.dot} />
                </div>
                <div className={styles.title}>
                    <h2>
                        Ticket {ticketId.slice(0, 6)} - Critical issue with your server
                    </h2>
                    <div className={styles.subtitle}>
                        Unknown severity
                        <label>/</label>
                        N/D
                    </div>
                </div>
                <button
                    className={styles.buttonClose}
                    onClick={() => handleClick()}
                >
                    Close Ticket
                </button>
            </div>
            <div className={styles.writeMessage}>
                <div className={styles.input}>
                    <div className={styles.avatar}>
                        {true ? (
                            <div className={styles.initial}>
                                <label>
                                D
                                </label>
                            </div>
                        ) : (
                            <img src="" />
                        )}
                    </div>
                    <textarea
                        spellCheck="false"
                        placeholder={'Type your message here'}
                        name="message"
                        value={message}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.buttons}>
                    <button >
                        Report to a manager
                    </button>
                    <button
                        className={`${isActive ? styles.active : styles.desactive}`}
                        onClick={() => openReply()}
                    >
                        Reply
                        <svg viewBox="0 0 24 24" ><path d="M15 5l-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"></path></svg>
                    </button>
                </div>
            </div>
            <div className={styles.messages}>
                <div className={styles.listMessage}>
                    {messages.map((item, index) => (
                        <div>
                            <div className={styles.date}>
                                <label>
                                    {calculateTimeAgo(item.date)}
                                </label>
                            </div>
                            <div className={styles.message}>
                                <div className={styles.avatar}>
                                    {true ? (
                                        <div className={styles.initial}>
                                            <label>
                                                D
                                            </label>
                                        </div>
                                    ) : (
                                        <img src="" />
                                    )}
                                </div>
                                <div className={styles.text}>
                                    <div className={styles.boxText}>
                                        {item.message}
                                    </div>
                                    <div className={styles.boxDate}>
                                        <label>
                                            Latest
                                        </label>
                                        <p>
                                            {calculateTimeAgo(item.date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Ticket