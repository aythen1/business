import React, {useState, useEffect} from 'react'

import styles from './tickets.module.css'
import { useNavigate } from 'react-router-dom';


const Tickets = () => {
    const navigate = useNavigate()

    const handleTicket = () => {
        navigate(`/es/app/support/ticket/123`)
    }

    return (
        <div className={styles.container}>
            <button
                onClick={() => handleTicket()}
            >
                ticket click
            </button>
            My support

            Icono support

            Current Plan
            Basic
            Free

            Tickets and Live Chat
            Available 24/7

            Hotline
            Available from silver plan

            Technical Account Manager
            Available from gold plan

            Upgrade Plan


            <div>
                Open tickets
                Closed tickets

                + Create a ticket
            </div>
            
            <div>
                Ticket Id
                Subject
                Product
                Created by
                Last update
                Status
                Awaiting customer
                view ticket
            </div>
        </div>
    )
}

export default Tickets