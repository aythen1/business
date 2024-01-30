import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import styles from './ticket.module.css'


const Ticket = () => {
    const { ticketId } = useParams();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <label className={styles.dot} />
                </div>
                <div className={styles.title}>
                    <h2>
                        Ticket {ticketId} - Critical issue with your server
                    </h2>
                    <div className={styles.subtitle}>
                        Unknown severity
                        <label>/</label>
                        N/D
                    </div>
                </div>
                <button className={styles.buttonClose}>
                    Close Ticket
                </button>
            </div>
            <div className={styles.writeMessage}>
                <div className={styles.input}>
                    <div>
                        <img src="" />
                    </div>
                    <textarea
                        placeholder={'Type your message here'}
                    />
                </div>
                <div className={styles.buttons}>
                    <button>
                        Report to a manager
                    </button>
                    <button>
                        Reply
                        <svg viewBox="0 0 24 24" ><path d="M15 5l-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"></path></svg>
                    </button>
                </div>
            </div>
            <div className={styles.messages}>
                <div className={styles.date}>
                    <label>
                        15 days ago
                    </label>
                </div>
                <div className={styles.listMessage}>
                    <div className={styles.message}>
                        <div className={styles.avatar}>
                            avatar
                            <img src="" />
                        </div>
                        <div className={styles.text}>
                            <div className={styles.boxText}>
                                Hello, Your instance 'scw-develop-new' ('8158c223-f60d-4eca-8815-c2152e9b175c') is running on a
                                hypervisor that experienced a critical failure. Unfortunately, we were not able to reboot the hypervisor.
                                As a result, your instance has been stopped. However, your data is on a block volume so it has not been
                                impacted or lost. Your instance can now be restarted whenever you want. We apologize for any inconvenience caused and remain at your disposal if you have any question. Scaleway Team
                            </div>
                            <div className={styles.boxDate}>
                                <label>
                                    Latest
                                </label>
                                <p>
                                    2024-01-15 9:43 AM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticket